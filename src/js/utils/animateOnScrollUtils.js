import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { splitTextOnLines } from "./domUtils";
import LocomotiveScroll from "locomotive-scroll";

export function animateElementOnScroll($element, options) {
  const { events, start } = options;

  setTimeout(() => {
    const $trigger = document.getElementById($element.dataset.elementAnimatedOnScrollTarget);

    ScrollTrigger.create({
      trigger: $trigger,
      start: start ?? "top 80%",
      end: "+500",
      once: true,
      ...events
    });
  }, 0)
}

export function animateTextOnScroll($text, isNeedSplitText = true) {
  if (isNeedSplitText) splitTextOnLines($text);

  const $trigger = document.getElementById($text.dataset.textAnimatedOnScrollTarget);

  const timeLine = gsap.timeline({ 
    scrollTrigger: { 
      trigger: $trigger,
      start: "top 80%",
      end: "+=500",
    }
  });

  const addTextAnimationToTimeline = ($text) => {
    const timeline = gsap.timeline();

    $text.querySelectorAll(".text-line").forEach($line => {
      const $container = $line.firstElementChild;

      timeline.fromTo(
        $container,
        {
          transform: `translate(0, 110%)`,
        },
        {
          transform: `translate(0, 0)`,
          duration: 1.5,
          ease: "power4.inOut",
        },
        "<+=10%"
      )
    });

    return timeline;
  };

  const timelineOfTextAnimation = addTextAnimationToTimeline($text);

  timeLine.add(timelineOfTextAnimation);
}

export function initLocomotiveScroll(lenisOptions) {
  return new LocomotiveScroll({ lenisOptions });
}
