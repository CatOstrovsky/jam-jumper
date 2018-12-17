import Config from '../const/config'

export default class Helper {

	public static LOCAL_MUSIC_VAR = 'LOCAL_MUSIC_VAR'
	public static LOCAL_SFX_VAR = 'LOCAL_SFX_VAR'
	public static LOCAL_HARD_VAR = 'LOCAL_HARD_VAR'
	public static LOCAL_HERO_VAR = 'LOCAL_HERO_VAR'
	public static ENABLE = 'ON'
	public static DISABLE = 'OFF'

	static setLocal(key: string, value: string) : void {
		window.localStorage.setItem(key, value)
	}

	static getLocal(key: string) : string | boolean {
		let data = window.localStorage.getItem(key)
		if(data) return data
		return false
	}

	static toggleSetting(key: string) {
		let enable = Helper.getLocal(key)
		if(enable != Helper.ENABLE) {
			Helper.setLocal(key, Helper.ENABLE)
		}else{
			Helper.setLocal(key, Helper.DISABLE)
		}
	}

	static drawHUD(ctx : Phaser.Scene) : void {
  		ctx.add.image(-20, 0, "ui@line").setOrigin(0,0).setDisplaySize(Config.width + 30, 20)
			ctx.add.image(Config.width - 10, 10, 'ui', 'ico_04').setOrigin(1, 0).setScale(.12).setInteractive()
			.on('pointerdown', () => ctx.add.tween({ targets: [ctx.cameras.main], duration: 300, scrollX: -1 * Config.width }) )

			let settingsWrapper = ctx.add.container(-1 * Config.width/2, Config.height/2),
    	settingsWindow = ctx.add.image(0,0, 'popup').setOrigin(.5).setScale(.5),
    	graphic = ctx.add.graphics().setPosition(-1 * (Config.width/2), -1 * (Config.height/2))

    	graphic.fillStyle(0x72cdfa, 1).fillRect(0,0, Config.width, Config.height)

    	let close = ctx.add.image(Config.width/2 - 80, Config.height/2 - 80, 'arrow').setOrigin(1,1).setInteractive();
    	close.on('pointerdown', () => ctx.add.tween({ 	targets: [ctx.cameras.main], duration: 300, scrollX: 0 }) )

			let title = ctx.add.dynamicBitmapText(-140, -210, 'main', `SETTINGS`, 50),
			musicText = ctx.add.dynamicBitmapText(-60, -110, 'main', `Enable game\nmusic?`, 30),
			effectsText = ctx.add.dynamicBitmapText(-60, -20, 'main', `Enable game\neffects?`, 30),
			hardMode = ctx.add.dynamicBitmapText(-60, 70, 'main', `Super hard\nmode?`, 30);

			settingsWrapper.add([graphic,settingsWindow, hardMode, musicText, title, effectsText, close])

			let btnMUSIC = ctx.add.image(-100, -80, 'ui', 'ico_07').setScale(.17).setInteractive(),
			btnSFX = ctx.add.image(-100, 10, 'ui', 'ico_07').setScale(.17).setInteractive(),
			btnHARD = ctx.add.image(-100, 100, 'ui', 'ico_07').setScale(.17).setInteractive();

			let icoMusic = ctx.add.image(btnMUSIC.x, btnMUSIC.y, 'audio').setScale(.7),
			icoSfx = ctx.add.image(btnSFX.x, btnSFX.y, 'sfx').setScale(.7),
			icoHard = ctx.add.image(btnHARD.x, btnHARD.y, 'hard').setScale(.7)

			settingsWrapper.add([btnMUSIC, btnSFX, btnHARD, icoMusic, icoSfx, icoHard])

			btnMUSIC.on('pointerdown', () => Helper.toggleSetting(Helper.LOCAL_MUSIC_VAR))
			btnSFX.on('pointerdown', () => Helper.toggleSetting(Helper.LOCAL_SFX_VAR))
			btnHARD.on('pointerdown', () => Helper.toggleSetting(Helper.LOCAL_HARD_VAR))
  }
}
