<template lang="pug">
  .top-0.sticky.bg-white.border-b.border-gray-400.z-50
      .max-w-screen-lg.mx-auto.flex.flex-wrap
        .flex-1
          .flex.justify-left.space-x-2.p-1
            a(href="https://www.facebook.com/pembeef/" target="_blank")
              Facebook
            a(href="https://www.instagram.com/pembeef/" target="_blank")
              Instagram
            a(href="https://www.youtube.com/channel/UC4Bdm4_-awymcXiXZRw5X5w" target="_blank")
              Youtube
            a(href="https://wa.me/4369981758949" target="_blank")
              WhatsApp
            a(href="https://www.google.com/maps/place/PEMBEEF/@47.6964719,13.3457582,7z/data=!4m5!3m4!1s0x0:0xb870827d3b4fb77c!8m2!3d47.6964719!4d13.3457582" target="_blank")
              GoogleMaps
        .flex.pr-5.p-1
          a(href='#')
            cart
        
</template>

<script>
import Instagram from "~/components/icons/instagram.vue";
import Facebook from "~/components/icons/facebook.vue";
import WhatsApp from "~/components/icons/whatsapp.vue";
import Youtube from "~/components/icons/youtube.vue";
import GoogleMaps from "~/components/icons/maps.vue";
import Cart from "~/components/icons/cart.vue";

export default {
  components: {    
    Instagram,
    Facebook,
    WhatsApp,
    Youtube,
    GoogleMaps,
    Cart
  }
}
</script>