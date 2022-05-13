<template lang="pug">
div.p-5
  div(v-if="isLoading")
    //PLACEHOLDER
    Products(isLoading=true)
  div(v-else-if='selectedProduct')
    ProductDetails(:product='selectedProduct', @back="showProducts")
  div(v-else)
    Categories(@selectCategory="filterProducts")
    Products(v-bind:products='filteredProducts' :error='error' :storeurl='storeUrl', @productSelected="showProductDetails")
</template>

<script>
import Products from "../components/Products.vue"
import Categories from "../components/Categories.vue"
import ProductDetails from "../components/ProductDetails.vue"
import Cart from "../components/Cart.vue"
import axios from 'axios';

export default {
  transition: 'fade',
  data() {
    return {
      selectedProduct: null,
      filteredProducts: [],
      storeUrl: process.env.storeUrl,
      error: null,
      isLoading: true,
      showCart: false,
    }
  },
  methods: {
    cartClicked : function () {
      this.showCart = true;
    },
		filterProducts: function(category) {
      var vm = this;
      if(category == "") {
				vm.filteredProducts = vm.$store.getters.getProducts;
			} 
      else {
        vm.filteredProducts=[];
        vm.$store.getters.getProducts.forEach(function(product) {
          if(product.categories.map(object => object.id).indexOf(category)>-1)
            vm.filteredProducts.push(product);
        });
			}
		},
    showProductDetails: function(productId) {
      this.selectedProduct = this.$store.getters.getProducts.filter(product => product.id == productId)[0];
    },
    showProducts: function() {
      this.selectedProduct = null;
      this.showCart = false;
    }
	},
  async mounted() {
    try {
      console.log("MOUNTED")
      this.isLoading = true;
      const products = (await axios.get(process.env.storeUrl + '/api/dates')).data;
      
      this.$store.dispatch("initializeProducts", products[0].available_products);
      this.filteredProducts = this.$store.getters.getProducts;
      this.isLoading = false;
    } catch (error) {
      this.error = error
    }
  },
  components: {
    Products,
    Categories,
    ProductDetails,
    Cart,
  }
}
</script>