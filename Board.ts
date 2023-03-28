export class Board {
    _canvas;

    constructor(canvas) {
        this._canvas = canvas;
    }

    drawCanvas(cell) {
        let context = this._canvas.getContext("2d");
        let playerX = document.getElementById("player-x");
        let playerO = document.getElementById("player-o");
        playerX.className = "underline-true";
        playerO.className = "underline-false";

        context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        context.beginPath();
        //svisle cary
        for (let i = 0 ; i < (this._canvas.width / cell + 1); i++) {
            context.moveTo(cell * i, 0);
            context.lineTo(cell * i, this._canvas.height);
        }
        //vodorovne cary
        for (let i = 0 ; i < (this._canvas.height / cell + 1); i++) {
            context.moveTo(0, cell * i);
            context.lineTo(this._canvas.width, cell * i);
        }
        context.closePath();
        context.strokeStyle = "#8c8c8c";
        context.lineWidth = 1;
        context.stroke();
    }

    canvasClick(clickedCell, naRade, cell) {
        let context = this._canvas.getContext('2d');
        let playerX = document.getElementById("player-x");
        let playerO = document.getElementById("player-o");
        let offset = 5;

        context.beginPath();

        if (naRade == 1) { //krizek
            context.moveTo(cell * clickedCell.x + offset, cell * clickedCell.y + offset);
            context.lineTo(cell * clickedCell.x + cell - offset, cell * clickedCell.y + cell - offset);
            context.moveTo(cell * clickedCell.x + cell - offset, cell * clickedCell.y + offset);
            context.lineTo(cell * clickedCell.x + offset, cell * clickedCell.y + cell - offset);
            playerO.className = "underline-true";
            playerX.className = "underline-false";
        }   else { //kolecko
            context.moveTo(cell * clickedCell.x + cell - (this._canvas - 16) / 2, cell * clickedCell.y + cell / 2);
            context.arc(cell * clickedCell.x + cell / 2, cell * clickedCell.y + cell / 2, 8, 0, Math.PI * 2);
            playerO.className = "underline-false";
            playerX.className = "underline-true";
        }
        context.lineWidth = 3;
        context.closePath();
        context.stroke();

    }
    writeScore(gameScore) {
        let scoreX = document.getElementById("score-x");
        let scoreO = document.getElementById("score-o");
        let playerX = document.getElementById("player-x");
        let playerO = document.getElementById("player-o");

        scoreX.innerHTML = gameScore.x;
        scoreO.innerHTML = gameScore.o;
        playerO.className = "underline-false";
        playerX.className = "underline-false";
    }

    crossOut(crossedOut, cell) {
        let offset = 5;
        let context = this._canvas.getContext('2d');
        context.beginPath();
        switch (crossedOut.direction) {
            case 0: //vodorovne
                context.moveTo(crossedOut.x1 * cell + offset, crossedOut.y1 * cell + cell / 2);
                context.lineTo((crossedOut.x2 + 1) * cell - offset, crossedOut.y2 * cell + cell / 2);
                break;
            case 1: //svisle
                context.moveTo((crossedOut.x1 + 1/2) * cell, crossedOut.y1 * cell + offset);
                context.lineTo((crossedOut.x2 + 1/2) * cell, (crossedOut.y2 + 1) * cell - offset);
                console.log(crossedOut.direction);
                break;
            case 2: //sikmo shora dolu
                context.moveTo(crossedOut.x1 * cell + offset, crossedOut.y1 * cell + offset);
                context.lineTo((crossedOut.x2 + 1) * cell - offset, (crossedOut.y2 + 1) * cell - offset);
                break;
            case 3: //sikmo zdola nahoru
                context.moveTo((crossedOut.x1 + 1) * cell - offset, crossedOut.y1 * cell + offset);
                context.lineTo((crossedOut.x2) * cell + offset, (crossedOut.y2 + 1) * cell - offset);
                break;
        }
        context.lineWidth = 5;
        context.strokeStyle = 'blue';
        context.closePath();
        context.stroke();
    }
}