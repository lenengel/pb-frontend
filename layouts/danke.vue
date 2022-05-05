<template lang="pug">
div
  ToolBar
  NavBar
  nuxt
  Footer
</template>

<script>
import ToolBar from './../components/Header/Toolbar'
import NavBar from './../components/Header/Navbar'
import Footer from './../components/Footer'

export default {
  components: {
    ToolBar,
    NavBar,
    Footer,
  }
}
</script>
