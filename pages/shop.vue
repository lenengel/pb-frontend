<template lang="pug">
div
  Categories
  .productsle
    Products(:products='products' :error='error' :storeurl='storeUrl')
</template>

<script>
import Products from "./../components/Products.vue"
import Categories from "./../components/Buttons.vue"

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
      this.products = (await this.$strapi.$products.find({ populate: '*'})).data

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