var mainState = {
    
    cardKeys: [],
    cardIndexes: [],
    card1: null,
    card2: null,
    scoreText: null,
    arrowLeft: null,
    arrowRight: null,
    
    create: function() {    

        var inGameBackground = game.add.tileSprite(0, 0, 800, 1280, 'inGameBackground');
        
        //syzdava masiv ot kliuchove na sprite-ove
        this.cardKeys = [
            //'clubs7', 
            'clubsA',
            //'diamonds8', 
            'diamondsJ',
            //'spades9', 
            'spadesK',
            //'hearts10', 
            'heartsQ'
        ];
        
        //syzdava masiv ot 50 povtarqshti se indeksa
        //inicializira two-dimensional masiv za kluch/bool (dali e kato prednata ili ne)
        this.cardIndexes[0] = [];
        this.cardIndexes[1] = [];
        
        for (var i = 0; i < CardCount; i++) {
            this.cardIndexes[0][i] = game.rnd.integerInRange(0, this.cardKeys.length - 1);
        }
        
        //pyrvata i poslednata karta sa true
        this.cardIndexes[1][0] = this.cardIndexes[1][CardCount - 1] = true;
        
        //ostanalite se proverqvat
        for (var i = 1; i < CardCount - 1; i++) {
            if (this.cardIndexes[0][i] == this.cardIndexes[0][i - 1]) {
                this.cardIndexes[1][i] = true;                                         }
            else if (this.cardIndexes[0][i] != this.cardIndexes[0][i - 1]) {
                this.cardIndexes[1][i] = false;
            }                            
        }
        
        //check card values
        for (var i = 0; i < this.cardIndexes[1].length; i++) {
            //console.log(this.cardKeys[this.cardIndexes[0][i]] + " " + this.cardIndexes[1][i]);
        }
        
        //score label
        this.scoreText = game.add.text(game.world.width / 2, 0, Score.toString(), {
            font: "bold 65px Arial",
            fill: "#ffffff"
        });
        this.scoreText.anchor.setTo(0.5, 0);
        
        //left and right key press methods
        var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        leftKey.onDown.add(function() {this.moveCard(false);}, this);
        
        var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        rightKey.onDown.add(function() {this.moveCard(true);}, this);
        
        
        //left and right arrow
        this.arrowLeft = game.add.sprite(game.world.width / 2, game.world.height, 'arrowLeft');
        this.arrowLeft.anchor.setTo(1, 1);
        this.arrowLeft.scale.setTo(1.5);
        this.arrowLeft.tint = 0xdf0101;
        
        this.arrowRight = game.add.sprite(game.world.width / 2, game.world.height, 'arrowRight');
        this.arrowRight.anchor.setTo(0, 1);
        this.arrowRight.scale.setTo(1.5);
        this.arrowRight.tint = 0x01df01;
        
        this.newCard();      
    },
    
    newCard: function() {
        //console.log(this.cardKeys[CardIndex]);
        this.card1 = game.add.sprite(game.world.width / 2, - game.world.height * 2, this.cardKeys[this.cardIndexes[0][CardIndex]]);
        this.card1.scale.setTo(1.5);
        this.card1.anchor.setTo(0.5, 0.5);
        game.add.tween(this.card1).to({y: game.height / 2}, 1000, Phaser.Easing.Linear.None, true /*AUTO START*/, 0);//, false, false);
    },
    
    changeCard: function() {
        //ako ne e poslednata karta - pusni nova
        //inc CardIndex        
        if (CardIndex != CardCount - 1) {
            CardIndex++;
            this.card1.x = game.world.width / 2;
            this.card1.y = - game.world.height * 2;
            game.add.tween(this.card1).to({y: game.height / 2}, 300, Phaser.Easing.Linear.None, true /*AUTO START*/, 0);
        }
    },
    
    moveCard: function(dir /*posokata, koqto e izbrana*/) {
        /*
        kartata si otiva na syotvetnata posoka, samo ako e izbrana nevqrna strelka, pokazva hiksa
        */
        if (!GameOver) {

            if (CardIndex != CardCount - 1) {
                
                if (this.cardIndexes[1][CardIndex] == true) {
                    var moveDir = game.world.width + game.world.width / 2;
                }
                else {
                    var moveDir = - game.world.width / 2;
                }
                
                if ((dir && !this.cardIndexes[1][CardIndex]) || (!dir && this.cardIndexes[1][CardIndex])) {
                    //right - false
                    //HIKS
                    //s chain tween
                    var cross = game.add.sprite(game.world.width / 2, game.world.height / 2, 'cross');
                    cross.tint = 0xffff00;
                    cross.anchor.setTo(0.5, 0.5);
                    cross.scale.setTo(0);
                    var crossTween = game.add.tween(cross.scale).to({x: 3, y: 3}, 200, Phaser.Easing.Linear.None)
                        .to({x: 0, y: 0}, 200, Phaser.Easing.Linear.None);
                    crossTween.onComplete.add(function() {cross.destroy();});
                    crossTween.start();                
                }
                
                var moveTween = game.add.tween(this.card1).to({x: moveDir}, 300, Phaser.Easing.Linear.None, true, 0);
                moveTween.onComplete.add(function() {
                    this.card1.loadTexture(
                        this.cardKeys[this.cardIndexes[0][CardIndex + 1]]);

                    this.changeCard();
                }, this);
            }
            else if (CardIndex == CardCount - 1) {
                //console.log("------------------posledna karta");
                /*TODO ako e poslednata, q izmestva nastrani, mesti nadolu score-a i go scaleva, izkarva strelkite otstrani 
                ako izboryt ne e pravilen, izkarva hiksa i premestva v pravilnata posoka
                */
                GameOver = true;

                var moveTween = game.add.tween(this.card1).to({x: moveDir}, 300, Phaser.Easing.Linear.None, true, 0);
                moveTween.onComplete.add(function() {
                    this.card1.destroy();
                    var moveScoreDown = game.add.tween(this.scoreText).to({y: game.world.height / 2 - this.scoreText.height}, 300, Phaser.Easing.Linear.None, true, 0);
                    moveScoreDown.onComplete.add(function() {
                        game.add.tween(this.scoreText.scale).to({x: 3, y: 3}, 300, Phaser.Easing.Linear.None, true, 0);
                    }, this);
                    game.add.tween(this.arrowLeft).to({x: - game.world.width / 2}, 300, Phaser.Easing.Linear.None, true, 0);
                    game.add.tween(this.arrowRight).to({x: game.world.width + game.world.width / 2}, 300, Phaser.Easing.Linear.None, true, 0);
                }, this);
            }
        }
    },
    
    /*moveLeft: function() {

        if (CardIndex != 49) {
            
            var moveLeftTween = game.add.tween(this.card1).to({x: - game.world.width / 2}, 300, Phaser.Easing.Linear.None, true, 0);
            moveLeftTween.onComplete.add(function() {
                this.card1.loadTexture(
                this.cardKeys[this.cardIndexes[0][CardIndex + 1]]);

                this.changeCard();
            }, this);
        }
    /*},
    
    moveRight: function() {

        if (CardIndex != 49) {
            var moveRightTween = game.add.tween(this.card1).to({x: game.world.width + game.world.width / 2}, 300, Phaser.Easing.Linear.None, true, 0);
            moveRightTween.onComplete.add(function() {
                this.card1.loadTexture(
                this.cardKeys[this.cardIndexes[0][CardIndex + 1]]);
                this.changeCard();
            }, this);
        }
    }*/
};