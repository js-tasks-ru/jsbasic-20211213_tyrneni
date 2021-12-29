function checkSpam(str) {
  // ваш код...
  str = str.toLowerCase();
  let spamList = ['1xbet now', 'free xxxxx'];

  return spamList.includes(str);
}
