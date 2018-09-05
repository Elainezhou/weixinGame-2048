

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
    private _two_probability = 0.8;
    private _addGridAmount = 2;
    private _gridsDisplayContainer = new egret.DisplayObjectContainer();
    private startX = undefined;
    private startY = undefined;
    private _gridInfo = {
        2:{
            "num": 2,
            "color": 0x776e65,
            "backgroundColor": 0xeee4da,
            "fontSize": 65
        },
        4:{
            "num": 4,
            "color": 0x776e65,
            "backgroundColor": 0xede0c8,
            "fontSize": 65
        },
        8:{
            "num": 8,
            "color": 0xf9f6f2,
            "backgroundColor": 0xf2b179,
            "fontSize": 55
        },
        16:{
            "num": 16,
            "color": 0xf9f6f2,
            "backgroundColor": 0xf59563,
            "fontSize": 55
        },
        32:{
            "num": 32,
            "color": 0xf9f6f2,
            "backgroundColor": 0xf67c5f,
            "fontSize": 55
        },
        64:{
            "num": 64,
            "color": 0xf9f6f2,
            "backgroundColor": 0xf65e3b,
            "fontSize": 55
        },
        128:{
            "num": 128,
            "color": 0xf9f6f2,
            "backgroundColor": 0xedcf72,
            "fontSize": 45
        },
        256: {
            "num": 256,
            "color": 0xf9f6f2,
            "backgroundColor": 0xedcc61,
            "fontSize": 45
        },
        512:{
            "num": 512,
            "color": 0xf9f6f2,
            "backgroundColor": 0xedc850,
            "fontSize": 45
        },
        1024:{
            "num": 1024,
            "color": 0xf9f6f2,
            "backgroundColor": 0xabe358,
            "fontSize": 35
        },
        2048:{
            "num": 2048,
            "color": 0xf9f6f2,
            "backgroundColor": 0x4dd9cf,
            "fontSize": 35
        },
        4096:{
            "num": 4096,
            "color": 0xf9f6f2,
            "backgroundColor": 0xa283f9,
            "fontSize": 35
        },
        8192:{
            "num": 8192,
            "color": 0xf9f6f2,
            "backgroundColor": 0xf98383,
            "fontSize": 35
        }
    }
    

    public constructor(){
        super();
        this.x = this._x;
	    this.y = this._y;
        this.addMainBg();
        this.addGridsBg();
        this.initGrids();
        this.addGrids();
        this.drawGrids();
        this.addChild(this._gridsDisplayContainer);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this)
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this)


    }
    private addMainBg(){
        let mainBg: egret.Shape = new egret.Shape()

        mainBg.graphics.beginFill(this._mainBgColor)
        mainBg.graphics.drawRoundRect( 0,0, this._mainWidth, this._mainHeight, this._mainBgRadius)
        mainBg.$graphics.endFill()
		
        this.addChild(mainBg)
        
        
    }
    private initGrids(){
        let index:number = 1
		for(let i = 0; i < this._row; i++) {
			this._grids[i] = []
			for(let j = 0; j < this._col; j++) {
				this._grids[i][j] = 0
			}
		}
        console.log(this._grids);
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
            }
        }
    }

    private addGrids(){
        // 取为0的格子
        let emptyCell = []
        for(let i =0;i<this._row;i++){
            for(let j=0;j<this._col;j++){
                if(this._grids[i][j]===0){
                    emptyCell.push({x:i,y:j});
                }
            }
        }
        let needAddGridMount = emptyCell.length > this._addGridAmount?this._addGridAmount:emptyCell.length;
        let finalNeedToAddGridsCoord = []
        for(let i=0;i<needAddGridMount;i++){
            let index = this.getRandomInt(emptyCell.length);
            finalNeedToAddGridsCoord.push(emptyCell[index]);
            emptyCell.splice(index,1);
        }
        console.log(finalNeedToAddGridsCoord)
        finalNeedToAddGridsCoord.forEach((item)=>{
            this._grids[item.x][item.y] = this.getNewNumber();

        })
        
    }
    private drawGrids():void {
		// 先删全部
		this._gridsDisplayContainer.removeChildren()

		// 绘制非空格子
		for(let i = 0; i < this._row; i++) {
			for(let j = 0; j < this._col; j++) {
				if(this._grids[i][j] !== 0) {
					this.drawGrid(i, j, this._grids[i][j])
				}
			}
		}
	}

    private drawGrid(i:number,j:number,num){
        let info = this._gridInfo[num];

        let cell:egret.Sprite = new egret.Sprite()
        cell.x = i*this._cellSize+(i+1)*this._colSize;
        cell.y = j*this._cellSize+(j+1)*this._colSize;
        cell.graphics.beginFill(info.backgroundColor, 0.9)
        cell.graphics.drawRoundRect(0, 0, 
                                    this._cellSize, this._cellSize, 
                                    this._gridRadius)
        cell.graphics.endFill()

        let content:egret.TextField = new egret.TextField()
		content.text = num
		content.width = this._cellSize
		content.height = this._cellSize
        content.size = info.fontSize
		content.textColor = info.color
		content.textAlign = egret.HorizontalAlign.CENTER
		content.verticalAlign = egret.VerticalAlign.MIDDLE

        cell.addChild(content)

        this._gridsDisplayContainer.addChild(cell)

    }

    private onTouchBegin(event){
        //console.log(event)
        this.startX = event.stageX;
        this.startY = event.stageY;

    }

    private onTouchEnd(event){
        // console.log(event)
        let endX = event.stageX;
        let endY = event.stageY;
        let diffX = endX - this.startX;
        let diffY = endY - this.startY;
        let direction = '';
        // console.log(endX,endY,this.startX,this.startY,diffX,diffY);
        switch(true){
            case Math.abs(diffX)>Math.abs(diffY)&&diffX>20 :
                direction ='right';
                break;
            case Math.abs(diffX)>Math.abs(diffY)&&diffX<-20 :
                direction = 'left';
                break;
            case Math.abs(diffX)<Math.abs(diffY)&&diffY>20 :
                direction = 'down';
                break;
            case Math.abs(diffX)<Math.abs(diffY)&&diffY<-20 :
                direction = 'up';
                break; 
            default:
                break;            
        }
        direction && this.move(direction);
        // if(Math.abs(diffX)>Math.abs(diffY)){
        //     if(diffX>20){
        //         console.log('right')
        //     }
        //     if(diffX<-20){
        //         console.log('left')
        //     }
        // }
        // if(Math.abs(diffX)<Math.abs(diffY)){
        //     if(diffY>20){
        //         console.log('down')
        //     }
        //     if(diffY<-20){
        //         console.log('up')
        //     }
        // }
    }
    private move(direction){
        console.log(direction)
    }
    private getRandomInt(length:number):number {
    	return Math.floor(Math.random() * length) ;
	}


    private getNewNumber():number {
		let probability:number = Math.random()
		return probability < this._two_probability ? 2 : 4
	}

}