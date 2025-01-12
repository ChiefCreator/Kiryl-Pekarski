export function createDOM(tag, { className, id, innerHTML, textContent, attributes }) {
  const el = document.createElement(tag);

  if (className) el.className = className;
  if (id) el.id = id;
  if (textContent) el.textContent = textContent;
  if (innerHTML) el.innerHTML = innerHTML;
  if (attributes) attributes.forEach((attributeObj) => el.setAttribute(attributeObj.title, attributeObj.value));

  return el;
}

export function getScrollPercentage() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;

  return scrollPercentage;
}

export function splitTextOnLines($text) {
  let $bufferText = document.createElement("p");
  $bufferText = $text.cloneNode(true);
  $bufferText.style.width = $text.offsetWidth + .5 + "px";
  $bufferText.style.position = "absolute";
  $bufferText.style.left = "0px";
  $bufferText.innerHTML = "_";
  document.body.appendChild($bufferText);

  const oneLineHeight = $bufferText.scrollHeight;

  const contentNodes = Array.from($text.childNodes);
  const lines = [];
  let currentLine = document.createElement("span");

  const isOverflowing = () => $bufferText.scrollHeight > oneLineHeight;

  contentNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.split(" ");
      words.forEach((word, index) => {
        $bufferText.innerHTML = currentLine.innerHTML + word + " ";
        if (isOverflowing()) {
          lines.push(currentLine.innerHTML.trim());
          currentLine = document.createElement("span");
        }
        currentLine.innerHTML += word + (index < words.length - 1 ? " " : "");
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(true);
      $bufferText.innerHTML = currentLine.innerHTML + clone.outerHTML;
      if (isOverflowing()) {
        lines.push(currentLine.innerHTML.trim());
        currentLine = document.createElement("span");
      }
      currentLine.appendChild(clone);
    }
  });

  if (currentLine.innerHTML.trim()) {
    lines.push(currentLine.innerHTML.trim());
  }

  $bufferText.remove();

  $text.innerHTML = lines
    .map((line) => {
      return `
        <span class="text-line">
          <span class="text-line__container">${line}</span>
        </span>`;
    })
    .join("");
}
