import { createDOM } from "../../utils/domUtils";

export default class ThemeToggleView {
  constructor() {
    this.themeToggle = null;
  }

  toggleTheme(theme) {
    this.themeToggle.className = `theme-toggle ${theme === "dark" ? "theme-toggle_dark" : "theme-toggle_light"}`;
    document.body.setAttribute("data-theme", theme);
    document.querySelectorAll('[data-color-transition]').forEach(elem => elem.classList.add("theme-transition"));
    setTimeout(() => document.querySelectorAll('[data-color-transition]').forEach(elem => elem.classList.remove("theme-transition")), 0);
  }

  init(theme) {
    this.themeToggle = this.create(theme);
  }
  create(theme) {
    const innerHTML = `
      <svg class="theme-toggle__svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle class="theme-toggle__circle" cx="16" cy="16" r="15" />
        <path class="theme-toggle__path" fill-rule="evenodd" clip-rule="evenodd" d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6V26Z" data-svg-origin="16 16" />
      </svg>
    `;

    return createDOM("button", { className: `theme-toggle ${theme === "dark" ? "theme-toggle_dark" : "theme-toggle_light"}`, innerHTML, attributes: [{ title: "data-cursor", value: "cursorForceGravity" }] });
  }
  render() {
    return this.themeToggle;
  }
}
