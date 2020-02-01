class Counter {
  constructor(numberOfSeconds) {
    this.numberOfSeconds = numberOfSeconds;
    this.count = 30;
    this.timerId;
    this.callback;
  }
  decrementCount() {
    if (this.count > 1) {
      this.count--;
      this.callback(this.count);
      return;
    } else {
      this.callback("STOP");
      clearInterval(this.timerId);
    }
  }
  start(callback) {
    this.count = 30;
    callback(30);
    this.callback = callback;
    this.timerId = setInterval(this.decrementCount.bind(this), 1000);
  }
}
