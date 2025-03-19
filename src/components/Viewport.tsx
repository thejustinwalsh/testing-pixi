import {PropsWithChildren, useEffect, useRef} from 'react';
import {IClampZoomOptions, Viewport} from "pixi-viewport";
import {useApplication} from "@pixi/react";

interface PixiViewportProps {
	clampZoomOption?: IClampZoomOptions;
	viewPortInit: {
		worldWidth: number;
		worldHeight: number;
		screenWidth: number;
		screenHeight: number;
	}
}

export const PixiViewport = ({clampZoomOption, viewPortInit, children}: PropsWithChildren<PixiViewportProps>) => {
	const {app} = useApplication();
	const viewport = useRef<Viewport>(null);

	useEffect(() => {
		if (!viewport.current || !app.renderer) return;
		viewport.current.drag().pinch().wheel().decelerate().clamp(
			{
				left: true,
				right: true,
				top: true,
				bottom: true,
				direction: "all"
			}
		).clampZoom({
			minWidth: app.canvas.width,
			minHeight: app.canvas.height,
			...clampZoomOption
		});
	}, [viewPortInit, app.renderer]);

	useEffect(() => {
		// Add more detailed logging
		// console.log("ViewportInit received:", viewPortInit);
		if (viewPortInit.screenHeight > 0 && viewport.current) {
			// console.log("Resizing viewport with:", viewPortInit);

			// Check the correct order of parameters according to pixi-viewport docs
			viewport.current.resize(
				viewPortInit.screenWidth,
				viewPortInit.screenHeight,
				viewPortInit.worldWidth,
				viewPortInit.worldHeight
			);
			app.render();

		}
	}, [app, viewPortInit])


	return (
		app.renderer && viewPortInit && <viewport
			{...viewPortInit}
      events={app.renderer.events}
      ref={viewport}
    >{children}</viewport>
	);
}