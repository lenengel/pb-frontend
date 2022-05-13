<template lang="pug">
div

  p.mt-2.text-lg.font-semibold.text-gray800 {{price}} 
  p.text-sm.font-base.text-gray-400 {{pricePerKG}} 

  .flex.pt-2.flex-row.w-full.place-content-end(v-if='units.length')
      div.text-xs.mr-2.mt-2
        | 
      select.w-18.form-select.form-select-lg.mr-2.block.px-2.py-1.text-gray-700.bg-white.border-2.border-solid.border-gray-800.rounded.h-9(v-model="quantity" aria-label='Anzahl auswählen')
        option.p-5(v-for='(stk, index) in availableUnits' :key="index" :value="stk") {{stk}}

      select.w-24.form-select.form-select-lg.mr-2.block.px-2.py-1.text-gray-700.bg-white.border-2.border-solid.border-gray-800.rounded.h-9(v-model="unit" aria-label='Variante auswählen')
        option.p-5(v-for='(unit, index) in units' :key="index" :value="index") {{unit.name}}

      button.rounded.font-bold.text-3xl.leading-none.flex.justify-center.items-center.border-2.border-gray-800.px-3.h-9(@click="addToChart(product)" v-show='addIcon' type='button' class='hover:bg-gray-200') +
  .flex.pt-2.flex-row.w-full.place-content-end(v-else)
      div.mr-2.mt-2
        | AUSVERKAUFT  
</template>

<script>
export default {
 data() {
    return {
      quantity: 1,
      unit: 0,
      price: 0,
      units: [],
      availableUnits : [],
    }
  },
  props: {
    product: Object,
    addIcon: {
      default: true,
      type: Boolean
    }
  },
  computed: {
    pricePerKG () {
      console.log(this.product);
      return `${this.formatPrice(this.product.priceRaw)} pro kg`;
    },
  },
  methods : {
    addToChart: function (product) {
      let pro = {...product};
      pro["quantity"] = this.quantity;
      pro["unit"] = this.units[this.unit].value;
      pro["availableQuantity"] -= this.units[this.unit].value * this.quantity;
      console.log(pro);
      this.$store.dispatch('updateAvailableProduct', {value: pro.availableQuantity, id : pro.id});
      this.$store.dispatch('addToCart', pro)
      this.updateUnits();
      this.updateAvailableQuantity()
      this.$toast.success(`${product.title} wurde zu deinen Vorbestellungen hinzugefügt.`);
    },
    updateUnits: function() {
      this.units = [];
      this.unit = 0;

      for(const unit of this.product.units) {
        if(this.product.availableQuantity >= unit.value)
          this.units.push({...unit})  
      }
    },
    updateAvailableQuantity: function() {
      this.availableUnits = [];
      this.quantity = 1;

      if (!this.units.length)
       return;
      let count = this.product.availableQuantity / this.units[this.unit].value;
      if (count < 1) {
        this.units.splice(this.unit ,1);
      }

      for(let i = 1; i <= count; i++) {
        if(i > 15)
          break;
        this.availableUnits.push(i);
      }

    },
    onChangeQuantity: function (e, idx) {
      //this.$store.dispatch('updateQuantity', {value: e.target.value, index : idx});
      this.$emit('updateQuantity', {value: e.target.value, index : idx}) ;
    },
    onChangeUnit: function (e, idx) {
      //this.$store.dispatch('updateUnit', {value: e.target.value, index : idx});
      this.$emit('updateUnit', {value: e.target.value, index : idx}) ;
    },
    productClicked: function (productId) {
      
    },
  },
  created() {
    if(this.product) {
      this.updateUnits();
      this.updateAvailableQuantity();
      this.price = this.formatPrice(this.units[this.unit].value * this.product.priceRaw);
      
    }
  },
  watch : {
    'unit'(value) {
      if(!this.units.length)
        return;
      this.updateAvailableQuantity();
      this.price = this.formatPrice(this.units[value].value * this.product.priceRaw);
    }
  }
}
 </script>


<style>
</style>