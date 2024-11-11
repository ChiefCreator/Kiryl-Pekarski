export function createDOM(tag, { className, id, innerHTML, textContent, attributes }) {
  const el = document.createElement(tag);

  if (className) el.className = className;
  if (id) el.id = id;
  if (textContent) el.textContent = textContent;
  if (innerHTML) el.innerHTML = innerHTML;
  if (attributes) attributes.forEach((attributeObj) => el.setAttribute(attributeObj.title, attributeObj.value));

  return el;
}
