import {PixiViewport} from "./Viewport.tsx";
import {useEffect, useLayoutEffect, useState} from "react";
import {useApplication} from "@pixi/react";
import {Space} from './Space.tsx'
import {Pos} from "./Container.tsx";

interface CanvasElementsProps {
	data: Pos[];
}

const getWorldSize = (objects: Pos[]) => {
	let maxX = 0;
	let maxY = 0;
	objects.forEach(obj => {
		if (obj.x > maxX) maxX = obj.x;
		if (obj.y > maxY) maxY = obj.y;
	})
	return {maxX, maxY};
}

export const CanvasElements = ({data}: CanvasElementsProps) => {
	const [viewportInit, setViewportInit] = useState({
		worldWidth: 0,
		worldHeight: 0,
		screenWidth: 0,
		screenHeight: 0,
	});
	const {app} = useApplication();

	const handleResize = () => {
		const {maxX, maxY} = getWorldSize(data);

		const width = app.canvas.width;
		const height = app.canvas.height;

		setViewportInit({
			screenWidth: width,
			screenHeight: height,
			worldWidth: maxX + 100,
			worldHeight: maxY + 100,
		});
		console.log({
			screenWidth: width,
			screenHeight: height,
			worldWidth: maxX + 100,
			worldHeight: maxY + 100,
		})
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		console.log(data)
		return () => window.removeEventListener("resize", handleResize);
	},[]);

	useLayoutEffect(() => {
		handleResize();
	}, []);

	return (
		<PixiViewport viewPortInit={viewportInit}>
			<Space objects={data}/>
		</PixiViewport>
	);
};
