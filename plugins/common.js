import Vue from 'vue'

Vue.mixin({
  methods: {
    formatPrice (value) {
      return (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value));
    }
  }
})