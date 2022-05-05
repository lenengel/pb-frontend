<template lang="pug">
div
  ToolBar
  NavBar
  .flex.justify-center.bg-white
    .flex.flex-col.w-full(class="lg:max-w-screen-lg")
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
