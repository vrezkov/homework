class ClockViewDOM {
	
	constructor(container) {
		this.container = container;
	}

	init(clockModel) {

		this.container.querySelector("#" + clockModel.key).querySelector(".tz-info").append(clockModel.cityRu);

		let clockWrapper = document.createElement("div");
		clockWrapper.classList.add("clock-wrapper");
		clockWrapper.style.cssText = "width: 200px; height: 200px; float: left;";

		let clockWrapperHeight = parseInt(clockWrapper.style.height);
		let clockFaceWrapperBorderWidth = 2;
		let clockFaceWrapperPadding = 15;
		let clockFaceWrapper = document.createElement("div");
		clockFaceWrapper.classList.add("clock-face-wrapper");
		clockFaceWrapper.style.cssText = `
			border: ${clockFaceWrapperBorderWidth + "px"} solid #fff; border-radius: 50%; padding: ${clockFaceWrapperPadding + "px"};
			width: ${clockWrapperHeight + "px"}; height: ${clockWrapperHeight + "px"};
			background-color: #123; box-sizing: border-box;`;

		let clockFaceWrapperHeight = parseInt(clockFaceWrapper.style.height);
		let clockFace = document.createElement("div");
		clockFace.classList.add("clock-face");
		clockFace.style.cssText = `position: relative; border-radius: 50%; box-sizing: border-box; 
			width: ${clockFaceWrapperHeight - clockFaceWrapperPadding * 2 - clockFaceWrapperBorderWidth * 2 + "px"};
			height: ${clockFaceWrapperHeight - clockFaceWrapperPadding * 2 + - clockFaceWrapperBorderWidth * 2 + "px"};`;

		let clockTickCircles = [], clockTickNumbers = [];

		for (let i = 0; i < 12; i++){

			let angle = 330 - (i * (360 / 12));
			let radian = angle * Math.PI / 180;

			let clockFaceHeight = parseInt(clockFace.style.height);   
			let clockFaceRadius = clockFaceHeight / 2;
			let ownRadius = 12;

			let clockTickCircle = document.createElement("div");
			clockTickCircle.className = "clock-tick-circle";    
			clockTickCircle.style.cssText = `position: absolute; background-color: #ccc; border-radius: 50%; 
			width: ${ownRadius * 2 + "px"}; height: ${ownRadius * 2 + "px"};
			top: ${(clockFaceRadius - (clockFaceRadius - ownRadius) * Math.cos(radian))+"px"};
			left: ${(clockFaceRadius - (clockFaceRadius - ownRadius) * Math.sin(radian))+"px"};
			transform: translate(-50%, -50%);`;
			clockTickCircles.push(clockTickCircle);
			clockFace.append(clockTickCircles[i]);

			let clockTickNumber = document.createElement("div");
			clockTickNumber.className = "clock-tick-number";
			clockTickNumber.innerHTML = i + 1;
			clockTickNumber.style.cssText = `font-size: 12px; font-weight: 700; color: #123;
			font-family: Arial, Helvetica, sans-serif; text-align: center; vertical-align: middle; line-height: 24px;`;
			clockTickNumbers.push(clockTickNumber);
			clockTickCircles[i].append(clockTickNumbers[i]);
		}

		let handHours = document.createElement("div");
		handHours.classList.add("hand-hours");
		handHours.style.cssText = `position: absolute; bottom: 50%; left: 50%;
		width: 4px; height: 40px; margin-left: -2px; border-radius: 5px; background-color: #ccc;
		transform-origin: center bottom;`;

		let handMinutes = document.createElement("div");
		handMinutes.classList.add("hand-minutes");
		handMinutes.style.cssText = `position: absolute; bottom: 50%; left: 50%; width: 4px; height: 48px; margin-left: -2px;
		border-radius: 4px; background-color: #000; transform-origin: center bottom;`;

		let handSeconds = document.createElement("div");
		handSeconds.classList.add("hand-seconds");
		handSeconds.style.cssText = `position: absolute; bottom: 50%; left: 50%; width: 2px; height: 54px; margin-left: -1px;
		border-radius: 1px; background-color: #ff0000; transform-origin: center bottom;`;

		let screw = document.createElement("div");
		screw.classList.add("screw");
		screw.style.cssText = `position: absolute; top: 50%; left: 50%;
		width: 8px; height: 8px; border-radius: 50%; background-color: #555; transform: translate(-50%, -50%);`;

		clockWrapper.append(clockFaceWrapper);
		clockFaceWrapper.append(clockFace);
		clockFace.append(handHours, handMinutes, handSeconds, screw);
		this.container.querySelector("#" + clockModel.key).append(clockWrapper);
	
	}

	clockViewRotate(city, seconds, minutes, hours) {
		let clock = this.container.querySelector("#" + city);
		let secondsDegree = (seconds / 60) * 360;
		clock.querySelector(".hand-seconds").style.transform = `rotate(${secondsDegree}deg) translateY(10px)`;
		let minutesDegree = (minutes / 60) * 360;
		clock.querySelector(".hand-minutes").style.transform = `rotate(${minutesDegree}deg) translateY(10px)`;
		let hoursDegree = ((hours + minutes / 60) / 12) * 360;
		clock.querySelector(".hand-hours").style.transform = `rotate(${hoursDegree}deg) translateY(10px)`;
	}

}