import { Fruta } from './fruta.js';

window.addEventListener('load', function() {

    // Configuración Inicial
    const lienzo = document.getElementById('lienzo');
    const ctx = lienzo.getContext('2d');
    ctx.width = 700;
    ctx.height = 700;

    const colision = document.getElementById('colision');
    const ctxColision = colision.getContext('2d');
    ctxColision.width = 700;
    ctxColision.height = 700;

    class Juego {
        constructor(ancho, alto, contexto) {
            this.ancho = ancho;
            this.alto = alto;
            this.contexto = contexto;

            this.frutas = [];

            this.ultimoTiempo = 0;
            this.tiempoSiguienteFruta = 0;
            this.intervaloEntreFrutas = 2000;

            this.puntacion = 0;

        }

        //draw
        dibujar() {
           this.contexto.clearRect(0,0, this.ancho, this.alto);
           ctxColision.clearRect(0,0, this.ancho, this.alto);

        }

        // update 
        actualizar(marcaTiempo) {   
            // console.log(this.frutas);
            let deltaTiempo = marcaTiempo - this.ultimoTiempo;
            this.ultimoTiempo = marcaTiempo;
            this.tiempoSiguienteFruta += deltaTiempo;

            if( this.tiempoSiguienteFruta > this.intervaloEntreFrutas) {
                this.frutas.push(new Fruta(juego));
                this.tiempoSiguienteFruta = 0;
            }
            [...this.frutas].forEach(fruta => fruta.actualizar(deltaTiempo));

            [...this.frutas].forEach(fruta => fruta.dibujar(this.contexto, ctxColision));


            this.frutas = this.frutas.filter(fruta => !fruta.deboMorir);
            // console.log(this.frutas);
        }

        dibujarPuntuacion () {
            this.contexto.fillStyle = 'black';
            this.contexto.fillText(`Score: ${this.puntacion}`, 10, 10);
        }

    }

    const juego = new Juego(lienzo.width, lienzo.height, ctx);

    window.addEventListener('click', function(e) {
        const colorPixel = ctxColision.getImageData(e.offsetX, e.offsetY, 1,1);
        console.log('Evento', e.offsetX, e.offsetY);
        console.log('colorPixel', colorPixel.data[0], colorPixel.data[1], colorPixel.data[2]);
        const cp = colorPixel.data;
        console.log(juego.frutas);
        juego.frutas.forEach(fruta => {
            console.log(fruta.coloresAleatorios, cp);
            if(cp[0] === fruta.coloresAleatorios[0] && cp[1] === fruta.coloresAleatorios[1]&& cp[2] === fruta.coloresAleatorios[2]){
                fruta.deboMorir = true;
                
            }
        });
        juego.puntacion++;
    });

    function animate(marcaTiempo) {
        
        juego.dibujar();
        juego.actualizar(marcaTiempo);

        juego.dibujarPuntuacion();
        requestAnimationFrame(animate);
    }

    animate(0);
});