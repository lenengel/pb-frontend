<template lang="pug">
div
  span.absolute.inline-flex.h-full.w-full(v-bind:class="{ 'animate-ping bg-white ' : isActive}")
  .flex
    svg.w-5.h-5.z-10( xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512')
      path(fill='white' d='M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z')
    span.flex.h-5.w-5.z-10.ml-2.text-black.font-mono.text-sm.leading-tight
      //span.absolute.inline-flex.h-5.w-5.h-full.w-full.rounded-full.
      span.relative.inline-flex.rounded-full.h-5.w-5.bg-white.flex.justify-center.items-center
        span(v-if="this.$store.getters.getCart.length > 0") {{this.$store.getters.getCart.length}}
    span.ml-2.text-white.z-10
      | Deine Vorbestellung
</template>


<script>

export default {
  data() {
    return {
      isActive: false
    }
  },
  watch: {
    // whenever question changes, this function will run
    '$store.getters.getCart.length' : function() {
      this.isActive = true;
      setTimeout(() => this.isActive = false, 1000);
    }
  }
}
</script>