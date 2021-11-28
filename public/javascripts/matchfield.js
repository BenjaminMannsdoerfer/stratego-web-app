let size = 10;

class MatchField {

    constructor() {
        this.fields = []
        this.currentPlayerIndex = 0
        this.currentPlayer = "";
        this.playerListBufferBlue = 40;
        this.playerListBufferRed = 40;
        this.gameStatus = "";
    }

    createView() {
        let html = "<table id='tbl' class='matchfield'>"
        let num = 0
        for (let row = 0; row < size; row++) {
            html += '<tr>'
            for (let col = 0; col < size; col++) {
                if (this.fields[num].isSet) {
                    if (this.fields[num].colour === 0 && this.playerListBufferBlue !== 0 || this.fields[num].colour === 0 && this.currentPlayerIndex === 0 && this.playerListBufferBlue === 0) {
                        if (window.location.href.indexOf("set") > -1) {
                            html += '<td class="char-pic field">'
                        } else {
                            html += '<td class="char-pic field-game">'
                        }
                        switch (this.fields[num].figName) {
                            case 'F':
                                html += '<div class="blue">'
                                html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-flag.svg" alt="F"/></span>'
                                html += '</div>'
                                break;
                            case 'B':
                                html += '<div class="blue">'
                                html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-bomb.svg" alt="B"/> </span>'
                                html += '</div>'
                                break;
                            case 'M':
                                html += '<div class="blue">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-marshal.svg" alt="M"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-marshal.svg" alt="M"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case '1':
                                html += '<div class="blue">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-spy.svg" alt="1"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-spy.svg" alt="1"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case '2':
                                html += '<div class="blue">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-scout.svg" alt="2"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-scout.svg" alt="2"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case '3':
                                html += '<div class="blue">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-miner.svg" alt="3"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-miner.svg" alt="3"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case '4':
                                html += '<div class="blue">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-sergeant.svg" alt="4"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-sergeant.svg" alt="4"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case '5':
                                html += '<div class="blue">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-lieutenant.svg" alt="5"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-lieutenant.svg" alt="5"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case '6':
                                html += '<div class="blue">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-captain.svg" alt="6"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-captain.svg" alt="6"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case '7':
                                html += '<div class="blue">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-major.svg" alt="7"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-major.svg" alt="7"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case "8":
                                html += '<div class="blue">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-colonel.svg" alt="8"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-colonel.svg" alt="8"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case "9":
                                html += '<div class="blue">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-general.svg" alt="9"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-general.svg" alt="9"/> </span>'
                                }
                                html += '</div>'
                                break;
                        }
                        html += '</td>'
                    } else if (this.fields[num].colour === 1 && this.playerListBufferRed !== 0 || this.fields[num].colour === 1 && this.currentPlayerIndex === 1 && this.playerListBufferRed === 0) {
                        if (window.location.href.indexOf("set") > -1) {
                            html += '<td class="char-pic field">'
                        } else {
                            html += '<td class="char-pic field-game">'
                        }
                        switch (this.fields[num].figName) {
                            case 'F':
                                html += '<div class="red">'
                                html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-flag.svg" alt="F"/></span>'
                                html += '</div>'
                                break;
                            case 'B':
                                html += '<div class="red">'
                                html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-bomb.svg" alt="B"/> </span>'
                                html += '</div>'
                                break;
                            case 'M':
                                html += '<div class="red">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-marshal.svg" alt="M"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-marshal.svg" alt="M"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case '1':
                                html += '<div class="red">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-spy.svg" alt="1"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-spy.svg" alt="1"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case '2':
                                html += '<div class="red">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-scout.svg" alt="2"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-scout.svg" alt="2"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case '3':
                                html += '<div class="red">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-miner.svg" alt="3"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-miner.svg" alt="3"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case '4':
                                html += '<div class="red">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-sergeant.svg" alt="4"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-sergeant.svg" alt="4"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case '5':
                                html += '<div class="red">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-lieutenant.svg" alt="5"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-lieutenant.svg" alt="5"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case '6':
                                html += '<div class="red">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-captain.svg" alt="6"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-captain.svg" alt="6"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case '7':
                                html += '<div class="red">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-major.svg" alt="7"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-major.svg" alt="7"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case "8":
                                html += '<div class="red">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-colonel.svg" alt="8"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-colonel.svg" alt="8"/> </span>'
                                }
                                html += '</div>'
                                break;
                            case "9":
                                html += '<div class="red">'
                                if (window.location.href.indexOf("set") > -1) {
                                    html += '<img class="fig-cards" src="/assets/images/media/figures/stratego-general.svg" alt="9"/> </span>'
                                } else {
                                    html += '<input type="image" class="fig-cards" src="/assets/images/media/figures/stratego-general.svg" alt="9"/> </span>'
                                }
                                html += '</div>'
                                break;
                        }
                        html += '</td>'
                    } else if (this.playerListBufferBlue === 0 && this.fields[num].colour === 0) {
                        if (window.location.href.indexOf("set") > -1) {
                            html += '<td class="char-pic">'
                            html += '<img class="fig-cards" src="/assets/images/media/colors/stratego-blue.png" alt="blue"/> </span>'
                            html += '</td>'
                        } else {
                            html += '<td class="char-pic field-game">'
                            html += '<input type="image" class="fig-cards" src="/assets/images/media/colors/stratego-blue.png" alt="blue"/> </span>'
                            html += '</td>'
                        }

                    } else if (this.playerListBufferRed === 0 && this.fields[num].colour === 1) {
                        if (window.location.href.indexOf("set") > -1) {
                            html += '<td class="char-pic">'
                            html += '<img class="fig-cards" src="/assets/images/media/colors/stratego-red.png" alt="red"/> </span>'
                            html += '</td>'
                        } else {
                            html += '<td class="char-pic field-game">'
                            html += '<input type="image" class="fig-cards" src="/assets/images/media/colors/stratego-red.png" alt="red"/> </span>'
                            html += '</td>'
                        }
                    }
                } else if (this.fields[num].water === '~' || this.fields[num].row === 4 || this.fields[num].row === 5) {
                    html += '<td class="char-pic">'
                    html += '<div class="hidden"></div>'
                    html += '</td>'
                } else {
                    if (window.location.href.indexOf("set") > -1) {
                        html += '<td class="char-pic field">'
                        html += '<div class="hidden">'
                        html += '<input type="image" class="fig-cards" id="black-cards" src="/assets/images/media/colors/stratego-black.PNG" alt="black"/>'
                        html += '</div>'
                        html += '</td>'
                    } else {
                        html += '<td class="char-pic">'
                        html += '<div class="hidden"></div>'
                        html += '</td>'
                    }
                }
                num++;
            }
            html += '</tr>'
        }
        html += '</table>'
        return html
    }

    updateView() {
        const view = this.createView()
        $("#board").html(view)
    }

    set(row, col, charac) {
        $.ajax({
            method: "POST",
            url: "/setFigures",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "row": row,
                "col": col,
                "charac": charac
            }),

            success: (result) => {
                const {
                    matchField,
                    currentPlayer,
                    currentPlayerIndex,
                    playerListBufferBlue,
                    playerListBufferRed,
                    gameStatus
                } = result
                this.updateMatchField(matchField, playerListBufferBlue, playerListBufferRed, gameStatus)
                this.updateCurrentPlayer(currentPlayer, currentPlayerIndex)
                this.updateView()
                if (this.playerListBufferBlue === 0 && this.playerListBufferRed === 0) {
                    $(location).attr("href", "/stratego");
                }
                if (this.playerListBufferBlue !== 40) {
                    $("#init").html("")
                }
            }
        });
    }

    move(dir, row, col) {
        $.ajax({
            method: "POST",
            url: "/moveFigures",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "row": row,
                "col": col,
                "dir": dir
            }),

            success: (result) => {
                const {
                    matchField,
                    currentPlayer,
                    currentPlayerIndex,
                    playerListBufferBlue,
                    playerListBufferRed,
                    gameStatus
                } = result
                this.updateMatchField(matchField, playerListBufferBlue, playerListBufferRed, gameStatus)
                this.updateCurrentPlayer(currentPlayer, currentPlayerIndex)
                this.updateView()
            }
        });
    }

    attack(row, col, rowD, colD) {
        $.ajax({
            method: "POST",
            url: "/attackFigures",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "row": row,
                "col": col,
                "rowD": rowD,
                "colD": colD
            }),

            success: (result) => {
                const {
                    matchField,
                    currentPlayer,
                    currentPlayerIndex,
                    playerListBufferBlue,
                    playerListBufferRed,
                    gameStatus
                } = result
                this.updateMatchField(matchField, playerListBufferBlue, playerListBufferRed, gameStatus)
                this.updateCurrentPlayer(currentPlayer, currentPlayerIndex)
                this.updateView()
            }
        });
    }

    updateMatchField(newFields, playerListBufferBlue, playerListBufferRed, gameStatus) {
        this.fields = newFields
        this.playerListBufferBlue = playerListBufferBlue
        this.playerListBufferRed = playerListBufferRed
        this.gameStatus = gameStatus
    }

    updateCurrentPlayer(currentPlayer, currentPlayerIndex) {
        this.currentPlayerIndex = currentPlayerIndex
        this.currentPlayer = currentPlayer
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
        if (this.gameStatus === "WON") {
            $("#game-header").html("")
            if (currentPlayerIndex === 0) {
                $("#game-won").html(currentPlayer + " you found the flag and won the game!").addClass("color-blue")
            } else {
                $("#game-won").html(currentPlayer + " you found the flag and won the game!").addClass("color-red")
            }
            $("#won-btn").html('<button class="btn btn-dark btn-lg btn-primary-spacing">New Game</button>')
        }
    }
}

function loadJson() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function (result) {
            matchField = new MatchField();
            size = result.machtfieldSize;
            matchField.updateMatchField(result.matchField, result.playerListBufferBlue, result.playerListBufferRed,
                result.gameStatus);
            matchField.updateView();
            matchField.updateCurrentPlayer(result.currentPlayer, result.currentPlayerIndex)
        }
    });
}

function connectWebSocket() {
    let websocket = new WebSocket("ws://localhost:9000/websocket")
    websocket.setTimeout

    websocket.onopen = function(event) {
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
            matchField = new MatchField();
            let json = JSON.parse(e.data);
            let field = json.matchField
            let currentPlayerIndex = json.currentPlayerIndex
            let currentPlayer = json.currentPlayer
            let gameStatus = json.gameStatus
            let playerListBufferBlue = json.playerListBufferBlue
            let playerListBufferRed = json.playerListBufferRed
            matchField.updateMatchField(field, playerListBufferBlue, playerListBufferRed, gameStatus);
            matchField.updateCurrentPlayer(currentPlayer, currentPlayerIndex)
            matchField.updateView();
        }
    };
}

$(document).ready(function () {
    loadJson();
    connectWebSocket()
});