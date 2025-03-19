import {PropsWithChildren, useRef} from 'react';
import {IClampZoomOptions, IViewportOptions, Viewport} from "pixi-viewport";
import {PixiReactElementProps, useApplication, useExtend} from "@pixi/react";

interface PixiViewportProps {
	clampZoomOption?: IClampZoomOptions;
	viewPortInit: {
		worldWidth: number;
		worldHeight: number;
		screenWidth: number;
		screenHeight: number;
	}
}

class CustomViewport extends Viewport {
  constructor(
    options: IViewportOptions & {
      decelerate?: boolean;
      drag?: boolean;
      pinch?: boolean;
      wheel?: boolean;
			clamp?: boolean;
			clampZoom?: IClampZoomOptions;
			viewportInit?: {
				worldWidth: number;
				worldHeight: number;
				screenWidth: number;
				screenHeight: number;
			};
    }
  ) {
    const { decelerate, drag, pinch, wheel, clamp, clampZoom, viewportInit, ...rest } = options;
    super(rest);

    if (decelerate) this.decelerate();
    if (drag) this.drag();
    if (pinch) this.pinch();
    if (wheel) this.wheel();
		if (clamp) this.clamp(
			{
				left: true,
				right: true,
				top: true,
				bottom: true,
				direction: "all"
			}
		);
		if (clampZoom) this.clampZoom(clampZoom);
		if (viewportInit) this.resize(viewportInit.screenWidth, viewportInit.screenHeight, viewportInit.worldWidth, viewportInit.worldHeight);
  }
}

declare module "@pixi/react" {
  interface PixiElements {
    pixiCustomViewport: PixiReactElementProps<typeof CustomViewport>;
  }
}

export const PixiViewport = ({clampZoomOption, viewPortInit, children}: PropsWithChildren<PixiViewportProps>) => {
	useExtend({ CustomViewport });

	const {app} = useApplication();
	const viewport = useRef<Viewport>(null);

	return (
		<pixiCustomViewport clamp drag pinch wheel decelerate clampZoom={clampZoomOption}
			{...viewPortInit}
      events={app.renderer.events}
      ref={viewport}
    >{children}</pixiCustomViewport>
	);
}
