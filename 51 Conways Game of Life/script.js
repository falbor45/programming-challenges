{
  console.log(`Conway's Game of Life made by falbor45 (https://github.com/falbor45)`)

  let randomSetup = (mapSize = 20) => {
    let arr = [];
    for (let i = 0; i < mapSize * mapSize; i++) {
      let rand = Math.floor(Math.random() * mapSize * mapSize)
      if (!arr.includes(rand)) {
        arr.push(rand)
      }
    }
    return arr
  };

  let config = {
    updateTime: 500,
    gridSize: 8,
    mapSize: 120,
    initialCells: randomSetup(120)
  };

  class GameOfLife {
    constructor(mapSize = 20, initialCells = [153, 154, 155], gridSize = 16) {
      this.mapSize = mapSize;
      this.gridSize = gridSize;
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');
      this.cells = new Array(mapSize * mapSize).fill(0);
      this.initialCells = initialCells;
    }

    draw(initial) {
      this.context.fillStyle = 'rgb(255, 255, 255)';
      if (initial) {
        this.cells.forEach((e, i) => e === 1 ? this.context.fillRect((i % this.mapSize) * this.gridSize, (Math.floor(i / this.mapSize)) * this.gridSize, this.gridSize, this.gridSize) : null)
        return null;
      }
      this.cells = this.cells.map((e, i) => {
        if (this.shouldCellSurvive(i, e === 1)) {
          return 1;
        }
        return 0;
      });

      this.cells.forEach((e, i) => {
        if (e === 1) {
          this.context.fillStyle = 'rgb(255, 255, 255)';
          this.context.fillRect((i % this.mapSize) * this.gridSize, (Math.floor(i / this.mapSize)) * this.gridSize, this.gridSize, this.gridSize)
          return null;
        }
        this.context.fillStyle = 'rgb(0, 0, 0)';
        this.context.fillRect((i % this.mapSize) * this.gridSize, (Math.floor(i / this.mapSize)) * this.gridSize, this.gridSize, this.gridSize)
      });
      this.createGrid()

      return null;
    }

    shouldCellSurvive(index, alive) {
      let population = 0;
      if (this.cells[index - this.mapSize - 1] === 1) {
        population++
      }
      if (this.cells[index - this.mapSize] === 1) {
        population++
      }
      if (this.cells[index - this.mapSize + 1]=== 1) {
        population++
      }
      if (this.cells[index + 1] === 1) {
        population++
      }
      if (this.cells[index + this.mapSize + 1] === 1) {
        population++
      }
      if (this.cells[index + this.mapSize] === 1) {
        population++
      }
      if (this.cells[index + this.mapSize - 1] === 1) {
        population++
      }
      if (this.cells[index - 1] === 1) {
        population++
      }
      if (alive) {
        return population === 2 || population === 3
      }
      if (!alive) {
        return population === 3
      }
    }

    createGrid() {
      let context = this.context;
      for (let i = 1; i < this.mapSize; i++) {
        context.strokeStyle = 'rgb(255, 255, 255)';
        context.beginPath();
        context.moveTo(i * this.gridSize, 0);
        context.lineTo(i * this.gridSize, this.mapSize * this.gridSize);
        context.stroke();
      }

      for (let i = 0; i < this.mapSize; i++) {
        context.strokeStyle = 'rgb(255, 255, 255)';
        context.beginPath();
        context.moveTo(0, i * this.gridSize);
        context.lineTo(this.mapSize * this.gridSize, i * this.gridSize);
        context.stroke();
      }
    }

    init() {
      if (!this.canvas.getContext) {
        throw new Error('Canvas is not supported in this browser!')
      }
      this.canvas.width = this.mapSize * this.gridSize;
      this.canvas.height = this.mapSize * this.gridSize;
      this.context.fillStyle = 'rgb(0, 0, 0)';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.initialCells.forEach(e => {
        this.cells[e] = 1
      });
      document.getElementById('root').appendChild(this.canvas);
      this.createGrid();
      this.draw(true);
      setInterval(() => game.draw(false), config.updateTime)
    }
  }

  let game = new GameOfLife(config.mapSize, config.initialCells, config.gridSize);
  game.init();
}