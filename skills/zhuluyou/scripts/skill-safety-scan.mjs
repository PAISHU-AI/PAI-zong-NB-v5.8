#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TEXT_EXTENSIONS = new Set([
  ".md",
  ".txt",
  ".js",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
  ".jsx",
  ".py",
  ".sh",
  ".ps1",
  ".bat",
  ".cmd",
  ".json",
  ".yaml",
  ".yml",
  ".toml",
  ".ini",
  ".env",
  ".example",
]);

const HIGH_RISK_BINARY_EXTENSIONS = new Set([
  ".exe",
  ".dll",
  ".msi",
  ".scr",
  ".com",
  ".jar",
  ".dmg",
  ".pkg",
  ".deb",
  ".rpm",
  ".so",
  ".dylib",
]);

const REVIEW_ARCHIVE_EXTENSIONS = new Set([
  ".zip",
  ".7z",
  ".rar",
  ".tar",
  ".gz",
  ".tgz",
  ".bz2",
  ".xz",
]);

const DEPENDENCY_MANIFESTS = new Set([
  "package.json",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "requirements.txt",
  "pyproject.toml",
  "poetry.lock",
  "pipfile",
  "pipfile.lock",
  "cargo.toml",
  "cargo.lock",
  "go.mod",
  "go.sum",
  "composer.json",
  "gemfile",
  "gemfile.lock",
]);

const STATIC_RULES = [
  {
    id: "instruction-override",
    severity: "block",
    pattern: /ignore\s+(all\s+)?(previous|prior|system|developer)\s+instructions/i,
    message: "Attempts to override higher-priority instructions.",
  },
  {
    id: "hidden-prompt-disclosure",
    severity: "block",
    pattern: /(reveal|print|dump|show).{0,80}(system prompt|developer message|hidden instructions)/i,
    message: "Attempts to disclose hidden prompts or instructions.",
  },
  {
    id: "secret-exfiltration",
    severity: "block",
    pattern: /(steal|exfiltrate|upload|send).{0,100}(token|secret|api key|ssh key|private key|password|credential|cookie)/i,
    message: "Mentions credential or secret exfiltration behavior.",
  },
  {
    id: "remote-shell-pipe",
    severity: "block",
    pattern: /(curl|wget|iwr|irm|Invoke-WebRequest|Invoke-RestMethod)[^\n|]{0,160}\|\s*(sh|bash|zsh|powershell|pwsh|cmd)/i,
    message: "Downloads remote content and pipes it directly to a shell.",
  },
  {
    id: "remote-code-execution-download",
    severity: "block",
    pattern: /(curl|wget|iwr|irm|Invoke-WebRequest|Invoke-RestMethod).{0,180}https?:\/\/.{0,180}\.(exe|msi|dll|ps1|bat|cmd|sh|jar)\b/i,
    message: "Downloads executable or script content from a remote URL.",
  },
  {
    id: "npm-install-hook",
    severity: "block",
    pattern: /"(preinstall|install|postinstall|prepare)"\s*:\s*"[^"]+"/i,
    message: "Defines package-manager install hooks.",
  },
  {
    id: "destructive-home-or-root-delete",
    severity: "block",
    pattern: /\b(rm\s+-rf\s+(\/|\$HOME|~)|Remove-Item\s+(-Recurse\s+)?(-Force\s+)?(\$HOME|~|[A-Z]:\\))/i,
    message: "Contains destructive root, home, or drive-level delete behavior.",
  },
  {
    id: "world-writable-recursive",
    severity: "block",
    pattern: /chmod\s+(-R\s+)?777/i,
    message: "Sets broad world-writable permissions.",
  },
  {
    id: "persistence-hook",
    severity: "block",
    pattern: /\b(launchctl|LaunchAgents|LaunchDaemons|crontab|schtasks|New-Service|Set-ItemProperty\s+HKCU|Set-ItemProperty\s+HKLM)\b/i,
    message: "Attempts to create persistence or scheduled execution.",
  },
  {
    id: "shell-profile-modification",
    severity: "block",
    pattern: /\.(zshrc|bashrc|bash_profile|profile|powershell_profile\.ps1)\b/i,
    message: "References shell profile modification.",
  },
  {
    id: "external-url",
    severity: "review",
    pattern: /https?:\/\/[^\s<>"')]+/i,
    message: "Contains external URL; source and destination need review before activation.",
  },
  {
    id: "telemetry-or-upload",
    severity: "review",
    pattern: /\b(telemetry|analytics|tracking|upload|webhook|callback|posthog|segment|sentry)\b/i,
    message: "Mentions telemetry, upload, callback, webhook, or tracking behavior.",
  },
];

function normalizeRelativePath(filePath) {
  return filePath.replace(/\\/g, "/");
}

function walk(dir, visit) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const current = path.join(dir, entry.name);
    const stat = fs.lstatSync(current);
    if (stat.isSymbolicLink()) {
      visit(current, entry, stat);
      continue;
    }
    if (entry.isDirectory()) {
      if ([".git", "node_modules", "__pycache__", ".venv", "venv"].includes(entry.name)) continue;
      walk(current, visit);
    } else if (entry.isFile()) {
      visit(current, entry, stat);
    }
  }
}

function lineForIndex(text, index) {
  if (index < 0) return 1;
  return text.slice(0, index).split(/\r?\n/).length;
}

function firstMatch(text, rule) {
  const flags = rule.pattern.flags.replace("g", "");
  const pattern = new RegExp(rule.pattern.source, flags);
  const match = pattern.exec(text);
  if (!match) return null;
  const sample = match[0].replace(/\s+/g, " ").slice(0, 180);
  if (rule.id === "external-url" && /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)([:/]|$)/i.test(sample)) {
    return null;
  }
  if (rule.id === "persistence-hook" && sample === "new-service") {
    return null;
  }
  return {
    line: lineForIndex(text, match.index),
    sample,
  };
}

function finding({ skillName, root, filePath, rule, severity, message, line, sample }) {
  return {
    skill: skillName || null,
    file: normalizeRelativePath(path.relative(root, filePath)),
    rule,
    severity,
    message,
    line: line || null,
    sample: sample || null,
  };
}

export function scanPath(targetPath, options = {}) {
  const root = path.resolve(targetPath);
  const skillName = options.skillName || null;
  const findings = [];

  if (!fs.existsSync(root)) {
    return {
      ok: false,
      root,
      scannedFileCount: 0,
      findings: [
        {
          skill: skillName,
          file: ".",
          rule: "target-missing",
          severity: "block",
          message: "Scan target does not exist.",
          line: null,
          sample: null,
        },
      ],
    };
  }

  let scannedFileCount = 0;
  walk(root, (filePath, entry, stat) => {
    const rel = normalizeRelativePath(path.relative(root, filePath));
    if (stat.isSymbolicLink()) {
      findings.push(finding({
        skillName,
        root,
        filePath,
        rule: "symbolic-link",
        severity: "block",
        message: "Symbolic links are not allowed in installable skills.",
      }));
      return;
    }

    scannedFileCount += 1;
    const ext = path.extname(filePath).toLowerCase();
    const base = path.basename(filePath).toLowerCase();

    if (HIGH_RISK_BINARY_EXTENSIONS.has(ext)) {
      findings.push(finding({
        skillName,
        root,
        filePath,
        rule: "high-risk-binary",
        severity: "block",
        message: "Executable or native binary content is not allowed in skills.",
      }));
    }

    if (REVIEW_ARCHIVE_EXTENSIONS.has(ext)) {
      findings.push(finding({
        skillName,
        root,
        filePath,
        rule: "archive-payload",
        severity: "review",
        message: "Archive payloads require manual source review before activation.",
      }));
    }

    if (DEPENDENCY_MANIFESTS.has(base)) {
      findings.push(finding({
        skillName,
        root,
        filePath,
        rule: "dependency-manifest",
        severity: "review",
        message: "Dependency manifests require manual review before activation.",
      }));
    }

    if (stat.size > 5_000_000) {
      findings.push(finding({
        skillName,
        root,
        filePath,
        rule: "large-file",
        severity: "review",
        message: "Large files are not automatically trusted by the text scanner.",
      }));
      return;
    }

    if (!TEXT_EXTENSIONS.has(ext) && !["skill.md", "readme", "license"].includes(base)) return;

    const text = fs.readFileSync(filePath, "utf8");
    for (const rule of STATIC_RULES) {
      const match = firstMatch(text, rule);
      if (!match) continue;
      findings.push(finding({
        skillName,
        root,
        filePath,
        rule: rule.id,
        severity: rule.severity,
        message: rule.message,
        line: match.line,
        sample: match.sample,
      }));
    }
  });

  return {
    ok: findings.length === 0,
    root,
    scannedFileCount,
    findings,
  };
}

function findWindowsDefender() {
  const candidates = [];
  const programData = process.env.ProgramData || "C:\\ProgramData";
  const platformRoot = path.join(programData, "Microsoft", "Windows Defender", "Platform");
  if (fs.existsSync(platformRoot)) {
    for (const version of fs.readdirSync(platformRoot)) {
      const exe = path.join(platformRoot, version, "MpCmdRun.exe");
      if (fs.existsSync(exe)) candidates.push(exe);
    }
  }
  const legacy = path.join(process.env.ProgramFiles || "C:\\Program Files", "Windows Defender", "MpCmdRun.exe");
  if (fs.existsSync(legacy)) candidates.push(legacy);
  return candidates.sort().at(-1) || null;
}

function commandExists(command) {
  const probe = process.platform === "win32" ? "where" : "command";
  const args = process.platform === "win32" ? [command] : ["-v", command];
  const result = spawnSync(probe, args, { encoding: "utf8", shell: process.platform !== "win32" });
  return result.status === 0;
}

export function runAntivirusScan(targetPath, options = {}) {
  const target = path.resolve(targetPath);
  const timeoutMs = options.timeoutMs || 120_000;

  if (process.platform === "win32") {
    const defender = findWindowsDefender();
    if (!defender) {
      return {
        ok: false,
        engine: "windows-defender",
        available: false,
        status: null,
        message: "Windows Defender MpCmdRun.exe was not found.",
      };
    }
    const result = spawnSync(defender, ["-Scan", "-ScanType", "3", "-File", target], {
      encoding: "utf8",
      timeout: timeoutMs,
      maxBuffer: 2_000_000,
    });
    return {
      ok: result.status === 0,
      engine: "windows-defender",
      available: true,
      command: defender,
      status: result.status,
      signal: result.signal,
      stdout: (result.stdout || "").slice(-4000),
      stderr: (result.stderr || "").slice(-4000),
      message: result.status === 0 ? "Antivirus scan passed." : "Antivirus scan failed or reported a threat.",
    };
  }

  if (commandExists("clamscan")) {
    const result = spawnSync("clamscan", ["-r", "--no-summary", target], {
      encoding: "utf8",
      timeout: timeoutMs,
      maxBuffer: 2_000_000,
    });
    return {
      ok: result.status === 0,
      engine: "clamscan",
      available: true,
      command: "clamscan",
      status: result.status,
      signal: result.signal,
      stdout: (result.stdout || "").slice(-4000),
      stderr: (result.stderr || "").slice(-4000),
      message: result.status === 0 ? "Antivirus scan passed." : "Antivirus scan failed or reported a threat.",
    };
  }

  return {
    ok: false,
    engine: os.platform(),
    available: false,
    status: null,
    message: "No supported antivirus scanner was found.",
  };
}

export function summarizeFindings(findings) {
  const counts = {};
  for (const finding of findings) {
    counts[finding.severity] = (counts[finding.severity] || 0) + 1;
  }
  return counts;
}

function parseCliArgs(argv) {
  const parsed = { target: null, antivirus: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--target") parsed.target = argv[++i];
    else if (arg === "--antivirus") parsed.antivirus = true;
    else if (arg === "--help" || arg === "-h") parsed.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node skill-safety-scan.mjs --target <path> [--antivirus]

Scans a staged skill directory for prompt-injection, remote execution, external links,
dangerous files, dependency manifests, and optionally local antivirus results.`);
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isCli) {
  try {
    const cli = parseCliArgs(process.argv.slice(2));
    if (cli.help || !cli.target) {
      printHelp();
      process.exit(cli.help ? 0 : 2);
    }
    const staticScan = scanPath(cli.target);
    const antivirus = cli.antivirus ? runAntivirusScan(cli.target) : null;
    const ok = staticScan.ok && (!antivirus || antivirus.ok);
    console.log(JSON.stringify({
      ok,
      staticScan,
      findingSummary: summarizeFindings(staticScan.findings),
      antivirus,
    }, null, 2));
    process.exit(ok ? 0 : 1);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(2);
  }
}
