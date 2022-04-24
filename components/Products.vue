<template>
<div>
  <div v-if="error">
    {{ error }}
  </div>
  <div class="m-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-8 product" v-else>
    <div v-for="product in products" :key="product.id" class="border rounded-lg bg-gray-100 hover:shadow-lg shadow-md">      
      <nuxt-link :to="`/products/${product.id}`">
        <product :product="product"></product>        
      </nuxt-link>
    </div>
  </div>
</div>
</template>

<script>
import product from "~/components/Product.vue"


export default {
  components: {
    product
  },
props: {
    products: Array,
    error: Object,
  }
}
</script>

<style>
</style>
