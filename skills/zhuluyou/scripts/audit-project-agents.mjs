#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { discoverProjectRoot } from "./project-root.mjs";

const args = process.argv.slice(2);

function arg(name, fallback = "") {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] || fallback : fallback;
}

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function lineCount(text) {
  return text.trimEnd().split(/\r?\n/).filter((line) => line.trim()).length;
}

function hasRel(root, rel) {
  return fs.existsSync(path.join(root, rel));
}

function hasRuntimePromptArtifact(projectRoot) {
  if (fs.readdirSync(projectRoot).some((name) => /^AGENTS5\.\d+\.md$/i.test(name))) return true;
  const promptsDir = path.join(projectRoot, "prompts");
  if (!fs.existsSync(promptsDir) || !fs.statSync(promptsDir).isDirectory()) return false;
  return fs.readdirSync(promptsDir).some((name) => /^runtime-v\d+(?:\.\d+)?\.md$/i.test(name));
}

function isRuntimePromptArtifact(projectRoot, text) {
  const looksLikeSkillsWorkspace =
    hasRel(projectRoot, "skills/zhuluyou") &&
    hasRel(projectRoot, "prompts") &&
    hasRuntimePromptArtifact(projectRoot);
  const looksLikeRuntimePrompt = /核心定位|每轮启动|Skills 调用|女助理|主持人/.test(text);
  return looksLikeSkillsWorkspace && looksLikeRuntimePrompt;
}

function allowsGlobalSkillsPath(text) {
  return (
    text.includes("<!-- ALLOW GLOBAL SKILLS PATH -->") ||
    text.includes("## Global Skills Path Exception")
  );
}

function hasProjectLocalYonghuPreferences(text) {
  return text.split(/\r?\n/).some((line) => {
    if (/user-skills[\\/]|routing-core\.md|memory-reliability-style\.md/i.test(line)) return true;
    if (!/(^|[\s`"'(])\.?[\\/]*skills[\\/]+zhuluyou/i.test(line)) return false;
    return !/(\$CODEX_HOME|%USERPROFILE%|\.codex[\\/]+skills|C:[\\/]+Users[\\/]+[^\\/]+[\\/]+\.codex)/i.test(line);
  });
}

const requiredSections = [
  "## Rule Scope",
  "## Context Entry Points",
  "## User Requirements",
  "## Working Rules",
  "## Safety And Confirmation Gates",
  "## Verification Gates",
  "## Project Memory Sync",
  "## Do Not Include / Do Not Do"
];

const forbiddenPatterns = [
  { name: "global-runtime-role-definitions", pattern: /女助理|主持人|主执行角色|专业 skill|professional skills|skill-router-style/i },
  { name: "global-skills-path", pattern: /\$CODEX_HOME|%USERPROFILE%|\.codex[\\/]+skills|C:[\\/]+Users[\\/]+[^\\/]+[\\/]+\.codex/i },
  { name: "project-local-zhuluyou", pattern: /(skills[\\/]+zhuluyou|user-skills[\\/]|routing-core\.md|memory-reliability-style\.md)/i },
  { name: "runtime-prompt-sections", pattern: /##\s*0\.\s*核心定位|##\s*每轮启动|##\s*Skills 调用/i },
  { name: "secret-like-content", pattern: /(api[_-]?key|secret|token|password|credential)\s*[:=]\s*['"]?[A-Za-z0-9_\-]{12,}/i },
  { name: "raw-log-dump", pattern: /(stdout|stderr|stack trace|traceback|exception log).{0,40}(begin|dump|full)/i }
];

const discovered = discoverProjectRoot(arg("cwd", process.cwd()));
const projectless = !discovered.projectRoot;

if (projectless) {
  process.stdout.write(
    `${JSON.stringify(
      {
        ok: false,
        projectless: true,
        message: "No project root marker found.",
        startDir: path.resolve(arg("cwd", process.cwd()))
      },
      null,
      2
    )}\n`
  );
  process.exit(1);
}

const projectRoot = discovered.projectRoot;
const agentsPath = path.join(projectRoot, "AGENTS.md");
const text = readText(agentsPath);
const missing = [];
const warnings = [];
const forbidden = [];

if (!text) {
  process.stdout.write(
    `${JSON.stringify(
      {
        ok: false,
        projectless: false,
        projectRoot,
        projectMarker: discovered.marker,
        target: agentsPath,
        missing: ["AGENTS.md"],
        warnings,
        forbidden
      },
      null,
      2
    )}\n`
  );
  process.exit(1);
}

const runtimeArtifact = isRuntimePromptArtifact(projectRoot, text);

if (runtimeArtifact) {
  process.stdout.write(
    `${JSON.stringify(
      {
        ok: true,
        skipped: true,
        runtimeArtifact: true,
        projectRoot,
        projectMarker: discovered.marker,
        target: agentsPath,
        lineCount: lineCount(text),
        warnings: [
          "AGENTS.md appears to be a runtime prompt artifact in a skills staging workspace, not a generated project rules file."
        ],
        forbidden: []
      },
      null,
      2
    )}\n`
  );
  process.exit(0);
}

for (const section of requiredSections) {
  if (!text.includes(section)) missing.push(section);
}

for (const item of forbiddenPatterns) {
  if (item.name === "global-skills-path" && allowsGlobalSkillsPath(text)) {
    if (item.pattern.test(text)) {
      warnings.push("Global skills path exception found; verify it is a short command pointer with project-local justification.");
    }
    continue;
  }
  if (item.name === "project-local-zhuluyou") {
    if (hasProjectLocalYonghuPreferences(text)) forbidden.push(item.name);
    continue;
  }
  if (item.pattern.test(text)) forbidden.push(item.name);
}

const lines = lineCount(text);
if (lines < 20) warnings.push("AGENTS.md is very short; verify required project-local rules are present.");
if (lines > 100) warnings.push("AGENTS.md exceeds the 100-line target; move structure, plans, and long docs into project memory.");
if (!text.includes("<!-- BEGIN MANAGED PROJECT AGENTS RULES -->")) {
  warnings.push("No managed project agents block found; refreshes may need diff review.");
}

const ok = missing.length === 0 && forbidden.length === 0 && lines <= 120;

process.stdout.write(
  `${JSON.stringify(
    {
      ok,
      skipped: false,
      runtimeArtifact: false,
      projectRoot,
      projectMarker: discovered.marker,
      target: agentsPath,
      lineCount: lines,
      missingRequiredSections: missing,
      forbidden,
      warnings
    },
    null,
    2
  )}\n`
);

process.exit(ok ? 0 : 1);
