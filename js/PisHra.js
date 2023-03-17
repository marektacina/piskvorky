class PisHra {

    constructor() {
        this.hraciPlocha = [[-5,-5,-5],[-5,-5,-5],[-5,-5,-5]];
        this.vyherniPolicka = [[0,0],[0,0]];
        this.krizek = true;    
        this.vyhra = 2; 
        this.smer = 0;
        this.score = [0,0];
    }
    
    
    tah(sourClickX, sourClickY) {
        this.kliknuto = [Math.floor(sourClickX/50), Math.floor(sourClickY/50)];
        
               
        if (this.hraciPlocha[this.kliknuto[0]][this.kliknuto[1]] != -5) {
            this.kliknuto[0] = -1;
        } else {
            if (this.krizek) {
                this.hraciPlocha[this.kliknuto[0]][this.kliknuto[1]]=0;
            } else {
                this.hraciPlocha[this.kliknuto[0]][this.kliknuto[1]]=1;                                       
            }
             this.krizek = !this.krizek;
        }        
    }
    
    vyhodnotHru() {
        if (this.vyhra == 2) {
            /*** kontrola vodorovne a svisle ***/
            for (let i=0; i<3; i++) {
                if (this.hraciPlocha[i][0] + this.hraciPlocha[i][1] + this.hraciPlocha[i][2] == 0) {
                    this.vyhra = 0; //nastavení vyhry na krizek
                    this.vyherniPolicka = [[i,0],[i,2]];
                    this.smer = 0;
                    this.score[0] += 1;
                } else if (this.hraciPlocha[0][i] + this.hraciPlocha[1][i] + this.hraciPlocha[2][i] == 0) {
                    this.vyhra = 0; //nastavení vyhry na krizek
                    this.vyherniPolicka = [[0,i],[2,i]];
                    this.smer = 1;
                    this.score[0] += 1;
                } else if (this.hraciPlocha[i][0] + this.hraciPlocha[i][1] + this.hraciPlocha[i][2] == 3) {
                    this.vyhra = 1;  //nastavení vyhry na kolecko
                    this.vyherniPolicka = [[i,0],[i,2]];
                    this.smer = 0;
                    this.score[1] += 1;
                } else if (this.hraciPlocha[0][i] + this.hraciPlocha[1][i] + this.hraciPlocha[2][i] == 3) {
                    this.vyhra = 1;  //nastavení vyhry na kolecko
                    this.vyherniPolicka = [[0,i],[2,i]];
                    this.smer = 1;
                    this.score[1] += 1;
                }
            }
            /*** kontrola po uhlopricce ***/
            if (this.hraciPlocha[0][0] + this.hraciPlocha[1][1] + this.hraciPlocha[2][2] == 0) {
                this.vyhra = 0; //nastavení vyhry na krizek
                this.vyherniPolicka = [[0,0],[2,2]];  
                this.smer = 2;
                this.score[0] += 1;
            } else if (this.hraciPlocha[2][0] + this.hraciPlocha[1][1] + this.hraciPlocha[0][2] == 0) {
                this.vyhra = 0; //nastavení vyhry na krizek
                this.vyherniPolicka = [[2,0],[0,2]];
                this.smer = 3;
                this.score[0] += 1;
            }
            if (this.hraciPlocha[0][0] + this.hraciPlocha[1][1] + this.hraciPlocha[2][2] == 3) {
                this.vyhra = 1; //nastavení vyhry na kolecko
                this.vyherniPolicka = [[0,0],[2,2]];
                this.smer = 2;
                this.score[1] += 1;
            } else if (this.hraciPlocha[2][0] + this.hraciPlocha[1][1] + this.hraciPlocha[0][2] == 3) {
                this.vyhra = 1; //nastavení vyhry na kolecko
                this.vyherniPolicka = [[2,0],[0,2]];
                this.smer = 3;
                this.score[1] += 1;
            }
        }
    }
    
    novaHra() {
        this.hraciPlocha = [[-5,-5,-5],[-5,-5,-5],[-5,-5,-5]];
        this.krizek = true;    
        this.vyhra = 2;
    }
    
}