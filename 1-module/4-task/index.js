function checkSpam(str) {
  // ваш код...
  str = str.toLowerCase();
  let spamList = ['1xbet', 'xxx'];

  return spamList.includes(str);
}
