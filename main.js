const __TREE_DIAGRAM = null;
const __KPGONG = null;

function drawEdge(list) {
	PAINTER.setStrokeColor(EDGE_COLOR);
	list.forEach(x =>
		x.children.forEach(y => PAINTER.drawLine(x, tree[y]))
	);
}

function drawNode(list) {
	list.forEach(x => {
		PAINTER.setFillColor(
			x.children.length === 0 ?
				LEAF_NODE_COLOR
				: INNER_NODE_COLOR
		);
		PAINTER.fillCircle(x, RADIUS)
	});
}

function drawLabel(root) {
	let cnt = 1;
	root.children.forEach(x => {
		const e = tree[x];
		const str = e.val.toString();
		PAINTER.fillText(
			str,
			{
				x: e.x - RADIUS * str.length / 2 - RADIUS * 2,
				y: e.y + WAVE_HEIGHT[cnt % 2]
			}
		)
		++cnt;
		drawLabel(e);
	});
}

function setOffset(node) {
	const cl = node.children;
	node.seg = HORIZONTAL_INTERVAL;
	if (cl.length === 0) return;
	if (cl.length === 1) {
		tree[cl[0]].offset = 0;
		setOffset(tree[cl[0]]);
		return;
	}
	cl.forEach(x => {
		setOffset(tree[x]);
	});
	node.seg = 0;
	cl.forEach(x => {
		node.seg += tree[x].seg;
	});
	const half = node.seg / 2;
	let acc = tree[cl[0]].seg / 2;
	for (let i = 0; i < cl.length; ++i) {
		const e = tree[cl[i]];
		e.offset = acc - half;
		if (i != cl.length - 1) {
			acc += (e.seg + tree[cl[i + 1]].seg) / 2;
		}
	}
}

function setInterval(node, xpos, ypos) {
	const cl = node.children;
	node.x = xpos + node.offset;
	node.y = ypos;
	ypos += VERTICAL_INTERVAL
		+ (cl.length * cl.length) * VERTICAL_INTERVAL / RADIUS;
	if (cl.length === 0) return;
	cl.forEach(x => {
		const e = tree[x];
		setInterval(e, node.x, ypos);
	});
}

setOffset(root[0]);
root[0].offset = root[0].seg / 2;

setInterval(root[0], ORIGIN.x, ORIGIN.y);

drawEdge(tree);
drawNode(tree);

PAINTER.setFillColor(LABEL_COLOR);
PAINTER.setFont(LABEL_FONT);

if (LABEL_ENABLED) {
	drawLabel(root[0]);
	const str = root[0].val.toString();
	PAINTER.fillText(
		str,
		{
			x: root[0].x - str.length - RADIUS * 2,
			y: root[0].y + RADIUS * 3
		}
	);
}
