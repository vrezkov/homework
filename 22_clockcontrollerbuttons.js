class ClockControllerButtons {

	constructor(model, container) {
		this.model = model;
		this.container = container;
		this.init();
	}

	init() {

		let that = this;
		let clocks = [];
		let city = "";
		let btnStop = null;
		let btnStart = null;

		for (let i = 0; i < this.container.querySelectorAll(".clock").length; i++ ) {
			clocks.push(this.container.querySelectorAll(".clock")[i]);
		}

		clocks.forEach((el) => {
			city = el.getAttribute("id");
			clockControllerCreate(city);
			btnStop = el.querySelector(".btn-stop");
			btnStart = el.querySelector(".btn-start");
			btnStop.addEventListener("click", clockControllerStop);
			btnStart.addEventListener("click", clockControllerStart);
		})

		function clockControllerCreate(city) {
			that.model.clockModelCreate(city);
		}

		function clockControllerStop(e) {
			e.preventDefault();
			that.model.clockModelStop(this, this.parentElement.id);
		}

		function clockControllerStart(e) {
			e.preventDefault();
			that.model.clockModelStart(this, this.parentElement.id);
		}

	}

}