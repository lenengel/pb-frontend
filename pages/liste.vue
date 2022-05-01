<template lang="pug">
div
  InfoBlock(id="liste" ,title="Deine Vorbestellung" ,subtitle="Liefertermin 19. Mai 2022", text="Infotext zur Vorbestellung. Deine Vorbestellung wird im Liefergebiet zugestellt. Außerhalb des Liefergebietes ??? Der Gesamtpreis kann variieren. Es wird nach tatsächlichen Gewicht abgewogen. Jedes Stück wird per Hand vom Fleischermeister geschnitten.")
  Cart
  .pb-10
  OrderInfo
  .pb-20
</template>

<script>
import Cart from "../components/Cart.vue"
import InfoBlock from "../components/intro/infoblock.vue"
import OrderInfo from "../components/OrderInfo.vue"

export default {
  data() {
    return {
    }
  },
  methods: {
	},
  components: {
    Cart,
    InfoBlock,
    OrderInfo,
  }
}
</script>