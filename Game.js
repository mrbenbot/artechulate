class Game {
  constructor({
    questions = [],
    numberOfTeams = 6,
    timeContainer,
    scoreContainer,
    secondsPerRound = 30
  }) {
    this.questions = shuffle(questions);
    this.scores = Array(numberOfTeams).fill(0);
    this.numberOfTeams = numberOfTeams;
    this.activeTeam = 0;
    this.currentQuestionIndex = 0;
    this.table = scoreContainer;
    this.counter = new Counter(secondsPerRound, timeContainer);
    this.renderScoreTable();
  }

  get currentTeam() {
    return this.activeTeam;
  }

  set currentTeam(dir) {
    this.counter.reset();
    const diff = dir === "up" ? 1 : -1;
    this.activeTeam = (this.activeTeam + diff) % this.numberOfTeams;
    if (this.activeTeam < 0) {
      this.activeTeam = this.numberOfTeams - 1;
    }
    const activeRow = document.querySelector(".active-team");
    if (activeRow.dataset.team !== this.activeTeam) {
      activeRow.classList.remove("active-team");
    }
    const teamRow = document.querySelector(`[data-team="${this.activeTeam}"]`);
    teamRow.classList.add("active-team");
  }

  get currentTeamName() {
    return getTeamName(this.activeTeam);
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex].text;
  }

  handleGamePlay(action) {
    switch (action) {
      case "correct":
        this.scores[this.activeTeam]++;
        this.updateTeamScoreTable(this.activeTeam);
      case "pass":
        this.nextQuestion();
        return this.currentQuestion;
      case "start":
        this.counter.start();
        this.nextQuestion();
        return this.currentQuestion;
      default:
        return `oops, something went wrong`;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex >= this.questions.length - 1) {
      this.questions = shuffle(this.questions);
    }
    this.currentQuestionIndex =
      (this.currentQuestionIndex + 1) % this.questions.length;
  }

  renderScoreTable() {
    this.table.innerHTML = "";
    const headingRow = createHeadingRow(["Team", "Score"]);
    this.table.appendChild(headingRow);
    this.scores.forEach((score, i) => {
      const scoreRow = document.createElement("tr");
      scoreRow.dataset.team = i;
      if (this.activeTeam == i) {
        scoreRow.classList.add("active-team");
      }
      const teamName = document.createElement("td");
      teamName.classList.add("team");
      teamName.innerText = getTeamName(i);
      scoreRow.appendChild(teamName);
      const scoreDisplay = document.createElement("td");
      scoreDisplay.classList.add("score");
      scoreDisplay.innerText = score;
      scoreRow.appendChild(scoreDisplay);
      this.table.appendChild(scoreRow);
    });
  }

  updateTeamScoreTable(i) {
    const teamRow = document.querySelector(`[data-team="${i}"]`);
    teamRow.querySelector(".score").innerText = this.scores[i];
  }
}

function createHeadingRow(headings) {
  const headingRow = document.createElement("tr");
  headings.forEach(heading => {
    const th = document.createElement("th");
    th.innerText = heading;
    headingRow.appendChild(th);
  });
  return headingRow;
}
