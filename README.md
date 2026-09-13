# AEM Edge Delivery Services

![AEM](https://img.shields.io/badge/Adobe-AEM%20Edge%20Delivery%20Services-FF0000)
![React](https://img.shields.io/badge/React-19-61DAFB)
![GSAP](https://img.shields.io/badge/GSAP-animation-88CE02)
![SCSS](https://img.shields.io/badge/SCSS-styling-CC6699)
![DA.live](https://img.shields.io/badge/Content-DA.live-1473E6)

A small application-centric UI experiment built on top of Adobe's Edge Delivery Services boilerplate.

The project explores how a content-authored AEM Edge Delivery Services site can combine:

- React for application-oriented UI rendering
- GSAP for interaction and motion
- SCSS for structured styling
- DA.live for content authoring
- Responsive and accessible interaction patterns
- Content-driven presentation variants
- Performance-conscious animation
- Reusable Edge Delivery fragments for navigation and footer

The goal is not to reproduce a predefined visual design. The goal is to demonstrate the engineering decisions behind a modern, interactive UI implemented within the Edge Delivery Services model.

---

## Live Demo

### Production

https://main--aem-test-app--mccabrus.aem.live/

### Preview

https://main--aem-test-app--mccabrus.aem.page/

### Source

https://github.com/McCABRUS/aem-test-app

---

## What This Project Demonstrates

This implementation focuses on the following Senior UI Engineer concerns:

### Content-driven UI

Content is authored independently in DA.live and consumed by the React block.

The main `react-app` block does not hardcode the page content. It parses the authored block structure and creates the corresponding React data model.

```text
DA.live
   ↓
Edge Delivery markup
   ↓
decorate()
   ↓
content parsing / validation
   ↓
React props
   ↓
UI
```

This allows authors to update content without changing the presentation layer.

---

## Application Architecture

The main page is built around an application-oriented React block:

```text
                     DA.live
                        │
                        ▼
               Edge Delivery Services
                        │
                        ▼
                  react-app block
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
            React                SCSS
              │
              ▼
             GSAP
              │
       ┌──────┼───────┐
       ▼      ▼       ▼
     Hero   Cards   Architecture
```

The site-level navigation and footer remain Edge Delivery fragments rather than being moved into React.

```text
Edge Delivery page
│
├── Header fragment
│
├── React application block
│   ├── Hero
│   ├── Capabilities
│   ├── Playground
│   └── Architecture
│
└── Footer fragment
```

This keeps reusable site chrome separate from the application-oriented block.

---

# React Application Block

The primary custom implementation lives in:

```text
blocks/
└── react-app/
    ├── react-app.js
    └── react-app.scss
```

The block is responsible for:

- Parsing authored content
- Validating required fields
- Normalizing capability variants
- Rendering React UI
- Initializing GSAP
- Managing responsive animations
- Handling reduced-motion preferences
- Managing scroll-triggered interactions
- Cleaning up event listeners and GSAP contexts

---

## Content Model

The React block is authored as a table in DA.live.

The current content model contains four content types.

### Hero

```text
Hero
AEM · REACT · GSAP · SCSS
BUILD|FOR THE|WEB.
A small Edge Delivery Services experiment combining React components, GSAP animation and Sass without external assets.
```

The `|` character is used to create title lines.

### Capabilities

```text
Capabilities | React | Description | frontend
Capabilities | GSAP  | Description | animation
Capabilities | Sass  | Description | styling
```

The fourth field is an authorable visual variant.

React converts it into classes such as:

```text
react-app__card--frontend
react-app__card--animation
react-app__card--styling
```

Unknown variants are normalized to:

```text
default
```

This prevents arbitrary authored values from becoming uncontrolled CSS classes.

### Playground

```text
Playground
Creative code playground
Everything here is generated with CSS, React and JavaScript. No image assets required.
```

### Architecture

```text
Architecture
Content-driven AEM experience
DA.live
Edge Delivery
React
GSAP
SCSS
```

The Architecture section visualizes the relationship between the content source, delivery layer, UI runtime and styling/animation layers.

---

# Motion System

GSAP is used as the animation layer.

The project intentionally separates:

```text
Presentation
    ↓
SCSS

Motion
    ↓
GSAP
```

This avoids making animation rules part of the content model.

## Hero

The Hero includes:

- staged entrance animation
- animated grid
- continuously moving orb
- pointer interaction
- responsive motion

The orb is generated entirely with CSS using gradients and filters. No external image assets are required.

## Capabilities

Capability cards use:

- `ScrollTrigger` for entrance animations
- `quickTo()` for high-frequency hover interaction
- authorable visual variants
- reduced-motion handling

Using `gsap.quickTo()` avoids creating a new tween for every pointer or hover update.

## Architecture

Architecture nodes are progressively revealed with `ScrollTrigger`.

The animation sequence is:

```text
DA.live
   ↓
Edge Delivery
   ↓
React
   ↓
GSAP
   ↓
SCSS
```

The connectors are animated independently so the relationship between nodes becomes part of the visual explanation.

---

# Responsive Motion

The application uses:

```javascript
gsap.matchMedia();
```

with separate desktop/mobile/reduced-motion conditions.

```text
Desktop
├── Orb pointer interaction
├── Larger motion distances
├── Parallax grid
└── Card hover interaction

Mobile
├── Reduced movement
├── No pointer-based orb interaction
├── Smaller transforms
└── Touch-friendly layout

Reduced Motion
├── Continuous motion disabled
├── Transform-heavy entrance animations disabled
└── Content remains fully visible
```

This keeps interaction appropriate for different input modes and accessibility preferences.

---

# Accessibility

Accessibility was treated as part of the component architecture rather than a final polish step.

### Reduced motion

Both GSAP and CSS respond to:

```css
@media (prefers-reduced-motion: reduce);
```

The React animation system also checks the media preference through `gsap.matchMedia()`.

### Keyboard navigation

The existing Edge Delivery navigation behavior is preserved, including:

- keyboard navigation
- Escape handling
- focus management
- mobile menu handling

### Focus states

Interactive links and buttons use:

```css
:focus-visible;
```

with visible focus indicators.

### Decorative content

Visual-only elements such as:

- the Hero grid
- the orb
- decorative Architecture connectors

are excluded from the accessibility tree where appropriate.

### Semantic structure

Sections use semantic headings and ARIA relationships such as:

```text
aria-labelledby
aria-hidden
```

where appropriate.

---

# Header and Footer

The header and footer remain Edge Delivery fragments rather than React components.

This is intentional.

## Navigation

The `/nav` fragment contains three primary sections:

```text
Section 1
AEM LAB

Section 2
Home
Capabilities
Playground
Architecture

Section 3
GitHub
```

The existing boilerplate navigation behavior is preserved while the visual layer is customized.

The GitHub link opens in a new tab using:

```html
target="_blank" rel="noopener noreferrer"
```

## Footer

The `/footer` fragment contains four authorable sections:

```text
AEM LAB
Interactive Edge Delivery experiment.

Explore
Home
Capabilities
Playground
Architecture

Stack
AEM
React
GSAP
SCSS

Source
GitHub
```

The layout is implemented in CSS so content remains editable in DA.live.

---

# Styling Architecture

SCSS is used for component-level styling.

The main styling responsibilities are:

```text
react-app.scss
├── Layout
├── Hero
├── Grid
├── Orb
├── Buttons
├── Capability cards
├── Playground
├── Architecture
├── Responsive behavior
└── Reduced-motion styling
```

The header and footer maintain their own CSS:

```text
blocks/
├── header/
│   ├── header.js
│   └── header.css
│
├── footer/
│   ├── footer.js
│   └── footer.css
│
└── react-app/
    ├── react-app.js
    └── react-app.scss
```

---

# Performance Considerations

The implementation intentionally avoids unnecessary runtime work.

## High-frequency pointer interaction

Instead of creating a new GSAP tween for every `pointermove`, the orb uses:

```javascript
gsap.quickTo();
```

This keeps pointer interaction responsive without continuously creating new tweens.

## Animation properties

Motion primarily uses:

```text
transform
opacity
```

rather than layout-affecting properties.

## Responsive event handling

Pointer interaction is only enabled for desktop conditions.

Mobile devices do not receive unnecessary pointer listeners.

## Animation cleanup

GSAP animations are created inside:

```javascript
gsap.matchMedia();
```

and reverted when the component context changes.

Event listeners for pointer and hover interactions are explicitly removed during cleanup.

## Dependency scope

Large dependencies are used only by the block that needs them.

---

# Edge Delivery Services Workflow

The project follows the standard Edge Delivery development workflow.

## Local development

Install the AEM CLI:

```bash
npm install -g @adobe/aem-cli
```

Clone the repository:

```bash
git clone https://github.com/McCABRUS/aem-test-app.git
```

Enter the project:

```bash
cd aem-test-app
```

Start the local server:

```bash
aem up
```

The local application is available at:

```text
http://localhost:3000/
```

## SCSS compilation

```bash
npm run build:scss
```

## Linting

JavaScript:

```bash
npm run lint:js
```

CSS:

```bash
npm run lint:css
```

Full lint:

```bash
npm run lint
```

---

# Authoring Workflow

The site content is maintained separately from the code.

Typical flow:

```text
Author content in DA.live
        ↓
Preview
        ↓
Validate
        ↓
Publish
        ↓
.aem.live
```

The `/nav` and `/footer` documents are authored as reusable fragments rather than duplicated on the main page.

---

# Deployment Model

Code changes are committed to GitHub.

```text
Local development
       ↓
Git
       ↓
main
       ↓
AEM Code Sync
       ↓
.aem.page / .aem.live
```

Content follows a separate authoring and publishing flow through DA.live.

---

# Technical Decisions

## Why React?

React is used selectively for the custom application block rather than replacing the entire page runtime.

This keeps the project aligned with Edge Delivery Services while allowing component-driven UI where it provides value.

The result is:

```text
EDS page architecture
        +
React application island
```

rather than a full SPA framework replacing the site architecture.

## Why GSAP?

GSAP is used because the project requires:

- timeline orchestration
- scroll-driven animation
- continuous motion
- responsive motion conditions
- efficient pointer interaction

## Why SCSS?

SCSS provides:

- reusable design tokens
- nesting
- component-oriented organization
- responsive rules
- variant styling

## Why no external image assets?

The visual system deliberately generates its graphics through code:

```text
CSS gradients
CSS grid
GSAP transforms
CSS filters
```

This keeps the demo focused on UI engineering rather than asset production.

---

# What I Would Discuss in a Senior UI Engineer Interview

This project provides several useful discussion points.

### AEM / EDS architecture

- Content vs code lifecycle
- DA.live authoring
- Edge Delivery fragments
- Block decoration
- `.aem.page` vs `.aem.live`
- Git-based code synchronization

### React

- When React adds value inside EDS
- Component boundaries
- Data parsing and validation
- Avoiding unnecessary React responsibility for site chrome

### Animation

- GSAP timelines
- ScrollTrigger
- `gsap.matchMedia()`
- `gsap.quickTo()`
- animation cleanup
- reduced-motion support

### Accessibility

- semantic sections
- focus states
- keyboard interaction
- reduced motion
- decorative content

### Performance

- high-frequency pointer events
- transform-based animation
- responsive event registration
- dependency scope
- avoiding unnecessary DOM work

### CMS-driven UI

- authorable variants
- content validation
- separation between content and presentation
- handling malformed authoring input safely

---

# Known Trade-offs

This is intentionally a focused technical exercise rather than a production application.

### Content parsing

The React block parses the authored DA.live structure directly. A larger production system could introduce a more formal content schema or reusable parsing utilities.

### Visual design

The page uses a generated visual language rather than a formal design system.

### Testing

The current exercise focuses primarily on integration and UI behavior. Unit and automated browser tests would be the next engineering step.

### Navigation

The site uses anchor navigation rather than introducing a client-side router because the page is a single Edge Delivery document.

---

# Potential Next Steps

For a production implementation, I would consider:

```text
Unit tests for content parsing
        ↓
Component / integration tests
        ↓
Automated accessibility checks
        ↓
Lighthouse / Core Web Vitals validation
        ↓
Performance profiling
        ↓
Formal design-token system
        ↓
Storybook or component documentation
```

These are intentionally left outside the current scope to keep the exercise focused.

---

# Project Structure

```text
aem-test-app/
│
├── blocks/
│   ├── header/
│   │   ├── header.js
│   │   └── header.css
│   │
│   ├── footer/
│   │   ├── footer.js
│   │   └── footer.css
│   │
│   ├── react-app/
│   │   ├── react-app.js
│   │   └── react-app.scss
│   │
│   └── ...
│
├── scripts/
├── styles/
├── fonts/
├── icons/
├── package.json
├── .eslintrc.js
├── .stylelintrc.json
└── README.md
```

---

# Evaluation Summary

This experiment intentionally demonstrates more than a visual implementation.

| Area                              | Demonstrated |
| --------------------------------- | ------------ |
| Adobe Edge Delivery Services      | ✓            |
| DA.live authoring                 | ✓            |
| Reusable fragments                | ✓            |
| React integration                 | ✓            |
| GSAP animation                    | ✓            |
| ScrollTrigger                     | ✓            |
| Responsive animation              | ✓            |
| Reduced motion                    | ✓            |
| Accessibility                     | ✓            |
| Content validation                | ✓            |
| Authorable presentation variants  | ✓            |
| Performance-conscious interaction | ✓            |
| SCSS architecture                 | ✓            |
| Responsive UI                     | ✓            |
| Git-based development workflow    | ✓            |

---

## Links

**Live:**  
https://main--aem-test-app--mccabrus.aem.live/

**Preview:**  
https://main--aem-test-app--mccabrus.aem.page/

**Repository:**  
https://github.com/McCABRUS/aem-test-app
