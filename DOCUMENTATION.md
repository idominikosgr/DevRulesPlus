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

## Specialized Mode Rules

These rules define specific "modes" that the AI can enter for specialized tasks and are organized in the `modes/` directory:

### Planning
- **planning-task.mdc**: Breaking down tasks into implementation steps
- **planning-requirements.mdc**: Requirements analysis
- **planning-estimation.mdc**: Task effort estimation

### Design
- **design-architecture.mdc**: System architecture design
- **design-database.mdc**: Database schema design
- **design-api.mdc**: API design
- **design-interfaces.mdc**: Interface design
- **design-data-migration.mdc**: Data migration planning
- **design-caching.mdc**: Caching strategy design

### Implementation
- **implement-ui.mdc**: UI/frontend implementation
- **implement-logic.mdc**: Business logic implementation
- **implement-integration.mdc**: Integration implementation

### Review
- **review-code.mdc**: Code review guidelines
- **review-security.mdc**: Security review procedures
- **review-seo.mdc**: SEO assessment
- **review-accessibility.mdc**: Accessibility auditing
- **review-architecture.mdc**: Architecture review
- **review-compliance.mdc**: Compliance evaluation

### Improvement
- **improve-refactor.mdc**: Code refactoring guidelines
- **improve-performance.mdc**: Performance optimization
- **improve-scalability.mdc**: Scalability improvements
- **improve-maintainability.mdc**: Maintainability enhancements

### Debugging
- **debug-code.mdc**: Code debugging strategies
- **debug-performance.mdc**: Performance issue diagnosis
- **debug-integration.mdc**: Integration problem debugging

### Testing
- **test-plan.mdc**: Test planning
- **test-write.mdc**: Test implementation
- **test-analyze-coverage.mdc**: Test coverage analysis

### Process
- **process-devops.mdc**: DevOps procedures
- **process-git.mdc**: Git workflow management
- **process-release.mdc**: Release process
- **process-onboarding.mdc**: Developer onboarding

### Content
- **content-documentation.mdc**: Documentation standards
- **content-general.mdc**: General content creation
- **content-api-docs.mdc**: API documentation
- **content-user-guide.mdc**: User guides
- **content-technical-blog.mdc**: Technical writing

### Analysis
- **analyze-data.mdc**: Data analysis
- **analyze-logs.mdc**: Log file analysis
- **analyze-dependencies.mdc**: Dependency analysis

### Generation
- **generate-boilerplate.mdc**: Boilerplate code generation
- **generate-config.mdc**: Configuration generation
- **generate-types.mdc**: Type definition generation

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

1. Update `01-project-context.mdc` with your project details
2. Add project-specific patterns to `02-common-errors.mdc`
3. Adjust specialized mode rules to match your development workflows
4. Add new rules as needed for your specific use cases

## Best Practices

- Keep rules concise and focused on specific guidance
- Use specific examples rather than general principles
- Update rules as your project evolves
- Use progressive disclosure in rules (start with the most important information)
- Structure information with clear headings and lists
- Include context for why certain patterns are recommended
