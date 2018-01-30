var {Chip8} = require('./chip8');

var myChip8 = new Chip8()

myChip8.initialize();
myChip8.loadGame('PONG').then(() => {
    myChip8.emulateCycle();
});

