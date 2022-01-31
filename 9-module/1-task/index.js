export default function promiseClick(button) {
  // ваш код...
  console.log(button);

  button.addEventListener('click', (event) => {
    new Promise((resolve) => { resolve(event); });
  }, { once: true });
}
