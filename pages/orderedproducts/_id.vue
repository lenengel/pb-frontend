<template lang="pug">
div
    .container.mx-auto.px-4(class='sm:px-8')
      .py-8
        .mr-6.mt-4.overflow-auto.flex
          .flex-none.cursor-pointer.font-medium.py-2.px-4.ml-2.mb-2.border.border-black.rounded-full.shadow.bg-black.text-gray-100(@click="back()" class="hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black") ZURÜCK
          .ml-6.pt-2.flex-none.text-2xl.font-semibold.leading-tight Bestelltung # {{this.$route.params.id}} -  Produkte
        .-mx-4.px-4.py-4.overflow-x-auto(class='sm:-mx-8 sm:px-8')
          .inline-block.min-w-full.shadow-md.rounded-lg.overflow-hidden
            table.min-w-full.leading-normal
              thead
                tr
                  th.w-5.px-5.py-3.border-b-2.border-gray-200.bg-gray-100.text-left.text-xs.font-semibold.text-gray-700.uppercase.tracking-wider
                    | Stk
                  th.w-10.px-5.py-3.border-b-2.border-gray-200.bg-gray-100.text-left.text-xs.font-semibold.text-gray-700.uppercase.tracking-wider
                    | Variation
                  th.px-5.py-3.border-b-2.border-gray-200.bg-gray-100.text-left.text-xs.font-semibold.text-gray-700.uppercase.tracking-wider
                    | Produkt
                  th.px-5.py-3.border-b-2.border-gray-200.bg-gray-100
                    |
              tbody
                tr(v-for='(product, index) in order.ordered_products' :key="index" class="hover:bg-gray-100")
                  td.px-5.py-5.border-b.border-gray-200.text-sm
                    select.form-select.form-select-lg.mr-2.block.px-2.py-1.text-gray-700.bg-white.border-2.border-solid.border-gray-800.rounded.h-9(:value="product.quantity" @change="onChangeQuantity($event, product.id)" aria-label='Anzahl auswählen')
                      option(value=1) 1
                      option(value=2) 2
                      option(value=3) 3   
                  td.px-5.py-5.border-b.border-gray-200.text-sm
                    select.form-select.form-select-lg.mr-2.block.px-2.py-1.text-gray-700.bg-white.border-2.border-solid.border-gray-800.rounded.h-9(:value="product.unit" @change="onChangeUnit($event, product.id)" aria-label='Variante auswählen')
                      option.p-5(v-for='(unit, index) in product.product.product_units' :key="index" :value="unit.weight") {{unit.name}}
                  td.px-5.py-5.border-b.border-gray-200.text-sm
                    p.text-gray-900.font-semibold.whitespace-no-wrap
                      | {{product.product.title}}
                  td.px-5.py-5.border-b.border-gray-200.text-sm.text-right
                    div.cursor-pointer(@click="removeProduct(product.id, index)")
                      Trash
                
</template>

<script>
import Trash from "~/components/icons/trash.vue"

export default {
  layout: 'admin',
  middleware: 'auth',
 data() {
    return {
      order : {},
      isLoading : true,
    }
  },
  computed: {
    datetime () {
      return (value) => {
        let date = new Date(value)
        return date.toLocaleDateString('de-DE') + " " + date.toLocaleTimeString('de-DE');
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
    onChangeQuantity: function (e, id) {
      let vm = this;
      this.$axios.put(`ordered-products/${id}`,
        {
        "data": {
          "quantity": parseInt(e.target.value)
        }
      }
      ) 
      .then(function (response) {
        vm.$toast.success(`Die Anzahl wurde erfolgreich aktualisiert.`,{timeout: 5000});
      })
      .catch(function (error) {
        console.error(error);
        vm.$toast.error(`Fehler beim der Aktualisierung!`);
      });
    },
    onChangeUnit: function (e, id) {
      let vm = this;
      this.$axios.put(`ordered-products/${id}`,
        {
        "data": {
          "unit": parseFloat(e.target.value)
        }
      }
      ) 
      .then(function (response) {
        vm.$toast.success(`Die Einheit wurde erfolgreich aktualisiert.`,{timeout: 5000});
      })
      .catch(function (error) {
        console.error(error);
        vm.$toast.error(`Fehler beim der Aktualisierung!`);
      });
    },
    back: function () {
      this.$router.back()
    },
    removeProduct : function (id,index) {
      let vm = this;
      this.$axios.delete(`ordered-products/${id}`) 
      .then(function (response) {
        vm.$toast.success(`Das Produkt wurde erfolgreich von der Bestellung gelöscht.`,{timeout: 5000});
        vm.order.ordered_products.splice(index, 1);
      })
      .catch(function (error) {
        console.error(error);
        vm.$toast.error(`Fehler beim Löschen des Produkt's`);
      });
    },
  },
  async mounted() {
    try {
      this.isLoading = true;
      this.order = (await this.$axios.get('orderproducts\\'+this.$route.params.id)).data;
      console.log(" this.order = ", this.order);

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