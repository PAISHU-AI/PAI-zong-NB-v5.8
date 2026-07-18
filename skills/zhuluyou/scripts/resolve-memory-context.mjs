#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { discoverProjectRoot, existingDir, homeDir, resolveCodexHome } from "./project-root.mjs";

const args = process.argv.slice(2);

function arg(name, fallback = "") {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] || fallback : fallback;
}

function existsRel(root, rel) {
  return root && fs.existsSync(path.join(root, rel));
}

function classifyReadLevel(task, projectless) {
  const text = task.toLowerCase();
  if (projectless && !text) return "L0";
  if (/(debug|bug|error|failure|regression|root cause|架构|architecture|migration|security|deploy|permission|impact|cross-layer|知识图谱|kg|审计|audit)/i.test(task)) {
    return "L3";
  }
  if (/(code|implement|修改|实现|docs|prompt|skill|ui|api|database|tauri|test|项目|project|memory|记忆)/i.test(task)) {
    return "L2";
  }
  return projectless ? "L0" : "L1";
}

function classifyWriteDestination(task, projectRoot, readLevel) {
  const text = task.toLowerCase();
  const globalTask =
    /(global|全局|user[- ]?skill|user preference|用户偏好|profile|yonghu|communication-style|persona-style|memory bootstrap|global memory|全局记忆)/i.test(task);
  const explicitGlobalPreference =
    /(remember|default|always|never|以后|默认|每次|不要再|我喜欢|我不喜欢|偏好|习惯|记住)/i.test(task);
  const explicitProjectMemory =
    /(project memory|项目记忆|当前项目|本项目|这个项目|\.ai_project|docs\/|AGENTS\.md)/i.test(task);
  const projectTask =
    /(project|项目|repo|repository|docs|prompt|skill pack|distribution|package|manifest|source|runtime|code|implement|修改|实现|ui|api|database|tauri|test)/i.test(task);

  if ((globalTask || explicitGlobalPreference) && !explicitProjectMemory) return "global";
  if (globalTask && (!projectRoot || !projectTask)) return "global";
  if (projectRoot && readLevel !== "L0") return "project";
  if (globalTask) return "global";
  return "none";
}

function classifyKgLevel(task, projectRoot, readLevel) {
  if (!projectRoot) return "KG0";
  const graphExists = existsRel(projectRoot, "docs/knowledge/project-graph.json");
  const text = task.toLowerCase();
  if (!/(kg|knowledge graph|知识图谱|impact|cross-layer|关系|依赖|架构|architecture|api|database|tauri|debug|migration|长期|long-term)/i.test(task)) {
    return "KG0";
  }
  if (graphExists && /(修改|implement|update|refactor|migration|rename|delete|fix|修复|变更)/i.test(task)) return "KG3";
  if (graphExists) return "KG1";
  return readLevel === "L2" || readLevel === "L3" ? "KG2" : "KG0";
}

const startDir = arg("cwd", process.cwd());
const codexHome = resolveCodexHome();
const home = homeDir();
const globalMemoryRoot =
  existingDir(codexHome, "skills", "zhuluyou") ||
  (home ? existingDir(home, ".codex", "skills", "zhuluyou") : null) ||
  path.join(codexHome, "skills", "zhuluyou");
const task = arg("task", args.filter((item) => !item.startsWith("--")).join(" "));
const discovered = discoverProjectRoot(startDir);
const projectless = !discovered.projectRoot;
const readLevel = classifyReadLevel(task, projectless);
const kgLevel = classifyKgLevel(task, discovered.projectRoot, readLevel);
const writeDestination = classifyWriteDestination(task, discovered.projectRoot, readLevel);

const userSkillsToRead = [
  "INDEX.md",
  "routing-core.md",
  "communication-style.md",
  "memory-reliability-style.md",
  "memory-stack-style.md"
];

if (readLevel !== "L0" && discovered.projectRoot) userSkillsToRead.push("project-memory-style.md");
if (/(project\s+AGENTS(?:\.md)?|项目\s*AGENTS(?:\.md)?|AGENTS\.md|local rules|本地规则|项目规则|协作规则|verification gates|验证门禁)/i.test(task)) {
  userSkillsToRead.push("project-agents-style.md");
}
if (readLevel === "L2" || readLevel === "L3") userSkillsToRead.push("memory-evidence-style.md");
if (kgLevel !== "KG0") userSkillsToRead.push("knowledge-graph-memory-style.md");
if (writeDestination === "global") userSkillsToRead.push("global-memory-capture-style.md");
if (/(skill|route|routing|install|delete|archive|restore|audit|审计|安装|删除|归档|恢复|路由)/i.test(task)) {
  userSkillsToRead.push("skill-lifecycle-governance-style.md");
}

const projectFilesToRead = [];
if (discovered.projectRoot) {
  for (const rel of [".ai_project.md", "AGENTS.md", "docs/INDEX.md", "docs/project-structure.md"]) {
    if (existsRel(discovered.projectRoot, rel)) projectFilesToRead.push(rel);
  }
  if (readLevel === "L2" || readLevel === "L3") {
    for (const rel of ["docs/roadmap.md", "docs/memory/retrieval-index.json", "docs/knowledge/graph-index.md"]) {
      if (existsRel(discovered.projectRoot, rel)) projectFilesToRead.push(rel);
    }
  }
}

const warnings = [];
if (!fs.existsSync(globalMemoryRoot)) warnings.push(`missing global memory root: ${globalMemoryRoot}`);
if (projectless) warnings.push("projectless: no project memory root detected");
if (discovered.projectRoot && !existsRel(discovered.projectRoot, ".ai_project.md")) warnings.push("project memory entry .ai_project.md missing");

process.stdout.write(
  `${JSON.stringify(
    {
      ok: fs.existsSync(globalMemoryRoot),
      platform: process.platform,
      codexHome,
      globalMemoryRoot,
      projectRoot: discovered.projectRoot,
      projectMarker: discovered.marker,
      projectless,
      readLevel,
      writeDestination,
      kgLevel,
      userSkillsToRead: [...new Set(userSkillsToRead)],
      projectFilesToRead: [...new Set(projectFilesToRead)],
      warnings
    },
    null,
    2
  )}\n`
);
