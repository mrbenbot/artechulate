const currentTeamOutput = document.querySelector("output");
const mainHeading = document.querySelector("h1");
const table = document.querySelector("table");
const startButton = document.querySelector(`.game-buttons[value="start"]`);
const gameButtons = arraySelector(
  `.game-buttons[value="correct"],.game-buttons[value="pass"]`
);

const config = {
  questions: [...week_1, ...week_2],
  numberOfTeams: 6
};

const game = new Game(config);

rerenderTable();

function switchTeams({ target }) {
  const currentTeam = game.setActiveTeam(target.value);
  render(currentTeamOutput, currentTeam);
  render(mainHeading, `team ${currentTeam}, are you ready?`);
  showAndHideButtons("stop");
  rerenderTable();
}

function handleGameResponse({ target }) {
  const response = game.handleGamePlay(target.value);
  render(mainHeading, response);
  rerenderTable();
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
function rerenderTable() {
  game.generateScoreTable(table);
}

function handleKeyDown(e) {
  if (!e.metaKey) {
    e.preventDefault();
  }
  switch (e.code) {
    case "Space":
      const action = startButton.classList.contains("hidden")
        ? "correct"
        : "pass";
      handleGameResponse({ target: { value: action } });
      break;
    case "KeyP":
      handleGameResponse({ target: { value: "pass" } });
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

document.addEventListener("keydown", handleKeyDown);
