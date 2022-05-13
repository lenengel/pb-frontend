<template lang="pug">
    .container.mx-auto.px-4(class='sm:px-8')
      .py-8
        div
          h2.text-2xl.font-semibold.leading-tight Bestellungen
        .-mx-4.px-4.py-4.overflow-x-auto(class='sm:-mx-8 sm:px-8')
          .inline-block.min-w-full.shadow-md.rounded-lg.overflow-hidden
            table.min-w-full.leading-normal
              thead
                tr
                  th.w-3.px-5.py-3.border-b-2.border-gray-200.bg-gray-100.text-left.text-xs.font-semibold.text-gray-700.uppercase.tracking-wider
                    | #
                  th.w-5.px-5.py-3.border-b-2.border-gray-200.bg-gray-100.text-left.text-xs.font-semibold.text-gray-700.uppercase.tracking-wider
                    | Datum
                  th.px-5.py-3.border-b-2.border-gray-200.bg-gray-100.text-left.text-xs.font-semibold.text-gray-700.uppercase.tracking-wider
                    | Kunde
                  th.px-5.py-3.border-b-2.border-gray-200.bg-gray-100.text-left.text-xs.font-semibold.text-gray-700.uppercase.tracking-wider
                    | Bestellung
                  th.px-5.py-3.border-b-2.border-gray-200.bg-gray-100.text-left.text-xs.font-semibold.text-gray-700.uppercase.tracking-wider
                    | Status
                  th.px-5.py-3.border-b-2.border-gray-200.bg-gray-100
              tbody
                tr(v-for='(order, index) in orders' :key="index" class="hover:bg-gray-100")
                  td.px-5.py-5.border-b.border-gray-200.text-sm
                    p.text-gray-600.whitespace-no-wrap {{order.id}}
                  td.px-5.py-5.border-b.border-gray-200.text-sm
                    p.text-gray-900.whitespace-no-wrap {{date(order.publishedAt)}}
                    p.text-gray-600.whitespace-no-wrap {{time(order.publishedAt)}}
                  td.px-5.py-5.border-b.border-gray-200.text-sm
                    p.text-gray-900.font-semibold.whitespace-no-wrap
                      | {{order.firstname}} {{order.lastname}}
                    p.text-gray-600.whitespace-no-wrap {{order.street}}, {{order.phone}} 
                  td.px-5.py-5.border-b.border-gray-200.text-sm
                    NuxtLink.cursor-pointer(class='hover:underline' :to="{ path : '/orderedproducts/' + order.id}")
                      p.text-gray-900.whitespace-no-wrap {{products(order.ordered_products)}}
                      p.text-gray-600.whitespace-no-wrap {{priceLineTotal(order.ordered_products)}}
                  td.px-5.py-5.border-b.border-gray-200.text-sm
                    span.relative.inline-block.px-3.py-1.font-semibold.text-green-900.leading-tight
                      span.absolute.inset-0.bg-green-200.opacity-50.rounded-full(aria-hidden='')
                      span.relative NEU
                  td.px-5.py-5.border-b.border-gray-200.text-sm.text-right
                    div.cursor-pointer(@click="removeOrder(order.id, index)")
                      Trash
                
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
    date () {
      return (value) => {
       return new Date(value).toLocaleDateString('de-DE');
      }
    },
    time () {
      return (value) => {
        return new Date(value).toLocaleTimeString('de-DE');
      }
    },
    products () {
      return (products) => {
        let msg = 0;
        for(const product of products) {
          msg += product.quantity;
        }

        return msg + "x 1kg";
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