

class Game extends egret.DisplayObjectContainer{
    //private static instance: Game

    
    private _cellSize:number = 100;//格子尺寸，正方形
    private _colSize:number = 20;//间隔
    private _row:number =4;//行
    private _col:number =4;//列
    private _mainWidth:number  = this._cellSize * this._col + this._colSize * ( this._col + 1 );
    private _mainHeight:number = this._cellSize * this._row + this._colSize * ( this._row + 1 );  
    private _mainBgRadius:number = 10;
    private _gridRadius:number = 10;
    private _gridBgColor:number = 0xEEE4DA;
	private _mainBgColor:number = 0x92DAF2;
    private _stageWidth:number= 640;
    private _grids:number[][]=[];
    private _x = (this._stageWidth-this._mainWidth)/2;
    private _y = 300;

    public constructor(){
        super();
        this.x = this._x;
	    this.y = this._y;
        this.addMainBg();
        this.addGridsBg();
    }
    private addMainBg(){
        let mainBg: egret.Shape = new egret.Shape()

        mainBg.graphics.beginFill(this._mainBgColor)
        mainBg.graphics.drawRoundRect( 0,0, this._mainWidth, this._mainHeight, this._mainBgRadius)
        mainBg.$graphics.endFill()
		
        this.addChild(mainBg);
        
        
    }
    private initGrids(){
        let index:number = 1
		for(let i = 0; i < this._row; i++) {
			this._grids[i] = []
			for(let j = 0; j < this._col; j++) {
				this._grids[i][j] = 0
			}
		}
    }
    private addGridsBg(){
        for(let i =0;i<this._row;i++){
            for(let j=0;j<this._col;j++){
                let cell:egret.Shape = new egret.Shape()
                cell.graphics.beginFill(this._gridBgColor, 0.35)
                cell.graphics.drawRoundRect(i*this._cellSize+(i+1)*this._colSize, j*this._cellSize+(j+1)*this._colSize, 
                                            this._cellSize, this._cellSize, 
                                            this._gridRadius)
                cell.graphics.endFill()

                this.addChild(cell)
                // this._grids[i][j];
            }
        }
    }

}