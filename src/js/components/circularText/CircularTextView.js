import { createDOM } from "../../utils/domUtils";

export default class CircularTextView {
  constructor() {
    this.circularText = null;
    this.svg = null;
  }

  init(options) {
    this.circularText = this.create(options);
    this.svg = this.circularText.querySelector("svg");
  }
  create(options) {
    const innerHTML = `
      <svg width="${options.size}" height="${options.size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="circlePath" d="M ${options.center},${options.center}  m -${options.radius},0 a ${options.radius},${options.radius} 0 1,1 ${options.radius * 2},0 a ${options.radius},${options.radius} 0 1,1 -${options.radius * 2},0" />
        </defs>
        <text font-size="${options.fontSize}" text-anchor="middle">
          <textPath href="#circlePath" startOffset="50%">${options.text}</textPath>
        </text>
      </svg>
    `;

    return createDOM("div", { className: `circular-text ${options.className}`, innerHTML });
  }
  render() {
    return this.circularText;
  }
}
