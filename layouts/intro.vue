<template lang="pug">
div
  ToolBar
  NavBar
  Slider
  nuxt
  Footer
</template>

<script>
import ToolBar from './../components/Header/Toolbar'
import NavBar from './../components/Header/Navbar'
import Slider from './../components/intro/slider'
import Footer from './../components/Footer'

export default {
  components: {
    ToolBar,
    NavBar,
    Footer,
    Slider,
  }
}
</script>
