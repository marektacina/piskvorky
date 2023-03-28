import {Board} from "./Board.js";

export class Game {
    private _gameRun;
    private _board;
    private _gameBoard = [];
    private _CELL = 25;
    private _naRade;
    private _canvas;
    private _gameScore = {
        x: 0,
        o: 0
    }

    private _crossedOut = {
        x1: -1,
        y1: -1,
        x2: -1,
        y2: -1,
        direction: -1
    }

    constructor(canvas) {
        this._board = new Board(canvas);
        this._canvas = canvas;
        for (let i = 0; i < canvas.height / this._CELL; i++) {
            let radek = [];
            for (let j = 0; j < canvas.width / this._CELL; j++) {
                radek.push(0);
            }
            this._gameBoard.push(radek)
        }

    }

    gameStart() {
        this._gameRun = true;
        this._board.drawCanvas(this._CELL);
        this._naRade = 1;

        for (let i = 0; i < this._canvas.height / this._CELL; i++) {
            for (let j = 0; j < this._canvas.width / this._CELL; j++) {
                this._gameBoard[j][i] = 0;
            }
        }
    }

    gameMove(mouseCoordinates) {
        if (this._gameRun) {
            let clickedCell = {
                x: Math.floor(mouseCoordinates.x / this._CELL),
                y: Math.floor(mouseCoordinates.y / this._CELL)
            }

            if (this._gameBoard[clickedCell.y][clickedCell.x] == 0) {
                this._gameBoard[clickedCell.y][clickedCell.x] = this._naRade;
                this._board.canvasClick(clickedCell, this._naRade, this._CELL);
                if (this._naRade == 1) {
                    this._naRade = -1;
                } else {
                    this._naRade = 1
                }
            }

            this.gameEvaluation();
        }
    }

    gameEvaluation() {
        let sum: number;

        //vodorovne
        for (let i = 0; i < this._canvas.width / this._CELL - 4; i++) {
            for (let j = 0; j < this._canvas.height / this._CELL; j++) {
                sum = this._gameBoard[j][i] + this._gameBoard[j][i + 1] + this._gameBoard[j][i + 2] +
                    this._gameBoard[j][i + 3] + this._gameBoard[j][i + 4];
                if (sum == 5 || sum == -5) {
                    this.scoreUp();
                    this._gameRun = false;
                    this._crossedOut = {x1: i, y1: j, x2: i + 4, y2: j, direction: 0};
                    this._board.crossOut(this._crossedOut, this._CELL);
                }
            }
        }

        //svisle
        for (let i = 0; i < this._canvas.width / this._CELL; i++) {
            for (let j = 0; j < this._canvas.height / this._CELL - 4; j++) {
                sum = this._gameBoard[j][i] + this._gameBoard[j + 1][i] + this._gameBoard[j + 2][i] +
                    this._gameBoard[j + 3][i] + this._gameBoard[j + 4][i];
                if (sum == 5 || sum == -5) {
                    this.scoreUp();
                    this._gameRun = false;
                    this._crossedOut = {x1: i, y1: j, x2: i, y2: j + 4, direction: 1};
                    this._board.crossOut(this._crossedOut, this._CELL);
                }
            }
        }

        //sikmo shora dolu
        for (let i = 0; i < this._canvas.width / this._CELL - 4; i++) {
            for (let j = 0; j < this._canvas.height / this._CELL - 4; j++) {
                sum = this._gameBoard[j][i] + this._gameBoard[j + 1][i + 1] + this._gameBoard[j + 2][i + 2] +
                    this._gameBoard[j + 3][i + 3] + this._gameBoard[j + 4][i + 4];
                if (sum == 5 || sum == -5) {
                    this.scoreUp();
                    this._gameRun = false;
                    this._crossedOut = {x1: i, y1: j, x2: i + 4, y2: j + 4, direction: 2};
                    this._board.crossOut(this._crossedOut, this._CELL);
                }
            }
        }

        //sikmo zdola nahoru
        for (let i = 4; i < this._canvas.width / this._CELL; i++) {
            for (let j = 0; j < this._canvas.height / this._CELL - 4; j++) {
                sum = this._gameBoard[j][i] + this._gameBoard[j + 1][i - 1] + this._gameBoard[j + 2][i - 2] +
                    this._gameBoard[j + 3][i - 3] + this._gameBoard[j + 4][i - 4];

                if (sum == 5 || sum == -5) {
                    this.scoreUp();
                    this._gameRun = false;
                    this._crossedOut = {x1: i, y1: j, x2: i - 4, y2: j + 4, direction: 3};
                    this._board.crossOut(this._crossedOut, this._CELL);
                }
            }
        }
    }
    scoreUp() {
        if (this._naRade == -1) {
            this._gameScore.x += 1;
        } else {
            this._gameScore.o += 1;
        }
        this._board.writeScore(this._gameScore);
    }

}