var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Score = (function (_super) {
    __extends(Score, _super);
    //private _gridsDisplayContainer = new egret.DisplayObjectContainer();
    function Score() {
        var _this = _super.call(this) || this;
        _this._x = 300;
        _this._y = 60;
        _this._width = 270;
        _this._height = 150;
        _this.x = _this._x;
        _this.y = _this._y;
        _this.addMainBg();
        _this.drawScore(0);
        Score.instance = _this;
        return _this;
        //this.addGridsBg();
        // this.initGrids();
        //this.addGrids();
        // this.drawGrids();
        // this.addChild(this._gridsDisplayContainer);
        // this.touchEnabled = true;
        // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this)
        //this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this)
    }
    Score.prototype.addMainBg = function () {
        var mainBg = new egret.Shape();
        mainBg.graphics.beginFill(0xA3D4DC);
        mainBg.graphics.drawRoundRect(0, 0, this._width, this._height, 10);
        mainBg.$graphics.endFill();
        this.addChild(mainBg);
    };
    Score.prototype.drawScore = function (num) {
        var textfield = new egret.TextField();
        textfield.text = num;
        textfield.textColor = 0xffffff;
        textfield.x = 0;
        textfield.y = 0;
        // textfield.alpha = 0;
        textfield.width = this._width;
        textfield.height = this._height;
        // textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.textAlign = egret.HorizontalAlign.CENTER; //水平右对齐，相对于 textField 控件自身的 width 与 height
        textfield.verticalAlign = egret.VerticalAlign.MIDDLE;
        textfield.size = 72;
        // this.textfield = textfield;
        this.addChild(textfield);
    };
    Score.prototype.setContent = function (num) {
        this.removeChildren();
        this.addMainBg();
        this.drawScore(num);
    };
    return Score;
}(egret.DisplayObjectContainer));
__reflect(Score.prototype, "Score");
