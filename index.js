const airPlane = document.getElementById('airPlane');
        const gameOver = document.getElementById('gameOver');

        let distancia = 0;
        const incremento = 10;
        const padding = 35; // Ajuste del área de colisión de airPlane
        const paddingEnemies = 32;
        const paddingProyectil = 0;

        // Configuración del airPlane.
        // Desplazamiento al presionar las teclas ArrowLeft/ArrowRight y disparar al presionar la barra espaciadora.
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                distancia += incremento;
                airPlane.style.left = distancia + 'px';
            } else if (event.key === 'ArrowLeft') {
                distancia -= incremento;
                airPlane.style.left = distancia + 'px';
            } else if (event.key === ' ') { // Barra espaciadora
                dispararProyectil();
            }
        });

        function dispararProyectil() {
            let proyectil = document.createElement('div');
            proyectil.className = 'municion';
            let airPlaneRect = airPlane.getBoundingClientRect();
            proyectil.style.left = (airPlaneRect.left + airPlaneRect.width / 2 - 5) + 'px'; // Centrar el proyectil
            proyectil.style.top = airPlaneRect.top + 'px';
            document.body.appendChild(proyectil);

            animateProyectil(proyectil);
        }

        function animateProyectil(proyectil) {
            let duration = 1000; // Duración de la animación de 1 segundo

            let animation = proyectil.animate([
                { top: proyectil.style.top, opacity: 1 },
                { top: '-20px', opacity: 1 }
            ], {
                duration: duration,
                easing: 'linear'
            });

            animation.onfinish = function() {
                proyectil.remove();
            };
        }

        // Obtener el rectángulo ajustado del elemento
        function getAdjustedRect(element, padding) {
            var rect = element.getBoundingClientRect();
            return {
                top: rect.top + padding,
                left: rect.left + padding,
                bottom: rect.bottom - padding,
                right: rect.right - padding,
                width: rect.width - padding * 2,
                height: rect.height - padding * 2
            };
        }

        // Obtener el rectángulo ajustado del proyectil
        function getAdjustedRectProyect(element, paddingProyectil) {
            var rect = element.getBoundingClientRect();
            return {
                top: rect.top + paddingProyectil,
                left: rect.left + paddingProyectil,
                bottom: rect.bottom - paddingProyectil,
                right: rect.right - paddingProyectil,
                width: rect.width - paddingProyectil * 2,
                height: rect.height - paddingProyectil * 2
            };
        }

        // Detectar colisión entre dos rectángulos ajustados
        function detectarColision(rect1, rect2) {
            return !(
                rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom
            );
        }

        // Configuración de enemies y resultado final de la colisión.
        window.addEventListener('load', () => {
            function verificarColision() {
                let airPlaneRect = getAdjustedRect(airPlane, padding); // Obtener el rectángulo ajustado del avión
                let enemiesList = document.querySelectorAll('.enemies'); // Obtener todos los elementos con la clase 'enemies'
                let proyectilesList = document.querySelectorAll('.municion'); // Obtener todos los proyectiles

                // Iterar sobre cada enemigo
                enemiesList.forEach(function(enemy) {
                    let enemyRect = getAdjustedRect(enemy, paddingEnemies); // Obtener el rectángulo ajustado del enemigo

                    // Verificar colisión entre el avión y el enemigo actual
                    if (detectarColision(airPlaneRect, enemyRect)) {
                        airPlane.style.display = 'none';
                        enemy.style.display = 'none'; // Ocultar el enemigo con el que se produce la colisión
                        gameOver.style.display = 'flex';
                    }

                    // Verificar colisión entre proyectiles y enemigos
                    proyectilesList.forEach(function(proyectil) {
                        let proyectilRect = getAdjustedRectProyect(proyectil, paddingProyectil); // Obtener el rectángulo ajustado del proyectil
                        if (detectarColision(proyectilRect, enemyRect)) {
                            console.log('Colisión detectada entre proyectil y enemigo');
                            proyectil.remove(); // Eliminar el proyectil
                            enemy.remove(); // Eliminar el enemigo
                        }
                    });
                });

                // Solicitar la próxima animación para seguir verificando la colisión
                requestAnimationFrame(verificarColision);
            }

            verificarColision();
        });

        window.onload = function() {
            setInterval(function() {
                createFallingDiv();
            }, 1000);
        };

        // Creación de enemies.
        let enemyCount = 0;

        function createFallingDiv() {
            let windowWidth = window.innerWidth;
            let divWidth = 50; // Ancho del div
            let maxLeft = windowWidth - divWidth;
            let randomLeft = Math.floor(Math.random() * maxLeft);

            let div = document.createElement('img');
            div.src = './image/Meteor-PNG-Cutout.png';
            div.className = 'enemies';
            enemyCount++;
            div.style.left = randomLeft + 'px';
            document.body.appendChild(div);

            animateFallingDiv(div);
        }

        // Animación de enemies.
        function animateFallingDiv(div) {
            let windowHeight = window.innerHeight;
            let duration = Math.floor(Math.random() * 3000) + 2000; // Duración de la animación entre 2 y 5 segundos

            let animation = div.animate([
                { top: '0', opacity: 0.2 },
                { top: windowHeight + 'px', opacity: 1 }
            ], {
                duration: duration,
                easing: 'linear'
            });

            animation.onfinish = function() {
                div.remove();
            };
        }

       
        
