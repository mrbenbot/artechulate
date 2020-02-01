class Counter {
  constructor(numberOfSeconds, timeContainer) {
    this.numberOfSeconds = numberOfSeconds;
    this.timeContainer = timeContainer;
    this.timeText = timeContainer.querySelector("time");
    this.count = numberOfSeconds;
    this.timerId;
  }

  decrementCount() {
    this.count--;
    this.renderClockCircle();
    if (this.count === 0) {
      this.stop();
    }
  }

  reset() {
    showAndHideButtons("stop");
    clearInterval(this.timerId);
    this.count = this.numberOfSeconds;
    this.renderClockCircle();
  }

  start() {
    this.count = this.numberOfSeconds;
    this.renderClockCircle();
    this.timerId = setInterval(this.decrementCount.bind(this), 1000);
  }

  stop() {
    showAndHideButtons("stop");
    clearInterval(this.timerId);
    this.renderClockCircle();
  }

  renderClockCircle() {
    this.timeText.innerText = this.count;
    const fraction = this.count / this.numberOfSeconds;
    this.timeContainer.style.setProperty("--time", `${fraction + 0.5}`);
  }
}
