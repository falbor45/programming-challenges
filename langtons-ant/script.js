const MAP_SIZE = 100;
const GRID_SIZE = 10;

const COLORS = [
	{color: 'black', step: 'r'},
	{color: 'black', step: 'l'},
	{color: 'black', step: 'r'},
	{color: 'yellow', step: 'l'},
	{color: 'yellow', step: 'r'},
	{color: 'yellow', step: 'l'}
];

const DIRECTIONS = {
	left: [-1, 0],
	up: [0, -1],
	right: [1, 0],
	down: [0, 1]
};

const canvas = document.createElement('canvas');
canvas.width = MAP_SIZE * GRID_SIZE;
canvas.height = MAP_SIZE * GRID_SIZE;

const context = canvas.getContext('2d');

context.fillStyle = '#AAA';
context.fillRect(0, 0, canvas.width, canvas.height);

const root = document.querySelector('#root');

root.appendChild(canvas);
root.appendChild(document.createElement('span'));

const Ant = () => {
	const position = [MAP_SIZE / 2, MAP_SIZE / 2];
	let direction = 'up';

	return {
		position,
		direction,
		changeDirection: turn => {
			if (turn === 'r') {
				const keys = Object.keys(DIRECTIONS);
				const dirI = Object.keys(DIRECTIONS).indexOf(direction);
				direction = dirI === 3 ? keys[0] : keys[dirI + 1];
				return;
			}
			if (turn === 'l') {
				const keys = Object.keys(DIRECTIONS);
				const dirI = Object.keys(DIRECTIONS).indexOf(direction);
				direction = dirI === 0 ? keys[3] : keys[dirI - 1];
				return;
			}

			throw new Error(`Unknown turn value: "${turn}"`);
		},
		move: () => {
			if (!direction) {
				return position;
			}
			position[0] += DIRECTIONS[direction][0];
			position[1] += DIRECTIONS[direction][1];

			return position;
		}
	}
};

const MAP = Array(MAP_SIZE).fill(1).map(item => Array(MAP_SIZE).fill(null));


const myAnt = Ant();

const drawPixel = (x, y, color) => {
	context.fillStyle = color;
	context.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
};

const rec = (stepCount, endOnStep) => {
	let currentMapPosition = MAP[myAnt.position[0]][myAnt.position[1]];
	let nextDirection;
	let finalColor;

	if (!currentMapPosition) {
		MAP[myAnt.position[0]][myAnt.position[1]] = COLORS[0];
		nextDirection = COLORS[0].step;
		finalColor = COLORS[0].color;
	} else {
		const currentColorI = COLORS.indexOf(currentMapPosition);
		const nextColor = currentColorI + 1 === COLORS.length ? COLORS[0] : COLORS[currentColorI + 1];

		MAP[myAnt.position[0]][myAnt.position[1]] = nextColor;
		nextDirection = nextColor.step;
		finalColor = nextColor.color;
	}

	drawPixel(myAnt.position[0], myAnt.position[1], finalColor);

	if (nextDirection === 'l') {
		myAnt.changeDirection('l');
	}
	if (nextDirection === 'r') {
		myAnt.changeDirection('r');
	}

	myAnt.move();

	if (stepCount > endOnStep) {
		return true;
	}

	document.querySelector('span').innerText = stepCount;

	window.requestAnimationFrame(() => rec(stepCount + 1, endOnStep));
};

rec(0, 100000);


