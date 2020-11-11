class Arrow {
    constructor() {
        
        this.width = 60;
        this.height = 140;
        
        this.image = loadImage("Images/arrow.png")
    }
    display() {

        if(frameCount % 10 === 0) {
            this.body = createSprite(random(0, 1700),0, this.width, this.height);
            this.body.addImage(this.image);
            this.body.rotation = 45 + 90;
            this.body.velocityX = 0;
            this.body.velocityY = 9;
            this.body.lifetime = 150;
          
            this.body.setCollider("rectangle", 0, 0, 20, 150);

            arrows.add(this.body);
            if (arrows.isTouching(player)) {
                arrows.destroyEach();
                life.life   -= 1;
            }
        }
        
        

    }

}