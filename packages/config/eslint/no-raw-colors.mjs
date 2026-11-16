// ESLint plugin: colors must come from design tokens, so they follow the user's color scheme.
// Flags arbitrary color values (`bg-[#123456]`), Tailwind palette colors (`text-zinc-400`,
// `bg-white`) and literal colors in inline `style` props.

const UTILITY = "(?:bg|text|border(?:-[trblxyse])?|outline|ring|ring-offset|fill|stroke|from|via|to|divide|decoration|placeholder|caret|accent|shadow)";
const PALETTE =
  "(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)";

const ARBITRARY_COLOR = new RegExp(`(?:^|[\\s:"'\`])${UTILITY}-\\[(?:#|rgba?\\(|hsla?\\(|oklch\\(|oklab\\(|lab\\(|lch\\(|color\\()[^\\]\\s]*\\]`);
const PALETTE_COLOR = new RegExp(`(?:^|[\\s:"'\`])${UTILITY}-(?:${PALETTE}-\\d{2,3}|white|black)(?:\\/\\d+)?(?=$|[\\s"'\`])`);
const LITERAL_COLOR = /^\s*(?:#[0-9a-f]{3,8}|rgba?\(|hsla?\(|oklch\(|oklab\(|lab\(|lch\(|color\(|white$|black$)/i;
const STYLE_COLOR_KEYS = new Set([
  "color",
  "background",
  "backgroundColor",
  "borderColor",
  "outlineColor",
  "fill",
  "stroke",
  "boxShadow",
]);

const HINT = "Use a token class (bg-card, text-muted-foreground, bg-primary, …) so the color follows the user's scheme.";

const noRawColors = {
  meta: {
    type: "problem",
    docs: { description: "Disallow colors that bypass the design tokens" },
    messages: {
      arbitrary: `Arbitrary color "{{match}}". ${HINT}`,
      palette: `Tailwind palette color "{{match}}". ${HINT}`,
      style: `Literal color in style.{{key}}. ${HINT}`,
    },
    schema: [],
  },
  create(context) {
    function checkClassText(node, text) {
      const arbitrary = text.match(ARBITRARY_COLOR);
      if (arbitrary) {
        context.report({ node, messageId: "arbitrary", data: { match: arbitrary[0].trim() } });
        return;
      }
      const palette = text.match(PALETTE_COLOR);
      if (palette) context.report({ node, messageId: "palette", data: { match: palette[0].trim() } });
    }

    return {
      Literal(node) {
        if (typeof node.value === "string") checkClassText(node, node.value);
      },
      TemplateElement(node) {
        checkClassText(node, node.value.raw);
      },
      JSXAttribute(node) {
        if (node.name.name !== "style" || node.value?.type !== "JSXExpressionContainer") return;
        const expr = node.value.expression;
        if (expr.type !== "ObjectExpression") return;
        for (const prop of expr.properties) {
          if (prop.type !== "Property" || prop.key.type !== "Identifier") continue;
          if (!STYLE_COLOR_KEYS.has(prop.key.name)) continue;
          if (prop.value.type === "Literal" && typeof prop.value.value === "string" && LITERAL_COLOR.test(prop.value.value)) {
            context.report({ node: prop, messageId: "style", data: { key: prop.key.name } });
          }
        }
      },
    };
  },
};

export default {
  meta: { name: "family-design" },
  rules: { "no-raw-colors": noRawColors },
};
