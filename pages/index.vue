<template lang="pug">
  div
    InfoBlock(id="philosophie" ,title="Unsere Philosophie" ,subtitle="Wofür stehen wir ...", text="Der Biobauernhof Pemperreith im südlichen Waldviertel besteht seit 1815. Um Qualitätsfleisch zu erzeugen, haben wir uns vor mehr als 25 Jahren für die biologische Wirtschaftsweise und artgerechte Weidehaltung entschieden. Die Weidehaltung, als natürlichste aller Haltungsformen, wirkt sich positiv auf die Gesundheit der Tiere aus und garantiert beste Fleischqualität. Auf den Zukauf von Futtermittel wie etwa Soja oder Mais wird gänzlich verzichtet. Wir haben uns für diese Arbeitsweise entschieden, um unseren Tieren ein schönes, gesundes und artgerechtes Leben zu ermöglichen.")
    ImgBlock(title="Unsere Rinder sind auf der Weide…" ,subtitle="…wo sonst?", image="PEMBEEF_bg_Weide.jpg")
    InfoBlock(id="rinder" ,title="Unsere Rinder" ,subtitle="PEMBEEF Rinder ...", text="Die Jungrinder auf der Pemperreith wachsen in Mutterkuhhaltung beim Muttertier auf. Im Herdenverband leben die PEMBEEF Jungrinder auf der Weide und können das Bergpanorama vom Ötscher bis zum Traunstein genießen. Sie fressen saftiges Gras und neben der Muttermilch setzt sich das Bio-Futterangebot aus Heu, Silage und Getreide zusammen. Im Winter und bei schlechten Wetterbedingungen haben die Tiere freien Zugang zum Freilaufstall mit Raum für Bewegung in einer Auslauffläche. Im Alter von ca. 12 bis 18 Monaten werden die Weide-Jungrinder dem regionalen Fleischermeister übergeben und sind nach idealer Reifezeit in höchster Qualität verfügbar.")
    ImgBlock(title="Stier Toni…" ,subtitle="…sorgt für Nachwuchs!", image="PEMBEEF_bg_Stier_Toni.jpg")
</template>

<script>
import InfoBlock from "./../components/intro/infoblock.vue"
import ImgBlock from "./../components/intro/imgblock.vue"

export default {
  layout: 'intro',
  data() {
    return {
    }
  },
  async mounted() {
  },
  components: {
    InfoBlock,
    ImgBlock,    
  }
}
</script>