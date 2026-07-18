# Visual System Reference

Use before UI beautification. Do not start with colors; start with hierarchy.

## UI Polish Order

1. Information priority: primary action, secondary action, supporting data.
2. Layout rhythm: grid, spacing scale, alignment, container width.
3. Typography: type scale, weight contrast, line-height, number/table readability.
4. Components: cards, tables, forms, dialogs, nav, command bars.
5. States: loading, empty, error, disabled, success, permission denied.
6. Color: semantic tokens first, brand mood second.
7. Depth/motion: only where it improves comprehension.

## Design Tokens

```css
:root {
  --bg: #f6f2ea;
  --surface: #fffaf1;
  --surface-raised: #ffffff;
  --text: #201a14;
  --muted: #756a5d;
  --line: #e2d7c8;
  --brand: #0f766e;
  --brand-strong: #115e59;
  --danger: #b42318;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 24px;
  --shadow-soft: 0 18px 50px rgb(58 45 31 / 12%);
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
}
```

## Anti-AI-Slop Checks

- No generic purple gradient unless brand requires it.
- No random glassmorphism on data-heavy apps.
- No icon-only controls without labels/tooltips.
- No cards when tables/lists are more scannable.
- No hidden error states.
- No decoration that competes with primary workflow.
