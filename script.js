import Grid from './grid.js'
import Tile from './tile.js'

const gameBoard = document.getElementById('game-board')

const grid = new Grid(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
setupInput()

function setupInput() {
  window.addEventListener('keydown', handleInput, { once: true})
}

function handleInput(e) {
  switch (e.key) {
    case 'ArrowUp':
      moveUp()
      break
    case 'ArrowDown':
      moveDown()
      break
    case 'ArrowLeft':
      moveLeft()
      break
    case 'ArrowRight':
      moveRight()
    default:
      setupInput()
      return
  }
  setupInput()
}

function moveUp() {
  slideTiles(grid.cellsByColumn)
}
function moveDown() {
  slideTiles(grid.cellsByColumn.map(column => [...column].reverse()))
}
function moveLeft() {
  slideTiles(grid.cellsByRow)
}
function moveRight() {
  slideTiles(grid.cellsByRow.map(row => [...row].reverse()))
}

function slideTiles(cells) {
  return Promise.all(
    cells.flatMap(group => {
      const promises = []
      for (let i = 1; i < group.length; i++) {
        const cell = group[i]
        if (cell.tile == null) continue
        let lastValidCell
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group[j]
          if (!moveToCell.canAccept(cell.tile)) break
          lastValidCell = moveToCell
        }

        if (lastValidCell != null) {
          promises.push(cell.tile.waitForTransition())
          if (lastValidCell.tile != null) {
            lastValidCell.mergeTile = cell.tile
          } else {
            lastValidCell.tile = cell.tile
          }
          cell.tile = null
        }
      }
      return promises
    })
  )
}