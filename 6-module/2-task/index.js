export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.render();

    this.elem.querySelector('.card__button').addEventListener('click', this.onClick);
  }
  render() {
    this.elem = document.createElement('div');
    this.elem.setAttribute("id", "holder");
    this.elem.classList.add('container_half');
    
    this.elem.innerHTML = `
    <div class="card">
      <div class="card__top">
        <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
        <span class="card__price">€${this.product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${this.product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`;
  }

  onClick = (event) => {
    this.elem.dispatchEvent(new CustomEvent('product-add', { bubbles: true, detail: this.product.id }));
  }
  
}