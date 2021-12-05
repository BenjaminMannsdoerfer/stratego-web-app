let size = 10;
let websocket;

class MatchField {

    constructor() {
        this.size = size;
        this.fields = [];
        this.currentPlayerIndex = 0;
        this.currentPlayer = "";
        this.playerListBufferBlue = 40;
        this.playerListBufferRed = 40;
        this.gameStatus = "";
    }

    updateView() {
        let num = 0
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if (this.fields[num].isSet) {
                    if (this.fields[num].colour === 0 && this.playerListBufferBlue !== 0 || this.fields[num].colour === 0 && this.currentPlayerIndex === 0 && this.playerListBufferBlue === 0) {
                        let img = $("." + "row" + row + "col" + col).addClass(" blue")
                        switch (this.fields[num].figName) {
                            case 'F':
                                img.attr('src', "/assets/images/media/figures/stratego-flag.svg").attr('alt', "F")
                                break;
                            case 'B':
                                img.attr('src', "/assets/images/media/figures/stratego-bomb.svg").attr('alt', "B")
                                break;
                            case 'M':
                                img.attr('src', "/assets/images/media/figures/stratego-marshal.svg").attr('alt', "M")
                                break;
                            case '1':
                                img.attr('src', "/assets/images/media/figures/stratego-spy.svg").attr('alt', "1")
                                break;
                            case '2':
                                img.attr('src', "/assets/images/media/figures/stratego-scout.svg").attr('alt', "2")
                                break;
                            case '3':
                                img.attr('src', "/assets/images/media/figures/stratego-miner.svg").attr('alt', "3")
                                break;
                            case '4':
                                img.attr('src', "/assets/images/media/figures/stratego-sergeant.svg").attr('alt', "4")
                                break;
                            case '5':
                                img.attr('src', "/assets/images/media/figures/stratego-lieutenant.svg").attr('alt', "5")
                                break;
                            case '6':
                                img.attr('src', "/assets/images/media/figures/stratego-captain.svg").attr('alt', "6")
                                break;
                            case '7':
                                img.attr('src', "/assets/images/media/figures/stratego-major.svg").attr('alt', "7")
                                break;
                            case "8":
                                img.attr('src', "/assets/images/media/figures/stratego-colonel.svg").attr('alt', "8")
                                break;
                            case "9":
                                img.attr('src', "/assets/images/media/figures/stratego-general.svg").attr('alt', "9")
                                break;
                        }
                    } else if (this.fields[num].colour === 1 && this.playerListBufferRed !== 0 || this.fields[num].colour === 1 && this.currentPlayerIndex === 1 && this.playerListBufferRed === 0) {
                        let img = $("." + "row" + row + "col" + col).addClass(" red")
                        switch (this.fields[num].figName) {
                            case 'F':
                                img.attr('src', "/assets/images/media/figures/stratego-flag.svg").attr('alt', "F")
                                break;
                            case 'B':
                                img.attr('src', "/assets/images/media/figures/stratego-bomb.svg").attr('alt', "B")
                                break;
                            case 'M':
                                img.attr('src', "/assets/images/media/figures/stratego-marshal.svg").attr('alt', "M")
                                break;
                            case '1':
                                img.attr('src', "/assets/images/media/figures/stratego-spy.svg").attr('alt', "1")
                                break;
                            case '2':
                                img.attr('src', "/assets/images/media/figures/stratego-scout.svg").attr('alt', "2")
                                break;
                            case '3':
                                img.attr('src', "/assets/images/media/figures/stratego-miner.svg").attr('alt', "3")
                                break;
                            case '4':
                                img.attr('src', "/assets/images/media/figures/stratego-sergeant.svg").attr('alt', "4")
                                break;
                            case '5':
                                img.attr('src', "/assets/images/media/figures/stratego-lieutenant.svg").attr('alt', "5")
                                break;
                            case '6':
                                img.attr('src', "/assets/images/media/figures/stratego-captain.svg").attr('alt', "6")
                                break;
                            case '7':
                                img.attr('src', "/assets/images/media/figures/stratego-major.svg").attr('alt', "7")
                                break;
                            case "8":
                                img.attr('src', "/assets/images/media/figures/stratego-colonel.svg").attr('alt', "8")
                                break;
                            case "9":
                                img.attr('src', "/assets/images/media/figures/stratego-general.svg").attr('alt', "9")
                                break;
                        }
                    } else if (this.playerListBufferBlue === 0 && this.fields[num].colour === 0) {
                        let img = $("." + "row" + row + "col" + col)
                        if (window.location.href.indexOf("set") > -1) {
                            img.attr('src', "/assets/images/media/colors/stratego-blue.png")
                        } else {
                            img.attr('src', "/assets/images/media/colors/stratego-blue.png")
                            // html += '<td class="char-pic field-game">'
                            // html += '<input type="image" class="fig-cards" src="/assets/images/media/colors/stratego-blue.png" alt="blue"/> </span>'
                            // html += '</td>'
                        }

                    } else if (this.playerListBufferRed === 0 && this.fields[num].colour === 1) {
                        let img = $("." + "row" + row + "col" + col)
                        if (window.location.href.indexOf("set") > -1) {
                            img.attr('src', "/assets/images/media/colors/stratego-red.png")
                        } else {
                            img.attr('src', "/assets/images/media/colors/stratego-red.png")
                            /*html += '<td class="char-pic field-game">'
                            html += '<input type="image" class="fig-cards" src="/assets/images/media/colors/stratego-red.png" alt="red"/> </span>'
                            html += '</td>'*/
                        }
                    }
                } else if (this.fields[num].water === '~' || this.fields[num].row === 4 || this.fields[num].row === 5) {
                    let td = document.getElementsByClassName("row" + row + "col" + col)
                    td.className = "char-pic hidden"
                } else {
                    let td = document.getElementById("row" + row + "col" + col)
                    let input = $("." + "row" + row + "col" + col)
                    if (window.location.href.indexOf("set") > -1) {
                        td.className = "field char-pic hidden"
                        input.attr('src', "/assets/images/media/colors/stratego-black.png").attr('alt', "black")
                    } else {
                        input.attr("src", "").attr("alt", "")

                        //td.className = "char-pic"
                        //$('.hidden').append('<div></div>');
                        /*html += '<td class="char-pic field-game">'
                        html += '<input type="image" class="fig-cards" src="/assets/images/media/colors/stratego-red.png" alt="red"/> </span>'
                        html += '</td>'*/
                    }
                }
                num++;
            }
        }
    }


    updateMatchField(newFields, playerListBufferBlue, playerListBufferRed, gameStatus) {
        this.fields = newFields
        this.playerListBufferBlue = playerListBufferBlue
        this.playerListBufferRed = playerListBufferRed
        this.gameStatus = gameStatus
    }

    updateCurrentPlayer(currentPlayer, currentPlayerIndex, gameStatus) {
        this.currentPlayerIndex = currentPlayerIndex
        this.currentPlayer = currentPlayer
        if (this.playerListBufferBlue === 0 && this.playerListBufferRed === 0 && window.location.href.indexOf("set") > -1) {
            $(location).attr("href", "/stratego");
        }
        if (this.gameStatus === "INIT" && window.location.href.indexOf("set") > -1) {
            $(location).attr("href", "/stratego");
        }
        if (this.playerListBufferBlue !== 40) {
            $("#init").html("")
        }
        if (gameStatus === "WON") {
            $("#game-header").html("")
            if (currentPlayerIndex === 0) {
                $("#game-won").html(currentPlayer + " you found the flag and won the game!").addClass("color-blue")
            } else {
                $("#game-won").html(currentPlayer + " you found the flag and won the game!").addClass("color-red")
            }
            $("#won-btn").html('<button class="btn btn-dark btn-lg btn-primary-spacing">New Game</button>')
        } else {
            $("#game-won").html("")
            $("#won-btn").html("")
            if (currentPlayerIndex === 0) {
                $("#set-header").html("Enter your figures " + currentPlayer).addClass("color-blue")
            } else {
                $("#set-header").html("Enter your figures " + currentPlayer).addClass("color-red")
            }
            if (currentPlayerIndex === 0) {
                $("#game-header").html(currentPlayer + " it's your turn").addClass("color-blue").removeClass("color-red")
            } else {
                $("#game-header").html(currentPlayer + " it's your turn").addClass("color-red").removeClass("color-blue")
            }
        }
    }
}

function set(row, col, charac) {
    websocket.send(JSON.stringify({
        "set": {
            "row": row,
            "col": col,
            "charac": charac
        }}))
}

function move(dir, row, col) {
    websocket.send(JSON.stringify({
        "move": {
            "row": row,
            "col": col,
            "dir": dir
        }}))
}

function attack(row, col, rowD, colD) {
    websocket.send(JSON.stringify({
        "attack": {
            "row": row,
            "col": col,
            "rowD": rowD,
            "colD": colD
        }}))
}

function connectWebSocket() {
    websocket = new WebSocket("ws://localhost:9000/websocket")
    websocket.setTimeout

    websocket.onopen = function (event) {
        websocket.send(JSON.stringify({
            "connected": {
                "connect": "successful"
            }}))
        console.log("Connected to Websocket");
    }

    websocket.onclose = function () {
        console.log('Connection with Websocket Closed!');
    };

    websocket.onerror = function (error) {
        console.log('Error in Websocket Occured: ' + error);
    };

    websocket.onmessage = function (e) {
        if (typeof e.data === "string") {
            console.log("socket")
            let matchField = new MatchField;
            let json = JSON.parse(e.data);
            size = json.machtfieldSize;
            let field = json.matchField
            let currentPlayerIndex = json.currentPlayerIndex
            let currentPlayer = json.currentPlayer
            let gameStatus = json.gameStatus
            let playerListBufferBlue = json.playerListBufferBlue
            let playerListBufferRed = json.playerListBufferRed
            matchField.updateMatchField(field, playerListBufferBlue, playerListBufferRed, gameStatus);
            matchField.updateCurrentPlayer(currentPlayer, currentPlayerIndex, gameStatus)
            matchField.updateView();
        }
    };
}

$(document).ready(function () {
    connectWebSocket()
});