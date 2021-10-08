package controllers

import javax.inject._

import play.api.mvc._
import de.htwg.se.stratego.Stratego
import de.htwg.se.stratego.controller.controllerComponent.GameStatus

@Singleton
class StrategoController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  val gameController = Stratego.controller

  def save = gameController.save

  def load = gameController.load

  def redo = gameController.redo

  def undo = gameController.undo

  def strategoAsText = gameController.matchFieldToString + GameStatus.getMessage(gameController.gameStatus)

  def about = Action {
    Ok(views.html.index())
  }

  def stratego = Action {
    Ok(strategoAsText)
  }

  def saveGame = Action {
    Ok(save)
  }

  def loadGame = Action {
    Ok(load)
  }

  def undoGame = Action {
    Ok(undo)
  }

  def redoGame = Action {
    Ok(redo)
  }
}