<template lang="pug">
div.bg-gray-100.py-2.border-b.border-gray-400.px-2.shadow.mt-10(class='sm:px-4 py-2.5') 
  .container.flex.flex-wrap.justify-between.items-center.mx-auto.font-sans(class="lg:max-w-screen-lg")
    a.flex.justify-center.w-full(href='/' class='md:w-1/2 md:justify-start')
      img.mr-3.h-20(src='~/assets/pembeef_header_logo.svg' alt='PEMBEEF Logo')
    .w-full(class='md:block md:w-auto')
      ul.flex.flex-row.mt-4.text-lg.justify-center.w-full(class='lg:text-xl')
        li.mr-3
          a.inline-block.py-2.px-4.text-black.no-underline(href='/vorbestellen') Vorbestellen
        li.mr-3
          a.inline-block.text-black.no-underline.py-2.px-4(class='hover:text-gray-800 hover:text-underline', href='/#philosophie') Philosophie
        li.mr-3
          a.inline-block.text-black.no-underline.py-2.px-4(class='hover:text-gray-800 hover:text-underline', href='/#rinder') Rinder

  //nav.bg-gray-100.pt-2.border-b.border-gray-400.shadow.z-10
    .container.mx-auto.items-center.font-sans
      .flex.justify-center(class='md:w-1/2 md:justify-start')
        nuxt-link(to='/')
          span.emoji
            img.logo(src='~/assets/pembeef_header_logo.svg', height='80', width='80')
      .flex.pt-2.content-center.justify-between(class='md:w-1/2 md:justify-end')
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
</style>