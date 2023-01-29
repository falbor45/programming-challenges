{
	const MAP_SIZE = 800;
	const GRID_SIZE = 1;
	const MAX_STEP_AMOUNT = 10000;
	let ANTS = 0;

	const randomRGB = () => {
		const r = Math.floor(Math.random() * 255);
		const g = Math.floor(Math.random() * 255);
		const b = Math.floor(Math.random() * 255);

		return `rgb(${r}, ${g}, ${b})`;
	};

	const generateColors = amount => new Array(amount).fill(null).map(_ => ({
		color: randomRGB(),
		step: Math.random() > 0.5 ? 'r' : 'l'
	}));

	const COLORS = [
		{color: '#000000', step: Math.random() > 0.5 ? 'r' : 'l'},
		...generateColors(123)
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
		ANTS++;

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

	const drawPixel = (x, y, color) => {
		context.fillStyle = color;
		context.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
	};

	const rec = (ant, stepCount, stepAmount, endOnStep, lifespan) => {
		if (lifespan === 0) {
			return;
		}
		const _stepAmount = (ANTS * stepAmount > MAX_STEP_AMOUNT ? MAX_STEP_AMOUNT / ANTS : stepAmount)
		for (let i = 0; i < _stepAmount; i++) {
			const canMove = MAP[ant.position[0]] && MAP[ant.position[0]][ant.position[1]];
			if (!canMove) {
				ANTS--;
				document.querySelector('span').innerText = `Ants on screen: ${ANTS}`;
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

		document.querySelector('span').innerText = `Ants on screen: ${ANTS}`;

		window.requestAnimationFrame(() => rec(ant, stepCount + stepAmount, stepAmount, endOnStep, lifespan ? lifespan - 1 : undefined));
	};

	canvas.addEventListener('mouseup', event => {
		const ant = Ant([Math.round(event.offsetX / GRID_SIZE), Math.round(event.offsetY / GRID_SIZE)]);

		rec(ant, 0, 1000, Number.MAX_SAFE_INTEGER);
	})
}