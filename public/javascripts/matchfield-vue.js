const app = Vue.createApp({})


app.component('init_game', {
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
                  charac: "",
                  setAttack: false,
                  dir: '',
                  rowD: 0,
                  colD: 0,
                  border: { }

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
                          this.border = json.border
                          this.checkGame()
                          if (this.playerListBufferBlue === 0 && this.playerListBufferRed === 0 && window.location.href.indexOf("set") > -1) {
                              this.goToPlayGame()
                          }
                      }
                  };
              },
              async goToPlayGame() {
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  $(location).attr("href", "/stratego");
              },

              checkGame () {
                  if (this.gameStatus === "INIT" && window.location.href.indexOf("set") > -1) {
                      $(location).attr("href", "/stratego");
                  }
                  if (this.playerListBufferBlue !== 40) {
                      $("#init").html("")
                  }
                  if (this.gameStatus === "WON") {
                      $("#game-header").html("")
                      if (this.currentPlayerIndex === 0) {
                          $("#game-won").html(this.currentPlayer + " you found the flag and won the game!").addClass("color-blue")
                      } else {
                          $("#game-won").html(this.currentPlayer + " you found the flag and won the game!").addClass("color-red")
                      }
                      $("#won-btn").html('<button class="btn btn-dark btn-lg btn-primary-spacing">New Game</button>')
                  } else {
                      $("#game-won").html("")
                      $("#won-btn").html("")
                      if (this.currentPlayerIndex === 0) {
                          $("#set-header").html("Enter your figures " + this.currentPlayer).addClass("color-blue")
                      } else {
                          $("#set-header").html("Enter your figures " + this.currentPlayer).addClass("color-red")
                      }
                      if (this.currentPlayerIndex === 0) {
                          $("#game-header").html(this.currentPlayer + " it's your turn").addClass("color-blue").removeClass("color-red")
                      } else {
                          $("#game-header").html(this.currentPlayer + " it's your turn").addClass("color-red").removeClass("color-blue")
                      }
                  }
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
                  if (this.setAttack === false) {
                      this.row = row
                      this.col = col
                  } else {
                      if (this.row !== undefined || this.col !== undefined) {
                          this.rowD = row
                          this.colD = col
                          if (this.gameStatus !== "WON") {
                              this.attack(this.row, this.col, this.rowD, this.colD)
                              this.setAttack = false
                          }
                          console.log(row + " " + col);
                      }
                  }
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
                      case 65:
                      case 87:
                          this.setAttack = true;
                          break;
                      case 68:
                      case 100:
                      case 40:
                          this.dir = 'd'; // d
                          break;
                      case 85:
                      case 117:
                      case 38:
                          this.dir = 'u'; // u
                          break;
                      case 76:
                      case 108:
                      case 37:
                          this.dir = 'l'; // l
                          break;
                      case 82:
                      case 114:
                      case 39:
                          this.dir = 'r'; // r
                          break;
                  }
                  if (this.charac !== "") {
                      this.set(this.row, this.col, this.charac)
                  }
                  if (this.dir === undefined || this.dir === "") {
                  } else if (this.dir.length > 1 || this.row === undefined || this.col === undefined || this.setAttack === true) {
                  } else {
                      if (this.gameStatus !== "WON") {
                          this.move(this.dir, this.row, this.col);
                      }
                  }
              },
          },
      created() {
              this.createWebsocket();
              window.onkeydown = this.onkeydown
          },
      template: `
                    <div class="init-game-top">
                                <img class="img-fluid img-game-top" :src="this.border.top"/>
                    </div>
                            <div class="mid-border">
                                <div class="row justify-content-center">
                                    <div class="col-auto init-game-left">
                                        <img class="img-game-left" :src="this.border.left"/>
                                    </div>
                                    <div id="gamefield" class="col-auto init-game-mid">
                                        <table class="matchfield">
                                            <tbody>
                                            <template v-for="row in fields">
                                                <tr>
                                                    <template v-for="aField in row.cols">
                                                        <td v-if="aField.isSet" class="char-pic field">
                                                            <div v-if="aField.colour && this.playerListBufferBlue !== 0" >
                                                                <input class="fig-cards blue" type="image" v-on:click="" :src="aField.figSrc" alt=""/>
                                                            </div>
                                                            <div v-else-if="!aField.colour && this.playerListBufferRed !== 0">
                                                                <input class="fig-cards red" type="image" v-on:click="" :src="aField.figSrc" alt=""/>
                                                            </div>
                                                            <div v-else-if="this.playerListBufferBlue === 0 && aField.colour">
                                                                <input class="fig-cards" type="image" v-on:click="" :src="aField.blueSrc" alt="blue"/>
                                                            </div>
                                                            <div v-else-if="this.playerListBufferRed === 0 && !aField.colour">
                                                                <input class="fig-cards" type="image" v-on:click="" :src="aField.redSrc" alt="red"/>
                                                            </div>
                                                        </td>
                                                        <td v-else-if="aField.isWater || aField.row === 4 || aField.row === 5" class="char-pic">
                                                        </td>
                                                        <td v-else class="char-pic field">
                                                            <input class="fig-cards" type="image" v-on:click="clickSet(aField.row, aField.col)" :src="aField.blackSrc" alt="black"/>
                                                        </td>
                                                    </template>
                                                </tr>
                                            </template>
                                            </tbody>
                                        </table>
                                    </div>


                                    <div class="col-auto init-game-right">
                                        <img class="img-game-right" :src="this.border.right"/>
                                    </div>
                                </div>
                            </div>
                            <div class="init-game-bot">
                                <img class="img-game-bot" :src="this.border.bot"/>
                            </div> `
    })


app.component('play_game', {
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
                      charac: "",
                      setAttack: false,
                      dir: '',
                      rowD: 0,
                      colD: 0,
                      border: {}
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
                              this.border = json.border
                              this.checkGame()
                              if (this.playerListBufferBlue === 0 && this.playerListBufferRed === 0 && window.location.href.indexOf("set") > -1) {
                                  this.goToPlayGame()
                              }
                          }
                      };
                  },
                  async goToPlayGame() {
                      await new Promise(resolve => setTimeout(resolve, 2000));
                      $(location).attr("href", "/stratego");
                  },

                  checkGame () {
                      if (this.gameStatus === "INIT" && window.location.href.indexOf("set") > -1) {
                          $(location).attr("href", "/stratego");
                      }
                      if (this.playerListBufferBlue !== 40) {
                          $("#init").html("")
                      }
                      if (this.gameStatus === "WON") {
                          $("#game-header").html("")
                          if (this.currentPlayerIndex === 0) {
                              $("#game-won").html(this.currentPlayer + " you found the flag and won the game!").addClass("color-blue")
                          } else {
                              $("#game-won").html(this.currentPlayer + " you found the flag and won the game!").addClass("color-red")
                          }
                          $("#won-btn").html('<button class="btn btn-dark btn-lg btn-primary-spacing">New Game</button>')
                      } else {
                          $("#game-won").html("")
                          $("#won-btn").html("")
                          if (this.currentPlayerIndex === 0) {
                              $("#set-header").html("Enter your figures " + this.currentPlayer).addClass("color-blue")
                          } else {
                              $("#set-header").html("Enter your figures " + this.currentPlayer).addClass("color-red")
                          }
                          if (this.currentPlayerIndex === 0) {
                              $("#game-header").html(this.currentPlayer + " it's your turn").addClass("color-blue").removeClass("color-red")
                          } else {
                              $("#game-header").html(this.currentPlayer + " it's your turn").addClass("color-red").removeClass("color-blue")
                          }
                      }
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
                      if (this.setAttack === false) {
                          this.row = row
                          this.col = col
                      } else {
                          if (this.row !== undefined || this.col !== undefined) {
                              this.rowD = row
                              this.colD = col
                              if (this.gameStatus !== "WON") {
                                  this.attack(this.row, this.col, this.rowD, this.colD)
                                  this.setAttack = false
                              }
                              console.log(row + " " + col);
                          }
                      }
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
                          case 65:
                          case 87:
                              this.setAttack = true;
                              break;
                          case 68:
                          case 100:
                          case 40:
                              this.dir = 'd'; // d
                              break;
                          case 85:
                          case 117:
                          case 38:
                              this.dir = 'u'; // u
                              break;
                          case 76:
                          case 108:
                          case 37:
                              this.dir = 'l'; // l
                              break;
                          case 82:
                          case 114:
                          case 39:
                              this.dir = 'r'; // r
                              break;
                      }
                      if (this.charac !== "") {
                          this.set(this.row, this.col, this.charac)
                      }
                      if (this.dir === undefined || this.dir === "") {
                      } else if (this.dir.length > 1 || this.row === undefined || this.col === undefined || this.setAttack === true) {
                      } else {
                          if (this.gameStatus !== "WON") {
                              this.move(this.dir, this.row, this.col);
                          }
                      }
                  },
              },
              created() {
                  this.createWebsocket();
                  window.onkeydown = this.onkeydown
              },
          template: `
          <div class="init-game-top">
                              <img class="img-fluid img-game-top" :src="this.border.top"/>
                          </div>
                          <div class="mid-border">
                              <div class="row justify-content-center">
                                  <div class="col-auto init-game-left">
                                      <img class="img-game-left" :src="this.border.left"/>
                                  </div>
                                  <div id="app" class="col-auto init-game-mid">
                                      <div id="gamefield" class="col-auto init-game-mid">
                                          <table class="matchfield">
                                              <tbody>
                                              <template v-for="row in fields">
                                                  <tr>
                                                      <template v-for="aField in row.cols">
                                                          <td v-if="aField.isSet" class="char-pic field">
                                                              <div v-if="aField.colour && this.playerListBufferBlue === 0 && this.currentPlayerIndex === 0" >
                                                                  <input class="fig-cards blue" type="image" v-on:click="clickSet(aField.row, aField.col)" :src="aField.figSrc" alt=""/>
                                                              </div>
                                                              <div v-else-if="!aField.colour && this.playerListBufferRed === 0 && this.currentPlayerIndex === 1">
                                                                  <input class="fig-cards red" type="image" v-on:click="clickSet(aField.row, aField.col)" :src="aField.figSrc" alt=""/>
                                                              </div>
                                                              <div v-else-if="this.currentPlayerIndex === 1 && aField.colour">
                                                                  <input class="fig-cards" type="image" v-on:click="clickSet(aField.row, aField.col)" :src="aField.blueSrc" alt="blue"/>
                                                              </div>
                                                              <div v-else-if="this.currentPlayerIndex === 0 && !aField.colour">
                                                                  <input class="fig-cards" type="image" v-on:click="clickSet(aField.row, aField.col)" :src="aField.redSrc" alt="red"/>
                                                              </div>
                                                          </td>
                                                          <td v-else-if="aField.isWater" class="char-pic">
                                                          </td>
                                                          <td v-else class="char-pic field">
                                                          </td>
                                                      </template>
                                                  </tr>
                                              </template>
                                              </tbody>
                                          </table>
                                      </div>
                                  </div>
                                  <div class="col-auto init-game-right">
                                      <img class="img-game-right" :src="this.border.right"/>
                                  </div>
                              </div>
                          </div>
                          <div class="init-game-bot">
                              <img class="img-game-bot" :src="this.border.bot "/>
                          </div>`
        })


















app.mount('#app')
