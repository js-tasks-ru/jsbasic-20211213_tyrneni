import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>`);
    this.render();
  }
  render() {
    this.gridInner = this.elem.querySelector('.products-grid__inner');
    this.gridInner.innerHTML = '';
    let filteredProducts = [];
    //console.log(this.products)
    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) { continue; }//фильтр. Если нут есть, то не пропускаем
      if (this.filters.vegeterianOnly && !product.vegeterian) { continue; }//фильтр включен. Если условие отсутсвует(undefined), то не пропускаем
      if (product.spiciness > this.filters.maxSpiciness) { continue; }
      /*  показывать только те товары, у которых в свойстве spiciness число меньше или равное заданному.
       убрать те что больше maxSpiciness */
      if (this.filters.category && (this.filters.category != product.category)) { continue; }
      /*  если пусто, то пропускаем все. Если включено, то пропускаем только чьё название похоже */
      filteredProducts.push(product);
      //console.log(product)
    }
    console.log(filteredProducts);
    filteredProducts.forEach(product => {
      let card = new ProductCard(product);
      this.gridInner.append(card.elem);
    });
  }
  updateFilter(filters) {
    Object.assign(this.filters, filters);
    // console.log(this.filters)
    this.render();
  }
}
