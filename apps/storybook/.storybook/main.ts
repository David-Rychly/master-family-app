import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";
import tailwindcss from "@tailwindcss/vite";

const webSrc = fileURLToPath(new URL("../../web/src", import.meta.url));

// Stories live next to their components, in the ui package and in the web app.
const config: StorybookConfig = {
  stories: [
    "../foundations/*.stories.@(ts|tsx)",
    "../../../packages/ui/src/**/*.stories.@(ts|tsx)",
    "../../web/src/**/*.stories.@(ts|tsx)",
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: { nextConfigPath: fileURLToPath(new URL("../../web/next.config.ts", import.meta.url)) },
  },
  core: { disableTelemetry: true },
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    config.resolve = config.resolve ?? {};
    config.resolve.alias = { ...(config.resolve.alias as Record<string, string>), "@": webSrc };
    return config;
  },
};

export default config;
