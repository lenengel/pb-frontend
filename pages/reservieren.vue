<template lang="pug">
div
  Categories(@selectCategory="filterProducts")
  div(:class="{'cp-list': isLoading}")
    Products(v-bind:products='filteredProducts' :error='error' :storeurl='storeUrl')
</template>

<script>
import Products from "../components/Products.vue"
import Categories from "../components/Categories.vue"

export default {
  data() {
    return {
      products: [],
      filteredProducts: [],
      storeUrl: process.env.storeUrl,
      error: null,
      isLoading: true,
    }
  },
  methods: {
		filterProducts: function(category) {
      if(category == "") {
				this.filteredProducts = this.products;
			} 
      else {
        let filteredProducts = [];
        this.products.forEach(function(product) {
          if(product.attributes.categories.data.map(object => object.id).indexOf(category)>-1)
            filteredProducts.push(product);
        });
        console.log(filteredProducts);
			}
		}
	},
  async mounted() {
    try {
      this.isLoading = true;
      this.products = (await this.$strapi.$products.find({ populate: '*'})).data
      this.filteredProducts = this.products;
      this.isLoading = false;
    } catch (error) {
      this.error = error
    }
  },
  components: {
    Products,
    Categories,
  }
}
</script>