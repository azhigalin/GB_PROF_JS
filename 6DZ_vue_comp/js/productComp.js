Vue.component("products-list", {
  data() {
    return {
      catalogUrl: "/catalogData.json",
      products: [],
      filtered: [],
      imgCatalog: "https://via.placeholder.com/200x150",
    };
  },
  methods: {
    filter(item) {
      let regexp = new RegExp(item, "i");
      this.filtered = this.products.filter((el) =>
        regexp.test(el.product_name)
      );
    },
  },
  mounted() {
    this.$parent.getJson(`${API + this.catalogUrl}`).then((data) => {
      for (let element of data) {
        this.products.push(element);
        this.filtered.push(element);
      }
    });
    this.$parent.getJson(`getProducts.json`).then((data) => {
      for (let element of data) {
        this.products.push(element);
        this.filtered.push(element);
      }
    });
  },
  template: `
	<div class="products-list">
	<product v-for="item of filtered" :key="item.id_product" :img="imgCatalog"
	:product="item">
	</product>
	</div>
	
	`,
});

Vue.component("product", {
  props: ["product", "img"],
  template: `
	<div
	class="product-item"
>
	<img :src="img" alt="Some img" />
	<h3>{{product.product_name}}</h3>
	<p>{{product.price}}</p>
	<button class="btn-add" @click="$parent.$parent.$refs.cart.addProduct(product)">
		Купить
	</button>
</div>`,
});
