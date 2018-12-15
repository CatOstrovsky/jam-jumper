/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @license      CatOstrovsky
 */
import Config from "../const/config"
import * as _ from 'lodash'
import Snow from '../classes/Snow'

export class Wellcome extends Phaser.Scene {

  private _startButton: Phaser.GameObjects.Sprite = null
  private _layers : Array<Phaser.GameObjects.Image> = []
  private _snow: Snow = null

  constructor() {
    super({
      key: "wellcome",
    });
  }

  create() : void {
    this._layers.push( this.add.image(Config.width/2, Config.height, 'layer_1').setScale(.4).setOrigin(.5, 1) )
    this._layers.push( this.add.image(Config.width/2, Config.height, 'layer_2').setScale(.4).setOrigin(.5, 1) )
    this._layers.push( this.add.image(Config.width/2, Config.height, 'layer_3').setScale(.2).setOrigin(.5, 1) )

    this._snow = new Snow(this);
    
    this.add.image(Config.width/2 + 50, Config.height - 90, 'deer').setScale(.3)

    this._startButton = this.add.sprite(Config.width/2, Config.height/2 + 100, 'ui', 'ico_00').setScale(.25)
    this._startButton.setInteractive().on('pointerup', this.onStartGame, this)

    this.add.tween({
      targets: [this._startButton],
      duration: 400,
      scaleX: .3,
      scaleY: .32,
      repeat: -1,
      yoyo: 1
    })

    let title = this.add.dynamicBitmapText(Config.width/2, Config.height/2 - 200, 'main', `JAM JUMPER`, 50).setOrigin(.5,.5);
    this.add.tween({
      targets: [title],
      duration: 1000,
      yoyo: 1,
      repeat: -1,
      scaleX: 1.05
    })


    let santa = this.add.image(35, Config.height/2 - 50, 'santa').setOrigin(.5, .5).setAngle(55).setScale(.7)
  
    this.add.tween({
      targets: [santa],
      angle: 60,
      yoyo: 1,
      duration: 1200,
      repeat: -1
    })

  }


  onStartGame() {
    this.scene.start('Game')
  }

  update() : void {
    this._snow.dragSnow();
  }

}