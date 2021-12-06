Vue.createApp({
    data() {
        return {
            websocket: new WebSocket("ws://localhost:9000/websocket"),
            size: 10,
            fields: [],
            currentPlayerIndex: 0,
            currentPlayer: "",
            playerListBufferBlue: 40,
            playerListBufferRed: 40,
            gameStatus: "",
            row: 0,
            col: 0,
            charac: ""
        }
    },
    computed: {

    },
    methods: {
        createWebsocket() {
            //this.websocket.setTimeout
            this.websocket.onopen = (event) => {
                this.websocket.send(JSON.stringify({
                    "connected": {
                        "connect": "successful"
                    }
                }))
                console.log("Connected to Websocket");
            }

            this.websocket.onclose = () => {
                console.log('Connection with Websocket Closed!');
            };

            this.websocket.onerror = (error) => {
                console.log('Error in Websocket Occured: ' + error);
            };

            this.websocket.onmessage = (e) => {
                if (typeof e.data === "string") {
                    let json = JSON.parse(e.data);
                    console.log(e.data)
                    this.size = json.matchfieldSize;
                    this.fields = json.matchField
                    this.currentPlayerIndex = json.currentPlayerIndex
                    this.currentPlayer = json.currentPlayer
                    this.gameStatus = json.gameStatus
                    this.playerListBufferBlue = json.playerListBufferBlue
                    this.playerListBufferRed = json.playerListBufferRed
                    if (this.playerListBufferBlue === 0 && this.playerListBufferRed === 0 && window.location.href.indexOf("set") > -1) {
                        this.goToPlayGame()
                    }
                }
            };


        },
        async goToPlayGame() {
            await new Promise(resolve => setTimeout(resolve, 3000));
            $(location).attr("href", "/stratego");
        },

        set(row, col, charac) {
            this.websocket.send(JSON.stringify({
                "set": {
                    "row": row,
                    "col": col,
                    "charac": charac
                }
            }))
        },

        move(dir, row, col) {
            this.websocket.send(JSON.stringify({
                "move": {
                    "row": row,
                    "col": col,
                    "dir": dir
                }
            }))
        },

        attack(row, col, rowD, colD) {
            this.websocket.send(JSON.stringify({
                "attack": {
                    "row": row,
                    "col": col,
                    "rowD": rowD,
                    "colD": colD
                }
            }))
        },
        clickSet(row, col) {
            this.row = row
            this.col = col
            console.log(row + " " + col);
        },
        onkeydown(event) {
            switch (event.keyCode) {
                case 70:
                case 102:
                    this.charac = 'F'; // F
                    break;
                case 66:
                case 98:
                    this.charac = 'B'; // B
                    break;
                case 77:
                case 109:
                    this.charac = 'M'; // M
                    break;
                case 49:
                    this.charac = '1'; // 1
                    break;
                case 50:
                    this.charac = '2'; // 2
                    break;
                case 51:
                    this.charac = '3'; // 3
                    break;
                case 52:
                    this.charac = '4'; // 4
                    break;
                case 53:
                    this.charac = '5'; // 5
                    break;
                case 54:
                    this.charac = '6'; // 6
                    break;
                case 55:
                    this.charac = '7'; // 7
                    break;
                case 56:
                    this.charac = '8'; // 8
                    break;
                case 57:
                    this.charac = '9'; // 9
                    break;
            }
            console.log(this.charac)
            this.set(this.row, this.col, this.charac)
        }
    },
    created() {
        this.createWebsocket();
        window.onkeydown = this.onkeydown
    },
}).mount('#app')
