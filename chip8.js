const util = require('util');
const fs = require('fs');
const {fontSet} = require('./fontset.js')

const readFile = util.promisify(fs.readFile);

var Chip8 = function () {

    // Memoria
    this.memory = new Uint8Array(4096);

    // Registros
    this.V = new Uint8Array(16);

    // Código de operación actual
    this.opcode = new Uint16Array(1);

    // registro I
    this.I = new Uint16Array(0);

    // Contador de programa
    this.pc = new Uint16Array(1);

    // Screen
    this.gfx = new Uint8Array(64 * 32);

    // Timers
    this.delay_timer = new Uint8Array(1);
    this.sound_timer = new Uint8Array(1);


    // Pila y puntero de pila
    this.stack = new Uint16Array(16);
    this.sp = new Uint16Array(1);

    // Borra la memoria, registros y pantalla.
    this.initialize = function () {
        // El contador de program al inicio de la dirección de memoria donde
        // comienza el programa.
        this.pc[0] = 512;

        // los registro V, I , sp y el código de operación se inician a 0 cuando se 
        // declaran los arrays correspondientes.

        // cargamos el font set

        for(let i = 0; i < 80; i++){
            this.memory[i] = fontSet[i];
        }

    };

    // Carga el juego en memoria
    this.loadGame = (filepath) => {

       return readFile(filepath)
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    // El programa comienza en la dirección de memoria 0x200 (512)
                    this.memory[512 + i] = data[i];
                }
            })
            .catch(error => { throw error });
    };

    this.emulateCycle = () => {
        this.opcode[0] = this.memory[this.pc[0]] << 8 | this.memory[this.pc[0] + 1];

    };
}


module.exports.Chip8 = Chip8;


