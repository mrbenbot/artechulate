function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function arraySelector(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function render(element, text) {
  element.innerText = text;
}

function getInitialScoreObject(numTeams) {
  const teamScoreObj = {};
  for (let i = 0; i < numTeams; i++) {
    teamScoreObj[i] = 0;
  }
  return teamScoreObj;
}

function renderClockCircle(count, numberOfSeconds, timeContainer) {
  timeContainer.innerHTML = "";
  const time = document.createElement("time");
  time.innerText = count;
  timeContainer.appendChild(time);
  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.classList.add("clock-circle");
    div.style.transform = `rotate(${(360 / numberOfSeconds) * i}deg)`;
    timeContainer.appendChild(div);
  }
}
