import socialNetworksLinksData from "../../data/socialNetworksLinksData";
import versionsData from "../../data/versionsData";

export default class FooterModel {
  constructor(view) {
    this.view = view;
    this.linksData = socialNetworksLinksData;
    this.versionsData = versionsData;
  }

  init() {
    this.view.init(this.linksData, this.versionsData);
  }
}
