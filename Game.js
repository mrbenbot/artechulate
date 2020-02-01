class Game {
  constructor({ questions, numberOfTeams }) {
    this.questions = shuffle(questions);
    this.scores = getInitialScoreObject(numberOfTeams);
    this.numberOfTeams = numberOfTeams;
    this.activeTeam = 0;
    this.currentQuestionIndex = 0;
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
      case "start":
      case "pass":
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
  generateScoreTable(table) {
    table.innerHTML = "";
    const headingRow = document.createElement("tr");
    ["Team", "Score"].forEach(heading => {
      const th = document.createElement("th");
      th.innerText = heading;
      headingRow.appendChild(th);
    });
    table.appendChild(headingRow);
    Object.entries(this.scores)
      .sort(([, value1], [, value2]) => value2 - value1)
      .forEach(array => {
        const scoreRow = document.createElement("tr");
        console.log(this.activeTeam);
        console.log(array[1]);
        if (this.activeTeam == array[0]) {
          scoreRow.classList.add(`active-team`);
        }
        array.forEach((item, i) => {
          const td = document.createElement("td");
          td.innerText = i == 0 ? `Team ${Number(item) + 1}` : item;
          scoreRow.appendChild(td);
        });
        table.appendChild(scoreRow);
      });
  }
}
