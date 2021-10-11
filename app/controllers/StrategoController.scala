package controllers

import javax.inject._

import play.api.mvc._
import de.htwg.se.stratego.Stratego
import de.htwg.se.stratego.controller.controllerComponent.GameStatus

@Singleton
class StrategoController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  val gameController = Stratego.controller

  def printStratego = gameController.matchFieldToString + GameStatus.getMessage(gameController.gameStatus)

  def home = Action {
    Ok(views.html.index())
  }

  def setPlayer(player1: String, player2: String) = Action {
    gameController.setPlayers(player1 + " " + player2)
    Ok("Hello " + gameController.playerList(0) +
      " and " + gameController.playerList(1) + "!")
  }

  def init = Action {
    gameController.initMatchfield
    Ok(printStratego)
  }

  def setCharacter(row:Int, col:Int, charac:String) = Action {
    gameController.set(row,col,charac)
    Ok(printStratego)
  }

  def move(dir:Char,row:Int,col:Int) = Action {
    gameController.move(dir, row, col)
    Ok(printStratego)
  }

  def attack (rowA:Int, colA:Int, rowD:Int, colD:Int) = Action {
    gameController.attack(rowA,colA, rowD, colD)
    Ok(printStratego)
  }

  def stratego = Action {
    Ok(printStratego)
  }

  def saveGame = Action {
    gameController.save
    Ok(printStratego)
  }

  def loadGame = Action {
    gameController.load
    Ok(printStratego)
  }

  def undoGame = Action {
    gameController.undo
    Ok(printStratego)
  }

  def redoGame = Action {
    gameController.redo
    Ok(printStratego)
  }

  def smallGame = Action {
    val smallMatchfield = gameController.createNewMatchfieldSize(4)
    Ok(smallMatchfield)
  }

  def mediumGame = Action {
    val mediumMatchfield = gameController.createNewMatchfieldSize(7)
    Ok(mediumMatchfield)
  }

  def largeGame = Action {
    val largeMatchfield = gameController.createNewMatchfieldSize(10)
    Ok(largeMatchfield)
  }
}