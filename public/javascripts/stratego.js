let row;
let col;
let row_enemy;
let col_enemy;
let charac;
let dir;
let setAttack = false;

$(document).ready(function(){
    matchField = new MatchField;
});


/*$(document).on('click', '.field', (function () {
    row = this.parentElement.rowIndex;
    col = this.cellIndex;
    console.log(row + " " + col)
}))*/

$(document).on('click', '.field', (function () {
    if (setAttack === false) {
        row = this.parentElement.rowIndex;
        col = this.cellIndex;
    } else {
        if (row === undefined || col === undefined) {
        } else {
            row_enemy = this.parentElement.rowIndex;
            col_enemy = this.cellIndex;
            if (matchField.gameStatus !== "WON") {
                attack(row, col, row_enemy, col_enemy)
                setAttack = false
            }
        }
    }
}));


$(document).keydown(function (event) {
    if (window.location.href.indexOf("set") > -1) {
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
        console.log(row + " " + col + " " + charac)
        if (charac === undefined || row === undefined || col === undefined) {
        } else {

            set(row, col, charac);
            charac = "";
        }
    }
})

$(document).keydown(function (event) {
    if (window.location.href.indexOf("move") > -1 || window.location.href.indexOf("init") > -1 || window.location.href.indexOf("stratego") > -1
    || window.location.href.indexOf("save") > -1 || window.location.href.indexOf("load") > -1 || window.location.href.indexOf("undo") > -1
    || window.location.href.indexOf("redo") > -1 || window.location.href.indexOf("attack") > -1) {
        switch (event.keyCode) {
        case 65:
        case 87:
            setAttack = true;
            break;
        case 68:
        case 100:
        case 40:
            dir = 'd'; // d
            break;
        case 85:
        case 117:
        case 38:
            dir = 'u'; // u
            break;
        case 76:
        case 108:
        case 37:
            dir = 'l'; // l
            break;
        case 82:
        case 114:
        case 39:
            dir = 'r'; // r
            break;
        }
        if (dir === undefined) {
        } else if (dir.length > 1 || row === undefined || col === undefined || attack === true) {
        } else {
            if (matchField.gameStatus !== "WON") {
                console.log("move")
                move(dir, row, col);
            }

        }
    }
})

$(document).keydown(function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
});


function setfigures() {
    var newLine = "\r\n"
    var msg = "How to set figures?"
    msg += newLine;
    msg += "1. You press on an empty field";
    msg += newLine;
    msg += "2. You press the following keys for the selected figures";
    msg+= newLine;
    msg += "F=Flag | B=Bomb | M=Marshal";
    msg+= newLine;
    msg += "1=General | 2=Colonel | 3=Major";
    msg+= newLine;
    msg += "4=Captain | 5=Lieutenant | 6=Sergeant";
    msg+= newLine;
    msg += "7=Miner | 8=Scout | 9=Spy";
    msg+= newLine;
    alert(msg);
}

function moveattack() {
    var newLine = "\r\n"
    var msg = "How to move figures?"
    msg += newLine;
    msg += newLine;
    msg += "1. Press on a figure";
    msg += newLine;
    msg += "2. Press d for moving down, u for moving up, l for moving left, r for moving right";
    msg+= newLine;
    msg += "Only possible when the desired field is not blocked by a other figures or sea";
    msg+= newLine;
    msg += newLine;
    msg += newLine;
    msg += "How to attack?";
    msg+= newLine;
    msg += newLine;
    msg += "1. Press the figures";
    msg+= newLine;
    msg += "2. Press a for attack";
    msg+= newLine;
    msg += "3. Press the desired figure to attack";
    msg+= newLine;
    alert(msg);
}
