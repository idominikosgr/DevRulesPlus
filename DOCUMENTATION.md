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

## Core Rules (1.x)

### 1.0-instructions.mdc

This is the primary instruction file that defines:
- The AI's persona and expertise
- Response formatting requirements
- Communication style guidelines
- Tool usage patterns
- Code standards and best practices

This file is loaded on every interaction and serves as the foundation for all AI behavior.

### 1.1-project-configuration.mdc

A template for project-specific information:
- Project name, description, and repository
- Team structure and roles
- Technical stack details
- Project structure
- Data models
- Project-specific guidelines and goals

This file should be customized for each project.

### 1.2-common-mistakes.mdc

Documents frequent errors to avoid:
- Format: `[PATTERN]`, `[SOLUTION]`, optional tags
- Common syntactic or semantic errors
- Outdated patterns or practices
- Project-specific pitfalls

## Specialized Mode Rules (2.x)

These rules define specific "modes" that the AI can enter for specialized tasks:

### Planning (2.1, 2.2, 2.3, 2.4)
- **2.1-planner.mdc**: General project planning
- **2.2-prd-analyst.mdc**: Product requirements analysis
- **2.3-architect.mdc**: System architecture design
- **2.4-database-design.mdc**: Database schema planning

### Development (2.5, 2.6, 2.14)
- **2.5-ui-frontend.mdc**: Frontend and UI development
- **2.6-code-review.mdc**: Code review standards
- **2.14-api-design.mdc**: API design and implementation

### Maintenance (2.7, 2.8, 2.9, 2.10)
- **2.7-refactoring.mdc**: Code refactoring guidelines
- **2.8-security-auditor.mdc**: Security auditing procedures
- **2.9-performance-optimization.mdc**: Performance improvement strategies
- **2.10-debug.mdc**: Debugging methodologies

### Operations (2.11, 2.12, 2.13)
- **2.11-documentation.mdc**: Documentation standards
- **2.12-devops.mdc**: DevOps procedures
- **2.13-github.mdc**: GitHub workflow management

## Using Mode Transitions

Mode transitions are marked in the AI's response with:

```
#### [Entering X Mode]
```

This signals a shift in approach and expertise. Modes can be requested directly:

```
Please enter Architect Mode to help design this system.
```

Or they may be activated automatically when the AI detects a need for specialized expertise.

## Customizing Rules

To customize these rules for your project:

1. Update `1.1-project-configuration.mdc` with your project details
2. Add project-specific patterns to `1.2-common-mistakes.mdc`
3. Adjust specialized mode rules to match your development workflows
4. Add new rules as needed for your specific use cases

## Best Practices

- Keep rules concise and focused
- Use specific examples rather than general principles
- Update rules as your project evolves
- Add documentation for custom rules
