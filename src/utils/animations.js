import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

/**
 * Animates a target element using GSAP and ScrollTrigger.
 *
 * This function creates a GSAP animation that is triggered by scrolling. It allows you
 * to define the animation properties and the scroll behavior.
 *
 * @function
 * @param {string|HTMLElement} target - The target element or selector string to animate.
 * @param {Object} animationProps - An object containing GSAP animation properties (e.g., duration, ease, x, y, opacity, etc.).
 * @param {Object} scrollProps - An object containing ScrollTrigger properties (e.g., scrub, markers, end, etc.). 
 *                              These properties override the default ScrollTrigger settings.
 *
 * @example
 * animateWithGsap('#myElement', { opacity: 0, y: 50 }, { scrub: true, end: "bottom top" });
 */
export const animateWithGsap = (target, animationProps, scrollProps) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
};

/**
 * Creates a GSAP timeline animation with coordinated transitions.
 *
 * This function constructs a GSAP timeline that orchestrates multiple animations:
 *   1. Rotates a target object based on a given rotation state.
 *   2. Animates two additional targets with provided animation properties.
 *
 * @function
 * @param {gsap.core.Timeline} timeline - The GSAP timeline instance to use.
 * @param {object} rotationRef - A React ref for accessing the object to rotate.
 * @param {number} rotationState - The desired rotation angle for the object.
 * @param {string|HTMLElement} firstTarget - The first target element or selector string to animate.
 * @param {string|HTMLElement} secondTarget - The second target element or selector string to animate.
 * @param {Object} animationProps - An object containing GSAP animation properties (e.g., duration, ease, x, y, opacity, etc.) 
 *                                  to be applied to both `firstTarget` and `secondTarget`.
 *
 * @example
 * const myTimeline = gsap.timeline();
 * animateWithGsapTimeline(myTimeline, myRef, Math.PI / 2, '#target1', '#target2', { opacity: 0, x: 100 });
 */
export const animateWithGsapTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps
) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );
};
