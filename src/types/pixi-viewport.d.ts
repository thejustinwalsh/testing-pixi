import { Viewport as PixiViewport } from "pixi-viewport";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      viewport: PixiViewport; // If you want stricter typing, replace `any` with the proper prop types
    }
  }
}
