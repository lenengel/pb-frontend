<template>
<div>
  <div class="w-80 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 duration-500 transform transition cursor-pointer">
    <img :src="image" class="h-56 w-full object-cover" alt="">
    <div class="p-5">
      <h1 class="text-2xl font-bold">{{product.attributes.title}}</h1>
      <p class="mt-2 text-lg font-semibold text-gray-600">{{price}}</p>
      <p class="mt-1 text-gray-500 font-">Description</p>
    </div>
  </div>
</div>
</template>

<script>
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
  }
}
</script>

<style>
</style>
