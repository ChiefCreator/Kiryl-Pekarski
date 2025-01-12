import { gsap } from "gsap";
import { splitTextOnLines } from "./domUtils";

export function getAnimateTextTimeline($text, isNeedSplitText = true) {
  if (isNeedSplitText) splitTextOnLines($text);

  const timeLine = gsap.timeline();

  const addTextAnimationToTimeline = ($text, timeLine) => {
    $text.querySelectorAll(".text-line").forEach(($line) => {
      const $container = $line.firstElementChild;

      $container.style.transform = "translate(0, 100%)";

      timeLine.fromTo(
        $container,
        {
          transform: `translate(0, 100%)`,
        },
        {
          transform: `translate(0, 0)`,
          duration: 1.5,
          ease: "power4.inOut",
        },
        "<+=10%"
      )

      return timeLine;
    });
  };

  return timeLine.add(addTextAnimationToTimeline($text, timeLine));
}
export function getAnimateCloseButtonTimeline(button) {
  const firstLine = button.querySelector(".close-button__line:first-child");
  const lastLine = button.querySelector(".close-button__line:last-child");

  const timeline = gsap.timeline({ paused: true });

  timeline
    .fromTo(
      firstLine,
      {
        width: 0,
      },
      {
        width: "100%",
        ease: "power4.inOut",
        duration: 0.5,
      },
      0
    )
    .fromTo(
      lastLine,
      {
        width: 0,
      },
      {
        width: "100%",
        ease: "power4.inOut",
        duration: 0.5,
      },
      .25
    );

  return timeline;
}
