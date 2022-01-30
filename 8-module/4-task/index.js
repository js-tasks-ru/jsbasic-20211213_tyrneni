import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let cartItem = this.cartItems.find(cart => (cart.product.id == product.id));

    if (cartItem) {
      cartItem.count++;
    } else if (!!product) {
      this.cartItems.push({
        product: product,
        count: 1,
      });
    }

    if (!!product) {
      this.onProductUpdate(product);
    }
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let cartItem = this.cartItems.find(cart => (cart.product.id == productId));
    cartItem.count += amount;

    if (cartItem.count < 1) {
      let myIndex = this.cartItems.indexOf(cartItem);
      if (myIndex !== -1) {
        this.cartItems.splice(myIndex, 1);
      }
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.length == 0;
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    /* let productCount = 0;
    this.cartItems.forEach(cart => productCount += cart.count);
    return productCount; */

    return this.cartItems.reduce((totalCount, product) => totalCount + product.count, 0);
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.reduce((totalPrice, cart) => totalPrice + (cart.count * cart.product.price), 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modalWindow = document.createElement('div');

    this.cartItems.forEach(cart => {
      this.modalWindow.appendChild(this.renderProduct(cart.product, cart.count));
    });

    this.modalWindow.append(this.renderOrderForm());
    this.modalWindow.querySelector('.cart-form').addEventListener('submit', () => this.onSubmit(event));
    //this.modalWindow.querySelector('.cart-form').onsubmit = this.onSubmit(event);

    this.modalWindow.addEventListener('click', (event) => {

      if (event.target.closest('.cart-counter__button_minus')) {
        let minus = event.target.closest('.cart-counter__button_minus');
        let cartId = minus.closest('.cart-product').getAttribute('data-product-id');//.dataset.productId;

        this.cartItems.forEach(cart => {
          if (cart.product.id == cartId) {
            //cart.count--;
            this.updateProductCount(cart.product.id, -1);
          }
        });
      }

      if (event.target.closest('.cart-counter__button_plus')) {
        let plus = event.target.closest('.cart-counter__button_plus');
        let cartId = plus.closest('.cart-product').getAttribute('data-product-id');

        this.cartItems.forEach(cart => {
          if (cart.product.id == cartId) {
            //cart.count++;
            this.updateProductCount(cart.product.id, +1);
          }
        });
      }
    });

    this.cartItems.forEach(cart => this.onProductUpdate(cart));
    this.modal.setBody(this.modalWindow);
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    // ...ваш код    
    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal .modal__body');
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      if (this.cartItems.length < 1 && cartItem.count < 1) { console.log(this.modal.close()); }
      if (cartItem.count < 1) { this.modalWindow.querySelector(`[data-product-id="${productId}"]`).remove(); }

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }
  }

  onSubmit(event) {
    // ...ваш код    
    event.preventDefault();
    this.modalWindow.querySelector('button[type="submit"]').classList.add("is-loading");

    let orderForm = document.forms[0];
    let orderFormData = new FormData(orderForm);
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: orderFormData
    });

    this.modal.setTitle("Success!");
    this.modalWindow.querySelector('button[type="submit"]').classList.remove("is-loading");
    this.cartItems = [];
    this.cartIcon.update(this); //???
    this.modalWindow.innerHTML = `
    <div class="modal__body-inner">
    <p>
      Order successful! Your order is being cooked :) <br>
      We’ll notify you about delivery time shortly.<br>
      <img src="/assets/images/delivery.gif">
    </p>
  </div>`;
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

