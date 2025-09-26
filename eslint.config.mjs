import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.extends("next/core-web-vitals"),

  {
    rules: {
      // To completely disable a rule, set it to "off"
      // Example: Turn off the rule that flags `console.log()` statements
      "no-console": "off",

      // To change a rule from an error to a warning, set it to "warn"
      // Example: Warn about using <img> tags instead of <Image>, but don't fail the build
      "@next/next/no-img-element": "warn",

      // You can add any other rules you want to customize here
      // "some-other-rule": "off",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
