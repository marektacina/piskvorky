let platno;
let novaHra;

const hra = new PisHra();

function vykresliPlatno() {
    let kontext = platno.getContext("2d");
    kontext.clearRect(0,0,150,150);
    kontext.beginPath();
    kontext.moveTo(50, 5);
    kontext.lineTo(50, 145);
    kontext.moveTo(100, 5);
    kontext.lineTo(100, 145);
    kontext.moveTo(5, 50);
    kontext.lineTo(145, 50);
    kontext.moveTo(5, 100);
    kontext.lineTo(145, 100);
    kontext.closePath();
    kontext.strokeStyle = "#8c8c8c";
    kontext.lineWidth = 3;
    kontext.stroke();
}

 /***    Obsluha kliknuti mysi    ***/
function klikni(sourClickX, sourClickY) { 
    hra.tah(sourClickX, sourClickY);
    let kontext = platno.getContext("2d");
    
    /*** Podtrzeni hrace, ktery je na rade***/
    let hracXLi = document.getElementById("hrac-x");
    let hracYLi = document.getElementById("hrac-y");
    
    if (hra.kliknuto[0] != -1 && hra.vyhra == 2) {
      
        kontext.beginPath();
        if (!hra.krizek) {
            kontext.moveTo(50*hra.kliknuto[0] + 15, 50*hra.kliknuto[1] + 15);
            kontext.lineTo(50*hra.kliknuto[0] + 35, 50*hra.kliknuto[1] + 35);
            kontext.moveTo(50*hra.kliknuto[0] + 15, 50*hra.kliknuto[1] + 35);
            kontext.lineTo(50*hra.kliknuto[0] + 35, 50*hra.kliknuto[1] + 15);
            
            hracXLi.style = "border-bottom: 2px solid #ffffff";
            hracYLi.style = "border-bottom: 2px solid #8c8c8c";
        } else {
            kontext.moveTo(50*hra.kliknuto[0] + 35, 50*hra.kliknuto[1] + 25);
            kontext.arc(50*hra.kliknuto[0] + 25, 50*hra.kliknuto[1] + 25, 10, 0, Math.PI * 2);
            
            hracXLi.style = "border-bottom: 2px solid #8c8c8c";
            hracYLi.style = "border-bottom: 2px solid #ffffff";
        }
        kontext.closePath();
        kontext.stroke();
        
    }
    
    hra.vyhodnotHru();
          
    if (hra.kliknuto[0] != -1 && hra.vyhra != 2) {

        let offsetX = 0;
        let offsetY = 0;
        if (hra.smer == 0) {
            offsetX = 15;
        } else if (hra.smer == 1) {
            offsetY = 15;
        } else if (hra.smer == 2) {
            offsetX = 10;
            offsetY = 10;
        } else if (hra.smer == 3) {
            offsetX = 10;
            offsetY = -10;
        }

        kontext.beginPath();
        kontext.moveTo(50*hra.vyherniPolicka[0][0] + 25 - offsetY, 50*hra.vyherniPolicka[0][1] + 25 - offsetX);
        kontext.lineTo(50*hra.vyherniPolicka[1][0] + 25 + offsetY, 50*hra.vyherniPolicka[1][1] + 25 + offsetX);

        kontext.strokeStyle = "#aa5c5c";
        
        kontext.closePath();
        kontext.lineWidth = 5;
        kontext.stroke();
        
        let scoreXLi = document.getElementById("score-x");
        let scoreYLi = document.getElementById("score-y");
        
        scoreXLi.innerHTML = hra.score[0];
        scoreYLi.innerHTML = hra.score[1];
        
        hracXLi.style = "border-bottom: 2px solid #ffffff";
        hracYLi.style = "border-bottom: 2px solid #ffffff";
    }

}

function zacniNovouHru() {
    hra.novaHra();
    let hracXLi = document.getElementById("hrac-x");
    hracXLi.style = "border-bottom: 2px solid #8c8c8c";
    vykresliPlatno();
}


/***    Nacteni okna    ***/
window.onload = function() {
    let sourX, sourY;
    
    platno = document.getElementById("platno");
    novaHra = document.getElementById("nova-hra");
    vykresliPlatno();
    
    platno.onclick = function() {
        klikni(sourX, sourY);
    };
    
    /***    Obsluha pohybu mysi    ***/
    platno.onmousemove = function(e) {
        let xPlatno = platno.offsetLeft;
        let yPlatno = platno.offsetTop;
        
        sourX = e.clientX - xPlatno;
        sourY = e.clientY - yPlatno ;
    };
    
    novaHra.onclick = function() {
        zacniNovouHru();
    }

}

