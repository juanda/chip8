var {Chip8} = require('./chip8');

var myChip8 = new Chip8()

myChip8.loadGame('PONG').then(() => {
    console.log(myChip8.memory);
});

