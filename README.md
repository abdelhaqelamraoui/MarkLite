# MarkLite

A minimal, distraction-free markdown editor built with Tauri, React, and TypeScript.

## Why MarkLite?

As a developer, I frequently work with markdown files for documentation, notes, and project READMEs. The frustration of opening `.md` files in Notepad or basic text editors, only to see raw, unformatted text with all the symbols and syntax cluttering the content, inspired me to build MarkLite.

I wanted a simple, lightweight solution that renders markdown beautifully while still giving me quick access to the raw code when I need to edit. No bloated features, no complex setup, just a clean interface that lets me focus on my content.

## Features

- **Clean Interface** - Minimal UI that stays out of your way
- **Live Preview** - Switch between reader and code modes instantly with Ctrl+E
- **Syntax Highlighting** - Full markdown syntax highlighting in the editor
- **Three Themes** - Dark, Light, and Paper themes to match your preference
- **Five Fonts** - Inter, Merriweather, Lora, Source Serif, Fira Sans
- **Adjustable Font Size** - Small, Medium, and Large options
- **Native Performance** - Built with Tauri for a lightweight, fast experience
- **Cross-Platform** - Windows, macOS, and Linux support

## Installation

Download the latest release from the [Releases](https://github.com/Razee4315/MarkLite/releases) page.

### Available Formats

- **Windows**: `.msi` installer or `.exe` portable
- **macOS**: `.dmg` disk image
- **Linux**: `.deb`, `.rpm`, or `.AppImage`

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Bun](https://bun.sh/) (recommended) or npm
- [Rust](https://www.rust-lang.org/tools/install)

### Setup

```bash
# Clone the repository
git clone https://github.com/Razee4315/MarkLite.git
cd MarkLite

# Install dependencies
bun install

# Run in development mode
bun run tauri dev

# Build for production
bun run tauri build
```

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Open File | Ctrl+O |
| Save File | Ctrl+S |
| Toggle Mode | Ctrl+E |

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Rust, Tauri v2
- **Build**: Vite

## Contributing

Contributions are welcome. Please read the [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a pull request.

## Author

**Saqlain Abbas**  
Email: saqlainrazee@gmail.com  
GitHub: [@Razee4315](https://github.com/Razee4315)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
