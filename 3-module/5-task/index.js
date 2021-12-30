function getMinMax(str) {
  // ваш код...
  let arr = str.split(' ').
    map(item => parseFloat(item)).
    filter(item => isFinite(item));

  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
  };
}
