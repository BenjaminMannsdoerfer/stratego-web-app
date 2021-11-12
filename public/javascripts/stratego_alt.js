window.addEventListener("keypress", characKeyCode, false);

let row;
let col;
let charac;

const field = document.getElementsByClassName("field");
Object.keys(field).forEach(key => {
    field[key].addEventListener("click", function () {
        if (charac === undefined) {
            window.location = "/initGame";
        } else {
            row = this.parentElement.rowIndex;
            col = this.cellIndex;
            window.location = "/setCharacter/" + row + "/" + col + "/" + charac
        }
    });
});

function characKeyCode(event) {
    switch (event.keyCode) {
        case 70:
        case 102:
            charac = 'F'; // F
            break;
        case 66:
        case 98:
            charac = 'B'; // B
            break;
        case 77:
        case 109:
            charac = 'M'; // M
            break;
        case 49:
            charac = '1'; // 1
            break;
        case 50:
            charac = '2'; // 2
            break;
        case 51:
            charac = '3'; // 3
            break;
        case 52:
            charac = '4'; // 4
            break;
        case 53:
            charac = '5'; // 5
            break;
        case 54:
            charac = '6'; // 6
            break;
        case 55:
            charac = '7'; // 7
            break;
        case 56:
            charac = '8'; // 8
            break;
        case 57:
            charac = '9'; // 9
            break;
    }
}
