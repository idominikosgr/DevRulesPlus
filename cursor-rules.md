# Cursor Rules Documentation Overview

This project utilizes Cursor's **Project Rules** system, storing a structured set of AI prompting rules in the `.cursor/rules/` directory. These rules enhance the capabilities and consistency of AI assistants (like Cursor) working within this codebase.

Reference: <https://docs.cursor.com/context/rules-for-ai>

## Purpose

These Project Rules provide context, guidelines, and specific instructions to the AI, helping it understand:

- Project-specific configurations (tech stack, file structure, conventions) via `01-project-context.mdc`.
- Common errors or anti-patterns to avoid via `02-common-errors.mdc`.
- How to perform specialized tasks (debugging, refactoring, etc.) using defined rules in the **Tasks** directory.
- Best practices for specific **Languages** or **Technologies** used in the project.
- Available **MCP** (Model Context Protocol) servers and their usage via `03-mcp-configuration.mdc`.

By using these rules, we aim for more accurate, relevant, and efficient AI assistance tailored to this project's needs.

## Project Rules Structure (`.cursor/rules/`)

The `.cursor/rules/` directory contains:

- **Core Rules (`00-*`, `01-*`, `02-*`, `03-*`):** Foundational rules defining the AI's core behavior, project context, common errors, and MCP configuration.
- **Tasks (`tasks/`)**: Rules defining specific behaviors or workflows for particular development activities (e.g., `Refactor-Code.mdc`).
- **Languages (`languages/`):** Rules defining best practices for specific programming languages (e.g., `Python3.mdc`).
- **Technologies (`technologies/`):** Rules defining best practices for specific frameworks, libraries, or platforms (e.g., `React19.mdc`).

## Rule File Format (`.mdc` Files)

Each rule file uses Markdown (`.mdc` extension) with a required YAML frontmatter header block.

### Header (YAML Frontmatter)

The header block must start and end with `---` and define the following keys:

- `description`: (String, Quoted) A brief, clear description of the rule's purpose and when it should be applied. This helps the AI determine semantic relevance.
- `globs`: (String, Quoted) A comma-separated list of file glob patterns. If the user's active file context matches any of these patterns, the rule is more likely to be automatically applied. Use standard glob syntax (e.g., `"**/*.py,*.js,*config*"`). Do not use brace expansion (`{}`). Leave empty (`""`) or omit if the rule should only be activated semantically or explicitly.
- `alwaysApply`: (Boolean, `true` or `false`) If `true`, the rule will always be considered by the AI, regardless of context. This should be used sparingly, primarily for essential core rules like `00-core-agent.mdc`. Most rules should use `false`.

**Example Header:**
```yaml
---
description: "Python 3 best practices and common patterns."
globs: "**/*.py,**/pyproject.toml,**/requirements.txt"
alwaysApply: false
---
```

### Body (Markdown Content)

The body of the file uses standard Markdown to provide instructions to the AI.

- **Structure:** Use headings (`#`, `##`, `###`), lists (`-`, `*`, `1.`), code blocks (```), and other Markdown elements for clarity and organization.
- **Content:** Include clear instructions, guidelines, do's and don'ts, code examples, patterns to follow or avoid, and potentially references to other rules or external documentation.
- **Referencing Other Files:** You can include the content of other files (including other rules) as context within a rule by using the `@` symbol followed by the relative path (e.g., `@../01-project-context.mdc`, `@./PythonBaseClass.py`). The AI will have access to the content of the referenced file when the rule is active.

## Activation

Project Rules can be activated:

- **Automatically (Glob Match):** Based on the active file context matching patterns listed in a rule's `globs`.
- **Semantically (Description Match):** The AI may choose to apply a rule based on its `description` matching the user's request or the context.
- **Explicitly:** By user request (e.g., "Refactor this code") or by `@`-mentioning the rule file in the chat (e.g., `@tasks/Refactor-Code.mdc`).

## Creating New Rules

There are two primary ways to create new project rules:

1.  **Cursor Command Palette:** Use `Cmd + Shift + P` (or `Ctrl + Shift + P`) and search for `New Cursor Rule`.
2.  **AI Assistance (This Project):** Use the dedicated task rule by asking the AI: `@tasks/Create-Cursor-Rule.mdc`. This rule helps ensure the new rule follows the project's established format.

## Best Practices for Writing Rules

- **Be Specific:** Provide concrete examples and actionable instructions rather than general principles.
- **Keep Concise:** Focus rules on a specific topic or task. Avoid overly long or complex rules.
- **Use Clear Structure:** Employ Markdown headings and lists to organize information logically.
- **Consider Context:** Write rules with the assumption that the AI might have limited context. Provide necessary background or link to it using `@` references.
- **Leverage `globs`:** Use `globs` effectively to ensure rules are automatically considered when relevant files are open.
- **Refine `description`:** Write clear, concise descriptions to aid semantic activation.
- **Test and Iterate:** Review how the AI uses your rules and refine them based on its behavior.
- **Maintain Consistency:** Follow the established structure and formatting conventions.

## Global Rules vs. Project Rules

- **Project Rules** (used here in `.cursor/rules/`) are specific to this project, version-controlled, and offer fine-grained control via `globs` and semantic descriptions.
- **Global Rules** are configured in `Cursor Settings > General > Rules for AI` and apply to *all* projects. They are useful for universal preferences (e.g., desired output language, response length).

## Deprecated `.cursorrules`

Cursor previously used a single `.cursorrules` file in the project root. While potentially still supported for backward compatibility, this project uses the more flexible `.cursor/rules/` directory system. Migration is recommended.

---
*See `README.md` for installation and update instructions for the DevRules project.*
