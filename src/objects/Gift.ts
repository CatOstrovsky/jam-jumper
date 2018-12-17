import * as _ from 'lodash'
import Config from '../const/config'
import {Game as GameStage} from '../scenes/Game'

export default class Gift {
	private _ctx: GameStage = null
	private _stack: Phaser.Physics.Arcade.StaticGroup = null

	constructor(ctx) {
		this._ctx = ctx

		this._stack = this._ctx.physics.add.staticGroup({
			defaultKey: 'boost',
			randomFrame: true,
			maxSize: 25
		})

		this._ctx.physics.add.collider(this._stack, this._ctx.hero.body, null, this.onCollideHero, this)
	}

	onCollideHero(hero: Phaser.Physics.Arcade.Image, gift: Phaser.Physics.Arcade.Sprite) {
		let count = gift.getData('count')
		this._ctx.score.addScore(parseInt(count))
		this._stack.remove(gift)
		gift.destroy(true)
		return false
	}

	addGift(num = null) {
		if(!this._ctx.hero._live || !this._ctx.hero) return
		
		if(!num) num = _.random(1, 7, false)
		let y = this._ctx.linesY[ _.random(1, this._ctx.linesY.length - 1, false) ]

		let item = this._stack.get(_.random(20, Config.width - 20, false), y - 50, this._stack.defaultKey, `${num}.png`).setScale(.4)
		item.setData('count', num*2)
	}
}
