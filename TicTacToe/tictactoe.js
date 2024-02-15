function tictactoe(){
    let tablero = [[0,0,0],[0,0,0],[0,0,0]];
    let ind = 0;
    let turn = 1;
    let gameActive = true;
    let winner = document.createElement('h1');
    let replay = document.createElement('button');
    replay.textContent = "Replay";
    winner.className =  'winner';
    

    for (let i = 0; i < tablero.length; i++){
        var column = document.createElement("div");
        column.className = 'column';
        var mainC = document.getElementsByClassName('mainCont')[0];
        mainC.appendChild(column);

        for (let j = 0; j < tablero[i].length; j++){
            var square = document.createElement("span");
            square.className = 'square';
            square.id = 's' + ind;
            square.innerHTML = ""; 
            column.appendChild(square);
            ind++;

            square.onclick = function(event) {
                if (!gameActive) return; // Si el juego no está activo, no hacer nada
                let id = parseInt(event.target.id.substring(1));
                let fila = Math.floor(id / tablero.length);
                let columna = id % tablero.length;

                if (tablero[fila][columna] === 0) { // Solo permite movimientos en casillas vacías
                    tablero[fila][columna] = turn;
                    event.target.innerHTML = turn === 1 ? 'X' : 'O'; // Muestra 'X' o 'O' en el cuadrado
                    checkWinner(); // Verifica si hay un ganador después de cada movimiento
                    turn = (turn === 1) ? 2 : 1; // Cambia el turno
                }
            };
        }
    }

    function checkWinner() {
        
        // Verifica filas
        for (let i = 0; i < 3; i++) {
            if (tablero[i][0] === tablero[i][1] && tablero[i][1] === tablero[i][2] && tablero[i][0] !== 0) {
                gameActive = false;
                
                winner.textContent = `¡El jugador ${tablero[i][0]} ha ganado!`;
                winner.style.display = 'flex';
                mainC.appendChild(winner);
                mainC.appendChild(replay);
                return;
            }
        }

        // Verifica columnas
        for (let i = 0; i < 3; i++) {
            if (tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i] && tablero[0][i] !== 0) {
                gameActive = false;
                winner.textContent = `¡El jugador ${tablero[0][i]} ha ganado!`;
                winner.style.display = 'flex';
                mainC.appendChild(winner);
                mainC.appendChild(replay);
                return;
            }
        }

        // Verifica diagonales
        if ((tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2] && tablero[0][0] !== 0) ||
            (tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0] && tablero[0][2] !== 0)) {
            gameActive = false;
            winner.textContent = `¡El jugador ${tablero[1][1]} ha ganado!`;
            winner.style.display = 'flex';
            mainC.appendChild(winner);
            mainC.appendChild(replay);
            return;
        }

        // Verifica empate
        let empate = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (tablero[i][j] === 0) {
                    empate = false;
                    break;
                }
            }
        }
        if (empate) {
            gameActive = false;
            winner.textContent = "¡Empate!";
            winner.style.display = 'flex';
            mainC.appendChild(winner);
            mainC.appendChild(replay);
        }
    }

    function reiniciarJuego() {
        // Limpiar el tablero
        tablero = [[0,0,0],[0,0,0],[0,0,0]];
        // Limpiar cualquier mensaje o elemento mostrado al final del juego
        winner.textContent = "";

        winner.style.display = "none";
        // Remover el botón de repetición si está presente
        if (replay.parentNode) {
            replay.parentNode.removeChild(replay);
        }
        // Reiniciar las variables
        turn = 1;
        gameActive = true;
        // Limpiar el contenido de los cuadros
        document.querySelectorAll('.square').forEach(square => square.textContent = "");
    }

    // Evento clic para el botón de repetición
    replay.onclick = reiniciarJuego;
}

tictactoe();

