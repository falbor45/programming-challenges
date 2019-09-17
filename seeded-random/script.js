const attachCanvas = ({
	width = 800,
	height = 600,
	node = '#root'
}) => {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;

	document.querySelector(node).appendChild(canvas);

	return canvas;
};

const getContext = (type, canvas) => canvas.getContext(type);

const dataCanvas = attachCanvas({});

const context = getContext('2d', dataCanvas);

const customRand = num => {
	const x = Math.sin(num) * 10000;

	return x - Math.floor(x);
};

const populateNewData = (items, fromSeed) => {
	console.time('populate');
	let arr = new Array(items).fill(0).map((_, index) => customRand(fromSeed + index).toFixed(3));

	const data = arr.reduce((prev, curr) => {
		if (prev[curr]) {
			prev[curr]++;

			return prev;
		}
		prev[curr] = 1;

		return prev;
	}, {});

	console.timeEnd('populate');
	return data
};

const draw = (data) => {
	console.time('draw');
	context.fillStyle = '#000';
	context.fillRect(0, 0, dataCanvas.width, dataCanvas.height);
	context.fillStyle = '#FF00FF';
	for (let prop in data) {
		context.fillRect(+prop * dataCanvas.width, dataCanvas.height, 1, -(data[prop] * 3))
	}
	console.timeEnd('draw');
};


const start = offset => {
	draw(populateNewData(100000, offset * 100000))

	setTimeout(() => {
		window.requestAnimationFrame(() => start(offset + 1));
	}, 200);
};

start(0);