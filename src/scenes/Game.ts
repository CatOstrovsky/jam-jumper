/**
 * @author			CatOstrovsky <ska_live@mail.ru>
 * @copyright		2018 web-panda
 * @license		CatOstrovsky
 */
import Config from "../const/config"
import * as _ from "lodash"
import Snow from '../classes/Snow'
import Score from '../objects/Score'
import Hero from '../objects/Hero'
import Enemy from '../objects/Enemy'
import Gift from '../objects/Gift'
import Helper from '../classes/Helper'

export class Game extends Phaser.Scene {

  public linesY: Array<number> = []
  public stage: Phaser.Physics.Arcade.StaticGroup = null
  private _layers : Array<Phaser.GameObjects.Image> = []
  private _snow: Snow = null
  public score: Score = null
  public hero: Hero = null
  public enemy: Enemy = null
  public gift: Gift = null

  constructor() {
		super({
		key: "Game",
		physics: {
				default: 'arcade',
				arcade: {
					gravity: { y: 600 },
					// debug: true
				}
		},
		});
  }

  create() : void {

	this.drawStage()

	this.hero = new Hero(this)

	this.enemy = new Enemy(this)
	let timeEnemy = setInterval(() => {
		if(!this.hero || !this.hero._live){
      clearInterval(timeEnemy)
      return
    }
		this.enemy.addEnemy()
	}, 2000)

	this.gift = new Gift(this)
	let timerGift = setInterval(() => {
		if(!this.hero || !this.hero._live){
      clearInterval(timerGift)
      return
    }
		this.gift.addGift()
	}, 2000)

	this._snow = new Snow(this);
	Helper.drawHUD(this)
	this.score = new Score(this);

	this._layers.push( this.add.image(Config.width/2, Config.height + 50, 'footer-snow').setOrigin(.5, 1) )
  }

  drawStage() {
		this._layers.push( this.add.image(Config.width/2, Config.height, 'layer_1').setScale(.4).setOrigin(.5, 1) )
		this._layers.push( this.add.image(Config.width/2, Config.height, 'layer_2').setScale(.4).setOrigin(.5, 1) )

		this.stage = this.physics.add.staticGroup()

		for (var i = 3; i >= 1; i--){
			let y = Config.height/4 * i;
			this.linesY.push(y)
			this.stage.add(this.add.image(Config.width/2, Config.height/4 * i, 'line'))
		}

  }

  getUserLevel() :number {
		let level = 1;
		for(let index in this.linesY) {
			let y = this.linesY[index]

			if(this.hero.body.body.position.y < y)
				level = parseInt(index) + 1
		}

		return level
  }


  update() : void {
		this.hero.update()
		this._snow.dragSnow()
		this.enemy.update()
  }

}
