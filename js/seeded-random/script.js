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

const data2Canvas = attachCanvas({});

const context = getContext('2d', dataCanvas);

const context2 = getContext('2d', data2Canvas);

// This is a mulberry32 implementation
const customRand1 = a => {
	let t = a += 0x6D2B79F5;
	t = Math.imul(t ^ t >>> 15, t | 1);
	t ^= t + Math.imul(t ^ t >>> 7, t | 61);
	return ((t ^ t >>> 14) >>> 0) / 4294967296;
};


// Naive approach
const customRand2 = num => {
	const x = Math.sin(num) * 10000;

	return x - Math.floor(x);
};

const populateNewData = (items, fromSeed, fn) => {
	console.time('populate');
	let arr = new Array(items).fill(0).map((_, index) => fn(fromSeed + index).toFixed(3));

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

const draw = (data, canvas, context) => {
	console.time('draw');
	context.fillStyle = '#000';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = '#FF00FF';
	for (let prop in data) {
		context.fillRect(+prop * canvas.width, canvas.height, 1, -(data[prop] * 0.2))
	}
	console.timeEnd('draw');
};


const start = offset => {
	const data1 = populateNewData(1000000, offset * 1000000, customRand1);
	const data2 = populateNewData(1000000, offset * 1000000, customRand2);
	draw(data1, dataCanvas, context);
	draw(data2, data2Canvas, context2);

	setTimeout(() => {
		window.requestAnimationFrame(() => start(offset + 1));
	}, 200);
};

start(0);