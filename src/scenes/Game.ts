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

export class Game extends Phaser.Scene {

  public linesY: Array<number> = []
  public stage: Phaser.Physics.Arcade.StaticGroup = null
  private _layers : Array<Phaser.GameObjects.Image> = []
  private _snow: Snow = null
  public score: Score = null
  private _hero: Hero = null
  public enemy: Enemy = null

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

	this._hero = new Hero(this)
	this.physics.add.collider(this.stage, this._hero.body, null, this._hero.stageCollider, this._hero)

	this.enemy = new Enemy(this)
	setInterval(() => this.enemy.addEnemy() , 1000)

	this._snow = new Snow(this);
	this.drawHUD()
	this.score = new Score(this);

	this._layers.push( this.add.image(Config.width/2, Config.height + 50, 'footer-snow').setOrigin(.5, 1) )
  }

  drawHUD() {
  		this.add.image(-20, 0, "ui@line").setOrigin(0,0).setDisplaySize(Config.width + 30, 20)
		this.add.image(Config.width - 10, 10, 'ui', 'ico_04').setOrigin(1, 0).setScale(.12)
		this.add.image(Config.width - 10, 10, 'ui', 'ico_04').setOrigin(1, 0).setScale(.12)
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

			if(this._hero.body.body.position.y < y)
				level = parseInt(index) + 1 
		}

		return level
  }


  update() : void {
		this._hero.update()
		this._snow.dragSnow()
		this.enemy.update()
  }

}