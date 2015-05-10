var preloadState = {

    preload: function() {

        game.load.image('background', 'assets/images/darkPurple.png');
        game.load.image('inGameBackground', 'assets/images/purple.png');
        game.load.image('playButton', 'assets/images/playButton.png');
        game.load.image('checkmark', 'assets/images/checkmark.png');
        game.load.image('cross', 'assets/images/cross.png');
        game.load.image('arrowLeft', 'assets/images/arrowLeft.png');
        game.load.image('arrowRight', 'assets/images/arrowRight.png');
        
        //game.load.image('clubs7', 'assets/images/cards/cardClubs7.png');
        game.load.image('clubsA', 'assets/images/cards/cardClubsA.png');
        
        //game.load.image('diamonds8', 'assets/images/cards/cardDiamonds8.png');
        game.load.image('diamondsJ', 'assets/images/cards/cardDiamondsJ.png');
        
        //game.load.image('spades9', 'assets/images/cards/cardSpades9.png');
        game.load.image('spadesK', 'assets/images/cards/cardSpadesK.png');
        
        //game.load.image('hearts10', 'assets/images/cards/cardHearts10.png');    
        game.load.image('heartsQ', 'assets/images/cards/cardHeartsQ.png');
        
        /*var preloadBar = game.add.sprite('loader', game.world.width / 2, game.world.height / 2);
        preloadBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(preloadBar);*/
    },
    
    create: function() {
        
        game.state.start('Menu');
    }
};