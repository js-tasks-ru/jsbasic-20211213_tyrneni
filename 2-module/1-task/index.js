function sumSalary(salaries) {
  // ваш код...
  let incomeSum = 0;

  for (let income in salaries) {
    
    if (typeof salaries[income] == "number" &&
      isFinite(salaries[income])) {
      incomeSum = incomeSum + salaries[income];
    }
  }
  return incomeSum;
}
