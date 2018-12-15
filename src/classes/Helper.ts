import Config from '../const/config'

export default class Helper {

	static drawHUD(ctx : Phaser.Scene) {
  		ctx.add.image(-20, 0, "ui@line").setOrigin(0,0).setDisplaySize(Config.width + 30, 20)
		ctx.add.image(Config.width - 10, 10, 'ui', 'ico_04').setOrigin(1, 0).setScale(.12).setInteractive()
		.on('pointerdown', () => {
			ctx.add.tween({
				targets: [ctx.cameras.main],
				duration: 300,
				scrollX: -1 * Config.width
			})
		})

		let settingsWrapper = ctx.add.container(-1 * Config.width/2, Config.height/2),
    	settingsWindow = ctx.add.image(0,0, 'popup').setOrigin(.5).setScale(.4),
    	graphic = ctx.add.graphics().setPosition(-1 * (Config.width/2), -1 * (Config.height/2))

    	graphic.fillStyle(0x72cdfa, 1)
    	graphic.fillRect(0,0, Config.width, Config.height)

    	settingsWrapper.add(graphic)
    	settingsWrapper.add(settingsWindow)

    	let close = ctx.add.image(Config.width/2 - 20, Config.height/2 - 20, 'arrow').setOrigin(1,1).setInteractive();
    	close.on('pointerdown', () => {
    		console.log("click")
    		ctx.add.tween({
				targets: [ctx.cameras.main],
				duration: 300,
				scrollX: 0
			})
    	})

    	settingsWrapper.add(close)
  }
}
