import fs from "node:fs";
import path from "node:path";

export const projectMarkers = [
  ".ai_project.md",
  "AGENTS.md",
  "docs",
  ".git",
  "package.json",
  "pnpm-workspace.yaml",
  "Cargo.toml",
  "pyproject.toml",
  "go.mod",
  "tauri.conf.json",
  "src-tauri"
];

export function existingDir(...parts) {
  const candidate = path.join(...parts);
  return fs.existsSync(candidate) && fs.statSync(candidate).isDirectory() ? candidate : null;
}

export function homeDir() {
  return process.env.HOME || process.env.USERPROFILE || "";
}

export function resolveCodexHome() {
  const configured = typeof process.env.CODEX_HOME === "string" ? process.env.CODEX_HOME.trim() : "";
  if (configured && existingDir(configured)) return path.resolve(configured);
  const home = homeDir();
  const defaultHome = home ? existingDir(home, ".codex") : null;
  return defaultHome || path.join(home || process.cwd(), ".codex");
}

function isDocumentsCodexAggregate(dir) {
  const resolved = path.resolve(dir);
  return (
    path.basename(resolved).toLowerCase() === "codex" &&
    path.basename(path.dirname(resolved)).toLowerCase() === "documents"
  );
}

function hasStrongProjectMarker(dir) {
  return [".ai_project.md", "package.json", "pnpm-workspace.yaml", "Cargo.toml", "pyproject.toml", "go.mod"].some(
    (marker) => fs.existsSync(path.join(dir, marker))
  );
}

export function discoverProjectRoot(start) {
  let current = path.resolve(start);
  while (true) {
    if (isDocumentsCodexAggregate(current) && !hasStrongProjectMarker(current)) {
      return { projectRoot: null, marker: null };
    }
    for (const marker of projectMarkers) {
      if (fs.existsSync(path.join(current, marker))) return { projectRoot: current, marker };
    }
    const parent = path.dirname(current);
    if (parent === current) return { projectRoot: null, marker: null };
    current = parent;
  }
}
