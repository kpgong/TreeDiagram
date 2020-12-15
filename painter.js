const PAINTER =
{
	canvas2d: (() => {
		let r = document
			.getElementById("myCanvas")
			.getContext("2d");
		r.lineWidth = 2;
		return r;
	})(),

	fillCircle: function (pos, size) {
		this.canvas2d.beginPath();
		this.canvas2d.arc(pos.x, pos.y, size, 0, 2 * Math.PI);
		this.canvas2d.fill();
	},

	fillText: function (text, pos) {
		this.canvas2d.shadowOffsetX = 0.8;
		this.canvas2d.shadowOffsetY = 0.8;
		this.canvas2d.shadowBlur = 2;
		this.canvas2d.shadowColor = "rgba(0, 0, 0, 0.8)";
		this.canvas2d.fillText(text, pos.x, pos.y);
	},

	drawLine: function (a, b) {
		this.canvas2d.moveTo(a.x, a.y);
		this.canvas2d.lineTo(b.x, b.y);
		this.canvas2d.stroke();
	},

	setStrokeColor: function (color) {
		this.canvas2d.strokeStyle = color;
	},

	setFillColor: function (color) {
		this.canvas2d.fillStyle = color;
	},

	setFont: function (font) {
		this.canvas2d.font = font;
	}
}
