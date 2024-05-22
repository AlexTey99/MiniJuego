
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

    function verificarColision() {
        let airPlaneRect = airPlane.getBoundingClientRect(); // Obtener el rectángulo del avión
        let enemiesList = document.querySelectorAll('.enemies'); // Obtener todos los elementos con la clase 'enemies'
    
        // Iterar sobre cada enemigo
        enemiesList.forEach(function(enemy) {
            let enemyRect = enemy.getBoundingClientRect(); // Obtener el rectángulo del enemigo
    
            // Verificar colisión entre el avión y el enemigo actual
            if (detectarColision(airPlaneRect, enemyRect)) {
                airPlane.style.display = 'none';
                enemy.style.display = 'none'; // Ocultar el enemigo con el que se produce la colisión
                gameOver.style.display = 'flex';
            }
        });
    
        // Solicitar la próxima animación para seguir verificando la colisión
        requestAnimationFrame(verificarColision);
    }
    
    // Detectar colisión entre dos rectángulos
    function detectarColision(rect1, rect2) {
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    }

    verificarColision();
});



window.onload = function() {
    setInterval(function() {
        createFallingDiv();
    }, 1000);
};

// Creacion de enemies.
let enemyCount = 0;

function createFallingDiv() {
    let windowWidth = window.innerWidth;
    let divWidth = 50; // Ancho del div
    let maxLeft = windowWidth - divWidth;
    let randomLeft = Math.floor(Math.random() * maxLeft);

    let div = document.createElement('div');
    div.className = 'enemies';
    div.id = 'enemies';
    enemyCount++; 
    div.style.left = randomLeft + 'px';
    document.body.appendChild(div);

    animateFallingDiv(div);
}

// Animacion de enemies.
function animateFallingDiv(div) {
    let windowHeight = window.innerHeight;
    let duration = Math.floor(Math.random() * 3000) + 2000; // Duración de la animación entre 2 y 5 segundos

    let animation = div.animate([
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



    
