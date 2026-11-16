import type { Preview } from "@storybook/nextjs-vite";
import { DEFAULT_SCHEME, SCHEMES } from "@repo/ui/schemes";
import "./preview.css";

const preview: Preview = {
  globalTypes: {
    scheme: {
      description: "Color scheme",
      toolbar: {
        title: "Scheme",
        icon: "paintbrush",
        items: SCHEMES.map((s) => ({ value: s.id, title: s.name })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { scheme: DEFAULT_SCHEME },
  decorators: [
    (Story, context) => {
      // The app is dark only; the scheme is data-theme on <html>, exactly as in the app.
      document.documentElement.classList.add("dark");
      document.documentElement.dataset.theme = context.globals.scheme ?? DEFAULT_SCHEME;
      return <Story />;
    },
  ],
  parameters: {
    layout: "padded",
    nextjs: { appDirectory: true },
    backgrounds: { disabled: true },
    controls: { expanded: true },
    a11y: { test: "error" },
    options: {
      storySort: { order: ["Foundations", "Base", "States", "App"] },
    },
  },
};

export default preview;
