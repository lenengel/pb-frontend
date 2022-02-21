<template>
<div>
<NavBar />
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
import NavBar from './../components/Navbar'
import Footer from './../components/Footer'
import Buttons from './../components/Buttons'
import IntroSlider from './../components/Introslider'

export default {
  components: {
    NavBar,
    Footer,
    Buttons,
    IntroSlider    
  }
}
</script>
