class Population {
  constructor(mutationRate, populationSize) {
    this.population = [];
    this.matingPool = [];
    this.generation = 1;
    this.mutationRate = mutationRate;


    for (let i = 0; i < populationSize; i++) {
      this.population[i] = new DNA(CONFIG_CANVAS_WIDTH, CONFIG_CANVAS_HEIGHT);
    }
  }

  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness();
    }
  }

  naturalSelection() {
    this.matingPool = [];

    let maxFitness = 0;

    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    for (let i = 0; i < this.population.length; i++) {
      for (let j = 0; j < this.population[i].fitness; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  generate() {
    for (let i = 0; i < this.population.length; i++) {
      let aIndex = Math.floor(Math.random() * this.matingPool.length);
      let bIndex = Math.floor(Math.random() * this.matingPool.length);
      let parentA = this.matingPool[aIndex];
      let parentB = this.matingPool[bIndex];
      let child = parentA.crossover(parentB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generation++;
  }

  move() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].move();
    }
  }

}