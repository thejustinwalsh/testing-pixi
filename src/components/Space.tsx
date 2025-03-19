import {BunnySprite} from "./Bunny.tsx";
import {Pos} from "./Container.tsx";

interface SpaceProps {
	objects: Pos[]
}

export const Space = ({objects}: SpaceProps) => {
	return objects.map((o, i) => <BunnySprite x={o.x} y={o.y} key={i}/>)
}