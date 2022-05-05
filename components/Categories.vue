<template lang="pug">
  div
    .ml-4.mr-6.mt-4.overflow-auto.flex
      div(v-if="isLoading")
        .flex.items-center.justify-center
          .inline-flex.items-center.bg-gray-100.text-gray-800.font-semibold.py-2.px-4.ml-2.border.border-gray-400.rounded-full.shadow
            svg.animate-spin.-ml-1.mr-3.h-5.w-5.text-black(xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24')
              circle.opacity-25(cx='12' cy='12' r='10' stroke='currentColor' stroke-width='4')
              path.opacity-75(fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z')
            | Loading ...

      //div(v-if="categorySelected")
        .flex.items-center.justify-center
          .inline-flex.items-center.bg-gray-800.text-gray-100.font-bold.py-2.px-4.ml-2.border.border-gray-400.rounded.shadow
            | Alle
            svg.h-6.w-6.pl-2(xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true')
              path(stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12')
      //div(v-else)
      div(v-if="!isLoading")
        .flex-none.cursor-pointer.font-medium.py-2.px-4.ml-2.mb-2.border.border-black.rounded-full.shadow(@click="categoryClicked('')" v-bind:class="[active === '' ? 'bg-gray-100 text-black' : 'bg-black text-gray-100']" class="hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black")
          | ALLE
      .flex-none.cursor-pointer.font-medium.py-2.px-4.ml-2.mb-2.border.border-black.rounded-full.shadow(v-for='category in categories' :key='category.id' @click="categoryClicked(category.id)" v-bind:class="[active === category.id ? 'bg-gray-100 text-black' : 'bg-black text-gray-100']" class="hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black")
        | {{ category.attributes.name }}
    div(v-if='error')
      Warning(:text=error)
</template>

<script>
import Warning from "./Warning.vue"

export default {
  data() {
    return {
      categories: [],
      error: null,
      isLoading: true,
      active: {
        type: String,
        default: "",
      }
    }
  },
  created: function () {
    this.active ="";
  },
  methods: {
		categoryClicked: function(category) {
        this.active = category;
        this.$emit('selectCategory', category);
			}
		},
  
  async mounted() {
    try {      
      this.isLoading = true;
      this.categories =  (await this.$strapi.find('categories')).data;
      this.isLoading = false;
    } catch (error) {
      this.error = error
    }
  },
   components: {
    Warning    
   }
}
</script>

<style lang="css" scoped>
</style>
