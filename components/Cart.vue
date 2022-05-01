<template lang="pug">
div
  .flex.flex-col
    .overflow-x-auto(class='sm:-mx-6 lg:-mx-8')
      .py-4.inline-block.min-w-full(class='sm:px-6 lg:px-8')
        .overflow-hidden
          table.min-w-full.text-right
            thead.border-b.bg-black
              tr
                th.font-medium.text-white.px-6.py-2.text-left(scope='col')
                  | Artikel
                th.font-medium.text-white.px-6.py-2(scope='col')
                  | Anzahl
                th.font-medium.text-white.px-6.py-2(scope='col') 
                  | Stückpreis
                th.font-medium.text-white.px-6.py-2(scope='col')
                  | Summe
                th.font-medium.text-white.px-6.py-2(scope='col')
                  | 
            tbody
              tr.bg-white.border-b.text-right(v-for='(product, index) in cart' :key="index")
                td.text-sm.text-gray-900.font-light.px-6.py-2.whitespace-nowrap.text-left
                  | {{product.title}}
                td.text-sm.text-gray-900.font-light.px-6.py-2.whitespace-nowrap.flex.place-content-end
                  //Counter(:quantity="product.quantity")
                  select.form-select.form-select-lg.block.px-2.py-1.text-gray-700.bg-white.border-2.border-solid.border-gray-800.rounded.h-9(:value="product.quantity" @change="onChangeQuantity($event,index)" aria-label='Anzahl auswählen')
                    option(value=1) 1
                    option(value=2) 2
                    option(value=3) 3
                
                td.text-sm.text-gray-900.font-light.px-6.py-2.whitespace-nowrap
                  | {{product.price}}
                td.text-sm.text-gray-900.font-light.px-6.py-2.whitespace-nowrap
                  | {{priceLineTotal(product.priceRaw, product.quantity)}}
                td.text-sm.text-gray-900.font-light.px-6.py-2.flex.justify-end
                  div.cursor-pointer(@click="removeCart(index)")
                    Trash
              tr.bg-white.border-b(v-if='this.$store.getters.getCart.length == 0')
                td(colspan=5).text-xs.text-gray-700.font-light.px-6.py-2.whitespace-nowrap.text-center
                  | (Keine Einträge)
              tr.border-t.bg-black
                th.text-white.px-6.py-2(colspan=3 scope='col')
                  span.font-light.text-xs.pr-5 Richtpreis. Jedes Stück wird vom Fleischermeister per Hand geschnitten und kann somit im Gewicht variieren.
                  span.font-medium.text-lg GESAMT
                th.font-medium.text-lg.text-white.px-6.py-2(scope='col')
                  | {{priceTotal}}
                th.font-medium.text-white.px-6.py-2(scope='col')
                  | 
                
</template>

<script>
import Trash from "~/components/icons/trash.vue"
import Counter from "~/components/QuantityCounter.vue"

export default {
  data() {
    return {
    }
  },
  props: {
  },
  computed: {
    cart () {
      return this.$store.state.cart;
    },
    priceLineTotal() {
      return (price, quantity) => {
        return this.formatPrice(price * quantity);
      }
    },
    priceTotal() {
      return this.formatPrice(this.$store.getters.getCart.map( el => (el.priceRaw * el.quantity) )
                        .reduce(
                          (previousValue, currentValue) => previousValue + currentValue,
                          0));
    }
  },
  methods: {
    removeCart : function (index) {
      this.$store.dispatch('removeFromCart', index)
    },
    formatPrice: function (price) {
      return (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price));
    },
    onChangeQuantity: function (e, idx) {
      this.$store.dispatch('updateQuantity', {value: e.target.value, index : idx});
    },
  },
  components : {
    Trash,
    Counter,
  }
}
</script>