import { readdirSync } from "node:fs";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import familyDesign from "@repo/config/eslint/no-raw-colors";

// Every folder in src/modules is one module.
const modules = readdirSync(new URL("./src/modules", import.meta.url), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

// A module may import its own files, src/modules/types, and anything outside src/modules, never another module.
// Relative paths are checked up to three folders deep, which covers modules/<id>/components/<x>/file.tsx.
const moduleBoundaries = modules.map((id) => ({
  files: [`src/modules/${id}/**/*.{ts,tsx}`],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: [
              "@/modules/*",
              "@/modules/*/**",
              `!@/modules/${id}`,
              `!@/modules/${id}/**`,
              "!@/modules/types",
              "../*/**",
              "../../*/**",
              "../../../*/**",
              `!../${id}/**`,
              `!../../${id}/**`,
              `!../../../${id}/**`,
            ],
            message:
              "Modules never import from each other. Move shared code to src/components or src/lib, or go through the API.",
          },
        ],
      },
    ],
  },
}));

const sharedCodeBoundary = {
  // Shared code may read the registry (src/modules/registry.ts) but not reach into a module.
  files: ["src/components/**/*.{ts,tsx}", "src/lib/**/*.{ts,tsx}", "src/core/**/*.{ts,tsx}"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["@/modules/*/**"],
            message:
              "Shared code doesn't import from a module. Use src/modules/registry.ts, or move the code into the module.",
          },
        ],
      },
    ],
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: { "family-design": familyDesign },
    rules: { "family-design/no-raw-colors": "error" },
  },
  ...moduleBoundaries,
  sharedCodeBoundary,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
