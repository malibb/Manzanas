export class Fruta {
    constructor(juego) {
        this.juego = juego;

        this.spriteAncho = 32;
        this.spriteAlto = 32;

        this.tamanioModificador = Math.random() * 0.9 + 0.8;
        this.cuadro = 0;
        this.cuadroMax = 0;

        // tiempo cambio de los assets
        this.tiempoUltimoCambio = 0;
        this.intervaloCambio = Math.random() * 50 + 50;

        this.ancho = this.spriteAncho * this.tamanioModificador;
        this.alto = this.spriteAlto * this.tamanioModificador;
        this.imagen = new Image();
        this.imagen.src = 'assets/cute_orange_run.png';

        this.deboMorir = false;

        this.x = juego.ancho;
        this.y = Math.random() * (juego.alto - this.alto);

        this.direccionX = Math.random() * 5 + 3;

        this.coloresAleatorios = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = `rgb(${this.coloresAleatorios[0]},${this.coloresAleatorios[1]},${this.coloresAleatorios[2]})`;
    }

    dibujar(contexto, contextoColision) {
        contextoColision.fillStyle = this.color;

        contextoColision.fillRect(this.x, this.y, this.ancho, this.alto);
        // contexto.drawImage(this.imagen, this.cuadro * this.spriteAncho, 0, this.spriteAncho, this.spriteAlto, this.x, this.y, this.ancho, this.alto)

    }

    actualizar(deltaTiempo) {
        this.x -= this.direccionX;
        if(this.x < 0 - this.ancho) this.deboMorir = true;
        if(this.tiempoUltimoCambio > this.intervaloCambio) {
            if(this.cuadro > this.cuadroMax) this.cuadro = 0;
            else this.cuadro++;
        }
        this.tiempoUltimoCambio += deltaTiempo;
    }

}
