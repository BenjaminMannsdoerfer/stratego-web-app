package controllers

import akka.actor.{Actor, ActorRef, ActorSystem, Props}

import javax.inject._
import play.api.mvc._
import de.htwg.se.stratego.Stratego
import de.htwg.se.stratego.controller.controllerComponent.{ControllerInterface, FieldChanged, GameFinished, GameStatus, MachtfieldInitialized, PlayerChanged, PlayerSwitch}
import play.api.libs.json.{JsArray, JsBoolean, JsNumber, JsObject, JsValue, Json}
import play.api.libs.streams.ActorFlow
import akka.stream.Materializer

import scala.collection.mutable.ListBuffer
import scala.swing.Reactor


import scala.swing.event.Event

class LobbyEvent extends Event
class StartGame extends Event
class NewGame extends Event

@Singleton
class StrategoController @Inject()(cc: ControllerComponents)(implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc) {
  val gameController: ControllerInterface = Stratego.controller
  val listLobby: ListBuffer[String] = ListBuffer.empty

  def home: Action[AnyContent] = Action {
    Ok(views.html.index())
  }

  def getFigureCard(row: Int, col: Int): String = {
    gameController.getField.field(row, col).character.get.figure.name match {
      case "F" => "../assets/images/media/figures/stratego-flag.svg"
      case "B" => "../assets/images/media/figures/stratego-bomb.svg"
      case "M" => "../assets/images/media/figures/stratego-marshal.svg"
      case "1" => "../assets/images/media/figures/stratego-spy.svg"
      case "2" => "../assets/images/media/figures/stratego-scout.svg"
      case "3" => "../assets/images/media/figures/stratego-miner.svg"
      case "4" => "../assets/images/media/figures/stratego-sergeant.svg"
      case "5" => "../assets/images/media/figures/stratego-lieutenant.svg"
      case "6" => "../assets/images/media/figures/stratego-captain.svg"
      case "7" => "../assets/images/media/figures/stratego-major.svg"
      case "8" => "../assets/images/media/figures/stratego-colonel.svg"
      case "9" => "../assets/images/media/figures/stratego-general.svg"
    }
  }
  def getBlueCard(row: Int, col: Int): String = {
    if (gameController.getField.field(row, col).colour.get.value == 0) {
      return "../assets/images/media/colors/stratego-blue.png"
    }
   ""
  }

  def getRedCard(row: Int, col: Int): String = {
    if (gameController.getField.field(row, col).colour.get.value == 1) {
      return "../assets/images/media/colors/stratego-red.png"
    }
    ""
  }
  def getBlackCard(row: Int, col: Int): String = {
    if (!gameController.getField.field(row, col).isSet) {
      return "../assets/images/media/colors/stratego-black.PNG"
    }
    ""
  }
  def getTopBorder(): String = {
    "../assets/images/media/Redwall_Stratego_Board_border_top.jpg"
  }
  def getLeftBorder(): String = {
    "../assets/images/media/Redwall_Stratego_Board_border_left.jpg"
  }
  def getRightBorder(): String = {
    "../assets/images/media/Redwall_Stratego_Board_border_right.jpg"
  }
  def getBottomBorder(): String = {
    "../assets/images/media/Redwall_Stratego_Board_border_bottom.jpg"
  }

  def jsonStatus(status: String): JsObject = {
    Json.obj("status" -> status)
  }

  def jsonLobby(player: String, lobby: List[String]): JsObject = {
    Json.obj("player" -> player,
    "lobby" -> Json.toJson(lobby))
  }

  def jsonToLobby(): JsObject = {
    Json.obj(
      "lobby" -> Json.toJson(listLobby),
    )
  }

  def jsonObj(): JsObject = {
    Json.obj(
      "border" -> Json.obj("bot" ->getBottomBorder(),"left"->getLeftBorder(), "top"->getTopBorder(), "right" -> getRightBorder()),
      "gameStatus" -> (gameController.gameStatus),
      "matchfieldSize" -> JsNumber(gameController.getSize),
      "playerListBufferBlue" -> (gameController.playerListBuffer(0).characterList.size),
      "playerListBufferRed" -> (gameController.playerListBuffer(1).characterList.size),
      "currentPlayerIndex" -> JsNumber(gameController.currentPlayerIndex),
      "currentPlayer" -> (gameController.playerListBuffer(gameController.currentPlayerIndex)).toString(),
      "players" -> (gameController.playerListBuffer.head + " " + gameController.playerListBuffer(1)),
      "matchField" -> JsArray(
        for {
          row <- 0 until gameController.getField.matrixSize
        } yield {
          Json.obj("cols" -> JsArray(for {
            col <- 0 until gameController.getField.matrixSize
          } yield {
            var obj = Json.obj(
              "row" -> row,
              "col" -> col,
              "isSet" -> gameController.getField.field(row, col).isSet,
              "blackSrc" -> getBlackCard(row, col),
              "isWater" -> gameController.getField.isWater(row, col)
            )
            if (gameController.getField.isWater(row, col)) {
              obj = obj.++(Json.obj(
                "water" -> "~"))
            }
            if (gameController.getField.field(row, col).isSet) {
              obj = obj.++(Json.obj(
                "figSrc" -> getFigureCard(row, col),
                "blueSrc" -> getBlueCard(row, col),
                "redSrc" -> getRedCard(row, col),
                "colour" -> JsBoolean(if(gameController.getField.field(row, col).colour.get.value == 0) {
                  true
                } else {
                  false
                }),
              )
              )
            }
            obj
          }))
        }
      )
    )
  }

  def socket: WebSocket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      StrategoWebSocketActorFactory.create(out)
    }
  }

  object StrategoWebSocketActorFactory {
    def create(out: ActorRef): Props = {
      Props(new StrategoWebSocketActor(out))
    }
  }

  class StrategoWebSocketActor(out: ActorRef) extends Actor with Reactor {
    listenTo(gameController)

    def receive: Receive = {
      case msg: String =>
        val cmd = Json.parse(msg).as[JsObject]
        cmd.value.keySet.foreach {
          case "status" =>
            val status = cmd.value("status")("currentStatus").as[String]
            status match {
              case "start" =>
                out ! jsonStatus(status).toString()
                gameController.publish(new NewGame)
              case "lobby" =>
                out ! jsonStatus(status).toString()
              case "Board" =>
                out ! jsonStatus(status).toString()
            }
          case "lobby" =>
            val player = cmd.value("lobby")("currentPlayer").as[String]
            println(player)
            if (listLobby.size < 2) {
              println(listLobby.size)
              listLobby.append(player)
            }
            if (listLobby.size == 2) {
              gameController.publish(new LobbyEvent)
            }
            println(listLobby)
           out ! jsonLobby(player, listLobby.toList).toString()
          case "small" =>
            val size = cmd.value("small")("matchfieldSize").as[Int]
            gameController.createNewMatchfieldSize(size)
          case "medium" =>
            val size = cmd.value("medium")("matchfieldSize").as[Int]
            gameController.createNewMatchfieldSize(size)
          case "large" =>
            val size = cmd.value("large")("matchfieldSize").as[Int]
            gameController.createNewMatchfieldSize(size)
          case "setNames" =>
            val player1 = cmd.value("setNames")("player1").as[String]
            val player2 = cmd.value("setNames")("player2").as[String]
            if (player1.isEmpty && player2.isEmpty) {
              gameController.setPlayers(gameController.playerList(0).name + " " + gameController.playerList(1).name)
            }
            else {
              gameController.setPlayers(player1 + " " + player2)
            }
            gameController.publish(new StartGame)
            listLobby.clear()
            out ! jsonObj().toString()
          case "init" =>
            gameController.initMatchfield
            out ! jsonObj().toString()
          case "set" =>
            val charac = cmd.value("set")("charac").as[String]
            val row = cmd.value("set")("row").as[Int]
            val col = cmd.value("set")("col").as[Int]
            gameController.set(row, col, charac)
            out ! jsonObj().toString()
          case "move" =>
            val dir = cmd.value("move")("dir").as[String].toCharArray
            val row = cmd.value("move")("row").as[Int]
            val col = cmd.value("move")("col").as[Int]
            gameController.move(dir(0), row, col)
            out ! jsonObj().toString()
          case "attack" =>
            val row = cmd.value("attack")("row").as[Int]
            val col = cmd.value("attack")("col").as[Int]
            val rowD = cmd.value("attack")("rowD").as[Int]
            val colD = cmd.value("attack")("colD").as[Int]
            gameController.attack(row, col, rowD, colD)
            out ! jsonObj().toString()
          case "join" =>
            out ! jsonObj().toString()
          case "connected" =>
        }
        println("Sent Json to client" + msg)

    }

    reactions += {
      case event: FieldChanged => sendJsonToClient
      case event: PlayerSwitch => sendJsonToClient
      case event: PlayerChanged => sendJsonToClient
      case event: MachtfieldInitialized => sendJsonToClient
      case event: GameFinished => sendJsonToClient
      case event: LobbyEvent => sendLobbyToClient
      case event: StartGame => startGame
      case event: NewGame => newGame
    }

    def sendJsonToClient = {
      out ! jsonObj().toString()
    }

    def sendLobbyToClient = {
      out ! jsonToLobby().toString()
    }

    def startGame: Unit = {
      out ! jsonStatus("Board").toString()
    }

    def newGame: Unit = {
      gameController.createNewMatchfieldSize(gameController.getSize)
      out ! jsonStatus("start").toString()
    }
  }
}