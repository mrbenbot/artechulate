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
