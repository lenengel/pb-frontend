<template lang="pug">
  .flex.flex-col
    .overflow-x-auto(class='sm:-mx-6 lg:-mx-8')
      .py-4.inline-block.min-w-full(class='sm:px-6 lg:px-8')
        .overflow-hidden
          table.min-w-full.text-right
            thead.border-b.bg-black
              tr
                th.font-medium.text-white.px-6.py-2.text-left(scope='col')
                  | #
                th.font-medium.text-white.px-6.py-2(scope='col')
                  | Name
                th.font-medium.text-white.px-6.py-2(scope='col') 
                  | Bestell Datum
                th.font-medium.text-white.px-6.py-2(scope='col')
                  | Produkte
                th.font-medium.text-white.px-6.py-2(scope='col')
                  | Summe
                th.font-medium.text-white.px-6.py-2(scope='col')
                  |  
            tbody
              tr.bg-white.border-b.text-right(v-for='(order, index) in orders' :key="index")
                td.text-sm.text-gray-900.font-light.px-6.py-2.whitespace-nowrap.text-left
                  | {{order.id}}
                td.text-sm.text-gray-900.font-light.px-6.py-2.whitespace-nowrap.flex.place-content-end
                  | {{order.firstname}} {{order.lastname}}
                td.text-sm.text-gray-900.font-light.px-6.py-2.whitespace-nowrap
                  | {{order.publishedAt}}
                td.text-sm.text-gray-900.font-light.px-6.py-2.whitespace-nowrap
                  | {{products(order.ordered_products)}} 
                td.text-sm.text-gray-900.font-light.px-6.py-2.whitespace-nowrap
                  | {{priceLineTotal(order.ordered_products)}}
                td.text-sm.text-gray-900.font-light.px-6.py-2.flex.justify-end
                  div.cursor-pointer(@click="removeOrder(order.id, index)")
                    Trash
            tbody  
              tr.bg-white.border-b(v-show='productsCount == 0')
                td(colspan=5).text-xs.text-gray-700.font-light.px-6.py-2.whitespace-nowrap.text-center
                  | (Keine Einträge)
            //tbody  
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

export default {
  data() {
    return {
       orders : [],
      isLoading : true,
    }
  },
  computed: {
    productsCount () {
      return this.orders.length;
    },
    products () {
      return (products) => {
        let msg = "";
        for(const product of products) {
          msg += `${product.quantity}x ${product.product.title} `;
        }
        return msg;
      }  
    },
    priceLineTotal() {
      return (products) => {
          let price = 0;
          for(const product of products) {
                price += product.quantity * product.product.price;
          }
        return this.formatPrice(price);
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
    removeOrder : function (id,index) {
      let vm = this;
      this.$axios.delete('orderproducts\\'  + id) 
      .then(function (response) {
        vm.$toast.success(`Die Bestellung wurde erfolgreich gelöscht.`,{timeout: 5000});
        vm.orders.splice(index, 1);
      })
      .catch(function (error) {
        console.error(error);
        vm.$toast.error(`Fehler beim Löschen der Bestellung`);
      });
    },
    formatPrice: function (price) {
      return (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price));
    },
  },
  async mounted() {
    try {
      this.isLoading = true;
      this.orders = (await this.$axios.get(`orderproducts`)).data;
      this.isLoading = false;
    } catch (error) {
      this.error = error
    }
  },
  components : {
    Trash,
  }
}
</script>