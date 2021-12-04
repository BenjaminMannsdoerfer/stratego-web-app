package controllers

import akka.actor.{Actor, ActorRef, ActorSystem, Props}

import javax.inject._
import play.api.mvc._
import de.htwg.se.stratego.Stratego
import de.htwg.se.stratego.controller.controllerComponent.{ControllerInterface, FieldChanged, GameFinished, GameStatus, PlayerSwitch, MachtfieldInitialized, PlayerChanged}
import play.api.libs.json.{JsNumber, JsObject, JsValue, Json}
import play.api.libs.streams.ActorFlow
import akka.stream.Materializer

import scala.swing.Reactor


@Singleton
class StrategoController @Inject()(cc: ControllerComponents) (implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc) {
  val gameController: ControllerInterface = Stratego.controller
  def printStratego: String = gameController.matchFieldToString + GameStatus.getMessage(gameController.gameStatus)

  def home: Action[AnyContent] = Action {
    Ok(views.html.index())
  }

  def about: Action[AnyContent] = Action {
    Ok(views.html.about())
  }

  def game = Action {
    Ok(views.html.playGame(gameController))
  }

  def setPlayer(player1: String, player2: String): Action[AnyContent] = Action {
    if (player1.isEmpty && player2.isEmpty)
      gameController.setPlayers(gameController.playerList(0).name + " " + gameController.playerList(1).name)
    else
      gameController.setPlayers(player1 + " " + player2)
      Ok(views.html.initGame(gameController))
  }

  def init: Action[AnyContent] = Action {
    gameController.initMatchfield
    Ok(views.html.playGame(gameController))
  }

  def setCharacter(row:Int, col:Int, charac:Char): Action[AnyContent] = Action {
    gameController.set(row,col,charac.toString)
    if(gameController.playerListBuffer(1).characterList.size==0) {
      Ok(views.html.playGame(gameController))
    } else {
      Ok(views.html.initGame(gameController))
    }
  }

  def move(dir:Char,row:Int,col:Int) = Action {
    gameController.move(dir, row, col)
    Ok(views.html.playGame(gameController))
  }

  def attack (rowA:Int, colA:Int, rowD:Int, colD:Int) = Action {
    gameController.attack(rowA,colA, rowD, colD)
    Ok(views.html.playGame(gameController))
  }

  def set = Action {
    Ok(views.html.initGame(gameController))
  }

  def stratego = Action {
    Ok(views.html.playGame(gameController))
  }

  def saveGame = Action {
    gameController.save
    Ok(views.html.playGame(gameController))
  }

  def loadGame = Action {
    gameController.createNewMatchfieldSize(gameController.getSize)
    gameController.setPlayers("PlayerBlue PlayerRed")
    gameController.load
    Ok(views.html.playGame(gameController))
  }

  def undoGame = Action {
    gameController.undo
    Ok(views.html.playGame(gameController))
  }

  def redoGame = Action {
    gameController.redo
    Ok(views.html.playGame(gameController))
  }

  def smallGame = Action {
    gameController.createNewMatchfieldSize(4)
    Ok(views.html.setNames())
  }

  def mediumGame = Action {
    gameController.createNewMatchfieldSize(7)
    Ok(views.html.setNames())
  }

  def largeGame = Action {
    gameController.createNewMatchfieldSize(10)
    Ok(views.html.setNames())
  }

  def gameToJson: Action[AnyContent] = Action {
    Ok(jsonObj())
  }

  def jsonObj(): JsObject =  {
    Json.obj(
      "gameStatus" -> (gameController.gameStatus),
      "machtfieldSize" -> JsNumber(gameController.getSize),
      "playerListBufferBlue" -> (gameController.playerListBuffer(0).characterList.size),
      "playerListBufferRed" -> (gameController.playerListBuffer(1).characterList.size),
      "currentPlayerIndex" -> JsNumber(gameController.currentPlayerIndex),
      "currentPlayer" -> (gameController.playerListBuffer(gameController.currentPlayerIndex)).toString(),
      "players" -> (gameController.playerList.head + " "+ gameController.playerList(1)),
      "matchField"-> Json.toJson(
        for{
          row <- 0 until gameController.getField.matrixSize
          col <- 0 until gameController.getField.matrixSize
        } yield {
          var obj = Json.obj(
            "row" -> row,
            "col" -> col
          )
          if (gameController.getField.isWater(row,col)) {
            obj = obj.++(Json.obj(
              "water" -> "~"))
          }
          if(gameController.getField.field(row,col).isSet) {
            obj = obj.++(Json.obj(
              "figName" -> gameController.getField.field(row, col).character.get.figure.name,
              "figValue" -> gameController.getField.field(row, col).character.get.figure.value,
              "colour" -> gameController.getField.field(row, col).colour.get.value,
              "isSet" -> gameController.getField.field(row, col).isSet
            )
            )
          }
          obj
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
  object StrategoWebSocketActorFactory{
    def create(out: ActorRef): Props = {
      Props(new StrategoWebSocketActor(out))
    }
  }
  class StrategoWebSocketActor(out: ActorRef) extends Actor with Reactor{
    listenTo(gameController)

    def receive: Receive = {
      case msg: String =>
        val cmd = Json.parse(msg).as[JsObject]
        cmd.value.keySet.foreach {
          case "set" =>
            val charac = cmd.value("set")("charac").as[String]
            val row = cmd.value("set")("row").as[Int]
            val col = cmd.value("set")("col").as[Int]
            gameController.set(row, col, charac)
          case "move" =>
            val dir = cmd.value("move")("dir").as[String].toCharArray
            val row = cmd.value("move")("row").as[Int]
            val col = cmd.value("move")("col").as[Int]
            gameController.move(dir(0), row, col)
          case "attack" =>
            val row = cmd.value("attack")("row").as[Int]
            val col = cmd.value("attack")("col").as[Int]
            val rowD  = cmd.value("attack")("rowD").as[Int]
            val colD = cmd.value("attack")("colD").as[Int]
            gameController.attack(row, col, rowD, colD)
          case "connected" =>
        }
        out ! jsonObj().toString()
        println("Sent Json to client" + msg)
    }

    reactions+= {
      case event: FieldChanged => sendJsonToClient
      case event: PlayerSwitch => sendJsonToClient
      case event: PlayerChanged => sendJsonToClient
      case event: MachtfieldInitialized => sendJsonToClient
      case event: GameFinished => sendJsonToClient
    }

    def sendJsonToClient = {
      println("Received")
      out ! jsonObj().toString()
    }
  }
}