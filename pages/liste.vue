<template lang="pug">
div
  InfoBlock(id="liste" ,title="Deine Vorbestellung" ,subtitle="Liefertermin 19. Mai 2022", text="Jedes Stück wird per Hand vom Fleischermeister geschnitten und kann im Gewicht variieren, der Gesamtpreis ist ein Richtpreis und wird bei der Auslieferung nach dem tatsächlichen Gewicht berechnet.")
  Cart.px-5
  .pb-20
</template>

<script>
import Cart from "../components/Cart.vue"
import InfoBlock from "../components/intro/infoblock.vue"

export default {
  transition: 'fade',
  data() {
    return {
    }
  },
  methods: {
	},
  components: {
    Cart,
    InfoBlock,
  }
}
</script>