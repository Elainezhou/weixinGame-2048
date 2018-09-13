

class Score extends egret.DisplayObjectContainer{
    public static instance: Score
    
    private _x = 300;
    private _y = 60;
    private _width = 270;
    private _height = 150;
  
    //private _gridsDisplayContainer = new egret.DisplayObjectContainer();
   
    

    public constructor(){
        super();
        this.x = this._x;
	    this.y = this._y;
        this.addMainBg();
        this.drawScore(0);
        Score.instance = this
        //this.addGridsBg();
       // this.initGrids();
        //this.addGrids();
       // this.drawGrids();
       // this.addChild(this._gridsDisplayContainer);
       // this.touchEnabled = true;
       // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this)
        //this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this)


    }
    private addMainBg(){
        let mainBg: egret.Shape = new egret.Shape()

        mainBg.graphics.beginFill(0xA3D4DC);
        mainBg.graphics.drawRoundRect( 0,0, this._width, this._height, 10)
        mainBg.$graphics.endFill()
		
        this.addChild(mainBg)     
    }
    private drawScore(num){
        let textfield = new egret.TextField();       
        textfield.text = num;
        textfield.textColor = 0xffffff;
        textfield.x = 0;
        textfield.y = 0;
        // textfield.alpha = 0;
        textfield.width = this._width;
        textfield.height = this._height;
        // textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.textAlign = egret.HorizontalAlign.CENTER;  //水平右对齐，相对于 textField 控件自身的 width 与 height
        textfield.verticalAlign = egret.VerticalAlign.MIDDLE; 
        textfield.size = 72;
        // this.textfield = textfield;
        this.addChild(textfield);
    }

    public setContent(num){
        this.removeChildren();
        this.addMainBg();
        this.drawScore(num);
    }
   

}