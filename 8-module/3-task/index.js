export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
    if (!product) { return; }
        
    let cartItem = this.cartItems.find(cart => (cart.product.id == product.id));

    if (cartItem) {
      cartItem.count++;
    } else if (!!product) {
      this.cartItems.push({
        product: product,
        count: 1,
      });
    } //???

    if (!!product) {
      this.onProductUpdate(product);
    }
  }

  updateProductCount(productId, amount) {
    // ваш код
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
    // ваш код
    return this.cartItems.length == 0;
  }

  getTotalCount() {
    // ваш код
    return this.cartItems.reduce((totalCount, product) => totalCount + product.count, 0);
  }

  getTotalPrice() {
    // ваш код
    return this.cartItems.reduce((totalPrice, cart) => totalPrice + (cart.count * cart.product.price), 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

