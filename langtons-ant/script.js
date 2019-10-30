{
	const MAP_SIZE = 1250;
	const GRID_SIZE = 1;

	const randomRGB = () => {
		const r = Math.floor(Math.random() * 255);
		const g = Math.floor(Math.random() * 255);
		const b = Math.floor(Math.random() * 255);

		return `rgb(${r}, ${g}, ${b})`;
	};

	const COLORS = [
		{color: '#000000', step: Math.random() > 0.5 ? 'r' : 'l'},
		{color: randomRGB(), step: Math.random() > 0.5 ? 'r' : 'l'},
		{color: randomRGB(), step: Math.random() > 0.5 ? 'r' : 'l'},
		{color: randomRGB(), step: Math.random() > 0.5 ? 'r' : 'l'},
		{color: randomRGB(), step: Math.random() > 0.5 ? 'r' : 'l'},
		{color: randomRGB(), step: Math.random() > 0.5 ? 'r' : 'l'},
		{color: randomRGB(), step: Math.random() > 0.5 ? 'r' : 'l'},
		{color: randomRGB(), step: Math.random() > 0.5 ? 'r' : 'l'}
	];

	console.log(COLORS);

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

	context.fillStyle = COLORS[0].color;
	context.fillRect(0, 0, canvas.width, canvas.height);

	const root = document.querySelector('#root');

	root.appendChild(canvas);
	root.appendChild(document.createElement('span'));

	const Ant = (initialPosition) => {
		const position = initialPosition || [MAP_SIZE / 2, MAP_SIZE / 2];
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
					return false;
				}
				position[0] += DIRECTIONS[direction][0];
				position[1] += DIRECTIONS[direction][1];

				return true;
			}
		}
	};

	const MAP = Array(MAP_SIZE).fill(1).map(item => Array(MAP_SIZE).fill(COLORS[0]));


	const myAnt = Ant([~~(MAP_SIZE / 3) * 2, ~~(MAP_SIZE / 3) * 2]);

	const myAnt2 = Ant([~~(MAP_SIZE / 3), ~~(MAP_SIZE / 3)]);

	const drawPixel = (x, y, color) => {
		context.fillStyle = color;
		context.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
	};

	const rec = (ant, stepCount, stepAmount, endOnStep) => {
		for (let i = 0; i < stepAmount; i++) {
			const canMove = MAP[ant.position[0]] && MAP[ant.position[0]][ant.position[1]];
			if (!canMove) {
				rec(Ant([~~(Math.random() * MAP_SIZE), ~~(Math.random() * MAP_SIZE)]), stepCount, Math.ceil(stepAmount / 2), endOnStep);
				rec(Ant([~~(Math.random() * MAP_SIZE), ~~(Math.random() * MAP_SIZE)]), stepCount, Math.ceil(stepAmount / 2), endOnStep);
				return;
			}
			let currentMapPosition = MAP[ant.position[0]][ant.position[1]];
			let nextDirection;
			let finalColor;

			if (!currentMapPosition) {
				MAP[ant.position[0]][ant.position[1]] = COLORS[0];
				nextDirection = COLORS[0].step;
				finalColor = COLORS[0].color;
			} else {
				const currentColorI = COLORS.indexOf(currentMapPosition);
				const nextColor = currentColorI + 1 === COLORS.length ? COLORS[0] : COLORS[currentColorI + 1];

				MAP[ant.position[0]][ant.position[1]] = nextColor;
				nextDirection = nextColor.step;
				finalColor = nextColor.color;
			}

			drawPixel(ant.position[0], ant.position[1], finalColor);

			if (nextDirection === 'l') {
				ant.changeDirection('l');
			}
			if (nextDirection === 'r') {
				ant.changeDirection('r');
			}

			ant.move();
		}

		if (stepCount > endOnStep) {
			return true;
		}

		document.querySelector('span').innerText = stepCount;

		window.requestAnimationFrame(() => rec(ant, stepCount + stepAmount, stepAmount, endOnStep));
	};

	rec(myAnt, 0, 5000, Number.MAX_SAFE_INTEGER);

	rec(myAnt2, 0, 5000, Number.MAX_SAFE_INTEGER);
}