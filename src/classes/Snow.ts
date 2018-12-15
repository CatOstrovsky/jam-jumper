import Config from '../const/config'
import * as _ from 'lodash'

export default class Snow {
	private _ctx : Phaser.Scene = null
  	private _snowStack: Phaser.GameObjects.Group = null

	constructor(ctx) {

		this._ctx = ctx
		this.makeSnow()
	}

	private makeSnow() : void {
		this._snowStack = this._ctx.add.group({
		  defaultKey: 'snow',
		  maxSize: 80
		});

		let interval = setInterval(() => {
		  try{
		    this._snowStack.get(_.random(5, Config.width, false));
		  }catch(e){
		    clearInterval(interval)
		  }
		}, 400)

		}

	public dragSnow() : void {
		this._snowStack.getChildren().map((item: Phaser.GameObjects.Sprite) => {

		  if(item.angle == 0) item.setData('direction', -1)

		  item.setPosition(item.x + (item.data.get('direction') * .8), item.y + 1);

		  if(item.y > Config.height)
		    item.setPosition(_.random(5, Config.width, false), -10);

		  if(item.data.get('direction') == -1) {
		    item.angle -= 1
		    if(item.angle <= -90) item.setData('direction', 1)
		  }else{
		    item.angle += 1
		    if(item.angle >= 90) item.setData('direction', -1)
		  }
		})
	}
}