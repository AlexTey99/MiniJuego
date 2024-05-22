
const airPlane = document.getElementById('airPlane');
const enemies = document.getElementById('enemies');
const gameOver = document.getElementById('gameOver');

let distancia = 0;
const incremento = 10;

// Configuracion del airPlane.

// Desplazamiento al precionar las teclas arrowLeft/Rigth.
document.addEventListener('keydown', (event) => {
    if(event.key === 'ArrowRight'){
        distancia += incremento;
        airPlane.style.left = distancia + 'px';
    }else if(event.key === 'ArrowLeft') {
        distancia -= incremento;
        airPlane.style.left = distancia + 'px';
    }
});


// Configuracion de enemies.

// Desplazamiento de enemies y resultado final de la colicion.
window.addEventListener('load', () => {
    enemies.classList.add('fall');

    // Colicion.
    function detectarColision(elemento1, elemento2) {
        // Obtiene las posiciones de los elementos
        const rect1 = elemento1.getBoundingClientRect();
        const rect2 = elemento2.getBoundingClientRect();

        // Comprueba si los rectángulos de los elementos se superponen
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }
    
    function verificarColision() {
        if (detectarColision(airPlane, enemies)) {
            airPlane.style.display = 'none';
            enemies.style.display = 'none';
            gameOver.style.display = 'flex';
        } else {
            requestAnimationFrame(verificarColision);
        }
    }

    verificarColision();
});









window.onload = function() {
    setInterval(function() {
        createFallingDiv();
    }, 1000);
};

function createFallingDiv() {
    var windowWidth = window.innerWidth;
    var divWidth = 50; // Ancho del div
    var maxLeft = windowWidth - divWidth;
    var randomLeft = Math.floor(Math.random() * maxLeft);

    var div = document.createElement('div');
    div.className = 'enemies';
    div.style.left = randomLeft + 'px';
    document.body.appendChild(div);

    animateFallingDiv(div);
}

function animateFallingDiv(div) {
    var windowHeight = window.innerHeight;
    var duration = Math.floor(Math.random() * 3000) + 2000; // Duración de la animación entre 2 y 5 segundos

    var animation = div.animate([
        { top: '0', opacity: 0 },
        { top: windowHeight + 'px', opacity: 1 }
    ], {
        duration: duration,
        easing: 'linear'
    });

    animation.onfinish = function() {
        div.remove();
    };
}



    
