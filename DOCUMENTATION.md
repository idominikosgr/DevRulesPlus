# DevRules Documentation

This document explains the file format and usage patterns for DevRules.

## File Format

All rule files use the `.mdc` extension (Markdown with Context) and follow a consistent structure:

```markdown
# Rule Title

## Purpose
Brief explanation of what this rule does and when it should be used.

## Format Guidelines
Any specific formatting requirements for this rule type.

## Rule Content
The main content of the rule, typically including:
- Instructions for the AI
- Code examples or patterns
- Do's and don'ts
- References to other rules
```

## Core Rules

These are the foundational rules located at the root of the `.cursor/rules/` directory.

### 00-core-agent.mdc

This is the primary instruction file that defines:
- The AI's persona and expertise
- Response formatting requirements
- Communication style guidelines
- Tool usage patterns
- Code standards and best practices

This file is loaded on every interaction and serves as the foundation for all AI behavior.

### 01-project-context.mdc

A template for project-specific information:
- Project name, description, and repository
- Technical stack details
- Project structure
- Coding conventions and standards
- Key abstractions and patterns
- Important constraints or notes

This file should be customized for each project.

### 02-common-errors.mdc

Documents frequent errors to avoid:
- Format: `[PATTERN]`, `[BAD_EXAMPLE]`, `[GOOD_EXAMPLE]`, `[SOLUTION/RULE]`
- Common syntactic or semantic errors
- Outdated patterns or practices
- Project-specific pitfalls

## Specialized Mode Rules (`modes/`)

These rules define specific "modes" that the AI can enter for specialized tasks. They are located directly within the `modes/` directory (e.g., `modes/Refactor-Code.mdc`, `modes/Write-Tests.mdc`).

- Each file corresponds to a specific development activity (designing APIs, debugging code, writing tests, etc.).
- Refer to the list in `00-core-agent.mdc` for available modes and their use cases.

## Language Rules (`languages/`)

These rules provide best practices, common patterns, and style guides for specific programming languages. They are located in the `languages/` directory (e.g., `languages/Python3.mdc`, `languages/TypeScript5.mdc`).

- They help the AI generate code that adheres to established conventions for the language being used.
- These are typically referenced internally by the AI or within other rules, but can also be consulted directly.

## Using Mode Transitions

Mode transitions are marked in the AI's response with:

```
### [Current Mode Name]
---
```

This signals a shift in approach and expertise. Modes can be requested directly:

```
Please help me design the database schema for this project.
```

Or they may be activated automatically when the AI detects a need for specialized expertise.

## Customizing Rules

To customize these rules for your project:

1.  Update `01-project-context.mdc` with your project details.
2.  Add project-specific patterns to `02-common-errors.mdc`.
3.  (Optional) Review and adjust rules in `modes/` or `languages/` if the standard guidance doesn't fit your specific workflow or conventions, though updating via the install script (`--upgrade`) is generally preferred for these.
4.  (Optional) Add new rules as needed for your specific use cases, potentially in custom directories.

## Best Practices

- Keep rules concise and focused on specific guidance
- Use specific examples rather than general principles
- Update rules as your project evolves
- Use progressive disclosure in rules (start with the most important information)
- Structure information with clear headings and lists
- Include context for why certain patterns are recommended
