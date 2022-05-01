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
          h4.mt-1.font-semibold.text-lg.leading-tight.truncate.text-gray-700 {{product.title}} - {{ product.price }}
          .mt-1.text-gray-600 {{ product.description }}
        button.mt-4.bg-white.border.border-gray-200.d.text-gray-700.font-semibold.py-2.px-4.rounded.shadow(class='hover:shadow-lg' :data-item-id='product.id' :data-item-price='product.price')
          | In den Einkaufswagen
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
      error: null
    }
  },
  props: {
    product: Object
  },
  methods: {
    getStrapiMedia,
    back: function () {
      this.$emit('back', ) ;
    }
  }
}
</script>
