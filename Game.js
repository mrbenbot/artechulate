class Game {
  constructor({ questions, numberOfTeams, counter, table }) {
    this.questions = shuffle(questions);
    this.scores = getInitialScoreObject(numberOfTeams);
    this.numberOfTeams = numberOfTeams;
    this.activeTeam = 0;
    this.currentQuestionIndex = 0;
    this.counterElement = counter;
    this.table = table;
    this.counter = new Counter(30);
  }
  get currentTeam() {
    return this.activeTeam + 1;
  }
  get currentQuestion() {
    return this.questions[this.currentQuestionIndex].text;
  }
  setActiveTeam(direction) {
    switch (direction) {
      case "up":
        if (this.activeTeam < this.numberOfTeams - 1) {
          this.activeTeam++;
        } else {
          this.activeTeam = 0;
        }
        break;
      case "down":
        if (this.activeTeam > 0) {
          this.activeTeam--;
        } else {
          this.activeTeam = this.numberOfTeams - 1;
        }
        break;
      default:
        return;
    }
    return this.currentTeam;
  }
  handleGamePlay(action) {
    switch (action) {
      case "correct":
        this.scores[this.activeTeam]++;
      case "pass":
        this.nextQuestion();
        return this.currentQuestion;
      case "start":
        this.startTimer();
        this.nextQuestion();
        return this.currentQuestion;
      default:
        return `oops, something went wrong`;
    }
  }
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      return;
    }
    this.currentQuestionIndex = 0;
  }
  startTimer() {
    this.counter.start(
      function(count) {
        this.counterElement.innerText = count;
      }.bind(this)
    );
  }
  cancelTimer() {
    this.counterElement.innerText = "ready";
    clearInterval(this.timerId);
  }
  updateScoreTable() {
    this.table.innerHTML = "";
    const headingRow = document.createElement("tr");
    ["Team", "Score"].forEach(heading => {
      const th = document.createElement("th");
      th.innerText = heading;
      headingRow.appendChild(th);
    });
    this.table.appendChild(headingRow);
    Object.entries(this.scores)
      .sort(([, value1], [, value2]) => value2 - value1)
      .forEach(array => {
        const scoreRow = document.createElement("tr");
        if (this.activeTeam == array[0]) {
          scoreRow.classList.add(`active-team`);
        }
        array.forEach((item, i) => {
          const td = document.createElement("td");
          td.innerText = i == 0 ? `Team ${Number(item) + 1}` : item;
          scoreRow.appendChild(td);
        });
        this.table.appendChild(scoreRow);
      });
  }
}
