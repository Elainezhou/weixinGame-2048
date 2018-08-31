

class Game extends egret.DisplayObjectContainer{

    private _cellSize:number = 100;//格子尺寸，正方形
    private _colSize:number = 20;//间隔
    private _row:number =4;//行
    private _col:number =4;//列
    private _mainWidth:number  = this._cellSize * this._col + this._colSize * ( this._col + 1 );
    private _mainHeight:number = this._cellSize * this._row + this._colSize * ( this._row + 1 );  
    private _mainBgRadius = 10;
    private _gridBgColor:number = 0xEEE4DA;
	private _mainBgColor:number = 0x92DAF2;

    public constructor(){
        super();
        this.addMainBg();
    }
    private addMainBg(){
        let mainBg: egret.Shape = new egret.Shape()

        mainBg.graphics.beginFill(this._mainBgColor)
        mainBg.graphics.drawRoundRect(0, 0, this._mainWidth, this._mainHeight, this._mainBgRadius)
        mainBg.$graphics.endFill()
		
        this.addChild(mainBg)
        
    }
}