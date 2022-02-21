<template>
<div v-if="this.product !== null">
  <div class="m-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-8">
    <div class="rounded-t-lg pt-2 pb-2">
      <img :src="image" class="m-auto">
    </div>
    <div class="w-full p-5 flex flex-col justify-between">
      <div>
        <h4 class="mt-1 font-semibold text-lg leading-tight truncate text-gray-700">{{product.attributes.title}} - {{ price }}</h4>
        <div class="mt-1 text-gray-600">{{ product.attributes.description }}</div>
      </div>

      <button class="mt-4 bg-white border border-gray-200 d hover:shadow-lg text-gray-700 font-semibold py-2 px-4 rounded shadow" :data-item-id="product.attributes.id" :data-item-price="product.attributes.price">
        In den Einkaufswagen
      </button>

      <!-- Ausverkauft --
      <div class="text-center mr-10 mb-1" >
        <div class="p-2 bg-gray-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
          <span class="flex rounded-full bg-grey-500 uppercase px-2 py-1 text-xs font-bold mr-3">Ausverkauft</span>
          <span class="font-semibold mr-2 text-left flex-auto">Dieser Artikel ist leider schon ausverkauft.</span>
        </div>
      </div>
      <-- Ausverkauft -->

    </div>
  </div>
</div>

<div v-else>
  {{ error }}
</div>
</template>

<script>
import {
  getStrapiMedia
} from '~/utils/medias'
import axios from 'axios';

export default {
  data() {
    return {
      product: null,
      error: null
    }
  },
  async mounted() {
    try {     
      //this.product = (await this.$strapi.$products.findOne(this.$route.params.id)).data

      const res = await axios.get('http://localhost:1337/api/products/'+this.$route.params.id+'?populate=%2A');
      const product = res.data;
    
      this.product = product.data;    
    } catch (error) {
      this.error = error
    }
  },
  computed: {
    price() {      
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.product.attributes.price);
    },
    customFields() {
      return {};
      
    },
    image() {
      if(!this.product.attributes.image.data)
        return "~/assets/img/placeholder-image.png";
      
      return "http://localhost:1337" + this.product.attributes.image.data.attributes.formats.small.url;
    }
  },
  methods: {
    getStrapiMedia
  }
}
</script>
