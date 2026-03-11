# Monpyra Default Theme

This is the official, built-in default theme for the **Monpyra Static Site Generator**. It is designed to be blazing fast, accessible, and modern right out of the box.

## ✨ Features
- **Tailwind CSS Ecosystem**: Pre-configured with Tailwind CDN and the Typography plugin for beautiful Markdown rendering.
- **Interactive UI**: Powered by **Alpine.js** for lightweight DOM manipulation.
- **SPA Feel**: Uses **HTMX** (`hx-boost`) for seamless, no-reload page transitions.
- **Developer Ready**: Includes syntax highlighting using Pygments (Dracula style) and custom Markdown heading support.

## 🛠️ Note for Contributors

**Please do not edit this directory to build your own theme!** This directory contains the core fallback theme for the Monpyra installation. If you want to create a custom theme for your documentation project, please use our CLI scaffolding tool:

```bash
pyra contribute themes
```

## 📸 Theme Preview
Contributions should include a screenshot in the `assets/` directory. Name your main preview `thumbnail.png` to ensure it is displayed correctly in the theme registry.

That command will automatically clone the _monpyra-theme-template_ and set up a fresh development environment for you.