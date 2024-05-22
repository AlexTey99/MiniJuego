
const airPlane = document.getElementById('airPlane');
const enemies = document.getElementById('enemies');
const gameOver = document.getElementById('gameOver');

let distancia = 0;
const incremento = 10;

document.addEventListener('keydown', (event) => {
    if(event.key === 'ArrowRight'){
        distancia += incremento;
        airPlane.style.left = distancia + 'px';
    }else if(event.key === 'ArrowLeft') {
        distancia -= incremento;
        airPlane.style.left = distancia + 'px';
    }
});

window.addEventListener('load', () => {
    enemies.classList.add('fall');

    function detectarColision(elemento1, elemento2) {
        // Obtener las posiciones de los elementos
        const rect1 = elemento1.getBoundingClientRect();
        const rect2 = elemento2.getBoundingClientRect();

        // Comprobar si los rectángulos de los elementos se superponen
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }

    setInterval(() => {
        if (detectarColision(airPlane, enemies)) {
            console.log('¡Los elementos están colisionando!');
            airPlane.style.display = 'none';
            enemies.style.display = 'none';
            gameOver.style.display = 'flex';

        }
    }, 100);
})


    
