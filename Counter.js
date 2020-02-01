class Counter {
  constructor(numberOfSeconds) {
    this.numberOfSeconds = numberOfSeconds;
    this.count = numberOfSeconds;
    this.timerId;
    this.callback;
  }
  decrementCount() {
    if (this.count > 1) {
      this.count--;
      this.callback(this.count);
      return;
    } else {
      this.stop(this.callback);
    }
  }
  start(callback) {
    this.count = this.numberOfSeconds;
    callback(this.count);
    this.callback = callback;
    this.timerId = setInterval(this.decrementCount.bind(this), 1000);
  }
  stop(callback) {
    callback("TIMES UP!");
    clearInterval(this.timerId);
  }
}
