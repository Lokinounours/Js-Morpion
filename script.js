let origBoard;
let nbClicks = 0;

let playerX = 0;
let playerY = 0;

let arrWin = Array(3);

const cells = document.querySelectorAll('.case');
startGame();

function startGame() {
    highLightEnd();
    origBoard = Array.from(Array(9).keys());
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].className = "case softUI";
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function endGame(result) {
    if (result == "X") {
        playerX++;
        document.getElementById("X").innerHTML = "X : " + playerX;
        highLightWin();
    }
    else if (result == "O") {
        playerY++;
        document.getElementById("O").innerHTML = "0 : " + playerY;
        highLightWin();
    }
    else if (result == "tie") {
        alert("Dommage, c'est une égalité");
    }
    else alert("Bug system, Win not detected");
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    nbClicks = 0;

}

function turnClick(square) {
    turn(square.target.id, (nbClicks % 2 == 0) ? "X" : "O")
}

function turn(squareId, player) {
    if (document.getElementById(squareId).className != "case softUI_active") {
        document.getElementById(squareId).className += "_active";
        nbClicks++;
        origBoard[squareId] = player;
        document.getElementById(squareId).innerText = player;
        if (checkWin() != false) endGame(checkWin());
    }
}

function checkWin() {
    const arr = [];
    arr[0] = "X";
    arr[1] = document.getElementById(1).innerText;
    arr[2] = document.getElementById(2).innerText;
    arr[3] = document.getElementById(3).innerText;
    arr[5] = document.getElementById(5).innerText;
    arr[4] = document.getElementById(4).innerText;
    arr[6] = document.getElementById(6).innerText;
    arr[7] = document.getElementById(7).innerText;
    arr[8] = document.getElementById(8).innerText;
    arr[9] = document.getElementById(9).innerText;

    // Verif Ligne
    if (arr[1] == arr[2] && arr[2] == arr[3] && arr[3] != "") {
        arrWin[0] = 1;
        arrWin[1] = 2;
        arrWin[2] = 3;
        return arr[1];
    }
    else if (arr[4] == arr[5] && arr[5] == arr[6] && arr[6] != "") {
        arrWin[0] = 4;
        arrWin[1] = 5;
        arrWin[2] = 6;
        return arr[4];
    }
    else if (arr[7] == arr[8] && arr[8] == arr[9] && arr[9] != "") {
        arrWin[0] = 7;
        arrWin[1] = 8;
        arrWin[2] = 9;
        return arr[7];
    }
    // Verif colonne
    else if (arr[1] == arr[4] && arr[4] == arr[7] && arr[7] != "") {
        arrWin[0] = 1;
        arrWin[1] = 4;
        arrWin[2] = 7;
        return arr[1];
    }
    else if (arr[2] == arr[5] && arr[5] == arr[8] && arr[8] != "") {
        arrWin[0] = 2;
        arrWin[1] = 5;
        arrWin[2] = 8;
        return arr[2];
    }
    else if (arr[3] == arr[6] && arr[6] == arr[9] && arr[9] != "") {
        arrWin[0] = 3;
        arrWin[1] = 6;
        arrWin[2] = 9;
        return arr[3];
    }
    // Verif Diag
    else if (arr[1] == arr[5] && arr[5] == arr[9] && arr[9] != "") {
        arrWin[0] = 1;
        arrWin[1] = 5;
        arrWin[2] = 9;
        return arr[1];
    }
    else if (arr[3] == arr[5] && arr[5] == arr[7] && arr[7] != "") {
        arrWin[0] = 3;
        arrWin[1] = 5;
        arrWin[2] = 7;
        return arr[3];
    }

    let tmp = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != "") tmp++;
    }
    if (tmp == 10) return "tie";

    return false;

}

function highLightWin() {
    arrWin.forEach(element => {
        // console.log(element);
        document.getElementById(element).style.color = "var(--primary)";
        document.getElementById(element).style.fontSize = "2em";
        // document.getElementById(element).style.fontWeight = "bold";
    });
}

function highLightEnd() {
    arrWin.forEach(element => {
        // console.log(element);
        document.getElementById(element).style.color = "black";
        document.getElementById(element).style.fontSize = "22px";
        // element = 0;
        // document.getElementById(element).style.fontWeight = "22px";
    });
}