<template>
<div>
  <header>
    <ToolBar />
    <NavBar />
  </header>
  <IntroSlider />
  <div class="flex justify-center bg-white">
    <div class="max-w-screen-lg flex flex-col min-h-screen w-full">    
      <Buttons />    
      <Nuxt class="flex-grow" />    
    </div>  
  </div>
<Footer />
</div>
</template>

<script>
import ToolBar from './../components/Header/Toolbar'
import NavBar from './../components/Header/Navbar'
import Footer from './../components/Footer'
import Buttons from './../components/Buttons'
import IntroSlider from './../components/Introslider'

export default {
  components: {
    ToolBar,
    NavBar,
    Footer,
    Buttons,
    IntroSlider    
  }
}
</script>
