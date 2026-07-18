# Seedance 2.0 Prompt Writing Skill / 即梦 Seedance 2.0 提示词技能

A **bilingual** Agent Skill for writing prompts for Jimeng (即梦) Seedance 2.0, ByteDance's multimodal video model. A lean core (`SKILL.md`) loads every time; detailed material is split into on-demand modules by language and topic, so only what a task needs is ever read.

一个**双语** Agent Skill，为即梦 Seedance 2.0 多模态视频模型撰写提示词。精简核心（`SKILL.md`）常驻加载，详细内容按语言与主题拆成按需模块，用到才读。

## Layout / 结构

```
seedance-prompt/
├── SKILL.md                  # always-loaded core / 常驻核心
└── references/
    ├── en/  syntax · patterns · templates · craft   # English, by topic
    └── zh/  syntax · patterns · templates · craft   # 中文，按主题
```

## Install / 安装

Agent Skills are folder-based. Copy the whole `seedance-prompt` directory into your skills directory:

技能是目录式的。把整个 `seedance-prompt` 文件夹复制进技能目录：

```bash
mkdir -p ~/.claude/skills
cp -r seedance-prompt ~/.claude/skills/
```

Then ask your agent to write a Seedance 2.0 prompt — it activates from the frontmatter description.

之后让代理写 Seedance 2.0 提示词即可——按 frontmatter 的 description 自动激活。

## Sources / 资料来源

Specifications reflect publicly documented Seedance 2.0 behavior (input caps, the `@` mechanic, runtime, resolution, the face restriction). These are facts about the product; verify against the current official manual at jimeng.jianying.com, as the platform changes over time.

本技能中的参数为公开记录的 Seedance 2.0 产品事实（输入上限、@ 机制、时长、分辨率、人脸限制）。请以官方最新手册为准，平台会随时间变动。

## License / 许可证

[MIT](LICENSE). © 2026 **PAISHU**. Independent original work.
