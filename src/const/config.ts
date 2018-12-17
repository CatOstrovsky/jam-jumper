import "phaser";

// Game config : GameConfig

let height = 580,
width = height * .7;

let client = {
	width: window.innerWidth,
	height: window.innerHeight
}

if(client.width < 500) {
	if(client.height > client.width) {
		height = client.height
		// width = client.width
	}else{
		height = client.width
		// width = client.height
	}
}

const config = {
	width: width,
	height: height,
	title: "TS Phaser3",
	url: "https://example.com",
	version: "1.0",
	zoom: 1,
	type: Phaser.AUTO,
	parent: "game",
	input: {
		keyboard: true,
		mouse: true,
		touch: true,
		gamepad: false
	},
	backgroundColor: "#55ccfc"
}

export default config;
