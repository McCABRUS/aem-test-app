import React, { useEffect, useRef } from "https://esm.sh/react@19";
import { createRoot } from "https://esm.sh/react-dom@19/client";
import gsap from "https://esm.sh/gsap";
import { ScrollTrigger } from "https://esm.sh/gsap/ScrollTrigger";
import htm from "https://esm.sh/htm@3.1.1";

const html = htm.bind(React.createElement);

gsap.registerPlugin(ScrollTrigger);

function ReactApp() {
  const heroRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const orb = orbRef.current;

    if (!hero || !orb) {
      return undefined;
    }

    const orbMotion = orb.querySelector(".react-app__orb-motion");

    const orbInner = orb.querySelector(".react-app__orb-inner");

    const cards = gsap.utils.toArray(".react-app__card");

    const playground = document.querySelector(".react-app__playground");

    const intro = gsap.timeline();

    gsap.set(".react-app__title-line", {
      transformPerspective: 800,
    });

    intro.from(".react-app__eyebrow", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
    });

    intro.from(
      ".react-app__title-line",
      {
        opacity: 0,
        y: 100,
        rotateX: 40,
        transformOrigin: "center bottom",
        duration: 1,
        stagger: 0.18,
        ease: "power4.out",
      },
      "-=0.45",
    );

    intro.from(
      ".react-app__description",
      {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.45",
    );

    intro.from(
      ".react-app__actions",
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.3",
    );

    const gridAnimation = gsap.to(".react-app__grid", {
      backgroundPosition: "60px 60px",
      duration: 8,
      repeat: -1,
      ease: "none",
    });

    const gridParallax = gsap.to(".react-app__grid", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    let orbMotionAnimation;
    let orbInnerAnimation;

    if (orbMotion) {
      orbMotionAnimation = gsap.to(orbMotion, {
        x: 100,
        y: -50,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (orbInner) {
      orbInnerAnimation = gsap.to(orbInner, {
        rotation: 360,
        scale: 1.08,
        duration: 10,
        repeat: -1,
        ease: "none",
      });
    }

    const pointerMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 30;

      const y = (event.clientY / window.innerHeight - 0.5) * 30;

      gsap.to(orb, {
        x,
        y,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("pointermove", pointerMove);

    const buttonAnimation = gsap.to(".react-app__button", {
      y: -5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const cardAnimations = [];

    cards.forEach((card) => {
      const scrollAnimation = gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 80,
          scale: 0.92,
          rotateX: 8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        },
      );

      const handleEnter = () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", handleEnter);

      card.addEventListener("mouseleave", handleLeave);

      cardAnimations.push({
        animation: scrollAnimation,
        card,
        handleEnter,
        handleLeave,
      });
    });

    let playgroundTimeline;

    if (playground) {
      const playgroundCircle = playground.querySelector(
        ".react-app__playground-circle",
      );

      const playgroundNumber = playground.querySelector(
        ":scope > div:last-child > span",
      );

      const playgroundTitle = playground.querySelector(
        ":scope > div:last-child > h2",
      );

      const playgroundDescription = playground.querySelector(
        ":scope > div:last-child > p",
      );

      playgroundTimeline = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: playground,
          start: "top 75%",
          once: true,
        },
      });

      if (playgroundCircle) {
        playgroundTimeline.fromTo(
          playgroundCircle,
          {
            opacity: 0,
            scale: 0,
            rotation: -180,
          },
          {
            opacity: 0.35,
            scale: 1,
            rotation: 0,
            duration: 1.8,
            ease: "power4.out",
          },
        );
      }

      if (playgroundNumber) {
        playgroundTimeline.fromTo(
          playgroundNumber,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=1.2",
        );
      }

      if (playgroundTitle) {
        playgroundTimeline.fromTo(
          playgroundTitle,
          {
            opacity: 0,
            y: 140,
            scale: 0.8,
            rotateX: 50,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1.4,
            ease: "power4.out",
          },
          "-=1",
        );
      }

      if (playgroundDescription) {
        playgroundTimeline.fromTo(
          playgroundDescription,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        );
      }

      if (playgroundCircle) {
        gsap.to(playgroundCircle, {
          scale: 1.15,
          rotation: 30,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.8,
        });
      }
    }

    return () => {
      window.removeEventListener("pointermove", pointerMove);

      intro.kill();
      gridAnimation.kill();
      gridParallax.kill();
      buttonAnimation.kill();

      if (orbMotionAnimation) {
        orbMotionAnimation.kill();
      }

      if (orbInnerAnimation) {
        orbInnerAnimation.kill();
      }

      if (playgroundTimeline) {
        playgroundTimeline.kill();
      }

      cardAnimations.forEach(
        ({ animation, card, handleEnter, handleLeave }) => {
          animation.kill();

          card.removeEventListener("mouseenter", handleEnter);

          card.removeEventListener("mouseleave", handleLeave);
        },
      );

      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  return html`
    <main className="react-app">
      <section className="react-app__hero" ref=${heroRef}>
        <div className="react-app__grid"></div>

        <div className="react-app__orb" ref=${orbRef}>
          <div className="react-app__orb-motion">
            <div className="react-app__orb-inner"></div>
          </div>
        </div>

        <div className="react-app__content">
          <p className="react-app__eyebrow">AEM · REACT · GSAP · SCSS</p>

          <h1 className="react-app__title">
            <span className="react-app__title-line"> BUILD </span>

            <span className="react-app__title-line"> FOR THE </span>

            <span className="react-app__title-line"> WEB. </span>
          </h1>

          <p className="react-app__description">
            A small Edge Delivery Services experiment combining React
            components, GSAP animation and Sass without external assets.
          </p>

          <div className="react-app__actions">
            <a href="#capabilities" className="react-app__button"> Explore </a>

            <span className="react-app__hint"> Scroll to discover </span>
          </div>
        </div>
      </section>

      <section className="react-app__section" id="capabilities">
        <div className="react-app__section-header">
          <span>01</span>

          <h2>Capabilities</h2>
        </div>

        <div className="react-app__cards">
          <article className="react-app__card">
            <span className="react-app__card-number"> 01 </span>

            <h3>React</h3>

            <p>
              A component-driven interface mounted inside the Edge Delivery
              Services runtime.
            </p>
          </article>

          <article className="react-app__card">
            <span className="react-app__card-number"> 02 </span>

            <h3>GSAP</h3>

            <p>
              Timeline-based entrance animations, scroll interactions and
              continuous motion.
            </p>
          </article>

          <article className="react-app__card">
            <span className="react-app__card-number"> 03 </span>

            <h3>Sass</h3>

            <p>
              Structured styling using variables, nesting and reusable visual
              tokens.
            </p>
          </article>
        </div>
      </section>

      <section className="react-app__playground">
        <div className="react-app__playground-circle"></div>

        <div>
          <span>02</span>

          <h2>Creative code playground</h2>

          <p>
            Everything here is generated with CSS, React and JavaScript. No
            image assets required.
          </p>
        </div>
      </section>
    </main>
  `;
}

export default function decorate(block) {
  const root = createRoot(block);

  root.render(React.createElement(ReactApp));
}
