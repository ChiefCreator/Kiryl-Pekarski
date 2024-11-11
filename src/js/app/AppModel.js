export default class AppModel {
  constructor(view) {
    this.view = view;
  }

  updateState(pageId) {
    this.view.renderContent(pageId);
  }
}
