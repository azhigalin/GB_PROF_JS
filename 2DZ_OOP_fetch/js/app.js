const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class ProductList {
  constructor(selector) {
    this.selector = selector;
    this.products = [];
    this.#calcSum();
    this.#getProducts();
  }

  #getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then((response) => response.json())
      .then((data) => {
        this.products = [...data];
        this.#render();
      })
      .catch(console.log("Error"));
  }

  #calcSum() {
    let sum = 0;
    for (const item of this.products) {
      sum += item.price;
    }
  }

  #render() {
    const block = document.querySelector(this.selector);
    for (const product of this.products) {
      const item = new ProductItem(product);
      block.insertAdjacentHTML("beforeend", item.render());
    }
  }
}
class ProductItem {
  constructor(product, img = "https://via.placeholder.com/200x150") {
    this.id = product.id_product;
    this.title = product.product_name;
    this.price = product.price;
    this.img = img;
  }
  render() {
    return `<div class="product-item" data-id="${this.id}">
                 <img src="${this.img}">
                 <h3>${this.title}</h3>
                 <p>${this.price}</p>
                 <button class="btn-add">Купить</button>
            </div>`;
  }
}

class Basket {
  addItemInBasket() {}
  changeItemInBasket() {}
  removeItemInBasket() {}
  render() {}
}

class BasketItem {
  render() {}
}

let list = new ProductList(".products-list");
