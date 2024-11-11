export default class AppView {
  constructor(root, routes) {
    this.root = root;
    this.routes = routes;
    this.content = this.root.querySelector("#content");
  }

  renderContent(pageId) {
    const page = this.routes[pageId] || this.routes["error"];
    this.content.innerHTML = "";
    this.content.append(page.render());
    this.updateMenu(pageId);
  }

  updateMenu(activePage) {
    const links = Array.from(this.root.querySelectorAll("a.aside-menu-item"));
    const selectedLinks = this.root.querySelectorAll("a.aside-menu-item.selected");
    const filteredLinks = links.filter((link) => link.getAttribute("href").slice(1).toLowerCase() === activePage);

    filteredLinks.forEach((link) => {
      selectedLinks.forEach((selectedLink) => {
        if (selectedLink && selectedLink !== link) {
          selectedLink.classList.remove("selected");
          link.style.color = "rgb(210, 210, 210)";
        }

        link.classList.add("selected");
        link.style.color = link.dataset.color ?? "#4481eb";
      });
    });
  }
}
