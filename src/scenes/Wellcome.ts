/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @license      CatOstrovsky
 */
import Config from "../const/config"
import * as _ from 'lodash'
import Snow from '../classes/Snow'
import Helper from '../classes/Helper'

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

    let title = this.add.dynamicBitmapText(20, Config.height/2 - 200, 'main', `JAM JUMPER`, 50)
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

    Helper.drawHUD(this)
    this.add.image(Config.width - 70, 10, 'ui', 'ico_05').setOrigin(1, 0).setScale(.12).setInteractive()
    .on('pointerdown', () => {
      this.add.tween({
        targets: [this.cameras.main],
        duration: 300,
        scrollX: Config.width
      })
    })

    this.add.image(Config.width - 125, 8, 'ui', 'ico_03').setOrigin(1, 0).setScale(.12).setInteractive()
    .on('pointerdown', () => {
      this.add.tween({
        targets: [this.cameras.main],
        duration: 300,
        scrollY: Config.height
      })
    })

    this.drawShop()
    this.drawInfo()
  }
  drawInfo() {
      let infoWrapper = this.add.container(Config.width/2, Config.height/2 + Config.height),
      infoWindow = this.add.image(0,0, 'popup').setOrigin(.5).setScale(.4),
      graphic = this.add.graphics().setPosition(-1 * (Config.width/2), -1 * (Config.height/2))

      graphic.fillStyle(0x72cdfa, 1)
      graphic.fillRect(0,0, Config.width, Config.height)

      infoWrapper.add(graphic)
      infoWrapper.add(infoWindow)

      let close = this.add.image((-1 * Config.width/2) + 20, 20, 'arrow').setOrigin(1,1).setInteractive().setFlipX(true).setAngle(-90);
      close.on('pointerdown', () => {
        this.add.tween({
          targets: [this.cameras.main],
          duration: 300,
          scrollX: 0
        })
      })

      infoWrapper.add(close)
  }

  drawShop() {
      let shopWrapper = this.add.container(Config.width/2 + Config.width, Config.height/2),
      shopWindow = this.add.image(0,0, 'popup').setOrigin(.5).setScale(.4),
      graphic = this.add.graphics().setPosition(-1 * (Config.width/2), -1 * (Config.height/2))

      graphic.fillStyle(0x72cdfa, 1)
      graphic.fillRect(0,0, Config.width, Config.height)

      shopWrapper.add(graphic)
      shopWrapper.add(shopWindow)

      let close = this.add.image((-1 * Config.width/2) + 20, Config.height/2 - 20, 'arrow').setOrigin(1,1).setInteractive().setFlipX(true);
      close.on('pointerdown', () => {
        this.add.tween({
          targets: [this.cameras.main],
          duration: 300,
          scrollX: 0
        })
      })

      shopWrapper.add(close)
  }


  onStartGame() {
    this.scene.start('Game')
  }

  update() : void {
    this._snow.dragSnow();
  }

}