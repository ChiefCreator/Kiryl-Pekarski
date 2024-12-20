import { createDOM } from "../../utils/domUtils";

import Container from "../container/Container";
import LinkReappear from "../linkReappear/LinkReappear";

import gsap from "gsap";

export default class FooterView {
  constructor() {
    this.footer = null;
    this.timeline = gsap.timeline({ paused: true });
  }

  initTimeline() {
    this.timeline
      .to(this.borderSub, {  
        width: "50%",
        left: "100%",
        duration: 2.5,
        ease: "power4.inOut"
      })
  }

  init(linksData, versionsData) {
    this.footer = this.create(linksData, versionsData);
    this.borderSub = this.footer.querySelector(".footer__border-sub");

    this.initTimeline();
  }
  create(linksData, versionsData) {
    const innerHTML = `
      <div class="footer__container">
        <div class="footer__content">
          <div class="footer__social-links-list"></div>
          <div class="footer__versions-links-list"></div>
        </div>
        <div class="footer__border">
          <span class="footer__border-sub" data-element-animated-on-scroll data-element-animated-on-scroll-target="footer"></span>
        </div>
      </div>
    `;

    const container = new Container(innerHTML);
    const footer = createDOM("footer", { className: "footer", id: "footer", innerHTML: container.render().outerHTML });
    const socialLinksList = footer.querySelector(".footer__social-links-list");
    const versionsLinksList = footer.querySelector(".footer__versions-links-list");

    linksData.forEach(linkData => socialLinksList.append(new LinkReappear({ className: "footer__link", hasUnderline: true, data: linkData }).render()));
    versionsData.forEach(versionData => versionsLinksList.append(new LinkReappear({ className: "footer__link", hasUnderline: true, data: versionData }).render()));
    
    return footer;
  }
  render() {
    return this.footer;
  }
}
