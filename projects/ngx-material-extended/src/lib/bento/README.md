# Bento

A flexbox-driven layout for arranging **panels** into resizable, collapsible
regions — a "bento box". A `mex-bento` lays its direct children out along one
axis (row or column); each child is either a `mex-panel` or a nested
`mex-bento`, so you can build arbitrary grids by nesting.

Sizing, collapsing, and the directional collapse icon are all derived
automatically from the layout — you only declare the structure and an optional
`size`.

```html
<mex-bento direction="row">
    <!-- 75% of the row -->
    <mex-panel size="75">
        <mex-panel-header>
            <mex-panel-header-title>A</mex-panel-header-title>
            <mex-panel-collapse-button />
        </mex-panel-header>
        <mex-panel-body>…full content…</mex-panel-body>
    </mex-panel>

    <!-- remaining 25%, split vertically -->
    <mex-bento direction="column" size="25">
        <mex-panel>
            <mex-panel-header>
                <mex-panel-header-title>B</mex-panel-header-title>
                <mex-panel-collapse-button />
            </mex-panel-header>
            <mex-panel-body>…</mex-panel-body>
        </mex-panel>

        <mex-panel>
            <mex-panel-header>
                <mex-panel-header-title>C</mex-panel-header-title>
                <mex-panel-collapse-button />
            </mex-panel-header>
            <mex-panel-body>…</mex-panel-body>
        </mex-panel>
    </mex-bento>
</mex-bento>
```

Import `MexBentoModule` for the layout and `MexPanelModule` for the panels:

```ts
import { MexBentoModule, MexPanelModule } from 'ngx-material-extended';

@Component({
    imports: [MexBentoModule, MexPanelModule],
    /* … */
})
export class MyView {}
```

---

## Components

| Selector | Symbol | Role |
|---|---|---|
| `mex-bento` | `MexBento` | Flex container; lays children along one axis |
| `mex-panel`, `mex-bento` | `MexBentoItem` | Directive (auto-applied) that sizes/collapses each direct child of a bento |
| `mex-panel` | `MexPanel` | A single panel (header + body + optional collapsed body) |
| `mex-panel-header` | `MexPanelHeader` | Sticky header strip |
| `mex-panel-header-title` | `MexPanelHeaderTitle` | Title slot inside the header |
| `[mex-panel-header-action-button]` | `MexPanelHeaderActionButton` | Button styling for header actions |
| `mex-panel-collapse-button` | `MexPanelCollapseButton` | Toggles the panel open/closed |
| `mex-panel-body` | `MexPanelBody` | Content shown while **open** |
| `mex-panel-collapsed-body` | `MexPanelCollapsedBody` | Condensed content shown while **collapsed** |

---

## `MexBento`

| Input | Type | Default | Description |
|---|---|---|---|
| `direction` | `'row' \| 'column'` | `'row'` | Axis the children are laid along. |

A bento is inert metadata for its children: it exposes its `direction` and its
ordered list of `items` (via the `MEX_BENTO` token) so each `MexBentoItem` can
work out its own size and collapse edge.

---

## `MexBentoItem`

Applied automatically to every `mex-panel` and nested `mex-bento` that is a
direct child of a bento. You never add it by hand — you only set `size` on the
element.

| Input | Type | Default | Description |
|---|---|---|---|
| `size` | `number` | — (auto) | Percentage of the parent bento's main axis this item should occupy. The bare attribute form (`size="75"`) is accepted. Omit it to take an equal share of whatever space is left. |

**How sizing works**

- With an explicit `size`, the item's `flex-basis` is `{size}%` and it grows in
  the same ratio, so declared sizes hold in the normal state and freed space
  (when a sibling collapses) is reclaimed proportionally.
- With no `size`, items share the leftover space equally.
- Outside a bento the directive is inert — it sets no flex styles, so the
  element renders exactly as it would on its own.

**Collapse edge (icon direction)** is derived automatically and handed to the
panel's collapse button:

| Parent direction | Item | Collapse edge |
|---|---|---|
| `column` | any | `top` |
| `row` | last item | `right` |
| `row` | any other | `left` |

---

## `MexPanel`

| Input | Type | Default | Description |
|---|---|---|---|
| `showContent` | `model<boolean>` | `true` | Two-way collapse state. `true` = open (body shown), `false` = collapsed. Bind it (`[(showContent)]="open"`) to drive collapse from your own UI. |
| `collapsedSize` | `number \| string \| null` | `null` | Main-axis extent of the collapsed strip. A bare number or numeric string is pixels (`collapsedSize="180"` → `180px`); any other string is used verbatim as a CSS length (`"12rem"`, `"30%"`). `null` collapses to the icon-only header. |

> Deprecated: `showTopCap` / `showEndCap` — no-ops; rounded caps are always
> shown. Remove these bindings.

A panel is a `flex-column`: a sticky header, then the body (or, while
collapsed, the collapsed body). The rounded corners and the 12px scrollbar
gutter form the "box-within-box" frame.

### Header

```html
<mex-panel-header>
    <mex-panel-header-title>Title</mex-panel-header-title>
    <button mex-panel-header-action-button (click)="…">…</button>
    <mex-panel-collapse-button />
</mex-panel-header>
```

| Selector | Input | Description |
|---|---|---|
| `mex-panel-header` | `loading: boolean` (default `false`) | Shows a spinner in the header when `true`. |
| `mex-panel-header-title` | — | Title slot; grows to fill the header. |
| `[mex-panel-header-action-button]` | — | Apply to a `<button>` for the standard 32×32 header-action styling. |

### Collapse button

`<mex-panel-collapse-button />` toggles the parent panel's `showContent`.

- Inside a bento it renders a **directional** Material Symbol matching the
  collapse edge (e.g. `left_panel_close` / `right_panel_open` / `top_panel_*`).
- Standalone (no bento) it falls back to a rotating `arrow_drop_up` and keeps
  its own internal open/closed state.

### Body and collapsed body

```html
<mex-panel size="75" collapsedSize="180">
    <mex-panel-header>…</mex-panel-header>

    <!-- shown while open -->
    <mex-panel-body>…full content…</mex-panel-body>

    <!-- optional: shown while collapsed -->
    <mex-panel-collapsed-body>…condensed content…</mex-panel-collapsed-body>
</mex-panel>
```

| Selector | Shown when | Notes |
|---|---|---|
| `mex-panel-body` | open (`showContent === true`) | Scrolls; the reserved scrollbar gutter is the frame. |
| `mex-panel-collapsed-body` | collapsed (`showContent === false`) | Optional. Pair it with `collapsedSize` so the strip is big enough to read. |

The two are mutually exclusive — only one occupies the panel at a time.

---

## Collapse behavior

When `showContent` becomes `false` the item animates its `flex-basis` down (500ms)
and `flex-grow` to `0`, so siblings reclaim the freed space in proportion to
their `size`. What the collapsed panel shows depends on whether you supplied a
`mex-panel-collapsed-body`:

| Setup | Collapsed appearance |
|---|---|
| No collapsed body | Shrinks to an **icon-only header strip** (in a `row` bento the title is hidden, leaving the centered collapse button). |
| Has a collapsed body | Shrinks to `collapsedSize`, **keeps the full header** (title + button), and shows the collapsed body in place of the body. |

In a `row` bento the panel collapses along its **width** (a side rail); in a
`column` bento it collapses along its **height**. `collapsedSize` governs
whichever axis that is.

---

## CSS custom properties

| Property | Defined on | Default | Description |
|---|---|---|---|
| `--mex-bento-collapsed-size` | `mex-bento` | `calc(var(--mex-sys-panel-header-height) + 12px)` (≈54px) | Icon-only collapsed extent and the cross-axis minimum, so the rounded corners always have room. |
| `--mex-sys-panel-header-height` | `html` | `42px` | Header strip height. |
| `--mex-sys-panel-corner` | `html` | `var(--mat-sys-corner-large, 16px)` | Panel corner radius. |
| `--mex-sys-panel-surface` | `html` | `var(--mat-sys-surface)` | Panel body background. |
| `--mex-sys-panel-thumb` | `html` | `var(--mat-sys-outline)` | Scrollbar thumb color. |
| `--mex-sys-clip` | `html` | `var(--mat-sys-surface-variant)` | Frame / corner-clip color. |

---

## Notes

- All components use `ViewEncapsulation.None` and namespace their styles under a
  host class — override styles by targeting those classes.
- Nest `mex-bento`s freely to build grids; a nested bento is itself a
  `MexBentoItem`, so it takes a `size` like a panel (but has no collapse
  button).
- Outside a bento, `mex-panel` still works as a standalone framed panel; the
  sizing/collapse-edge logic simply stays dormant.
