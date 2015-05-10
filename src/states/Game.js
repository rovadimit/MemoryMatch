//all global elements
//adding of the states
//starts the first state

var WIDTH = 800;
var HEIGHT = 800;

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'gameDiv');

var stageSize = { width: WIDTH, height: HEIGHT };
//var worldSize = { width: WIDTH, height: stageSize.height * 4 };

var CardIndex = 0; //globalen index, koito sledi tekushtata karta v masiva
var Score = 0;
var CardCount = 10;

game.state.add('Boot', bootState);  
game.state.add('Preload', preloadState);  
game.state.add('Menu', menuState); 
game.state.add('Main', mainState); 

game.state.start('Boot'); 