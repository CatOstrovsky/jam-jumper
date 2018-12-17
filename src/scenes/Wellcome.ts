/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @license      CatOstrovsky
 */

import Config from "../const/config"
import * as _ from 'lodash'
import Snow from '../classes/Snow'
import Helper from '../classes/Helper'
import { UserHeroes, Hero } from '../const/Heroes'
import Score from '../objects/Score'

interface HeroGridItem {
  locker?: Phaser.GameObjects.Image
  price?: Phaser.GameObjects.Text
  avatar: Phaser.GameObjects.Image
  graphics?: Phaser.GameObjects.Graphics
  tweenHero?: Phaser.Tweens.Tween,
  hero: Hero,
  position: Phaser.Math.Vector2
}

export class Wellcome extends Phaser.Scene {

  private _startButton: Phaser.GameObjects.Sprite = null
  private _layers : Array<Phaser.GameObjects.Image> = []
  private _snow: Snow = null
  private _heroesGrid: HeroGridItem[] = []
  private score: Score = null

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
    this.add.image(Config.width/2 + 50, Config.height - 90, 'hero', 'deer').setScale(.3)

    this._startButton = this.add.sprite(Config.width/2, Config.height/2 + 100, 'ui', 'ico_00').setScale(.25)
    this._startButton.setInteractive().on('pointerup', this.onStartGame, this)

    this.add.tween({ targets: [this._startButton], duration: 400, scaleX: .3, scaleY: .32, repeat: -1, yoyo: 1 })

    let title = this.add.dynamicBitmapText(20, Config.height/2 - 200, 'main', `JAM JUMPER`, 50)
    this.add.tween({ targets: [title], duration: 1000, yoyo: 1, repeat: -1, scaleX: 1.05 })

    let santa = this.add.image(35, Config.height/2 - 50, 'santa').setOrigin(.5, .5).setAngle(55).setScale(.7)

    this.add.tween({ targets: [santa], angle: 60, yoyo: 1, duration: 1200, repeat: -1 })

    Helper.drawHUD(this)
    this.add.image(Config.width - 70, 10, 'ui', 'ico_05').setOrigin(1, 0).setScale(.12).setInteractive()
    .on('pointerdown', () => {
      this.add.tween({ targets: [this.cameras.main],  duration: 300, scrollX: Config.width })
    })

    this.drawShop()
  }

  redrawShopGrid() {
    let allHeroes = UserHeroes.getAllHeroes(),
    currentHero = UserHeroes.getCurrent();

    for(let hero of this._heroesGrid) {
      if(hero.hero.purchased) {
        if(hero.locker) hero.locker.destroy()
        if(hero.price) hero.price.destroy()
        hero.avatar.setAlpha(1)

        hero.graphics.clear()
        hero.graphics.fillStyle(0xffffff, 1)
        if(hero.hero.name == currentHero.name) hero.graphics.fillStyle(0xdedede, 1)
        hero.graphics.fillRect(hero.position.x, hero.position.y, 90, 90)

      }
    }

    this.score.resync()
  }

  drawShop() {
      let mainGraphic = this.add.graphics().setPosition(-1 * (Config.width/2), -1 * (Config.height/2))
      mainGraphic.fillStyle(0x72cdfa, 1).fillRect(0,0, Config.width, Config.height)

      let graphics = [];
      /* Draw base control buttons and other */
      let shopWrapper = this.add.container(Config.width/2 + Config.width, Config.height/2);
      let close = this.add.image((-1 * Config.width/2) + 10, Config.height/2 - 10, 'arrow').setOrigin(0,1).setInteractive().setFlipX(true);
      close.on('pointerdown', () => { this.add.tween({ targets: [this.cameras.main], duration: 300, scrollX: 0 }) })

      let topline = this.add.image(-20, 0, "ui@line").setOrigin(0,0).setDisplaySize(Config.width + 30, 20).setPosition(Config.width/2 * -1, Config.height/2 * -1)

      /**
       * Draw heroes grid
       */
      let heroes: Phaser.GameObjects.Image[] = [],
      currentHero: Hero = UserHeroes.getCurrent(),
      allHeroes: Hero[] = [].concat(UserHeroes.getAllHeroes()),
      lockers : Phaser.GameObjects.Image[] = [],
      other : any[] = [];

      for (var y = 0; y <= 4; y++) {
        for (var x = 0; x <= 3; x++) {
          let hero = allHeroes.splice(0, 1)[0],
          posX = 10 + (100 * x),
          posY = 45 + (100 * y);

          if(hero) {

            let graphic = this.add.graphics().setPosition(-1 * (Config.width/2), -1 * (Config.height/2))

            let heroEl = this.add.image(posX - Config.width/2 + 45, posY - Config.height/2 + 45, 'hero', hero.frame).setScale(.3);
            heroes.push(heroEl)

            let gridItem: HeroGridItem = { avatar: heroEl, hero: hero, position: new Phaser.Math.Vector2(posX, posY) }

            if(!hero.purchased) {
              let locker = this.add.image(heroEl.x, heroEl.y, 'locked').setScale(.2).setAngle(10).setInteractive()
              lockers.push(locker)
              locker.on('pointerdown',() => { UserHeroes.buy(hero.name); this.redrawShopGrid()})

              heroEl.setAlpha(.1)

              let price = this.add.text(locker.x, locker.y + 35, `${hero.price}`).setColor('#000000').setOrigin(.5)
              other.push(price)

              gridItem.locker = locker
              gridItem.price = price
            }

            heroEl.setInteractive().on('pointerdown', () => {
              if(hero.purchased)
                UserHeroes.setCurrent(hero)

              this.redrawShopGrid();
            })

            graphic.fillStyle(0xffffff, 1)
            if(hero.name == currentHero.name) graphic.fillStyle(0xdedede, 1)
            graphic.fillRect(posX, posY, 90, 90)

            gridItem.graphics = graphic
            this._heroesGrid.push(gridItem);
            graphics.push(graphic)
          }

        }
      }

      this.add.tween({ targets: lockers,  yoyo: 1, repeat: -1, duration: () => _.random(300, 600, false), angle: -10})

      shopWrapper.add([mainGraphic, ...graphics, close,...heroes,...lockers,...other, topline ]);

      this.score = new Score(this);
      this.score.scoreContainer.setPosition(Config.width/2 * -1, Config.height/2 * -1)
      shopWrapper.add(this.score.scoreContainer)
  }


  onStartGame() {
    this.scene.start('Game')
  }

  update() : void {
    this._snow.dragSnow();
  }

}
