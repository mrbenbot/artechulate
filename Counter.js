class Counter {
  constructor(numberOfSeconds) {
    this.numberOfSeconds = numberOfSeconds;
    this.count = numberOfSeconds;
    this.timerId;
  }
  decrementCount(callback) {
    if (this.count > 1) {
      this.count--;
      callback(this.count);
      return;
    }
    this.stop(callback);
  }
  start(callback) {
    this.count = this.numberOfSeconds;
    callback(this.count);
    this.timerId = setInterval(
      function() {
        this.decrementCount(callback);
      }.bind(this),
      1000
    );
  }
  stop(callback) {
    showAndHideButtons("stop");
    callback("TIMES UP!");
    clearInterval(this.timerId);
  }
}
