import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    //this.render();
  }

  async render() {
    // ... ваш код

    /* отрисовка */

    this.carousel = new Carousel(slides);
    document.querySelector("[data-carousel-holder]").append(this.carousel.elem);

    this.ribbon = new RibbonMenu(categories);
    document.querySelector("[data-ribbon-holder]").append(this.ribbon.elem);

    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    document.querySelector("[data-slider-holder]").append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    document.querySelector("[data-cart-icon-holder]").append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);
    this.products = await this.fetchProducts();
    await this.promisProductsGrid();

    /* фильтр */

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value //???
    });

    document.body.addEventListener("product-add", ({ detail: productCart }) => {
      let product = this.products.find(product => product.id == productCart);
      this.cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener("slider-change", ({ detail: value }) => {
      console.log(value);

      this.productsGrid.updateFilter({
        maxSpiciness: value // значение остроты из события 'slider-change'
      });
    });

    this.ribbon.elem.addEventListener("ribbon-select", ({ detail: categoryId }) => {
      console.log(categoryId);

      this.productsGrid.updateFilter({
        category: categoryId
      });
    });

    document.querySelector("#nuts-checkbox").onchange = (event) => {
      console.log(event.target.checked);

      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    };

    document.querySelector("#vegeterian-checkbox").onchange = (event) => {
      console.log(event.target.checked);

      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    };

    console.log(this.products);
  }




  async fetchProducts() {
    let products = await fetch("products.json");
    return await products.json();
  }

  async promisProductsGrid() {
    this.productsGrid = new ProductsGrid(this.products);
    document.querySelector("[data-products-grid-holder]").innerHTML = "";
    document.querySelector("[data-products-grid-holder]").append(this.productsGrid.elem);
  }
}
