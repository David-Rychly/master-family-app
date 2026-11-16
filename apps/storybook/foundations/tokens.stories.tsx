import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import tokens from "@repo/ui/tokens.json";

// Generated from packages/ui/tokens.json, so these pages always match the code.

const meta = {
  title: "Foundations/Tokens",
  parameters: { layout: "padded", a11y: { test: "off" } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <p className="type-small max-w-[60ch] text-muted-foreground">
        Values for the scheme picked in the toolbar. Use these through token classes, never as raw values.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.color.tokens.map((token) => (
          <div key={token.name} className="flex items-start gap-3 rounded-md border bg-card p-3">
            <span
              className="size-12 shrink-0 rounded-sm border border-input"
              style={{ background: `var(--fa-${token.name})` }}
            />
            <div className="min-w-0">
              <div className="type-num text-foreground">{token.name}</div>
              <div className="type-small text-muted-foreground">{token.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {tokens.type.groups.flatMap((group) =>
        group.styles.map((style) => (
          <div key={style.name} className="flex flex-col gap-1 border-b pb-4">
            <span className="type-label text-subtle">
              type-{style.name} · {style.fontSize}/{style.lineHeight}
            </span>
            <span className={`type-${style.name}`}>{style.sample}</span>
            <span className="type-small text-muted-foreground">{style.usage}</span>
          </div>
        )),
      )}
    </div>
  ),
};

export const SpacingAndRadius: Story = {
  name: "Spacing and radius",
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        {tokens.spacing.tokens.map((t) => (
          <div key={t.name} className="flex items-center gap-4">
            <span className="type-num w-20 text-muted-foreground">{t.name}</span>
            <span className="h-3 rounded-sm bg-primary" style={{ width: t.value }} />
            <span className="type-small text-muted-foreground">
              {t.value} · {t.usage}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {tokens.radius.tokens.map((t) => (
          <div key={t.name} className="flex flex-col items-center gap-2">
            <span className="size-20 border border-input bg-card" style={{ borderRadius: t.value }} />
            <span className="type-num text-muted-foreground">{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
