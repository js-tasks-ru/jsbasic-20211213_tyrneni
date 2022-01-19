export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();

    this.carouselInner = this.elem.querySelector('.carousel__inner');
    this.slideList = this.elem.querySelectorAll('.carousel__slide');
    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    this.arrowRight = this.elem.querySelector('.carousel__arrow_right');


    this.position = 0; // положение ленты прокрутки
    this.slideCounter = 1; // номер карточки

    this.arrowHidden();
    for (let btn of this.elem.querySelectorAll('.carousel__button')) {
      btn.addEventListener('click', this.onClick);
    }

    this.arrowLeft.addEventListener('click', this.leftArrow);
    this.arrowRight.addEventListener('click', this.rightArrow);

  }

  render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');
    let carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel__inner');
    this.elem.append(carouselInner);

    this.elem.innerHTML += `
      <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>`;

    this.slides.forEach(slide => {
      this.elem.firstElementChild.innerHTML += `
      <div class="carousel__slide" data-id="${slide.id}">
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price.toFixed(2)}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`;
    });
  }

  onClick = (event) => {
    console.log(event.target.closest('.carousel__slide').getAttribute('data-id'))
    this.elem.dispatchEvent(new CustomEvent("product-add", {
      detail: event.target.closest('.carousel__slide').getAttribute('data-id'),
      bubbles: true
    })
    );
  }

  arrowHidden = () => {

    if (this.slideCounter == this.slideList.length) {
      this.arrowRight.style.display = 'none';
    } else if (this.slideCounter == 1) {
      this.arrowLeft.style.display = 'none';
    }
    else {
      this.arrowRight.style.display = '';
      this.arrowLeft.style.display = '';
    }
  };

  leftArrow = () => {
    let width = this.elem.querySelector('.carousel__img').offsetWidth;

    this.position += width; // ширина картинки;
    this.position = Math.min(this.position, 0);
    this.carouselInner.style.transform = `translateX(${this.position}px)`;

    this.slideCounter--;
    this.arrowHidden();
  };

  rightArrow = () => {
    let width = this.elem.querySelector('.carousel__img').offsetWidth;

    this.position -= width; // ширина картинки;
    this.position = Math.max(this.position, -width * this.slideList.length);
    this.carouselInner.style.transform = `translateX(${this.position}px)`;

    this.slideCounter++;
    this.arrowHidden();
  };
}
