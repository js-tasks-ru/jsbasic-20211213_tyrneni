function sumSalary(salaries) {
  // ваш код...
  let sum = 0;

  for (let income in salaries) {
    if (typeof (salaries[income]) == 'number' &&
              salaries[income] !== 'NaN' &&
              salaries[income] !== 'Infinity' && 
              salaries[income] !== '-Infinity') {

      sum = sum + salaries[income];
    }
  }
  return sum;
}
