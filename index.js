console.log('hola');

// Obtener referencia a la imagen
const imagenMovil = document.getElementById('naveMovil');

// Definir la cantidad de píxeles que se moverá la imagen en cada paso
const paso = 10;

// Función para mover la imagen a la izquierda
function moverIzquierda() {
  let posicionActual = parseInt(imagenMovil.style.left, 10) || 0;
  imagenMovil.style.left = `${posicionActual - paso}px`;
}

// Función para mover la imagen a la derecha
function moverDerecha() {
  let posicionActual = parseInt(imagenMovil.style.left, 10) || 0;
  imagenMovil.style.left = `${posicionActual + paso}px`;
}

// Agregar event listener al evento de teclado
document.addEventListener('keydown', (event) => {
  // Comprobar qué tecla fue presionada
  if (event.key === 'ArrowLeft') {
    moverIzquierda();
  } else if (event.key === 'ArrowRight') {
    moverDerecha();
  }
});


///////////////////////////////////////
// Obtener referencia al contenedor
const container = document.getElementById('container');

// Definir la velocidad de las bolas en píxeles por milisegundo
const velocidadBola = 3;

// Función para crear una nueva bola que es la municion de la nave
function crearBolaNave() {
  const bola = document.createElement('div');
  bola.className = 'bola';
  bola.style.top = `${imagenMovil.offsetTop + 10}px`;
  bola.style.left = `${imagenMovil.offsetLeft + imagenMovil.width / 2}px`;
  container.appendChild(bola);


  // Mover la bola de la nave hacia arriba hasta que esté fuera del contenedor o choque con una bola blanca
  function moverBolaNave() {
    const posicionActual = parseInt(bola.style.top, 10) || 0;
    if (posicionActual > -10) {
      const bolasBlancas = document.getElementsByClassName('bolaEnemigas');
      for (let i = 0; i < bolasBlancas.length; i++) {
        const bolaBlanca = bolasBlancas[i];
        if (hayColision(bola, bolaBlanca)) {
          // Eliminar la bola blanca al chocar
          container.removeChild(bolaBlanca);
          // Eliminar la bola de la nave cuando sale del contenedor
          if (posicionActual > 0) {
            bola.style.top = `${posicionActual - velocidadBola}px`;
          } else {
            container.removeChild(bola);
          }
          return; // Salir de la función, ya que la bola de la nave ha chocado
        }
      }
      bola.style.top = `${posicionActual - velocidadBola}px`;
      requestAnimationFrame(moverBolaNave);
    } else {
      container.removeChild(bola); // Eliminar la bola de la nave cuando sale del contenedor
    }
  }

  moverBolaNave();
}

// ... Resto del código ...

// Función para verificar si dos elementos se superponen
function hayColision(elemento1, elemento2) {
  const rect1 = elemento1.getBoundingClientRect();
  const rect2 = elemento2.getBoundingClientRect();
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

// Agregar event listener al evento de teclado
document.addEventListener('keydown', (event) => {
  // Comprobar si se presionó la tecla de espacio
  if (event.key === ' ') {
    crearBolaNave();
  }
});





// Bolas enemigas

// Obtener referencia al contenedor
const containerDiv = document.getElementById('container');

// Definir la velocidad de las bolas en píxeles por milisegundo
const velocidadBolA = 3;

// Función para crear una nueva bola
function crearBola() {
  const bola = document.createElement('div'); // Usamos un div en lugar de img
  bola.className = 'bolaEnemigas';
  containerDiv.appendChild(bola);

  // Establecer posición inicial aleatoria
  const posicionInicialX = Math.random() * (containerDiv.offsetWidth - bola.offsetWidth);
  bola.style.left = `${posicionInicialX}px`;
  bola.style.top = '-50px'; // Posición inicial arriba del contenedor

  // Mover la bola hacia abajo hasta que esté fuera del contenedor
  function moverBola() {
    const posicionActual = parseInt(bola.style.top, 10) || 0;
    const limiteAbajo = containerDiv.offsetHeight - bola.offsetHeight;
    if (posicionActual < limiteAbajo) {
      bola.style.top = `${posicionActual + velocidadBolA}px`;
      requestAnimationFrame(moverBola);
    } else {
        containerDiv.removeChild(bola); // Eliminar la bola cuando llega al límite
    }
  }

  moverBola();
}

// Llamar a la función crearBola cada 3 segundos
setInterval(crearBola, 1000); // 3000 milisegundos (3 segundos)
