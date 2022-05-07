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
          p.mt-2.text-lg.font-semibold.text-gray-600 {{price}}

          
          .flex.pt-2.flex-row.w-full.place-content-end
              div.text-xs.mr-2.mt-2
                | 
              select.form-select.form-select-lg.mr-2.block.px-2.py-1.text-gray-700.bg-white.border-2.border-solid.border-gray-800.rounded.h-9(v-model="quantity" aria-label='Anzahl auswählen')
                option(value=1) 1
                option(value=2) 2
                option(value=3) 3
              select.form-select.form-select-lg.mr-2.block.px-2.py-1.text-gray-700.bg-white.border-2.border-solid.border-gray-800.rounded.h-9(v-model="unit" aria-label='Variante auswählen')
                option.p-5(v-for='(unit, index) in product.units' :key="index" :value="index") {{unit.name}}

              button.rounded.font-bold.text-3xl.leading-none.flex.justify-center.items-center.border-2.border-gray-800.px-3.h-9(@click="addToChart(product)" type='button' class='hover:bg-gray-200') +
           
              
          //.bg-gray-300.mt-5.text-center.cursor-pointer.font-semibold.py-1.px-2.border.border-gray-400.rounded-full.shadow(@click="addToChart('')" class="hover:bg-gray-500 hover:text-gray-800") 
            | in den Warenkorb
          
</template>

<script>

export default {
  data() {
    return {
      quantity: 1,
      unit: 0,
      price: 0,
    }
  },
  props: {
    product: Object,
    isLoading: Boolean
  },  
  methods : {
    productClicked: function (productId) {
      this.$emit('productSelected', productId) ;
    },
    addToChart: function (product) {
      product["quantity"] = this.quantity;
      product["unit"] = this.product.units[this.unit].value;
      this.$store.dispatch('addToCart', {...product})
      this.$toast.success(`${product.title} wurde zu deinen Vorbestellungen hinzugefügt.`);
    },
  },
  created() {
    if(this.product)
      this.price = this.formatPrice(this.product.units[this.unit].value * this.product.priceRaw);
  },
  watch : {
    'unit'(value) {
      this.price = this.formatPrice(this.product.units[value].value * this.product.priceRaw);
    }
  }
}
</script>

<style>
</style>