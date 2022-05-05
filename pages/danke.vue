<template lang="pug">
  div
    InfoBlock.p-5(id="liste" ,title="Danke" ,subtitle="Liefertermin 19. Mai 2022", text="Danke für deine Vorbestellung. Du erhältst die Infos zu diner Vorbestellung per Mail bla bla bla. Der Gesamtpreis kann variieren. Es wird nach tatsächlichen Gewicht abgewogen. Jedes Stück wird per Hand vom Fleischermeister geschnitten.")
    ImgBlock( image="PEMBEEF_bg_Sonnenuntergang.jpg")
</template>

<script>
import InfoBlock from "../components/intro/infoblock.vue"
import ImgBlock from "./../components/intro/imgblock.vue"

export default {
  layout: 'danke',
  data() {
    return {
    }
  },
  methods: {
	},
  components: {
    InfoBlock,
    ImgBlock,
  }
}
</script>