import React, { useEffect, useRef } from "https://esm.sh/react@19";
import { createRoot } from "https://esm.sh/react-dom@19/client";
import gsap from "https://esm.sh/gsap";
import { ScrollTrigger } from "https://esm.sh/gsap/ScrollTrigger";
import htm from "https://esm.sh/htm@3.1.1";

const html = htm.bind(React.createElement);

gsap.registerPlugin(ScrollTrigger);

function ReactApp({ hero, capabilities, playground }) {
  const heroRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    const orb = orbRef.current;

    if (!heroElement || !orb) {
      return undefined;
    }

    const orbMotion = orb.querySelector(".react-app__orb-motion");

    const orbInner = orb.querySelector(".react-app__orb-inner");

    const cards = gsap.utils.toArray(".react-app__card");

    const playgroundElement = document.querySelector(".react-app__playground");

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
        trigger: heroElement,
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
    let playgroundCircleAnimation;

    if (playgroundElement) {
      const playgroundCircle = playgroundElement.querySelector(
        ".react-app__playground-circle",
      );

      const playgroundContent = playgroundElement.querySelector(
        ":scope > div:last-child",
      );

      const playgroundNumber = playgroundContent?.querySelector("span");

      const playgroundTitle = playgroundContent?.querySelector("h2");

      const playgroundDescription = playgroundContent?.querySelector("p");

      playgroundTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: playgroundElement,
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
        playgroundCircleAnimation = gsap.to(playgroundCircle, {
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

      if (playgroundCircleAnimation) {
        playgroundCircleAnimation.kill();
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
          <p className="react-app__eyebrow">${hero.eyebrow}</p>

          <h1 className="react-app__title">
            ${hero.title.map(
              (line) => html`
                <span className="react-app__title-line"> ${line} </span>
              `,
            )}
          </h1>

          <p className="react-app__description">${hero.description}</p>

          <div className="react-app__actions">
            <a href="#capabilities" className="react-app__button"> Explore </a>

            <span className="react-app__hint"> Scroll to discover </span>
          </div>
        </div>
      </section>

      ${capabilities.length
        ? html`
            <section className="react-app__section" id="capabilities">
              <div className="react-app__section-header">
                <span>01</span>

                <h2>Capabilities</h2>
              </div>

              <div className="react-app__cards">
                ${capabilities.map(
                  ({ number, title, description }) => html`
                    <article className="react-app__card">
                      <span className="react-app__card-number">
                        ${number}
                      </span>

                      <h3>${title}</h3>

                      <p>${description}</p>
                    </article>
                  `,
                )}
              </div>
            </section>
          `
        : ""}
      ${playground
        ? html`
            <section className="react-app__playground">
              <div className="react-app__playground-circle"></div>

              <div>
                <span>02</span>

                <h2>${playground.title}</h2>

                <p>${playground.description}</p>
              </div>
            </section>
          `
        : ""}
    </main>
  `;
}

export default function decorate(block) {
  const rows = Array.from(block.children);

  let hero = null;

  const capabilities = [];

  let playground = null;

  rows.forEach((row) => {
    const cells = Array.from(row.children);

    if (!cells.length) {
      return;
    }

    const values = cells.map((cell) => cell.textContent.trim());

    if (values.length === 1 && values[0] === "React App") {
      return;
    }

    const section = values[0] || "";

    if (section === "Hero" && values[1] && values[2] && values[3]) {
      hero = {
        eyebrow: values[1],
        title: values[2]
          .split("|")
          .map((line) => line.trim())
          .filter(Boolean),
        description: values[3],
      };
    }

    if (section === "Capabilities" && values[1] && values[2]) {
      capabilities.push({
        number: String(capabilities.length + 1).padStart(2, "0"),
        title: values[1],
        description: values[2],
      });
    }

    if (section === "Playground" && values[1] && values[2]) {
      playground = {
        title: values[1],
        description: values[2],
      };
    }
  });

  if (!hero) {
    return;
  }

  const root = createRoot(block);

  root.render(
    React.createElement(ReactApp, {
      hero,
      capabilities,
      playground,
    }),
  );
}
