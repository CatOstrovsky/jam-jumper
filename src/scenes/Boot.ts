/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @description  Boot game scene. Gift is preloader :)
 * @license      CatOstrovsky
 */
import Config from "../const/config"

export class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "boot"
    });
  }

  preload() : void {
    this.load.image('ui@background', 'assets/images/background.jpg')
    this.load.atlas('ui', 'assets/images/ui/sprites.png', 'assets/images/ui/sprites.json')
    this.load.image('ui@line', 'assets/images/ui/line.png')
    this.load.image('line', 'assets/images/line.png')
    
    this.load.image('hero', 'assets/images/smile.svg')
    this.load.bitmapFont('main', 'assets/fonts/font.png', 'assets/fonts/font.fnt');

    this.load.image('layer_1', 'assets/images/layer_1.png')
    this.load.image('layer_2', 'assets/images/layer_2.png')
    this.load.image('layer_3', 'assets/images/layer_3.png')

    this.load.image('snow', 'assets/images/snow.png')
    this.load.image('santa', 'assets/images/santa-claus.png')
    this.load.image('warning', 'assets/images/warning.png')
    this.load.image('deer', 'assets/images/deer.png')
    this.load.image('footer-snow', 'assets/images/footer-snow.png')

    this.load.atlas('enemy', 'assets/images/enemies/sprites.png', 'assets/images/enemies/sprites.json')
    this.load.atlas('boost', 'assets/images/boosts/sprites.png', 'assets/images/boosts/sprites.json')

    this.drawProgress()

  }

  drawProgress() {
    var progress = this.add.graphics();
    let bootText = this.add.text(Config.width/2,Config.height/2, "Load assets...", {color: "#ffffff", fontSize: "30px" }).setOrigin(.5,.5);

    var onProgress = (value:number) : void => {
        progress.clear();
        let progressProcent = parseInt(`${value*100}`);
        bootText.setText(`${progressProcent}%`)
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(0, 0, Config.width , Config.height * value);
    }

    this.load.on('progress', (value) : void => {
        onProgress(value);
    });
  }

  create() : void {
 
  	this.scene.start('wellcome');

  }

}