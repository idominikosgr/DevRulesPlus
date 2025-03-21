# DevRules

A comprehensive collection of AI prompt engineering rules designed to enhance AI-assisted development workflows.

## Overview

DevRules is a structured set of rule files that help AI tools better understand your codebase, project structure, and development preferences. These rules guide AI in providing more contextually relevant, accurate, and helpful responses for various development tasks.

## Structure

The rules are organized in `.cursor/rules/` with a systematic naming convention:

- `1.x` files: Core instructions and project configuration
- `2.x` files: Specialized modes for specific tasks

## Rule Categories

### Core Instructions (1.x)
- **1.0-instructions.mdc**: Base instructions for AI interactions
- **1.1-project-configuration.mdc**: Project-specific details template
- **1.2-common-mistakes.mdc**: Common errors to avoid

### Specialized Modes (2.x)
- **Planning**: Rules for project planning and architectural design
- **Development**: Guidelines for code implementation and review
- **Maintenance**: Instructions for debugging, refactoring, and optimization
- **Operations**: Rules for DevOps, documentation, and deployment

## Usage

1. Clone this repository
2. Copy the `.cursor` directory to your project root
3. Customize the files to match your project needs, particularly `1.1-project-configuration.mdc`
4. Use with compatible AI development assistants

## Benefits

- Consistent AI assistance across your entire development workflow
- Reduced need to repeat instructions
- Better context awareness for AI-generated code and suggestions
- Specialized expertise for different development tasks
- Improved code quality and adherence to best practices

## Customization

For best results, customize the following files:
- `1.1-project-configuration.mdc`: Add your project details, team structure, tech stack
- `1.2-common-mistakes.mdc`: Document project-specific pitfalls to avoid

## License

MIT

---

© Seth Rose - [GitHub](https://github.com/TheSethRose)
