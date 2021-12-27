/*$(document).keydown(function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
});*/


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

