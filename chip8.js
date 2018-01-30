const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

var Chip8 = function () {

    // Memoria
    this.memory = new Uint8Array(4096);

    // Registros
    this.V = new Uint8Array(16);

    // Código de operación actual
    this.opcode = new Uint16Array(1);

    // registro I
    this.I = new Uint8Array(3);

    // Contador de programa
    this.pc = new Uint8Array(3);

    // Screen
    this.gfx = new Uint8Array(64 * 32);

    // Timers
    this.delay_timer = new Uint8Array(1);
    this.sound_timer = new Uint8Array(1);


    // Pila y puntero de pila
    this.stack = new Uint16Array(16);
    this.sp = new Uint16Array(1);

    // borra la memoria, registros y pantalla
    this.initialize = function () {

    };

    // Carga el juego en memoria
    this.loadGame = (filepath) => {

       return readFile(filepath)
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    this.memory[i] = data[i];
                }
            })
            .catch(error => { throw error });
    };
}


module.exports.Chip8 = Chip8;


