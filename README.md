# ngx-table

Lightweight Angular CSS Grid table components with semantic markup, automatic column layout, colspan/rowspan support, and smooth animated row/column collapse — no &lt;table> element required.

## Demo

A complete working example, including collapsible bodies, colspan/rowspan, and animations, is available in the `src/app` directory of this repository.

## Customization

The library exposes CSS custom properties for theming. Override any of them on `html` (or a more specific selector) in your own stylesheet:

| Variable                     | Default                            | Description                    |
| ---------------------------- | ---------------------------------- | ------------------------------ |
| `--ngx-sys-table-background` | `var(--mat-sys-surface)`           | Table background color         |
| `--ngx-sys-table-outline`    | `var(--mat-sys-outline)`           | Cell border color              |
| `--ngx-sys-th`               | `var(--mat-sys-surface-container)` | Header cell background         |
| `--ngx-sys-on-th`            | 80% on-surface                     | Header cell text color         |
| `--ngx-sys-th-font`          | `var(--mat-sys-label-large)`       | Header cell font               |
| `--ngx-sys-td`               | `var(--mat-sys-surface)`           | Body cell background           |
| `--ngx-sys-on-td`            | `var(--mat-sys-on-surface)`        | Body cell text color           |
| `--ngx-sys-td-font`          | `var(--mat-sys-body-large)`        | Body cell font                 |
| `--ngx-sys-corner`           | `var(--mat-sys-corner-medium)`     | Corner border radius           |
| `--ngx-animation-duration`   | `350ms`                            | Enter/leave animation duration |

**Example**

```css
html {
    --ngx-sys-table-background: #1e1e2e;
    --ngx-sys-table-outline: #44475a;
    --ngx-sys-th: #282a36;
    --ngx-sys-on-th: #f8f8f2;
    --ngx-sys-td: #1e1e2e;
    --ngx-sys-on-td: #cdd6f4;
    --ngx-animation-duration: 200ms;
}
```

## Animating body collapse

To animate `ngx-tbody` in and out, combine Angular's `@if` control flow with the `animate.enter` and `animate.leave` attributes. These attributes accept CSS class names that are applied to the element as it enters or leaves the DOM.

**Template**

```html
<ngx-table>
    <ngx-thead (click)="toggleBody()">
        <ngx-tr>
            <ngx-th>Name</ngx-th>
            <ngx-th>Role</ngx-th>
        </ngx-tr>
    </ngx-thead>

    @if (showBody()) {
    <ngx-tbody
        animate.enter="enter-animation"
        animate.leave="leave-animation">
        <ngx-tr>
            <ngx-td>Ada Lovelace</ngx-td>
            <ngx-td>Staff Engineer</ngx-td>
        </ngx-tr>
    </ngx-tbody>
    }
</ngx-table>
```

**Component**

```ts
showBody = signal(true);

toggleBody() {
    this.showBody.update(v => !v);
}
```

The `enter-animation` and `leave-animation` classes, along with `interpolate-size: allow-keywords` on `ngx-table`, are included in the library's exported CSS — no additional styles are needed.
