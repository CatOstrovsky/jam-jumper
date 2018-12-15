export default class Score {
	private _ctx: Phaser.Scene = null
	public static SCORE_KEY: string = "gamgeScore"
	private _score: number = 0
	private _scoreEl: Phaser.GameObjects.DynamicBitmapText = null

	constructor(ctx) {
		this._ctx = ctx;

		let score = window.localStorage.getItem(Score.SCORE_KEY)
		if(score) this._score = parseInt(score)


		this.drawScore()
		this.sync()

		return this
	}

	getScore() : number {
		return this._score
	}

	addScore(total: number) : void {
		this._score += total
		this.sync()
	}

	removeScore(total: number) : void {
		this._score -= total
		this.sync()
	}

	sync() : void {
		window.localStorage.setItem(Score.SCORE_KEY, `${this._score}`)
		this._scoreEl.setText(`${this._score}`)
	}

	drawScore() : void {
		this._ctx.add.image(10, 10, 'boost', '1.png').setOrigin(0, 0).setScale(.4)
		this._scoreEl = this._ctx.add.dynamicBitmapText(40, 20, 'main', `${this._score}`, 20).setOrigin(0);
	}


}