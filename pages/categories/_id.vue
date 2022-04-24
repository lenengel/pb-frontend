<template>
  <Products :products="this.products" :error="error" />
</template>

<script>
import Products from "~/components/Products.vue"
import axios from 'axios';

export default {
  data() {
    return {
      products: {},
      error: null
    }
  },
  async mounted() {
    try {
    const res = await axios.get('http://localhost:1337/api/categories/'+this.$route.params.id+'?populate[products][populate]=%2A');
    const category = res.data;
    
    this.products = category.data.attributes.products.data;
    console.log("###+++",this.products)  
    } catch (error) {
      this.error = error
    }
  },
  components: {
    Products
  }
}
</script>
