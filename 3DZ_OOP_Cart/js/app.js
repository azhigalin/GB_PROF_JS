const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class List {
  constructor(url, selector, list = list2) {
    this.url = url;
    this.selector = selector;
    this.list = list;
    this.products = [];
    this.allProducts = [];
    this._init();
    this.#calcSum();
  }
  getJson(url) {
    return fetch(url ? url : `${API + this.url}`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  }

  #calcSum() {
    let sum = 0;
    for (const item of this.products) {
      sum += item.price;
    }
  }

  render() {
    const block = document.querySelector(this.selector);
    for (const product of this.products) {
      const productObj = new this.list[this.constructor.name](product);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML("beforeend", productObj.render());
    }
  }

  _init() {
    return false;
  }
}

class Item {
  constructor(product, img = "https://via.placeholder.com/200x150") {
    this.id_product = product.id_product;
    this.product_name = product.product_name;
    this.price = product.price;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id_product}">
                 <img src="${this.img}">
                 <h3>${this.product_name}</h3>
                 <p>${this.price}</p>
                 <button class="btn-add"
                 data-id="${this.id_product}"
                 data-name="${this.product_name}"
                 data-price="${this.price}"
                 >Купить</button>
            </div>`;
  }
}

class ProductList extends List {
  constructor(cart, selector, url = "/catalogData.json") {
    super(url, selector);
    this.cart = cart;
    this.getJson().then((data) => {
      this.handleData(data);
    });
  }
  handleData(data) {
    this.products = [...data];
    this.render();
  }
  _init() {
    document.querySelector(this.selector).addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-add")) {
        this.cart.addProduct(event.target);
      }
    });
  }
}

class ProductItem extends Item {}

class Cart extends List {
  constructor(selector, url = "/getBasket.json") {
    super(url, selector);
  }
  addProduct(item) {
    this.getJson(`${API}/addToBasket.json`).then((data) => {
      if (data.result === 1) {
        let productId = +item.dataset["id"];
        let find = this.allProducts.find(
          (product) => product.id_product === productId
        );
        if (find) {
          find.quantity++;
          this._updateCart(find);
        } else {
          let product = {
            id_product: productId,
            price: +item.dataset["price"],
            product_name: item.dataset["name"],
            quantity: 1,
          };
          this.products = [product];
          this.render();
        }
      } else alert("error");
    });
  }
  removeProduct(item) {
    this.getJson(`${API}/deleteFromBasket.json`).then((data) => {
      if (data.result === 1) {
        let productId = +item.dataset["id"];
        let find = this.allProducts.find(
          (product) => product.id_product === productId
        );
        if (find.quantity > 1) {
          find.quantity--;
          this._updateCart(find);
        } else {
          this.allProducts.splice(this.allProducts.indexOf(find), 1);
          document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
        }
      } else {
        alert("error");
      }
    });
  }
  _updateCart(product) {
    let block = document.querySelector(
      `.cart-item[data-id="${product.id_product}"]`
    );
    block.querySelector(
      ".product-quantity"
    ).textContent = `Quantity: ${product.quantity}`;
    block.querySelector(".product-price").textContent = `$${
      product.quantity * product.price
    }`;
  }
  _init() {
    document.querySelector(".cart-button").addEventListener("click", () => {
      document.querySelector(this.selector).classList.toggle("invisible");
      document
        .querySelector(this.selector)
        .addEventListener("click", (event) => {
          if (event.target.classList.contains("del-btn")) {
            this.removeProduct(event.target);
          }
        });
    });
  }
}

class CartItem extends Item {
  constructor(product, img = "https://via.placeholder.com/50x100") {
    super(product, img);
    this.quantity = product.quantity;
  }
  render() {
    return `<div class="cart-item" data-id="${this.id_product}">
    <div class="product-bio">
    <img src="${this.img}" alt="Some image">
    <div class="product-desc">
    <p class="product-title">${this.product_name}</p>
    <p class="product-quantity">Quantity: ${this.quantity}</p>
<p class="product-single-price">$${this.price} each</p>
</div>
</div>
<div class="right-block">
    <p class="product-price">$${this.quantity * this.price}</p>
    <button class="del-btn" data-id="${this.id_product}">&times;</button>
</div>
</div>`;
  }
}

const list2 = {
  ProductList: ProductItem,
  Cart: CartItem,
};

let cart = new Cart(".cart-block");
let products = new ProductList(cart, ".products-list");

products.getJson(`getProducts.json`).then((data) => products.handleData(data));
