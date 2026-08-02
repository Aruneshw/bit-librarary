# Product Requirements Document (PRD): Rive Animation Integration

## 1. Overview
**Goal:** Implement a highly interactive, fluid, and lightweight motion graphics asset using **Rive** (`rive.app`). This document defines the animation states, state machine logic, and frontend integration specifications before the actual implementation phase.

## 2. Animation & Motion Specifications
The Rive animation will serve as a dynamic visual component that responds to user interactions (e.g., hover, click, scroll).

### 2.1 Visual Assets & Motion
- **Asset Type:** `.riv` format (vector-based, lightweight interactive animation).
- **Easing & Timing:** All transitions between states will use smooth cubic-bezier easing to feel organic and responsive.
- **Framerate:** 60fps targeted playback for buttery smooth motion.

### 2.2 Rive State Machine Architecture
The `.riv` file will utilize a **State Machine** (typically named `State Machine 1` or similar) to handle complex interactive logic on the client-side.

**State Machine Inputs:**
- `isHovered` (Boolean): Triggers the idle-to-hover transition.
- `onClick` (Trigger/Action): Fires a specific motion event (e.g., a burst, click response, or success state).
- `progress` (Number 0-100): *Optional* - Tied to scroll or loading state if applicable.

**States & Transitions:**
1. **Entry:** Initializes the animation.
2. **Idle (Looping):** A subtle, continuous motion (e.g., breathing, floating) while the user is not interacting.
3. **Hover (Playing/Looping):** An elevated or active motion state triggered when the mouse enters the component bounds.
4. **Active/Pressed (Trigger):** A sharp, immediate reaction to a user click.

## 3. Frontend Implementation Plan

### 3.1 Tech Stack & Dependencies
- **Library:** `@rive-app/react-canvas` (React environments) or `@rive-app/canvas` (Vanilla JS/Next.js integrations).
- **Hosting:** The `.riv` file will be hosted in the `public/assets/` directory (e.g., `public/assets/animation.riv`) to ensure fast loading via CDN.

### 3.2 Wrapper Component Design
A dedicated wrapper component (e.g., `RiveAnimationWrapper.tsx` or `RiveAnimationWrapper.js`) will be created to abstract the Rive canvas and handle the state machine logic.

**Key Component Responsibilities:**
- Lazy load the Rive component to prevent blocking the main thread.
- Bind React/DOM event listeners (`onMouseEnter`, `onMouseLeave`, `onClick`) to the Rive State Machine inputs.
- Handle responsive resizing of the canvas based on the parent container's dimensions.
- Manage memory by cleaning up the Rive instance on component unmount.

### 3.3 Example Code Structure (Conceptual)
```javascript
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export default function InteractiveRiveAsset() {
  const { rive, RiveComponent } = useRive({
    src: '/assets/animation.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
  });

  const hoverInput = useStateMachineInput(rive, 'State Machine 1', 'isHovered');

  return (
    <div 
      className="w-full h-full"
      onMouseEnter={() => hoverInput && (hoverInput.value = true)}
      onMouseLeave={() => hoverInput && (hoverInput.value = false)}
    >
      <RiveComponent />
    </div>
  );
}
```

## 4. Performance & Accessibility
- **Canvas Fallback:** Provide a static `.svg` or `.webp` fallback if the Rive canvas fails to load or for users with reduced motion preferences.
- **Accessibility:** Ensure the wrapper `<div>` has an `aria-label` describing the animation if it conveys meaning, or `aria-hidden="true"` if it is purely decorative.
- **`prefers-reduced-motion`:** Intercept the CSS media query and pause the Rive animation if the user has requested reduced motion.

## 5. Verification & Acceptance Criteria
- [ ] The `.riv` file loads successfully without console errors.
- [ ] The Idle animation loops seamlessly.
- [ ] Hover and click states transition smoothly without jumping or snapping.
- [ ] The component does not negatively impact Lighthouse performance scores (LCP, CLS).
- [ ] The animation cleans itself up properly on unmount (no memory leaks).
