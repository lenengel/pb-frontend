<template>
<div>
  <div class="rounded-t-lg bg-white pt-2 pb-2">          
      <img class="object-cover h-48 w-96" :src="image">
  </div>
  <div class="pl-4 pr-4 pb-4 pt-4 rounded-lg">
      <h4 class="mt-1 font-semibold text-base leading-tight truncate text-gray-700">{{product.attributes.title}}</h4>
      <div class="mt-1 text-sm text-gray-700">{{price}}</div>
  </div>
</div>
</template>

<script>
import {
  getStrapiMedia
} from '~/utils/medias'

export default {
  props: {
    product: Object
  },  
  computed: {    
    price() {      
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.product.attributes.price);
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

<style>
</style>
