const calculateDistance = (objA, objB) => Math.sqrt(Math.pow(Math.abs(objA.x - objB.x), 2) + Math.pow(Math.abs(objA.y - objB.y), 2));

class DNA {
  constructor(canvasWidth, canvasHeight) {
    this.genes = {
      directionX: Math.random() > 0.5 ? Math.random() : Math.random() - 1,
      directionY: Math.random() > 0.5 ? Math.random() : Math.random() - 1,
      velocity: Math.random() * 10
    };
    this.fitness = 0;
    this.spawnPoint = CONFIG_SPAWN_POINT
    this.position = {
      x: this.spawnPoint.x,
      y: this.spawnPoint.y
    };
    this.destination = CONFIG_TARGET_POINT;
    this.color = `rgba(${Math.floor(Math.random() * 256)} ${Math.floor(Math.random() * 256)} ${Math.floor(Math.random() * 256)})`;
    this.size = CONFIG_CREATURE_SIZE;

    // if (this.genes.directionX < this.genes.directionY) {
    //   this.genes.directionX = this.genes.directionX / this.genes.directionX;
    //   this.genes.directionY = Math.round(this.genes.directionY / this.genes.directionX);
    // } else {
    //   this.genes.directionX = Math.round(this.genes.directionX / this.genes.directionY);
    //   this.genes.directionY = this.genes.directionY / this.genes.directionY;
    // }
  }

  calcFitness() {
    this.fitness = Math.floor((calculateDistance(this.spawnPoint, this.destination) / calculateDistance(this.position, this.destination)) * 100);
  }

  move() {
    this.position.x += this.genes.directionX * this.genes.velocity;
    this.position.y += this.genes.directionY * this.genes.velocity;
  }

  crossover(partner) {
    let child = new DNA(CONFIG_CANVAS_WIDTH, CONFIG_CANVAS_HEIGHT);

    child.genes.directionX = Math.random() * Math.abs(this.genes.directionX - partner.genes.directionX) + (this.genes.directionX < partner.genes.directionX ? this.genes.directionX : partner.genes.directionX);
    child.genes.directionY = Math.random() * Math.abs(this.genes.directionY - partner.genes.directionY) + (this.genes.directionY < partner.genes.directionY ? this.genes.directionY : partner.genes.directionY);
    child.genes.velocity = Math.random() * Math.abs(this.genes.velocity - partner.genes.velocity) + (this.genes.velocity < partner.genes.velocity ? this.genes.velocity : partner.genes.velocity);
    return child;
  }

  mutate(mutationRate) {
    if (Math.random() < mutationRate) {
      if (Object.keys(this.genes)[Math.floor(Math.random() * Object.keys(this.genes).length)] === 'velocity') {
        this.genes.velocity = Math.random() * 10;
        return null;
      }
      this.genes.directionX = Math.random();
      this.genes.directionY = Math.random();

      // if (this.genes.directionX < this.genes.directionY) {
      //   this.genes.directionX = this.genes.directionX / this.genes.directionX;
      //   this.genes.directionY = Math.round(this.genes.directionY / this.genes.directionX);
      // } else {
      //   this.genes.directionX = Math.round(this.genes.directionX / this.genes.directionY);
      //   this.genes.directionY = this.genes.directionY / this.genes.directionY;
      // }

      return null;
    }
  }
}