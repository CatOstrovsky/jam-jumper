/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @license      CatOstrovsky
 */
import Config from "../const/config"

export class Wellcome extends Phaser.Scene {

  private _startButton: Phaser.GameObjects.Sprite = null

  constructor() {
    super({
      key: "wellcome",
    });
  }

  create() : void {
    this.add.image(Config.width/2, Config.height/2, 'ui@background').setOrigin(.5).setScale(.6)
    // this.add.text(Config.width/2, 30, "All ready!", { fontColor: 0xffffff, fontSize: 20, textAlign: 'center' }).setOrigin(.5, 0).setScale(.5);
    this._startButton = this.add.sprite(Config.width/2, Config.height/2 + 100, 'ui', '_f_000.png').setScale(.35)

    this._startButton.setInteractive().on('pointerup', this.onStartGame, this)

    this.add.tween({
      targets: [this._startButton],
      duration: 400,
      scaleX: .4,
      scaleY: .42,
      repeat: -1,
      yoyo: 1
    })

    this.add.text(Config.width/2, Config.height/2 - 150, 'Jam\nJumper', {fontSize: 50, textAlign: 'center'}).setOrigin(.5)
  }

  onStartGame() {
    this.scene.start('Game')
  }

  update() : void {

  }

}