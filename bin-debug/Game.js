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
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        //private static instance: Game
        _this._cellSize = 100; //格子尺寸，正方形
        _this._colSize = 20; //间隔
        _this._row = 4; //行
        _this._col = 4; //列
        _this._mainWidth = _this._cellSize * _this._col + _this._colSize * (_this._col + 1);
        _this._mainHeight = _this._cellSize * _this._row + _this._colSize * (_this._row + 1);
        _this._mainBgRadius = 10;
        _this._gridRadius = 10;
        _this._gridBgColor = 0xEEE4DA;
        _this._mainBgColor = 0x92DAF2;
        _this._stageWidth = 640;
        _this._grids = [];
        _this._x = (_this._stageWidth - _this._mainWidth) / 2;
        _this._y = 300;
        _this._two_probability = 0.8;
        _this._addGridAmount = 2;
        _this._gridsDisplayContainer = new egret.DisplayObjectContainer();
        _this.startX = undefined;
        _this.startY = undefined;
        _this._gridInfo = {
            2: {
                "num": 2,
                "color": 0x776e65,
                "backgroundColor": 0xeee4da,
                "fontSize": 65
            },
            4: {
                "num": 4,
                "color": 0x776e65,
                "backgroundColor": 0xede0c8,
                "fontSize": 65
            },
            8: {
                "num": 8,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf2b179,
                "fontSize": 55
            },
            16: {
                "num": 16,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf59563,
                "fontSize": 55
            },
            32: {
                "num": 32,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf67c5f,
                "fontSize": 55
            },
            64: {
                "num": 64,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf65e3b,
                "fontSize": 55
            },
            128: {
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
            512: {
                "num": 512,
                "color": 0xf9f6f2,
                "backgroundColor": 0xedc850,
                "fontSize": 45
            },
            1024: {
                "num": 1024,
                "color": 0xf9f6f2,
                "backgroundColor": 0xabe358,
                "fontSize": 35
            },
            2048: {
                "num": 2048,
                "color": 0xf9f6f2,
                "backgroundColor": 0x4dd9cf,
                "fontSize": 35
            },
            4096: {
                "num": 4096,
                "color": 0xf9f6f2,
                "backgroundColor": 0xa283f9,
                "fontSize": 35
            },
            8192: {
                "num": 8192,
                "color": 0xf9f6f2,
                "backgroundColor": 0xf98383,
                "fontSize": 35
            }
        };
        _this.x = _this._x;
        _this.y = _this._y;
        _this.addMainBg();
        _this.addGridsBg();
        _this.initGrids();
        _this.addGrids();
        _this.drawGrids();
        _this.addChild(_this._gridsDisplayContainer);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
        return _this;
    }
    Game.prototype.addMainBg = function () {
        var mainBg = new egret.Shape();
        mainBg.graphics.beginFill(this._mainBgColor);
        mainBg.graphics.drawRoundRect(0, 0, this._mainWidth, this._mainHeight, this._mainBgRadius);
        mainBg.$graphics.endFill();
        this.addChild(mainBg);
    };
    Game.prototype.initGrids = function () {
        var index = 1;
        for (var i = 0; i < this._row; i++) {
            this._grids[i] = [];
            for (var j = 0; j < this._col; j++) {
                this._grids[i][j] = 0;
            }
        }
        console.log(this._grids);
    };
    Game.prototype.addGridsBg = function () {
        for (var i = 0; i < this._row; i++) {
            for (var j = 0; j < this._col; j++) {
                var cell = new egret.Shape();
                cell.graphics.beginFill(this._gridBgColor, 0.35);
                cell.graphics.drawRoundRect(i * this._cellSize + (i + 1) * this._colSize, j * this._cellSize + (j + 1) * this._colSize, this._cellSize, this._cellSize, this._gridRadius);
                cell.graphics.endFill();
                this.addChild(cell);
            }
        }
    };
    Game.prototype.addGrids = function () {
        var _this = this;
        // 取为0的格子
        var emptyCell = [];
        for (var i = 0; i < this._row; i++) {
            for (var j = 0; j < this._col; j++) {
                if (this._grids[i][j] === 0) {
                    emptyCell.push({ x: i, y: j });
                }
            }
        }
        var needAddGridMount = emptyCell.length > this._addGridAmount ? this._addGridAmount : emptyCell.length;
        var finalNeedToAddGridsCoord = [];
        for (var i = 0; i < needAddGridMount; i++) {
            var index = this.getRandomInt(emptyCell.length);
            finalNeedToAddGridsCoord.push(emptyCell[index]);
            emptyCell.splice(index, 1);
        }
        console.log(finalNeedToAddGridsCoord);
        finalNeedToAddGridsCoord.forEach(function (item) {
            _this._grids[item.x][item.y] = _this.getNewNumber();
        });
    };
    Game.prototype.drawGrids = function () {
        // 先删全部
        this._gridsDisplayContainer.removeChildren();
        // 绘制非空格子
        for (var i = 0; i < this._row; i++) {
            for (var j = 0; j < this._col; j++) {
                if (this._grids[i][j] !== 0) {
                    this.drawGrid(i, j, this._grids[i][j]);
                }
            }
        }
    };
    Game.prototype.drawGrid = function (i, j, num) {
        var info = this._gridInfo[num];
        var cell = new egret.Sprite();
        cell.y = i * this._cellSize + (i + 1) * this._colSize;
        cell.x = j * this._cellSize + (j + 1) * this._colSize;
        cell.graphics.beginFill(info.backgroundColor, 0.9);
        cell.graphics.drawRoundRect(0, 0, this._cellSize, this._cellSize, this._gridRadius);
        cell.graphics.endFill();
        var content = new egret.TextField();
        content.text = num;
        content.width = this._cellSize;
        content.height = this._cellSize;
        content.size = info.fontSize;
        content.textColor = info.color;
        content.textAlign = egret.HorizontalAlign.CENTER;
        content.verticalAlign = egret.VerticalAlign.MIDDLE;
        cell.addChild(content);
        this._gridsDisplayContainer.addChild(cell);
    };
    Game.prototype.onTouchBegin = function (event) {
        //console.log(event)
        this.startX = event.stageX;
        this.startY = event.stageY;
    };
    Game.prototype.onTouchEnd = function (event) {
        // console.log(event)
        var endX = event.stageX;
        var endY = event.stageY;
        var diffX = endX - this.startX;
        var diffY = endY - this.startY;
        var direction = '';
        // console.log(endX,endY,this.startX,this.startY,diffX,diffY);
        switch (true) {
            case Math.abs(diffX) > Math.abs(diffY) && diffX > 20:
                direction = 'right';
                this.moveRight();
                break;
            case Math.abs(diffX) > Math.abs(diffY) && diffX < -20:
                direction = 'left';
                this.moveLeft();
                break;
            case Math.abs(diffX) < Math.abs(diffY) && diffY > 20:
                direction = 'down';
                this.moveDown();
                break;
            case Math.abs(diffX) < Math.abs(diffY) && diffY < -20:
                direction = 'up';
                this.moveUp();
                break;
            default:
                break;
        }
        this.addGrids();
        this.drawGrids();
        this.score();
        // direction && this.move(direction);
    };
    Game.prototype.moveRight = function () {
        // this._grids = [
        //     [0,2,2,2],
        //     [0,0,2,4],
        //     [0,0,2,4],
        //     [0,0,2,4],
        // ]
        for (var i = 0; i < this._row; i++) {
            for (var j = this._col - 1; j > 1; j--) {
                if (this._grids[i][j] === this._grids[i][j - 1]) {
                    this._grids[i][j] *= 2;
                    this._grids[i][j - 1] = 0;
                }
            }
            var nonZero = this._grids[i].filter(function (item) { return item !== 0; });
            this._grids[i] = Array(this._col - nonZero.length).fill(0).concat(nonZero);
        }
    };
    Game.prototype.moveLeft = function () {
        for (var i = 0; i < this._row; i++) {
            for (var j = 0; j < this._col - 1; j++) {
                if (this._grids[i][j] === this._grids[i][j + 1]) {
                    this._grids[i][j] *= 2;
                    this._grids[i][j + 1] = 0;
                }
            }
            var nonZero = this._grids[i].filter(function (item) { return item !== 0; });
            this._grids[i] = nonZero.concat(Array(this._col - nonZero.length).fill(0));
        }
    };
    Game.prototype.moveDown = function () {
        var _grids = this.turn(this._grids);
        // console.log(_grids)
        for (var i = 0; i < this._row; i++) {
            for (var j = this._col - 1; j > 1; j--) {
                if (_grids[i][j] === _grids[i][j - 1]) {
                    _grids[i][j] *= 2;
                    _grids[i][j - 1] = 0;
                }
            }
            var nonZero = _grids[i].filter(function (item) { return item !== 0; });
            _grids[i] = Array(this._col - nonZero.length).fill(0).concat(nonZero);
        }
        _grids = this.turn(_grids);
        this._grids = _grids;
    };
    Game.prototype.moveUp = function () {
        var _grids = this.turn(this._grids);
        // console.log(_grids)
        for (var i = 0; i < this._row; i++) {
            for (var j = 0; j < this._col - 1; j++) {
                if (_grids[i][j] === _grids[i][j + 1]) {
                    _grids[i][j] *= 2;
                    _grids[i][j + 1] = 0;
                }
            }
            var nonZero = _grids[i].filter(function (item) { return item !== 0; });
            _grids[i] = nonZero.concat(Array(this._col - nonZero.length).fill(0));
        }
        _grids = this.turn(_grids);
        this._grids = _grids;
    };
    Game.prototype.score = function () {
        var sum = 0;
        for (var i = 0; i < this._row; i++) {
            for (var j = 0; j < this._col; j++) {
                sum += this._grids[i][j];
            }
        }
        Main.instance.updateScore(sum);
    };
    Game.prototype.turn = function (arr) {
        // let arr = [
        //     [0,2,2,2],
        //     [0,0,2,4],
        //     [0,0,2,4],
        //     [0,0,2,4],
        // ]
        var newArray = arr[0].map(function (col, i) {
            return arr.map(function (row) {
                return row[i];
            });
        });
        return newArray;
        //console.log(newArray)
    };
    Game.prototype.getRandomInt = function (length) {
        return Math.floor(Math.random() * length);
    };
    Game.prototype.getNewNumber = function () {
        var probability = Math.random();
        return probability < this._two_probability ? 2 : 4;
    };
    return Game;
}(egret.DisplayObjectContainer));
__reflect(Game.prototype, "Game");
