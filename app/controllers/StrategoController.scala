package controllers

import javax.inject._
import play.api.mvc._
import de.htwg.se.stratego.Stratego
import de.htwg.se.stratego.controller.controllerComponent.{ControllerInterface, GameStatus}

@Singleton
class StrategoController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
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
}