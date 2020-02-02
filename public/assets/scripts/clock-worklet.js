class ClockPainter {
  static get inputProperties() {
    return ["--total-seconds", "--time", "--timer-color", "--timer-width"];
  }

  paint(ctx, size, props) {
    console.log(props);
    const totalSeconds = props.get("--total-seconds")[0];
    const time = props.get("--time")[0];
    const inverseTime = totalSeconds - time;
    const width = props.get("--timer-width")[0];
    const color = props.get("--timer-color")[0];
    const step = (Math.PI * 2) / totalSeconds;

    ctx.lineWidth = width;
    ctx.strokeStyle = color || "hotpink";
    ctx.beginPath();
    ctx.arc(
      size.width / 2,
      size.height / 2,
      size.height / 3,
      Math.PI * 1.5 - inverseTime * step,
      0 - Math.PI / 2,
      true
    );
    ctx.stroke();
  }
}

registerPaint("clock-circle", ClockPainter);
