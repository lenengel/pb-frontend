<template lang="pug">
div
  .container.flex.flex-wrap.mx-auto.ml-4.mr-6.mt-8
    .bg-gray-100.cursor-pointer.font-semibold.py-2.px-4.ml-2.mb-2.border.border-gray-400.rounded.shadow(@click="back('')" class="hover:bg-gray-300")
      | ZURÜCK
  div(v-if='this.product !== null')
    .m-6.grid.grid-cols-1.gap-4.mt-8(class='sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2')
      .rounded-t-lg.pt-2.pb-2
        img.m-auto(:src='product.image')
      .w-full.p-5.flex.flex-col.justify-between
        div
          h4.mt-1.font-semibold.text-lg.leading-tight.truncate.text-gray-700 {{product.title}} - {{ price }}
          .mt-1.text-gray-600 {{ product.description }}
        
          .flex.mt-10
            select.form-select.form-select-lg.mr-2.block.px-2.py-1.text-gray-700.bg-white.border-2.border-solid.border-gray-800.rounded.h-9(v-model="quantity" aria-label='Anzahl auswählen')
              option(value=1) 1
              option(value=2) 2
              option(value=3) 3
            select.form-select.form-select-lg.mr-2.block.px-2.py-1.text-gray-700.bg-white.border-2.border-solid.border-gray-800.rounded.h-9(v-model="unit" aria-label='Variante auswählen')
              option.p-5(v-for='(unit, index) in product.units' :key="index" :value="index") {{unit.name}}

          button.px-3.mt-3.mr-2.text-base.text-white.bg-black.rounded-lg.border.border-black.inline-flex.items-center(type='button' @click="addToChart(product)" class='hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black py-2')
            | Zu den Vorbestellungen hinzufügen
        //
          Ausverkauft --
          <div class="text-center mr-10 mb-1" >
          <div class="p-2 bg-gray-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
          <span class="flex rounded-full bg-grey-500 uppercase px-2 py-1 text-xs font-bold mr-3">Ausverkauft</span>
          <span class="font-semibold mr-2 text-left flex-auto">Dieser Artikel ist leider schon ausverkauft.</span>
          </div>
          </div>
          <-- Ausverkauft
  div(v-if='error')
    | {{ error }}   
</template>

<script>
import {
  getStrapiMedia
} from '~/utils/medias'
import axios from 'axios';

export default {
  data() {
    return {
      error: null,
      quantity: 1,
      unit: 0,
      price: 0,
    }
  },
  props: {
    product: Object
  },
  methods: {
    getStrapiMedia,
    back: function () {
      this.$emit('back', ) ;
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