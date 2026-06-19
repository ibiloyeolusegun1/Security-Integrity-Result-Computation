const calculateGrade = (score) => {
  if (score >= 70) return { grade: "A", point: 4.0 };

  if (score >= 60) return { grade: "B", point: 3.5 };

  if (score >= 50) return { grade: "C", point: 3.0 };

  if (score >= 45) return { grade: "D", point: 2.5 };

  if (score >= 40) return { grade: "E", point: 2.0 };

  return { grade: "F", point: 0 };
};

module.exports = calculateGrade;
