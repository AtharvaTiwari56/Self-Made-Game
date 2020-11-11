class Life {
    constructor() {
        this.image = loadImage("Images/MC_Heart.png");
        this.life = 5;
    }
    display() {
        var x= 80, y = 10;

        if (this.life !== 0) {
            for (let index = 0; index < this.life; index++ ) {
                if(index % 5 == 0) {
                    x = 80;
                    y+= 50;
                }
                image(this.image, x, y, 50, 50);
                x = x+ 60;
            }
        }

    }
}
