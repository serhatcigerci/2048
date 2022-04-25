const GRID_SIZE = 4
const CELL_SIZE = 20
const CELL_GAP = 2

export default class Grid {
  constructor(gridElem) {
    gridElem.style.setProperty('--grid-size', GRID_SIZE);
    gridElem.style.setProperty('--cell-size', `${CELL_SIZE}vmin`)
    gridElem.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);
    createCellElements(gridElem)
  }
}

function createCellElements(gridElem) {
  const cells = []
  for(let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cells.push(cell)
    gridElem.append(cell)
  }
  return cells
}