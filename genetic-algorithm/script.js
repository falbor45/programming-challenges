{
  console.log(`Genetic algorithm made by falbor45 (https://github.com/falbor45)`);
  console.log(`Shoutout to Daniel Shiffman for great videos about genetic algorithm!`);
  console.log(`This very project is based on his way of creating genetic algorithm.`);
  console.log(`https://www.youtube.com/watch?v=9zfeTw-uFCw&list=PLRqwX-V7Uu6bJM3VgzjNV5YxVxUwzALHV`)
  class Canvas {
    constructor(width = 800, height = 600, background = 'rgba(0, 0, 0, 1)', population) {
      this.background = background;
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');
      this.population = population;

      this.canvas.width = width;
      this.canvas.height = height;
      this.context.fillStyle = this.background;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      document.getElementById('root').prepend(this.canvas);
    }
  }

  let population;
  let canvas;
  let populationSize = 100;
  let mutationRate = 0.01;
  let updateInterval = 16;
  let lifespan = 5000;
  let frame = 0;

  let draw = () => {
    "use strict";
    canvas.context.fillStyle = canvas.background;
    canvas.context.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.context.fillStyle = `#ff00dc`
    canvas.context.fillRect(CONFIG_TARGET_POINT.x, CONFIG_TARGET_POINT.y, 10, 10)
    for (let i = 0; i < population.population.length; i++) {
      population.population[i].move();
      canvas.context.fillStyle = `rgb(${population.population[i].genes.color.r} ${population.population[i].genes.color.g} ${population.population[i].genes.color.b})`;
      canvas.context.fillRect(population.population[i].position.x, population.population[i].position.y, population.population[i].size, population.population[i].size)
    }
    document.getElementById('generation').innerText = `Generation: ${population.generation}`;
    document.getElementById('frame').innerText = `Frame: ${frame}`;
  };

  let setup = () => {
    "use strict";
    population = new Population(mutationRate, populationSize);

    canvas = new Canvas(CONFIG_CANVAS_WIDTH, CONFIG_CANVAS_HEIGHT, "gray", population.population);

    setInterval(() => {
      population.calcFitness();
      population.naturalSelection();
      population.generate();
      population.calcFitness();
      let interval = setInterval(() => {
        draw();
        frame++;
      }, updateInterval);
      setTimeout(() => {
        frame = 0;
        clearInterval(interval)
      }, lifespan);
    }, lifespan)
  };


  setup();
  draw();
  let interval =setInterval(() => {
    "use strict";
    draw();
    frame++;
  }, updateInterval);
  setTimeout(() => clearInterval(interval), lifespan)
}
