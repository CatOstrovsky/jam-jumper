import Config from '../const/config'
import {Game as GameScene} from '../scenes/Game'
import {UserHeroes} from '../const/Heroes'

export default class Hero {
	private _ctx: GameScene = null
	public body: Phaser.Physics.Arcade.Image
	private _directionY: number = 0
 	private _keyboard: Phaser.Input.Keyboard.CursorKeys
 	private _timeout: any = 0
 	public _live : boolean = true
	private _touch: Phaser.Input.Pointer[]
	private _lastTouchPosition: Phaser.Math.Vector2 = null
	private _touchDirection: number = 0

	constructor(ctx) {
		this._ctx = ctx;
		this._keyboard = this._ctx.input.keyboard.createCursorKeys()
		this.addToStage()
		this.initTouches()
		return this
	}

	initTouches() {
		this._touch = this._ctx.input.addPointer(1);
		this._ctx.input.on('pointerdown', (event) => {
			this._lastTouchPosition = new Phaser.Math.Vector2(event.x, event.y)
		})
		this._ctx.input.on('pointerup', (event) => {
			let up = this._lastTouchPosition.y > event.y
			this._touchDirection = (up) ? 1 : -1
		})
	}

	addToStage() {
		this.body = this._ctx.physics.add.image(50, 0, 'hero', UserHeroes.getCurrent().name ).setDisplaySize(50, 50).setCircle(120).setAngle(-10)
		this.body.setVelocityX(250).setBounce(.05, .1).setFlipX(true)
		this._ctx.add.tween({ targets: [this.body],	duration: 100, angle: 10, repeat: -1,	yoyo: 1 });

		this._ctx.physics.add.collider(this._ctx.stage, this.body, null, this.stageCollider, this)

	}

	stageCollider(stageItem: Phaser.GameObjects.Image, hero: Phaser.Physics.Arcade.Image) {
		if(this._directionY == -1) {
			clearInterval(this._timeout)
			this._timeout = setTimeout(() => {this._directionY = 0}, 200)
			return false
		}else if(this._directionY == 1) {
			clearInterval(this._timeout)
			this._timeout = setTimeout(() => {this._directionY = 0}, 200)
			return false;
		}

		return true
	}

	kill() {
		if(!this._live) return;

		this.body.setMaxVelocity(0,0).setVelocityY(0).setVelocityX(0)
		this._live = false

		this._ctx.add.tween({ targets: [this.body],	duration: 1500, x: Config.width/2, y: Config.height/2,
			onComplete: () => {
				this._ctx.add.tween({
					targets: [this.body], duration: 1500, scaleX: 50, scaleY: 50, angle: 1000
				})

				this._ctx.add.tween({ targets: [this._ctx.cameras.main], alpha: .5, duration: 1200,
					onComplete: () => this._ctx.scene.start('wellcome')
				})
			}
		})
	}

	update() {
		if(!this._live) return;

		if(this.body.body.position.x >= Config.width - this.body.displayWidth && this.body.body.velocity.x > 0) {
			this.body.setVelocityX(-250)
			this.body.setFlipX(false)
		}else if(this.body.body.position.x <= 0 && this.body.body.velocity.x < 0){
			this.body.setVelocityX(250)
			this.body.setFlipX(true)
		}

		if(this._directionY == 0) {
			if(this._keyboard.down.isDown || this._touchDirection == -1) {
				this._touchDirection = 0
				if(this._ctx.getUserLevel() == 1) return;
				this._directionY = -1

				this._ctx.add.tween({ targets: [this.body], angle: 360, duration: 600 })

			}else if(this._keyboard.up.isDown || this._touchDirection == 1) {
				this._touchDirection = 0
				if(this._ctx.getUserLevel() == this._ctx.linesY.length) return;

				this.body.setVelocityY(Config.height / 1.38 * -1)
				this._directionY = 1

				this._ctx.add.tween({ targets: [this.body], angle: 360, duration: 600 })

			}
		}

		if(this.body.y > Config.height) {
			this.body.y = 0
			this.body.setVelocityY(0)
		}
	}

}
