export default function promiseClick(button) {
  // ваш код...
  return new Promise((resolve) => {
    button.addEventListener('click', (event) => {
      resolve(event);
    }, { once: true });
  });

  /*  button.addEventListener('click', (event) => {
     new Promise((resolve) => { resolve(event); });
   }, { once: true }); */
}
