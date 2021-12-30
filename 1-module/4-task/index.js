function checkSpam(str) {
  // ваш код...
  str = str.toLowerCase();
  let spamList = ['1xbet', 'xxx'];

  for (let spamItem of spamList) {
    if (str.includes(spamItem)) {
      return true;
    }
  }
  return false;
}
