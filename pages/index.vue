<template>
<div class="productsle">
<Products :products="products" :error="error" :storeUrl="storeUrl" />
</div>
</template>

<script>
import Products from "~/components/Products.vue"

export default {
  data() {
    return {
      products: [],
      storeUrl: process.env.storeUrl,
      error: null
    }
  },
  async mounted() {
    try {
      let result = await this.$strapi.$products.find()
      
      this.products = result.data;
      console.log("products: ",this.products);
      debugger;
    
    } catch (error) {
      this.error = error
    }
  },
  components: {
    Products
  }
}
</script>

