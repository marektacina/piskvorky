import {Game} from "./Game.js";

window.onload = function() {
    let canvas = document.getElementById("canvas");
    let novaHra = document.getElementById("new-game")

    let game = new Game(canvas);

    let mouseCoordinates = {
        x: 0,
        y: 0
    }


    /***    Obsluha pohybu mysi    ***/
    canvas.onmousemove = function(e) {
        mouseCoordinates.x = e.clientX - canvas.offsetLeft;
        mouseCoordinates.y = e.clientY - canvas.offsetTop;
    }

    /***    Obsluha kliknuti mysi    ***/
    canvas.onclick = function () {
        game.gameMove(mouseCoordinates);
    }

    novaHra.onclick = function() {
        game.gameStart();
    }

    game.gameStart();
}