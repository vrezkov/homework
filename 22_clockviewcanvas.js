class ClockViewCanvas {
	
	constructor(container) {
		this.container = container;
	}

	init(clockModel) {

		this.container.querySelector("#" + clockModel.key).querySelector(".tz-info").append(clockModel.cityRu);
		
		let canvas = document.createElement("canvas");
		canvas.setAttribute("class", "clock-canvas");
		canvas.setAttribute("width", "200");
		canvas.setAttribute("height", "200");
		
		this.container.querySelector("#" + clockModel.key).append(canvas);

		let ctx = canvas.getContext("2d");
		let x = canvas.width / 2;
		let y = canvas.height / 2;
		
		this.draw(ctx, x, y);
	
	}
	
	draw(ctx, x, y) {
		
		ctx.beginPath();
		ctx.arc(x, y, x - 2, 0, 2 * Math.PI);
		ctx.fillStyle = "#123";
		ctx.fill();
		ctx.strokeStyle = "#fff";
		ctx.lineWidth = "2";
		ctx.stroke();
		ctx.closePath();

		let newRadius = x - 2 - 15;

		ctx.beginPath();
		ctx.arc(x, y, newRadius, 0, 2 * Math.PI);
		ctx.fillStyle = "#123";
		ctx.fill();
		ctx.closePath();

		let ownRadius = 12;

		ctx.beginPath();
		for (let i = 0; i < 12; i++) {
			let angle = 90 + (i * (360 / 12));
			let radian = angle * Math.PI / 180;

			ctx.rotate(radian);
			ctx.translate(-(newRadius - ownRadius), 0);
			ctx.rotate(-radian);
			ctx.arc(x, y, ownRadius, 0, 2 * Math.PI);
			ctx.rotate(radian);
			ctx.translate(newRadius - ownRadius, 0);
			ctx.rotate(-radian);
			ctx.fillStyle = "#ccc";
			ctx.fill();
			ctx.closePath();
		}

		ctx.beginPath();
		for (let i = 1; i < 13; i++) {
			let angle = 90 + (i * (360 / 12));
			let radian = angle * Math.PI / 180;

			ctx.font = "700 12px Arial";
			ctx.textBaseline = "middle";
			ctx.textAlign = "center";
			ctx.fillStyle = "#123";
			ctx.rotate(radian);
			ctx.translate(-(newRadius - ownRadius), 0);
			ctx.rotate(-radian);
			ctx.fillText(i, x, y + 2);
			ctx.rotate(radian);
			ctx.translate(newRadius - ownRadius, 0);
			ctx.rotate(-radian);
			ctx.closePath();
		}
	
	}

	clockViewRotate(city, seconds, minutes, hours) {
		
		let clock = this.container.querySelector("#" + city).querySelector(".clock-canvas");
		let canvasWidth = clock.width;
		let canvasHeight = clock.height;
				
		let ctx = clock.getContext("2d");
		let x = clock.width / 2;
		let y = clock.height / 2;
		
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		this.draw(ctx, x, y);
		
		ctx.translate(x, y);

		let handHoursWidth = 4;
		let handHoursTail = 8;
		let handHoursHeight = 28;
		ctx.beginPath();
		ctx.rotate(((hours / 12) + (minutes / 720)) * 2 * Math.PI);
		ctx.moveTo(0, handHoursTail);
		ctx.lineWidth = handHoursWidth;
		ctx.lineTo(0, -handHoursHeight);
		ctx.lineCap = "round";
		ctx.fillStyle = "#ccc";
		ctx.strokeStyle = "#ccc";
		ctx.stroke();
		ctx.rotate(((hours / 12) + (minutes / 720)) * -2 * Math.PI);
		ctx.closePath();

		let handMinutesWidth = 4;
		let handMinutesTail = 8;
		let handMinutesHeight = 36;
		ctx.beginPath();
		ctx.rotate(((minutes / 60) ) * (2 * Math.PI));
		ctx.moveTo(0, handMinutesTail);
		ctx.lineWidth = handMinutesWidth;
		ctx.lineTo(0, -handMinutesHeight);
		ctx.lineCap = "round";
		ctx.fillStyle = "#000";
		ctx.strokeStyle = "#000";
		ctx.stroke();
		ctx.rotate(((minutes / 60) ) * -2 * Math.PI);
		ctx.closePath();

		let handSecondsWidth = 2;
		let handSecondsTail = 9;
		let handSecondsHeight = 43;
		ctx.beginPath();
		ctx.rotate(((seconds / 60) ) * (2 * Math.PI));
		ctx.moveTo(0, handSecondsTail);
		ctx.lineWidth = handSecondsWidth;
		ctx.lineTo(0, -handSecondsHeight);
		ctx.lineCap = "round";
		ctx.fillStyle = "#ff0000";
		ctx.strokeStyle = "#ff0000";
		ctx.stroke();
		ctx.rotate(((seconds / 60) ) * -2 * Math.PI);
		ctx.closePath();

		ctx.translate(-x, -y);

		ctx.beginPath();
		ctx.arc(x, y, 4, 0, 2 * Math.PI);
		ctx.fillStyle = "#555";
		ctx.fill();
		ctx.closePath();

	}

}