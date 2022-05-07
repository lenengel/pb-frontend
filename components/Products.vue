<template lang="pug">
  div
    div(v-if='isLoading')
      .m-6.grid.grid-cols-1.gap-4.mt-8.product(class='sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3')
        .border.rounded-lg.bg-gray-100.shadow-md(v-for='n in 3')
          product(isLoading=true)
    div(v-else)  
      .m-6.grid.grid-cols-1.gap-4.mt-8.product(class='sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3')
        .border.rounded-lg.bg-gray-100.shadow-md(v-for='product in products' :key='product.id' class='hover:shadow-lg')
          product(:product='product', @productSelected="productClicked")
    div(v-if='error')
      | {{ error }}
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
    isLoading: Boolean,
  },
  methods : {
    productClicked: function (productId) {
      this.$emit('productSelected', productId) ;
    }
  }
}
</script>