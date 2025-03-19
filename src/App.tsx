import './App.css'
import {Container as AppContainer} from "./components/Container"
import {extend} from "@pixi/react";
import {Viewport} from "pixi-viewport";
import {Container, Graphics, Sprite} from "pixi.js";

function App() {

	extend({Viewport, Container, Sprite, Graphics});

	return (
		<>
			<AppContainer/>
		</>
	)
}

export default App
