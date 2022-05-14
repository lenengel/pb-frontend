<template lang="pug">
div
  InfoBlock.p-5(id="liste" ,title="Danke" ,subtitle="Liefertermin 19. Mai 2022", text="Danke für deine Vorbestellung, du wirst persönlich über die Lieferung informiert. ")
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