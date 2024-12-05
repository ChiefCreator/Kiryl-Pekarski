import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { splitTextOnLines } from "./domUtils";

export function animateElementOnScroll($element, options) {
  const { events } = options;

  setTimeout(() => {
    const $trigger = document.getElementById($element.dataset.elementAnimatedOnScrollTarget);

    ScrollTrigger.create({
      trigger: $trigger,
      start: "top 80%",
      end: "+500",
      once: true,
      ...events
    });
  }, 0)
}

export function animateTextOnScroll($text) {
  splitTextOnLines($text);

  const $trigger = document.getElementById($text.dataset.textAnimatedOnScrollTarget);

  const timeLine = gsap.timeline({ scrollTrigger: { trigger: $trigger, start: "top 80%", end: "+=500" } });
  const addTextAnimationToTimeline = ($text, timeLine) => {
    $text.querySelectorAll(".text-line").forEach(($line) => {
      const $container = $line.firstElementChild;
      timeLine.add(
        gsap.fromTo(
          $container,
          {
            transform: `translate(0, 100%)`,
          },
          {
            transform: `translate(0, 0)`,
            duration: 1.5,
            ease: "power4.inOut",
          }
        ),
        "<+=10%"
      );

      return timeLine;
    });
  };
  timeLine.add(addTextAnimationToTimeline($text, timeLine));
}
