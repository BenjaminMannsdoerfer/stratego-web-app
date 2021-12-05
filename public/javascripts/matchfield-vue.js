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
        }
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
                }
            };
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
    },
    created() {
        this.createWebsocket()
    },
}).mount('#app')
