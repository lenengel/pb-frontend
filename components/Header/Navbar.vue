<template lang="pug">
header
  nav.w-full.bg-gray-100.p-2.border-b.border-gray-400.shadow.z-10
    .max-w-screen-lg.container.mx-auto.flex.flex-wrap.items-center.font-sans.text-xl
      .flex.w-full.justify-center(class='md:w-1/2 md:justify-start')
        nuxt-link(to='/')
          span.emoji
            img.logo(src='~/assets/pembeef_header_logo.svg', height='80', width='80')
      .flex.w-full.pt-2.content-center.justify-between(class='md:w-1/2 md:justify-end')
        ul.list-reset.flex.justify-between.flex-1.items-center(class='md:flex-none')
          li.mr-3
            a.inline-block.py-2.px-4.text-black.no-underline(href='/vorbestellen') Vorbestellen
          li.mr-3
            a.inline-block.text-black.no-underline.py-2.px-4(class='hover:text-gray-800 hover:text-underline', href='/#philosophie') Philosophie
          li.mr-3
            a.inline-block.text-black.no-underline.py-2.px-4(class='hover:text-gray-800 hover:text-underline', href='/#rinder') Rinder
</template>

<script>
export default {
  components: {
  }
}
</script>

<style>
html {
    scroll-behavior: smooth;
 }
</style>