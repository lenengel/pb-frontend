<template lang="pug">
  .top-0
      .max-w-screen-lg.mx-auto.flex.justify-left.space-x-2.text-gray-700.p-1
        a(href="https://www.facebook.com/pembeef/" target="_blank")
          Facebook
        a(href="https://www.instagram.com/pembeef/" target="_blank")
          Instagram
        a(href="http://dobedone.at" target="_blank")
          Youtube
        a(href="http://dobedone.at" target="_blank")
          WhatsApp
</template>

<script>
import Instagram from "~/components/icons/instagram.vue";
import Facebook from "~/components/icons/facebook.vue";
import WhatsApp from "~/components/icons/whatsapp.vue";
import Youtube from "~/components/icons/youtube.vue";

export default {
  components: {    
    Instagram,
    Facebook,
    WhatsApp,
    Youtube
  }
}
</script>