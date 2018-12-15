/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @license      CatOstrovsky
 */
import Config from "../const/config"
import _ from 'lodash'

export class Game extends Phaser.Scene {

  private _hero: Phaser.Physics.Arcade.Image = null
  private _keyboard: Phaser.Input.Keyboard.CursorKeys
  private _directionY: number = 0
  private _timeout: any = 0
  private _linesY: Array<number> = []
  private _stage: Phaser.Physics.Arcade.StaticGroup = null

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
   this._keyboard = this.input.keyboard.createCursorKeys()
   this._stage = this.physics.add.staticGroup()
   
   for (var i = 3; i >= 1; i--){
     let y = Config.height/4 * i;
     this._linesY.push(y)
     this._stage.add(this.add.image(Config.width/2, Config.height/4 * i, 'line').setScale(10, 1))
   }

   this._hero = this.physics.add.image(50, 0, 'hero').setDisplaySize(50, 50).setCircle(300)
   this._hero.setVelocityX(250).setBounce(.05, .1)

   this.physics.add.collider(this._stage, this._hero, null, this.stageCollider, this)

   setInterval(() => {
     this.addSaw()
   }, 1000)
  }

  addSaw() {
    let level = _.random(0, this._linesY.length-1),
    y = this._linesY[level-1],
    x = 0,
    speed = 200;
    if(Math.random() > .5) {
      x = Config.width
      speed = -200
    }

    let saw = this.physics.add.image(x, y - 50, 'saw').setVelocityX(speed).setOffset(0, -18)
    this.physics.add.collider(this._stage, saw)
  }

  getUserLevel() :number {
    let level = 1;
    for(let index in this._linesY) {
      let y = this._linesY[index]

      if(this._hero.body.position.y < y)
        level = parseInt(index) + 1 
    }

    return level
  }

  stageCollider(stageItem: Phaser.GameObjects.Image, hero: Phaser.Physics.Arcade.Image) {
    if(this._directionY == -1) {
      clearInterval(this._timeout)
      this._timeout = setTimeout(() => {this._directionY = 0}, 200)
      // this.cameras.main.shake(200)
      return false
    }else if(this._directionY == 1) {
      clearInterval(this._timeout)
      this._timeout = setTimeout(() => {this._directionY = 0}, 200)
      // this.cameras.main.shake(200)
      return false;
    }

    return true
  }

  update() : void {
    if(this._hero.body.position.x >= Config.width - this._hero.displayWidth && this._hero.body.velocity.x > 0) {
      this._hero.setVelocityX(-250)
    }else if(this._hero.body.position.x <= 0 && this._hero.body.velocity.x < 0){
      this._hero.setVelocityX(250)
    }

    if(this._directionY == 0) {
      if(this._keyboard.down.isDown) {
        if(this.getUserLevel() == 1) return;

        this._directionY = -1

        this.add.tween({
          targets: [this._hero],
          angle: 360,
          duration: 600
        })

      }else if(this._keyboard.up.isDown) {
        if(this.getUserLevel() == this._linesY.length) return;

        this._hero.setVelocityY(-550)
        this._directionY = 1

        this.add.tween({
          targets: [this._hero],
          angle: 360,
          duration: 600
        })

      }

    } 
  }

}