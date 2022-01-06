function toggleText() {
  // ваш код...
  const btn = document.querySelector('.toggle-text-button');
  let text = document.querySelector('#text');
  
  btn.onclick = () => text.hidden = !text.hidden;
}
