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
    this.load.image('line', 'assets/images/line.png')
    this.load.image('saw', 'assets/images/saw.png')
    this.load.image('hero', 'assets/images/smile.svg')
    this.drawProgress()

  }

  drawProgress() {
    var progress = this.add.graphics();
    let bootText = this.add.text(Config.width/2,Config.height/2, "Load assets...", {color: "#ffffff", fontSize: "30px" }).setOrigin(.5,.5);

    var onProgress = (value:number) : void => {
        progress.clear();
        let progressProcent = parseInt(`${value*100}`);
        bootText.setText(`${progressProcent}%`)
        progress.fillStyle(0x484848, 1);
        progress.fillRect(0, 0, Config.width , Config.height * value);
        console.log(value)
    }

    this.load.on('progress', (value) : void => {
        onProgress(value);
    });
  }

  create() : void {
 
  	this.scene.start('wellcome');

  }

}