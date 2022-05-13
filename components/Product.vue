<template lang="pug">
  div
    div(v-if='isLoading')
      // PLACEHOLDER 
      .w-80.bg-white.rounded-xl.overflow-hidden.shadow-lg.duration-500.transform.transition.cursor-pointer(class='hover:shadow-xl hover:scale-105')
        img.h-56.w-full.object-cover(src='~/assets/img/placeholder.jpg')
        .p-5
          .h-6.bg-gray-200.rounded.animate-pulse.mb-4(class="w-1/2")
          .h-4.bg-gray-200.rounded.animate-pulse.mb-3(class="w-1/4")
          .h-3.bg-gray-200.rounded.animate-pulse(class="w-full")
    div(v-else)
      .w-80.bg-white.rounded-xl.overflow-hidden.shadow-lg.duration-500.transform.transition(class='hover:shadow-xl hover:scale-105')
        img.h-56.w-full.object-cover.cursor-pointer(:src='product.image' alt='', @click="productClicked(product.id)")
        .p-5
          h1.text-2xl.font-bold.cursor-pointer( @click="productClicked(product.id)") {{product.title}}
          QuantityCounter(:product='product')
</template>

<script>
import QuantityCounter from "~/components/QuantityCounter.vue"

export default {
  props: {
    product: Object,
    isLoading: Boolean
  }, 
  methods : {
    productClicked: function (productId) {
      //this.$emit('productSelected', productId) ;
    },
  },
  components : {
    QuantityCounter,
  }

}

</script>

<style>
</style>