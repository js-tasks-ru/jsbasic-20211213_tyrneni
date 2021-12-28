function truncate(str, maxlength) {
  // ваш код...
  if (str.length > maxlength) {
    str = str.slice(0, maxlength - 1) + '...';
    return str;
  }
    
  return str;
}
