import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default () => {
  return {


    textAnimate() {
        const elements = this.$el.querySelectorAll("span");
        const tl = gsap.timeline();
        console.log(elements[0].clientHeight +10)
        tl.from(elements, 1.8, {
          y: elements[0].clientHeight +10,
          ease: "power4.out",
          skewY:0.7,
          delay: 0.7,
          stagger: {
            amount: 0.4
          },
          scrollTrigger: {
            trigger: this.$el,
            // markers: true, // per vedere i markers del trigger (utile per debug)
          }
        });
      },
  }
}
