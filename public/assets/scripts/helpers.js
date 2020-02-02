function shuffle(array) {
  const shuffled = [...array];
  shuffled.sort(() => Math.random() - 0.5);
  return shuffled;
}

function getTeamName(index) {
  return `Team ${index + 1}`;
}
