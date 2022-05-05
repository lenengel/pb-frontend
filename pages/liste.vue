<template lang="pug">
div
  InfoBlock(id="liste" ,title="Deine Vorbestellung" ,subtitle="Liefertermin 19. Mai 2022", text="Infotext zur Vorbestellung. Deine Vorbestellung wird im Liefergebiet zugestellt. Außerhalb des Liefergebietes ??? Der Gesamtpreis kann variieren. Es wird nach tatsächlichen Gewicht abgewogen. Jedes Stück wird per Hand vom Fleischermeister geschnitten.")
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