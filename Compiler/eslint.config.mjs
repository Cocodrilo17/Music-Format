import { defineConfig } from "eslint/config";
import globals from "globals";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("eslint:recommended"),

    languageOptions: {
        globals: {
            ...globals.node,
        },

        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        "no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
        }],

        "no-console": ["warn", {
            allow: ["warn", "error", "log"],
        }],

        semi: ["error", "always"],

        quotes: ["error", "single", {
            avoidEscape: true,
        }],

        indent: ["error", 2],
        "no-trailing-spaces": "error",
        "eol-last": ["error", "always"],
        "object-curly-spacing": ["error", "always"],
    },
}, {
    files: ["**/*.ts", "**/*.tsx"],
    extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        parser: tsParser,
    },

    rules: {
        "@typescript-eslint/no-explicit-any": "warn",

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
        }],
    },
}]);