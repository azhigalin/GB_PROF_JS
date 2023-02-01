import cart from "./cartComp";
import productsList from "./productComp";
import error from "./errorComp";
import filterEl from "./filterComp";

const app = {
  el: "#app",
  components: {
    cart,
    "products-list": productsList,
    "filter-el": filterEl,
    error,
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then((response) => response.json())
        .catch((error) => {
          this.$refs.error.setError(error);
        });
    },
    postJson(url, data) {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .catch((error) => {
          this.$refs.error.setError(error);
        });
    },
    putJson(url, data) {
      return fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .catch((error) => {
          this.$refs.error.setError(error);
        });
    },
    deleteJson(url) {
      return fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .catch((error) => {
          this.$refs.error.setError(error);
        });
    },
  },
};

export default app;
