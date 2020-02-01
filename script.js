const currentTeamOutput = document.querySelector("output");
const mainHeading = document.querySelector("h1");
const startButton = document.querySelector(`.game-buttons[value="start"]`);
const gameButtons = document.querySelectorAll(
  `.game-buttons[value="correct"],.game-buttons[value="pass"]`
);
const timeContainer = document.querySelector("#time-container");

const config = {
  questions: [...week_1, ...week_2],
  numberOfTeams: 6,
  timeContainer,
  scoreContainer: document.querySelector("table"),
  secondsPerRound: 30
};

const game = new Game(config);

function switchTeams({ target }) {
  game.currentTeam = target.value;
  currentTeamOutput.innerText = game.currentTeamName;
  mainHeading.innerText = `${game.currentTeamName}, are you ready?`;
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
  console.log(e.code);
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
    case "ArrowDown":
      switchTeams({ target: { value: "up" } });
      break;
    case "ArrowUp":
      switchTeams({ target: { value: "down" } });
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

document.addEventListener("keydown", handleKeyDown);
