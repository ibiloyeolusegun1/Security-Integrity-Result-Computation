const getNextLevel = (currentLevel) => {
  switch (currentLevel) {
    case "ND1":
      return "ND2";

    case "ND2":
      return "HND1";

    case "HND1":
      return "HND2";

    case "HND2":
      return "GRADUATED";

    default:
      return currentLevel;
  }
};

module.exports = getNextLevel;
