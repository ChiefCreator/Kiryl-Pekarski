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
  $bufferText.style.width = $text.offsetWidth + "px";
  $bufferText.style.position = "absolute";
  $bufferText.style.left = "0px";
  $bufferText.innerHTML = "_";
  document.body.appendChild($bufferText);

  const content = $text.textContent.split("");
  const oneLineHeight = $bufferText.scrollHeight;
  const lines = [];
  let i = 0;

  while (i < content.length) {
    let line = ($bufferText.innerHTML = "");
    while (i < content.length && $bufferText.scrollHeight <= oneLineHeight) {
      $bufferText.innerHTML = line += content[i++];
    }
    let lineEndIndex = i === content.length ? i : line.lastIndexOf(" ") + 1;
    lines.push(content.splice(0, lineEndIndex).join(""));
    i = 0;
  }
  $bufferText.remove();
  $text.innerHTML = lines.map((line) => {
    return (
      `<span class="text-line">
        <span class="text-line__container">${line}</span>
      </span>`
    )
  }).join("");
}
