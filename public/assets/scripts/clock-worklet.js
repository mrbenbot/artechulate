class ClockPainter {
  static get inputProperties() {
    return [
      "--total-seconds",
      "--time",
      "--timer-color-main",
      "--timer-color-end",
      "--timer-width",
      "--timer-line-type"
    ];
  }

  paint(ctx, size, props) {
    const totalSeconds = props.get("--total-seconds")[0];
    const time = props.get("--time")[0];
    const width = props.get("--timer-width")[0] || 3;
    const color = props.get("--timer-color-main")[0].trim() || "hotpink";
    const colorEnd = props.get("--timer-color-end")[0].trim() || "red";
    const lineType = props.get("--timer-line-type")[0].trim();

    const step = (Math.PI * 2) / totalSeconds;
    ctx.lineWidth = width;
    ctx.strokeStyle = time > 5 ? color : colorEnd;

    switch (lineType) {
      case "dashed":
        drawDashed({ time, size, step, ctx });
        break;
      case "solid":
      default:
        drawSolid({ totalSeconds, time, size, step, ctx });
        break;
    }
  }
}

function drawDashed({ time, size, step, ctx }) {
  for (let i = 0; i < time; i++) {
    ctx.beginPath();
    ctx.arc(
      size.width / 2,
      size.height / 2,
      size.height / 3,
      Math.PI * -0.5 + i * step,
      Math.PI * -0.5 + i * step + step / 4,
      false
    );
    ctx.closePath();
    ctx.stroke();
  }
}

function drawSolid({ totalSeconds, time, step, ctx, size }) {
  const inverseTime = totalSeconds - time;
  ctx.beginPath();
  ctx.arc(
    size.width / 2,
    size.height / 2,
    size.height / 3,
    Math.PI * -0.5,
    Math.PI * 1.5 - inverseTime * step,
    false
  );
  ctx.stroke();
}

registerPaint("clock-circle", ClockPainter);
