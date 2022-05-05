<template lang="pug">
nav.bg-black.px-2.mt-0.fixed.w-full.z-10.top-0.h-10
  .container.mx-auto.flex.flex-wrap.items-center(class="lg:max-w-screen-lg")
    .flex.pt-2.content-center.justify-start(class='w-1/3')
      ul.list-reset.flex.flex-1.items-center(class='md:flex-none')
        li.mr-1
          a(href="https://www.facebook.com/pembeef/" target="_blank")
            Facebook
        li.mr-2
          a(href="https://www.instagram.com/pembeef/" target="_blank")
            Instagram
        li.mr-2
          a(href="https://www.youtube.com/channel/UC4Bdm4_-awymcXiXZRw5X5w" target="_blank")
            Youtube
        li.mr-2
          a(href="https://wa.me/4369981758949" target="_blank")
            WhatsApp
        li.mr-1
          a(href="https://www.google.com/maps/place/PEMBEEF/@47.6964719,13.3457582,7z/data=!4m5!3m4!1s0x0:0xb870827d3b4fb77c!8m2!3d47.6964719!4d13.3457582" target="_blank")
            GoogleMaps
    .flex.pt-2.content-center.justify-end(class='w-2/3')
      .flex.justify-end
          a(href='/liste')
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