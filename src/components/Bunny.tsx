import {useEffect, useRef, useState} from "react";
import {Assets, Sprite, Texture} from "pixi.js";

interface BunnyProp {
	x: number,
	y: number
}

export const BunnySprite = ({x, y}: BunnyProp) => {
	const spriteRef = useRef<Sprite>(null);
	const bunny = "https://pixijs.com/assets/bunny.png";
	const fish = "https://pixijs.com/assets/tutorials/fish-pond/fish1.png";

	const [texture, setTexture] = useState(Texture.EMPTY);
	const [isActive, setIsActive] = useState(false);
	useEffect(() => {
		if (texture === Texture.EMPTY) {
			Assets.load(bunny).then(res => setTexture(res));
		}
	}, [texture]);

	const handleClick = () => {
		if (!isActive) {
			Assets.load(fish).then(res => setTexture(res));
		} else {
			Assets.load(bunny).then(res => setTexture(res));
		}
		setIsActive(!isActive);
	}

	return <pixiSprite ref={spriteRef}
										 anchor={0.5}
										 eventMode="static"
										 onClick={() => handleClick()}
										 onTap={() => handleClick()}
										 scale={1}
										 texture={texture}
										 x={x}
										 y={y}

	/>
}