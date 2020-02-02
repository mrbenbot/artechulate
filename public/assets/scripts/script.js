const mainHeading = document.querySelector("h1");
const startButton = document.querySelector(`.game-buttons[value="start"]`);
const gameButtons = document.querySelectorAll(
  `.game-buttons[value="correct"],.game-buttons[value="pass"]`
);
const timeContainer = document.querySelector("#time-container");
const settingsModal = document.querySelector("#settings-container");

const config = {
  questions: [...week_1, ...week_2],
  numberOfTeams: 6,
  timeContainer,
  scoreContainer: document.querySelector("table"),
  secondsPerRound: 30
};

let game = new Game(config);

function switchTeams({ target }) {
  game.currentTeam = target.value;
  const teamName = game.currentTeamName;
  mainHeading.innerText = `${teamName}, are you ready?`;
  showAndHideButtons("stop");
}

function handleGameResponse({ target }) {
  const response = game.handleGamePlay(target.value);
  mainHeading.innerText = response;
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
    case "Enter":
      const action = startButton.classList.contains("hidden")
        ? "correct"
        : "start";
      handleGameResponse({ target: { value: action } });
      break;
    case "KeyP":
    case "Backspace":
      handleGameResponse({ target: { value: "pass" } });
      break;
    case "ArrowUp":
    case "ArrowLeft":
      switchTeams({ target: { value: "down" } });
      break;
    case "ArrowRight":
    case "ArrowDown":
      switchTeams({ target: { value: "up" } });
      break;
    default:
      return;
  }
}

document
  .querySelectorAll(".team-buttons")
  .forEach(button => button.addEventListener("click", switchTeams));

document
  .querySelectorAll(".game-buttons")
  .forEach(button => button.addEventListener("click", handleGameResponse));

document.querySelector("#open-settings").addEventListener("click", () => {
  game.timer.stop();
  settingsModal.style.display = "flex";
});
document.querySelector("#close-settings").addEventListener("click", () => {
  settingsModal.style.display = "none";
});
document.addEventListener("keydown", handleKeyDown);

document.querySelector("#save-settings").addEventListener("click", () => {
  const timeInput = document.querySelector(`input[id="time"]`);
  const teamInput = document.querySelector(`input[id="team"]`);
  const timerTypeSelector = document.querySelector(`#timer-type-selector`);
  const timer = timeContainer.querySelector("time");

  timer.style.setProperty("--timer-line-type", timerTypeSelector.value);
  config.numberOfTeams = teamInput.value;
  config.secondsPerRound = timeInput.value;

  game.timer.reset();
  game = new Game(config);
  mainHeading.innerText = `${game.currentTeamName}, are you ready?`;
  settingsModal.style.display = "none";
});
