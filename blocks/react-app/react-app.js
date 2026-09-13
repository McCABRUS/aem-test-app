import React, { useEffect, useRef } from "https://esm.sh/react@19";
import { createRoot } from "https://esm.sh/react-dom@19/client";
import gsap from "https://esm.sh/gsap";
import { ScrollTrigger } from "https://esm.sh/gsap/ScrollTrigger";
import htm from "https://esm.sh/htm@3.1.1";

const html = htm.bind(React.createElement);

gsap.registerPlugin(ScrollTrigger);

function ReactApp({ hero, capabilities, playground, architecture }) {
  const heroRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    const orb = orbRef.current;

    if (!heroElement || !orb) {
      return undefined;
    }

    const mm = gsap.matchMedia();

    const orbMotion = orb.querySelector(".react-app__orb-motion");

    const orbInner = orb.querySelector(".react-app__orb-inner");

    const cards = gsap.utils.toArray(".react-app__card");

    const playgroundElement = document.querySelector(".react-app__playground");

    const architectureElement = document.querySelector(
      ".react-app__architecture",
    );

    mm.add(
      {
        isDesktop: "(min-width: 901px)",
        isMobile: "(max-width: 900px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, isMobile, reduceMotion } = context.conditions;

        const intro = gsap.timeline();

        gsap.set(".react-app__title-line", {
          transformPerspective: 800,
        });

        if (reduceMotion) {
          gsap.set(
            [
              ".react-app__eyebrow",
              ".react-app__title-line",
              ".react-app__description",
              ".react-app__actions",
            ],
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotateX: 0,
              scale: 1,
            },
          );
        } else {
          intro.from(".react-app__eyebrow", {
            opacity: 0,
            y: isMobile ? 12 : 20,
            duration: isMobile ? 0.5 : 0.8,
            ease: "power3.out",
          });

          intro.from(
            ".react-app__title-line",
            {
              opacity: 0,
              y: isMobile ? 50 : 100,
              rotateX: isMobile ? 20 : 40,
              transformOrigin: "center bottom",
              duration: isMobile ? 0.7 : 1,
              stagger: isMobile ? 0.1 : 0.18,
              ease: "power4.out",
            },
            "-=0.3",
          );

          intro.from(
            ".react-app__description",
            {
              opacity: 0,
              y: isMobile ? 20 : 30,
              duration: isMobile ? 0.5 : 0.7,
              ease: "power3.out",
            },
            "-=0.35",
          );

          intro.from(
            ".react-app__actions",
            {
              opacity: 0,
              y: 15,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.25",
          );
        }

        if (!reduceMotion) {
          gsap.to(".react-app__grid", {
            backgroundPosition: isMobile ? "40px 40px" : "60px 60px",
            duration: isMobile ? 18 : 10,
            repeat: -1,
            ease: "none",
          });
        }

        if (!reduceMotion && isDesktop) {
          gsap.to(".react-app__grid", {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: heroElement,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        if (!reduceMotion && orbMotion && isDesktop) {
          gsap.to(orbMotion, {
            x: 100,
            y: -50,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        if (!reduceMotion && orbInner) {
          gsap.to(orbInner, {
            rotation: 360,
            scale: isMobile ? 1.04 : 1.08,
            duration: isMobile ? 16 : 10,
            repeat: -1,
            ease: "none",
          });
        }

        const moveOrbX = gsap.quickTo(orb, "x", {
          duration: 1,
          ease: "power3.out",
        });

        const moveOrbY = gsap.quickTo(orb, "y", {
          duration: 1,
          ease: "power3.out",
        });

        const pointerMove = (event) => {
          if (reduceMotion || !isDesktop) {
            return;
          }

          const x = (event.clientX / window.innerWidth - 0.5) * 30;

          const y = (event.clientY / window.innerHeight - 0.5) * 30;

          moveOrbX(x);
          moveOrbY(y);
        };

        if (isDesktop && !reduceMotion) {
          window.addEventListener("pointermove", pointerMove);
        }

        if (!reduceMotion) {
          gsap.to(".react-app__button", {
            y: -5,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        if (reduceMotion) {
          gsap.set(".react-app__card", {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
          });
        } else {
          cards.forEach((card) => {
            gsap.fromTo(
              card,
              {
                opacity: 0,
                y: isMobile ? 40 : 80,
                scale: isMobile ? 0.97 : 0.92,
                rotateX: isDesktop ? 8 : 0,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                duration: isMobile ? 0.7 : 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  once: true,
                },
              },
            );
          });
        }

        const cardHandlers = [];

        if (isDesktop && !reduceMotion) {
          cards.forEach((card) => {
            const moveCardY = gsap.quickTo(card, "y", {
              duration: 0.3,
              ease: "power2.out",
            });

            const moveCardScale = gsap.quickTo(card, "scale", {
              duration: 0.3,
              ease: "power2.out",
            });

            const handleEnter = () => {
              moveCardY(-10);
              moveCardScale(1.02);
            };

            const handleLeave = () => {
              moveCardY(0);
              moveCardScale(1);
            };

            card.addEventListener("mouseenter", handleEnter);

            card.addEventListener("mouseleave", handleLeave);

            cardHandlers.push({
              card,
              handleEnter,
              handleLeave,
            });
          });
        }

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

          if (reduceMotion) {
            gsap.set(
              [playgroundNumber, playgroundTitle, playgroundDescription],
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
              },
            );

            if (playgroundCircle) {
              gsap.set(playgroundCircle, {
                opacity: 0.2,
                scale: 1,
                rotation: 0,
              });
            }
          } else {
            const playgroundTimeline = gsap.timeline({
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
                  duration: isMobile ? 1.2 : 1.8,
                  ease: "power4.out",
                },
              );
            }

            if (playgroundNumber) {
              playgroundTimeline.fromTo(
                playgroundNumber,
                {
                  opacity: 0,
                  y: 20,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power3.out",
                },
                "-=0.9",
              );
            }

            if (playgroundTitle) {
              playgroundTimeline.fromTo(
                playgroundTitle,
                {
                  opacity: 0,
                  y: isMobile ? 70 : 140,
                  scale: isMobile ? 0.92 : 0.8,
                  rotateX: isMobile ? 0 : 50,
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  duration: isMobile ? 0.9 : 1.4,
                  ease: "power4.out",
                },
                "-=0.8",
              );
            }

            if (playgroundDescription) {
              playgroundTimeline.fromTo(
                playgroundDescription,
                {
                  opacity: 0,
                  y: 30,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power3.out",
                },
                "-=0.5",
              );
            }

            if (playgroundCircle) {
              gsap.to(playgroundCircle, {
                scale: isMobile ? 1.08 : 1.15,
                rotation: isMobile ? 15 : 30,
                duration: isMobile ? 9 : 6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: isMobile ? 1.2 : 1.8,
              });
            }
          }
        }

        if (architectureElement) {
          const architectureHeader = architectureElement.querySelector(
            ".react-app__architecture-header",
          );

          const architectureNodes = gsap.utils.toArray(
            ".react-app__architecture-node",
          );

          const architectureConnectors = gsap.utils.toArray(
            ".react-app__architecture-connector",
          );

          if (reduceMotion) {
            gsap.set(
              [
                architectureHeader,
                ...architectureNodes,
                ...architectureConnectors,
              ],
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                scaleX: 1,
                rotation: 0,
              },
            );
          } else {
            const architectureTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: architectureElement,
                start: "top 75%",
                once: true,
              },
            });

            if (architectureHeader) {
              architectureTimeline.fromTo(
                architectureHeader,
                {
                  opacity: 0,
                  y: isMobile ? 30 : 50,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: isMobile ? 0.6 : 0.8,
                  ease: "power3.out",
                },
              );
            }

            architectureNodes.forEach((node, index) => {
              architectureTimeline.fromTo(
                node,
                {
                  opacity: 0,
                  y: isMobile ? 30 : 40,
                  scale: isMobile ? 0.92 : 0.85,
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: isMobile ? 0.6 : 0.7,
                  ease: "power3.out",
                },
                index === 0 ? "-=0.2" : "-=0.4",
              );

              if (architectureConnectors[index]) {
                architectureTimeline.fromTo(
                  architectureConnectors[index],
                  {
                    scaleX: 0,
                  },
                  {
                    scaleX: 1,
                    duration: isMobile ? 0.35 : 0.5,
                    ease: "power2.out",
                  },
                  "-=0.3",
                );
              }
            });
          }
        }

        return () => {
          if (isDesktop && !reduceMotion) {
            window.removeEventListener("pointermove", pointerMove);
          }

          cardHandlers.forEach(({ card, handleEnter, handleLeave }) => {
            card.removeEventListener("mouseenter", handleEnter);

            card.removeEventListener("mouseleave", handleLeave);
          });
        };
      },
    );

    return () => {
      mm.revert();
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
                  ({ number, title, description, variant }) => html`
                    <article
                      className=${`react-app__card react-app__card--${
                        variant || "default"
                      }`}
                    >
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
      ${architecture
        ? html`
            <section className="react-app__architecture">
              <div className="react-app__architecture-header">
                <span>03</span>

                <div>
                  <h2>${architecture.title}</h2>

                  <p>${architecture.description}</p>
                </div>
              </div>

              <div className="react-app__architecture-flow">
                ${architecture.nodes.map(
                  (node, index) => html`
                    <div className="react-app__architecture-node">
                      <span> ${String(index + 1).padStart(2, "0")} </span>

                      <strong> ${node} </strong>
                    </div>

                    ${index < architecture.nodes.length - 1
                      ? html`
                          <div
                            className="react-app__architecture-connector"
                          ></div>
                        `
                      : ""}
                  `,
                )}
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

  let architecture = null;

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
        variant: (values[3] || "default")
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      });
    }

    if (section === "Playground" && values[1] && values[2]) {
      playground = {
        title: values[1],
        description: values[2],
      };
    }

    if (section === "Architecture" && values[1] && values.length >= 7) {
      const nodes = values.slice(2, 7).filter(Boolean);

      if (nodes.length) {
        architecture = {
          title: values[1],
          description: "From authored content to interactive presentation.",
          nodes,
        };
      }
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
      architecture,
    }),
  );
}
