# Contributing to MarkLite

Thank you for your interest in contributing to MarkLite. This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature or bugfix
4. Make your changes
5. Test your changes thoroughly
6. Submit a pull request

## Development Setup

```bash
# Install dependencies
bun install

# Run in development mode
bun run tauri dev

# Build for production
bun run tauri build
```

## Code Style

- **TypeScript/React**: Follow the existing code style. Use TypeScript strict mode.
- **Rust**: Follow standard Rust conventions. Run `cargo fmt` before committing.
- **CSS**: Use Tailwind CSS utilities and CSS variables for theming.

## Commit Messages

Write clear, concise commit messages that describe what changed and why:

```
Add font size selector to settings menu

- Added Small, Medium, Large font size options
- Persists selection to localStorage
- Updates CSS variables dynamically
```

## Pull Request Process

1. Update the README.md if you add new features
2. Ensure all tests pass and there are no warnings
3. Update documentation as needed
4. Request review from maintainers

## Reporting Bugs

When reporting bugs, please include:

- Operating system and version
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable

## Feature Requests

Feature requests are welcome. Please provide:

- Clear description of the feature
- Use case and benefits
- Any implementation ideas you have

## Questions

For questions, please open an issue or contact the maintainer at saqlainrazee@gmail.com.
