<template lang="pug">
div
  div.pb-5.border-t.border-b.border-gray-400
    .mt-8
      .flow-root
        .py-6(v-show='cartCount == 0')
          span.text-xs.text-gray-700.font-light.px-6.py-2.whitespace-nowrap.text-center
            | (Keine Einträge)          
        ul.-my-6.divide-y.divide-gray-200(role='list')
          li.flex.py-6(v-for='(product, index) in cart' :key='index')
            .h-24.w-24.flex-shrink-0.overflow-hidden.rounded-md.border.border-gray-200
              img.h-full.w-full.object-cover.object-center(:src='product.image' alt='PEMBEEF')
            .ml-4.flex.flex-1.flex-col
              div
                .flex.justify-between.text-base.font-medium.text-gray-900
                  .h3.text-xl
                    a(:href='product.href')  {{ product.title }} 
                  p.ml-4 {{priceLineTotal(product.priceRaw, product.quantity, product.unit)}}
                p.mt-1.text-sm.text-gray-500 {{priceLine(product.priceRaw, product.unit)}}
              .flex.flex-1.items-end.justify-between.text-sm
                div.flex
                  select.form-select.form-select-lg.block.px-2.py-1.text-gray-700.bg-white.border-2.border-solid.border-gray-800.rounded.h-9(:value="product.quantity" @change="onChangeQuantity($event,index)" aria-label='Anzahl auswählen')
                    option(value=1) 1
                    option(value=2) 2
                    option(value=3) 3
                  select.ml-3.form-select.form-select-lg.mr-2.block.px-2.py-1.text-gray-700.bg-white.border-2.border-solid.border-gray-800.rounded.h-9(:value="product.unit" @change="onChangeUnit($event,index)" aria-label='Variante auswählen')
                    option.p-5(v-for='(unit, index) in product.units' :key="index" :value="unit.value") {{unit.name}}
                .flex
                  div.cursor-pointer(@click="removeCart(index)")
                      Trash
    
  .flex.flex-wrap.mt-20
    .flex-1.content-center.justify-start.border-l-1.border-gray-800
      .px-5
        h2.font-medium.leading-tight.text-2xl.mt-0.mb-5 Deine Kontaktdaten
        div
          .grid.grid-cols-2.gap-4
            .form-group.mb-6
              input.form-control.block.w-full.px-3.text-base.font-normal.text-black.bg-white.bg-clip-padding.border.border-solid.border-gray-600.rounded.transition.ease-in-out.m-0(type='text' class='py-3 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none' aria-describedby='firsname' placeholder='Vorname' v-model='firstname' autocomplete='given-name')
            .form-group.mb-6
              input.form-control.block.w-full.px-3.text-base.font-normal.text-black.bg-white.bg-clip-padding.border.border-solid.border-gray-600.rounded.transition.ease-in-out.m-0(type='text' class='py-3 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none' aria-describedby='lastname' placeholder='Nachname' v-model='lastname' autocomplete='family-name')
          .form-group.mb-6
              input.form-control.block.w-full.px-3.text-base.font-normal.text-black.bg-white.bg-clip-padding.border.border-solid.border-gray-600.rounded.transition.ease-in-out.m-0(type='text' class='py-3 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none' aria-describedby='street-address' placeholder='Straße und Nummer' v-model='street' autocomplete='street-address')
          .grid.grid-cols-2.gap-4
            .form-group.mb-6
              input.form-control.block.w-full.px-3.text-base.font-normal.text-black.bg-white.bg-clip-padding.border.border-solid.border-gray-600.rounded.transition.ease-in-out.m-0(type='text' class='py-3 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none' aria-describedby='zipCode' name='zip' id='zip' placeholder='Postleitzahl' v-model='zip' autocomplete='postal-code')
            .form-group.mb-6
              input.form-control.block.w-full.px-3.text-base.font-normal.text-black.bg-white.bg-clip-padding.border.border-solid.border-gray-600.rounded.transition.ease-in-out.m-0(type='text' class='py-3 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none' aria-describedby='city' placeholder='Ort' v-model='city')    
          .form-group.mb-6
            input.form-control.block.w-full.px-3.text-base.font-normal.text-black.bg-white.bg-clip-padding.border.border-solid.border-gray-600.rounded.transition.ease-in-out.m-0(type='email' class='py-3 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none' aria-describedby='email' placeholder='Email' v-model='email' autocomplete='email')
          .form-group.mb-6
            input.form-control.block.w-full.px-3.text-base.font-normal.text-black.bg-white.bg-clip-padding.border.border-solid.border-gray-600.rounded.transition.ease-in-out.m-0(type='tel' class='py-3 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none' aria-describedby='phone' placeholder='Telefonnumer' v-model='phone'  autocomplete='tel')
        
    .flex-1.content-center.justify-start
      .block.p-6.max-w-max
        .container.mx-auto.flex.flex-wrap.items-center
          .flex.content-center.justify-start.font-bold.text-xl(class='w-1/2')
            | Gesamt (inkl. MwSt.) 
          .flex.content-center.justify-end.font-bold.text-3xl(class='w-1/2')  
            | {{priceTotal}}
        span.font-light.text-xs.pt-5 Richtpreis. Jedes Stück wird vom Fleischermeister per Hand geschnitten und kann somit im Gewicht variieren.
        fieldset
          legend.sr-only Checkbox variants
          .flex.items-center.mb-4.pt-10
            input#checkbox-2.w-4.h-4.text-gray-600.bg-gray-100.border-gray-300.rounded(v-model='gdpr' type='checkbox' class='focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600')
            label.ml-2.text-sm.font-medium.text-gray-900(for='checkbox-2' class='dark:text-gray-300')
              | Ich habe die zur 
              a.text-gray-600(href='#' class='hover:underline dark:text-gray-500') Datenschutzbestimmungen 
              | Kenntnis genommen.
        .flex.justify-center
          button.px-5.mr-2.text-xl.text-white.bg-black.rounded-lg.border.border-black.inline-flex.items-center(type='button' @click='sendOrder()' class='hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black py-3') 
            span.w-6.h-6.mr-2.flex
              svg.inline.w-6.h-6.mr-2.text-white.animate-spin(v-show='isSending' role='status' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg' )
                path(d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor')
                path(d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='#1C64F2')
            span.mr-4 Vorbestellung Absenden



                

  //.flex.flex-col
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
                  | {{product.title}}F
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
            tbody  
              tr.bg-white.border-b(v-show='cartCount == 0')
                td(colspan=5).text-xs.text-gray-700.font-light.px-6.py-2.whitespace-nowrap.text-center
                  | (Keine Einträge)
            tbody  
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
import axios from 'axios';


export default {
  data() {
    return {
      isSending : false,
      firstname: '',
      lastname: '',
      street: '',
      zip: '',
      city: '',
      phone: '',
      email: '',
      gdpr: false,
    }
  },
  props: {
  },
  computed: {
    cartCount () {
      return this.$store.state.cart.length;
    },
    cart () {
      return this.$store.state.cart;
    },
    priceLine() {
      return (price, unit) => {
        return this.formatPrice(price * unit);
      }
    },
    priceLineTotal() {
      return (price, quantity, unit) => {
        return this.formatPrice(price * quantity * unit);
      }
    },
    priceTotal() {
      return this.formatPrice(this.$store.getters.getCart.map( el => (el.priceRaw * el.quantity * el.unit) )
                        .reduce(
                          (previousValue, currentValue) => previousValue + currentValue,
                          0));
    }
  },
  methods: {
    isFormValid  : function () {
      var errors = [];
    
      if(this.firstname.length < 2){
        this.$toast.error("Vorname fehlt!");
        return false;
      }
      if(this.lastname.length < 2) {
        this.$toast.error("Nachname fehlt!");
        return false;
      }
      if(this.street.length < 1) {
        this.$toast.error("Straßen und Nummer fehlen!");
        return false;
      }
      if(this.zip.length < 2) {
        this.$toast.error("PLZ fehlt!")
        return false;
      }
      if(this.city.length < 2) {
        this.$toast.error("Ort fehlt!");
        return false;
      }
      if(this.email.length < 2) {
        this.$toast.error("Email fehlt!");
        return false;
      }
      if(this.phone.length < 2) {
        this.$toast.error("Telefonnumer fehlt!");
        return false;
      }
      if(!this.gdpr) {
        this.$toast.error("Die Datenschutzbestimmungen wurden nicht akzeptiert!");
        return false;
      }
      

      if(this.$store.getters.getCart.length == 0) {
        this.$toast.error("Keine Vorbestellungen vorhanden!");
        return false;
      }
      
      return true;
    },
    sendOrder : function () {
      if(!this.isFormValid())
        return;
      
      var vm = this;
      this.isSending=true;
      axios.post(process.env.storeUrl + '/api/orderproducts', {
        data: {
        firstname: vm.firstname,
        lastname: vm.lastname,
        street: vm.street,
        zipcode: vm.zip,
        city: vm.city,
        phone: vm.phone,
        email: vm.email,
        order: vm.$store.getters.getCart,
      }})
      .then(function (response) {
        console.log(response);
        vm.isSending = false;
        vm.$toast.success(`Die Vorbestellung wurde erfolgreich übermittelt.`,{timeout: 5000});
        vm.$store.dispatch('clearCart');
        vm.$router.push('/danke');

      })
      .catch(function (error) {
        console.error(error);
        vm.isSending = false;
        vm.$toast.error(`Fehler beim Übermitteln der Vorbestellung`);
      });
    },
    removeCart : function (index) {
      this.$store.dispatch('removeFromCart', index)
    },
    onChangeQuantity: function (e, idx) {
      this.$store.dispatch('updateQuantity', {value: e.target.value, index : idx});
    },
    onChangeUnit: function (e, idx) {
      this.$store.dispatch('updateUnit', {value: e.target.value, index : idx});
    },
  },
  components : {
    Trash,
    Counter,
  }
}
</script>