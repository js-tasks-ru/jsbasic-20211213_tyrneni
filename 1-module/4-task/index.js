function checkSpam(str) {
  // ваш код...
  str = str.toLowerCase();
  /* let spamList = ['1xbet now', 'free xxxxx'];

  for (let spamItem of spamList) {
    if (str.indexOf(spamItem) != -1) {
      return true;
    } 
    return false;
  }  */
  if (str.indexOf("1xbet now") != -1 || str.indexOf("free xxxxx") != -1) {
    return true;
  } 
  return false;
}
