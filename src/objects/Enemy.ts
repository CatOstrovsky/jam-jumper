import Config from '../const/config'
import {Game as GameScene} from '../scenes/Game'
import * as _ from 'lodash'

export default class Hero {
	private _ctx: GameScene = null
	private _stack: Phaser.Physics.Arcade.Group = null


	constructor(ctx) {
		this._ctx = ctx;
		this._stack = this._ctx.physics.add.group({
			defaultKey: 'enemy',
			randomFrame: true,
			maxSize: 25
		})


		this._ctx.physics.add.collider(this._ctx.stage, this._stack)
		this._ctx.physics.add.collider(this._ctx.hero.body, this._stack, ()=>false, this.onCollideHero, this)
		return this
	}

	onCollideHero(hero, body) {
		this._ctx.hero.kill()
		return false
	}

	addEnemy() {
		let level = _.random(0, this._ctx.linesY.length-1, false),
		y = this._ctx.linesY[level],
		x = 0,
		speed = 200;
		if(Math.random() > .5) {
			x = Config.width
			speed = -180
		}

		this.addWarning(1500, (x > Config.width/2) ? ( x - 20) : (x + 20) , y - 50)
		.then(() => {
			this._stack.get(x, y - 50, this._stack.defaultKey, `${_.random(1, 5, false)}.png`).setVelocityX(speed)
		})

	}

	addWarning(time:number, x = 0, y = 0) : Promise<any> {
		return new Promise((resolve, reject) => {
			let warning = this._ctx.add.image(x, y, 'warning').setAngle(-20).setScale(.3)
			this._ctx.add.tween({
				targets: [warning],
				duration: 300,
				angle: 20,
				scaleX: .35,
				scaleY: .35,
				yoyo: 1,
				repeat: -1
			})

			setTimeout(() => {
				warning.destroy()
				resolve()
			}, time)
		})
	}

	update() {
		let items = this._stack.getChildren()
		for(let key in items) {
			let item: Phaser.Physics.Arcade.Sprite = items[key] as any
			
			if(!item.active) break;

			if(item.x > Config.width || item.x < 0) {
				this._stack.remove(item)
			}
		}
	}
}