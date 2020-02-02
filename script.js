const currentTeamOutput = document.querySelector("output");
const mainHeading = document.querySelector("h1");
const startButton = document.querySelector(`.game-buttons[value="start"]`);
const gameButtons = arraySelector(
  `.game-buttons[value="correct"],.game-buttons[value="pass"]`
);
const timeContainer = document.querySelector("#time-container");
const settingsModal = document.querySelector("#settings-container");

const config = {
  questions: [...week_1, ...week_2],
  numberOfTeams: 6,
  timeContainer: timeContainer,
  scoreContainer: document.querySelector("table"),
  secondsPerRound: 30
};

let game = new Game(config);

function switchTeams({ target }) {
  const currentTeam = game.setActiveTeam(target.value);
  render(currentTeamOutput, currentTeam);
  render(mainHeading, `Team ${currentTeam}, are you ready?`);
  showAndHideButtons("stop");
}

function handleGameResponse({ target }) {
  const response = game.handleGamePlay(target.value);
  render(mainHeading, response);
  showAndHideButtons("start");
}

function showAndHideButtons(action) {
  switch (action) {
    case "start":
      startButton.classList.add("hidden");
      gameButtons.forEach(item => item.classList.remove("hidden"));
      break;
    case "stop":
      startButton.classList.remove("hidden");
      gameButtons.forEach(item => item.classList.add("hidden"));
      break;
    default:
      return;
  }
}

function handleKeyDown(e) {
  if (!e.metaKey) {
    e.preventDefault();
  }
  switch (e.code) {
    case "Space":
      const action = startButton.classList.contains("hidden")
        ? "correct"
        : "start";
      handleGameResponse({ target: { value: action } });
      break;
    case "KeyP":
      handleGameResponse({ target: { value: "pass" } });
      break;
    case "Equal":
      switchTeams({ target: { value: "up" } });
      break;
    case "Minus":
      switchTeams({ target: { value: "down" } });
      break;
    default:
      return;
  }
}

arraySelector(".team-buttons").forEach(button =>
  button.addEventListener("click", switchTeams)
);

arraySelector(".game-buttons").forEach(button =>
  button.addEventListener("click", handleGameResponse)
);
document.querySelector("#open-settings").addEventListener("click", () => {
  game.cancelTimer("game stopped");
  settingsModal.style.display = "flex";
  settingsModal.classList.add("background");
  settingsModal.querySelector("div").classList.add("animate-in");
});
document.querySelector("#close-settings").addEventListener("click", () => {
  settingsModal.style.display = "none";
});
document.addEventListener("keydown", handleKeyDown);

document.querySelector("#save-settings").addEventListener("click", () => {
  const timeInput = document.querySelector(`input[id="time"]`);
  const teamInput = document.querySelector(`input[id="team"]`);
  config.numberOfTeams = teamInput.value;
  config.secondsPerRound = timeInput.value;
  game.cancelTimer("settings saved ✅");
  game = new Game(config);
  settingsModal.style.display = "none";
  render(mainHeading, `Team ${1}, are you ready?`);
});
