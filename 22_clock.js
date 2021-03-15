class Clock {
	
	constructor(view) {
		this.view = view;
		this.clockModels = [];
	}
	
	clockModelCreate(city) {
		
		let clockModel = {};
		clockModel.key = city;
		
		if (city === "New_York") {
			clockModel.timeZoneFull = "America/New_York";
			clockModel.cityRu = "Нью-Йорк";
		}
		
		if (city === "Minsk") {
			clockModel.timeZoneFull = "Europe/Minsk";
			clockModel.cityRu = "Минск";
		}
		
		if (city === "London") {
			clockModel.timeZoneFull = "Europe/London";
			clockModel.cityRu = "Лондон";
		}
		
		if (city === "Tokyo") {
			clockModel.timeZoneFull = "Asia/Tokyo";
			clockModel.cityRu = "Токио";
		}
		
		if (city === "Berlin") {
			clockModel.timeZoneFull = "Europe/Berlin";
			clockModel.cityRu = "Берлин";
		}
		
		if (city === "Vladivostok") {
			clockModel.timeZoneFull = "Asia/Vladivostok";
			clockModel.cityRu = "Владивосток";
		}
		
		clockModel.intervalId = null;

		this.clockModels.push(clockModel);
		
		this.clockModelRender(clockModel);
		this.clockModelCalculate(clockModel);

	}
	
	clockModelRender(clockModel) {
		this.view.init(clockModel);
	}
	
	clockModelCalculate(clockModel) {
		let that = this;
		if (!clockModel.intervalId) {
			clockModel.intervalId = setInterval(function() {
				clockModel.seconds = Number(new Date().toLocaleTimeString([], {
					timeZone: clockModel.timeZoneFull,
					second: "numeric"
				}));
				clockModel.minutes = Number(new Date().toLocaleTimeString([], {
					timeZone: clockModel.timeZoneFull,
					minute: "numeric"
				}));
				clockModel.hours = Number(new Date().toLocaleTimeString([], {
					timeZone: clockModel.timeZoneFull,
					hour: "numeric"
				}));
				that.view.clockViewRotate(clockModel.key, clockModel.seconds, clockModel.minutes, clockModel.hours);
			}, 1000 / 60);
		}
	}
	
	clockModelStop(btnStop, city) {
		for (let i = 0; i < this.clockModels.length; i++) {
			if (this.clockModels[i].key === city) {
				clearInterval(this.clockModels[i].intervalId);
				this.clockModels[i].intervalId = null;
			}
		}
	}
	
	clockModelStart(btnStart, city) {
		for (let i = 0; i < this.clockModels.length; i++) {
			if (this.clockModels[i].key === city) {
				this.clockModelCalculate(this.clockModels[i]);
			}
		}
	}

}