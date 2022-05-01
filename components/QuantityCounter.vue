<template lang="pug">
div 
  .flex.place-content-center
    .inline-flex(role='group')
      button.rounded-l.font-bold.border.border-black.px-2.bg-black.text-white(@click='increment' type='button') +
      input.border-t-2.border-b-2.border-black.w-8.text-center(type='number' class='' name='custom-input-number' v-model='quantity')
      button.rounded-r.font-bold.border.border-black.px-2.bg-black.text-white(@click='decrement' type='button' class='py-2.5 hover:bg-gray-500 hover:text-gray-800') -
</template>

<script>
export default {
   props: {
    quantity: Number,
  },
  methods : {
    increment: function (e) {
      this.quantity++;
    },
    decrement: function (e) {
      if(this.quantity>0) this.quantity--;
    }
  }
};
</script>


<style>
</style>