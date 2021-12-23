function factorial(n) {
  // ваш код...
  if (n == 0 || n == 1) {
    return 1;
  }
  let factorialSum = 1;

  for (let i = 1; i <= n; i++) {
    factorialSum = factorialSum * i;
  }
  return factorialSum;
}
