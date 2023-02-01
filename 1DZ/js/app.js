const products = [
  { id: 1, title: "Mouse", price: 200, img: "img/mouse.jpg" },
  { id: 2, title: "Keyboard", price: 250, img: "img/kbrd.jpeg" },
  { id: 3, title: "Web-Camera", price: 100, img: "img/wbcmr.jpg" },
  { id: 4, title: "Gamepad", price: 350, img: "img/gmpd.jpg" },
];

const renderPage = (list) => {
  document.querySelector(".products-list").innerHTML = list
    .map((item) => renderProduct(item))
    .join("");
};

const renderProduct = (products) => {
  return `<div class="product-item">
                <img src="${products.img}">
                <h3>${products.title}</h3>
                <p>${products.price}</p>
                <button class="btn-add">Купить</button>
            </div>`;
};

renderPage(products);
