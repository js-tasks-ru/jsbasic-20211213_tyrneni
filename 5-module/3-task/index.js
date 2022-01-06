function initCarousel() {
  // ваш код...
  
  let carouselInner = document.querySelector('.carousel__inner');
  let slideList = document.querySelectorAll('.carousel__slide');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');

  let width = document.querySelector('.carousel__img').offsetWidth; // ширина картинки
  let position = 0; // положение ленты прокрутки
  let slideCounter = 1; // номер карточки

  arrowLeft.onclick = function () {
    position += width ;
    position = Math.min(position, 0);
    carouselInner.style.transform = `translateX(${position}px)`;

    slideCounter--;
    arrowHidden();
  };
  arrowRight.onclick = function () {
    position -= width ;
    position = Math.max(position, -width * slideList.length);
    carouselInner.style.transform = `translateX(${position}px)`;

    slideCounter++;
    arrowHidden();
  };


  const arrowHidden = function () {
    if (slideCounter == 4) {
      arrowRight.style.display = 'none';
    } else if (slideCounter == 1) {
      arrowLeft.style.display = 'none';
    }
    else {
      arrowRight.style.display = '';
      arrowLeft.style.display = '';
    }
  };

  arrowHidden();
}
