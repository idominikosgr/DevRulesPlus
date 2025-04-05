# DevRules

A comprehensive collection of AI prompt engineering rules designed to enhance AI-assisted development workflows.

## Overview

DevRules is a structured set of rule files that help AI tools better understand your codebase, project structure, and development preferences. These rules guide AI in providing more contextually relevant, accurate, and helpful responses for various development tasks.

## Structure

The rules are organized in `.cursor/rules/` with a clear organizational structure:

- **Core rules**: Foundation files that define AI behavior and project context (`00-*`, `01-*`, `02-*`, `03-*`).
- **Specialized modes**: Task-specific rule files located directly within the `modes/` directory.
- **Language rules**: Best practices and patterns for specific programming languages in the `languages/` directory.

```
.cursor/rules/
├── 00-core-agent.mdc       # Core AI instructions
├── 01-project-context.mdc  # Project-specific details (customize!)
├── 02-common-errors.mdc    # Common mistakes to avoid (customize!)
├── 03-mcp-configuration.mdc# MCP server capabilities (populate!)
├── modes/                  # Task-specific mode rules (e.g., Refactor-Code.mdc)
│   └── ...
└── languages/              # Language-specific best practices (e.g., Python3.mdc)
    └── ...
```

## Key Features

- **Consistent AI assistance** across your entire development workflow
- **Mode-based expertise** for different development tasks
- **Language-specific guidance** for coding best practices
- **Project-specific context** for more relevant suggestions
- **Error prevention** through common mistake documentation
- **Reduced repetition** of instructions to AI tools

## Getting Started

1. Install DevRules with a single command:

```bash
curl -fsSL https://raw.githubusercontent.com/TheSethRose/DevRules/main/install.sh | sh
```

2. Customize the core configuration files to match your project needs:
   - `01-project-context.mdc`: Add your tech stack, project structure, and conventions.
   - `02-common-errors.mdc`: Document project-specific pitfalls to avoid.
3. **(Recommended)** Populate `03-mcp-configuration.mdc` to inform the AI about your available MCP tools:
    a. Open Cursor Settings (Cmd+, or Ctrl+,).
    b. Navigate to the 'MCP' section.
    c. Click the button/link to open your global `~/.cursor/mcp.json` file.
    d. Ensure `mcp.json` is the active/focused file in your editor.
    e. Return to the AI chat and ask it: "Please populate `.cursor/rules/03-mcp-configuration.mdc` based on the attached `mcp.json` context."
4. Use with compatible AI development assistants (e.g., Cursor).

### Updating

To update the standard `modes/` and `languages/` rules and the core `00-core-agent.mdc`, while preserving your customized `01-project-context.mdc` and `02-common-errors.mdc`:

```bash
curl -fsSL https://raw.githubusercontent.com/TheSethRose/DevRules/main/install.sh | sh -s -- --upgrade
```
*Note: The upgrade process preserves `03-mcp-configuration.mdc`. If new standard MCP servers are added to DevRules in the future, you may need to manually update your `03-mcp-configuration.mdc` or ask the AI to regenerate it.*

## Usage Examples

### Activating a Specialized Mode

You can explicitly request a specialized mode:

```
Please help me design a database schema for users and articles.
```

The AI will detect this is a database design task and enter the appropriate mode.

### Providing Project Context

For new projects, you should update the project context file:

```
Please update the project context with our React/Node.js stack and component structure.
```

### Documenting Common Errors

Add project-specific patterns to avoid:

```
Please add a common error pattern about our naming convention for API routes.
```

### Configuring MCP Awareness

To ensure the AI knows which MCP servers are available and how they are configured:

1. Open Cursor Settings (Cmd+, or Ctrl+,).
2. Go to the 'MCP' section.
3. Open your global `~/.cursor/mcp.json` file via the provided button/link.
4. Make sure `mcp.json` is the active file in your editor.
5. In the AI chat, ask: "Please populate `.cursor/rules/03-mcp-configuration.mdc` based on the attached `mcp.json` context."
6. The AI should read the attached `mcp.json` context and fill in the details about each server in `03-mcp-configuration.mdc`.

## Benefits

- More accurate code assistance based on your project context
- Specialized expertise for specific development tasks
- Consistent response format and quality
- Reduced need to repeat instructions
- Improved code quality and adherence to best practices

## Customization

The rule files use a consistent Markdown format that's easy to customize for your specific needs. See the `DOCUMENTATION.md` file for detailed formatting guidelines.

## Contributing

Contributions to DevRules are welcome and appreciated! You can help improve this project in various ways:

- Adjustments to existing rule files
- Grammar and documentation fixes
- Best practice adjustments or enhancements
- New specialized modes
- Structural reorganization
- Bug fixes

### Contribution Guidelines

1. **Fork and clone** the repository
2. **Create a feature branch** for your changes
3. **Make your changes** following the existing style and format
4. **Test extensively** before submitting:
   - Verify the rules work with compatible AI tools (e.g., Cursor)
   - Test different scenarios and edge cases
   - Document your testing process
5. **Submit a pull request** with:
   - Clear description of changes
   - Evidence of testing (screenshots, examples, etc.)
   - Any relevant documentation updates

Please ensure any new modes or significant changes have been thoroughly tested in real-world development scenarios. Include examples of AI responses that demonstrate your changes are working as expected.

## License

[MIT](LICENSE)

---

© Seth Rose - [GitHub](https://github.com/TheSethRose)
