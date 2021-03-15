class ClockViewSVG {
	
	constructor(container) {
		this.container = container;
	}

	init(clockModel) {

		this.container.querySelector("#" + clockModel.key).querySelector(".tz-info").append(clockModel.cityRu);

		const svgns = "http://www.w3.org/2000/svg";
		let svg = document.createElementNS(svgns, "svg");
		svg.setAttributeNS(null, "class", "clock-svg");
		svg.setAttributeNS(null, "viewBox", "0 0 200 200");
		svg.setAttributeNS(null, "width", "200");
		svg.setAttributeNS(null, "height", "200");

		let svgWidth = parseFloat(svg.getAttributeNS(null, "width"));
		let svgHeight = parseFloat(svg.getAttributeNS(null, "height"));

		let clockFaceWrapperBorder = 2;
		let clockFaceWrapper = document.createElementNS(svgns, "circle");
		clockFaceWrapper.setAttributeNS(null, "class", "clock-face-wrapper");
		clockFaceWrapper.setAttributeNS(null, "cx", svgWidth / 2);
		clockFaceWrapper.setAttributeNS(null, "cy", svgHeight / 2);
		clockFaceWrapper.setAttributeNS(null, "r", svgWidth / 2 - clockFaceWrapperBorder);
		clockFaceWrapper.setAttributeNS(null, "fill", "#123");
		clockFaceWrapper.setAttributeNS(null, "stroke", "#fff");
		clockFaceWrapper.setAttributeNS(null, "stroke-width", clockFaceWrapperBorder);

		let clockFaceMargin = 15;
		let clockFace = document.createElementNS(svgns, "circle");
		clockFace.setAttributeNS(null, "class", "clock-face");
		clockFace.setAttributeNS(null, "cx", svgWidth / 2);
		clockFace.setAttributeNS(null, "cy", svgHeight / 2);
		clockFace.setAttributeNS(null, "r", svgWidth / 2 - clockFaceWrapperBorder - clockFaceMargin);
		clockFace.setAttributeNS(null, "fill", "#123");

		this.container.querySelector("#" + clockModel.key).appendChild(svg);
		svg.append(clockFaceWrapper, clockFace);

		for (let i = 0; i < 12; i++){

			let angle = 120 + (i * (360 / 12));
			let radian = angle * Math.PI / 180;
			let parentRadius = parseFloat(clockFace.getAttributeNS(null, "r"));
			let ownRadius = 12;

			let clockTickCircle = document.createElementNS(svgns, "circle");
			clockTickCircle.setAttributeNS(null, "class", "clock-tick-wrapper");
			clockTickCircle.setAttributeNS(null, "cx", `${((svgWidth / 2) - (parentRadius - ownRadius) * Math.cos(radian))}`);
			clockTickCircle.setAttributeNS(null, "cy", `${((svgHeight / 2) - (parentRadius - ownRadius) * Math.sin(radian))}`);
			clockTickCircle.setAttributeNS(null, "r", ownRadius);
			clockTickCircle.setAttributeNS(null, "fill", "#ccc");

			let clockTickNumber = document.createElementNS(svgns, "text");
			clockTickNumber.textContent = i + 1;
			clockTickNumber.setAttributeNS(null, "x", `${((svgWidth / 2) - (parentRadius - ownRadius) * Math.cos(radian))}`);
			clockTickNumber.setAttributeNS(null, "y", `${((svgHeight / 2) - (parentRadius - ownRadius) * Math.sin(radian))}`);
			clockTickNumber.setAttributeNS(null, "width", "24");
			clockTickNumber.setAttributeNS(null, "height", "24");
			clockTickNumber.setAttributeNS(null, "fill", "#123");
			clockTickNumber.setAttributeNS(null, "alignment-baseline", "central");
			clockTickNumber.setAttributeNS(null, "text-anchor", "middle");
			clockTickNumber.setAttributeNS(null, "font-family", "Arial");
			clockTickNumber.setAttributeNS(null, "font-size", "12");
			clockTickNumber.setAttributeNS(null, "font-weight", "700");

			svg.appendChild(clockTickCircle);
			svg.appendChild(clockTickNumber);
		}

		let handHours = document.createElementNS(svgns, "rect");
		handHours.setAttributeNS(null, "class", "hand-hours");
		handHours.setAttributeNS(null, "x", svgWidth / 2 - 2);
		handHours.setAttributeNS(null, "y", svgHeight / 2 - 10);
		handHours.setAttributeNS(null, "rx", "5");
		handHours.setAttributeNS(null, "ry", "5");
		handHours.setAttributeNS(null, "width", "4");
		handHours.setAttributeNS(null, "height", "40");
		handHours.setAttributeNS(null, "fill", "#ccc");

		let handMinutes = document.createElementNS(svgns, "rect");
		handMinutes.setAttributeNS(null, "class", "hand-minutes");
		handMinutes.setAttributeNS(null, "x", svgWidth / 2 - 2);
		handMinutes.setAttributeNS(null, "y", svgHeight / 2 - 10);
		handMinutes.setAttributeNS(null, "rx", "4");
		handMinutes.setAttributeNS(null, "ry", "4");
		handMinutes.setAttributeNS(null, "width", "4");
		handMinutes.setAttributeNS(null, "height", "48");
		handMinutes.setAttributeNS(null, "fill", "#000");

		let handSeconds = document.createElementNS(svgns, "rect");
		handSeconds.setAttributeNS(null, "class", "hand-seconds");
		handSeconds.setAttributeNS(null, "x", svgWidth / 2 - 1);
		handSeconds.setAttributeNS(null, "y", svgHeight / 2 - 10);
		handSeconds.setAttributeNS(null, "rx", "1");
		handSeconds.setAttributeNS(null, "ry", "1");
		handSeconds.setAttributeNS(null, "width", "2");
		handSeconds.setAttributeNS(null, "height", "54");
		handSeconds.setAttributeNS(null, "fill", "#ff0000");

		let screw = document.createElementNS(svgns, "circle");
		screw.setAttributeNS(null, "class", "screw");
		screw.setAttributeNS(null, "cx", svgWidth / 2);
		screw.setAttributeNS(null, "cy", svgHeight / 2);
		screw.setAttributeNS(null, "r", "4");
		screw.setAttributeNS(null, "fill", "#555");
		
		svg.append(handHours, handMinutes, handSeconds, screw);

	}

	clockViewRotate(city, seconds, minutes, hours) {
		let clock = this.container.querySelector("#" + city).querySelector(".clock-svg");
		let svgWidth = parseFloat(clock.getAttributeNS(null, "width"));
		let svgHeight = parseFloat(clock.getAttributeNS(null, "height"));
		let secondsDegree = (seconds / 60) * 360 + 180;
		clock.querySelector(".hand-seconds").setAttributeNS(null, 'transform', `rotate(${secondsDegree} ${svgWidth / 2} ${svgHeight / 2})`);
		let minutesDegree = (minutes / 60) * 360 + 180;
		clock.querySelector(".hand-minutes").setAttributeNS(null, 'transform', `rotate(${minutesDegree} ${svgWidth / 2} ${svgHeight / 2})`);
		let hoursDegree = ((hours + minutes / 60) / 12) * 360 + 180;
		clock.querySelector(".hand-hours").setAttributeNS(null, 'transform', `rotate(${hoursDegree} ${svgWidth / 2} ${svgHeight / 2})`);
	}

}