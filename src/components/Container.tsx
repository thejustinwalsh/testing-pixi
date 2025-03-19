import {useEffect, useMemo, useRef, useState} from "react";
import {Application} from "@pixi/react";
import {CanvasElements} from "./CanvasElements";

export type Pos = {
	x: number,
	y: number
}

const SPACE = [
	{
		id: "one",
		name: "One",
		assets: [{x: 100, y: 100}, {x: 200, y: 200}] as Pos[],
	},
	{id: "two", name: "Two", assets: [{x: 200, y: 100}, {x: 100, y: 200}] as Pos[]}
];

export const Container = () => {
	const [activeSpace, setActiveSpace] = useState<string>();
	const [activeData, setActiveData] = useState<Pos[]>();
	const [isInit, setIsInit] = useState(false);

	const loaded = useMemo(() => isInit && activeData, [isInit, activeData ]);
	const canvasContainer = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setActiveSpace(SPACE[0].id);
	}, []);

	useEffect(() => {
		const getActiveAssets = SPACE.find((r) => r.id === activeSpace);
		if (!getActiveAssets) return;
		setActiveData(getActiveAssets.assets as Pos[]);
	}, [activeSpace]);

	return (
		<section>
			<div>
				{SPACE.map((space) => {
					return (
						<button key={space.id} onClick={() => setActiveSpace(space.id)}>{space.name}</button>
					);
				})}
			</div>

			<div ref={canvasContainer} className="h-dvh w-full">
				<Application antialias resizeTo={canvasContainer} onInit={() => setIsInit(true)} backgroundColor={0xfee685}>
					{loaded && <CanvasElements data={activeData!}/>}
				</Application>
			</div>
		</section>
	);
};
