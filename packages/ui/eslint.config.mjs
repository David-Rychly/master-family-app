import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import familyDesign from "@repo/config/eslint/no-raw-colors";

export default defineConfig([
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: { parser: tseslint.parser, parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { "family-design": familyDesign },
    rules: { "family-design/no-raw-colors": "error" },
  },
]);
