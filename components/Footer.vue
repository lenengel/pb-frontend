<template lang="pug">
  footer.text-center.bg-gray-100.text-gray-600(class='lg:text-left')
    .mx-6.py-10.text-center(class='md:text-left')
      .grid.grid-1.gap-8(class='md:grid-cols-2 lg:grid-cols-4')
        //div
          //h6.uppercase.font-semibold.mb-4.flex.items-center.justify-center(class='md:justify-start')
            | Newsletter
          //p
            | Ich m&ouml;chte den n&auml;chsten Liefertermin per Mail erhalten.           
            .pt-4(class='md:mb-6')
              input#exampleFormControlInput1.form-control.block.w-full.px-3.text-base.font-normal.text-gray-700.bg-white.bg-clip-padding.border.border-solid.border-gray-300.rounded.transition.ease-in-out.m-0(type='text' class='py-1.5 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' placeholder='Email Adresse')
            .(class='md:mb-6')
              button.inline-block.px-6.py-2.border-2.bg-gray-200.font-medium.text-xs.leading-tight.uppercase.rounded.transition.duration-150.ease-in-out(type='submit' class='hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-0')
                | Subscribe
        div
          h6.uppercase.font-semibold.mb-4.flex.justify-center(class='md:justify-start')
            | &Uuml;ber uns
          p.mb-4
            a.text-gray-600(href='#!') Der Bauer
          p.mb-4
            a.text-gray-600(href='#!') Rinder
          p.mb-4
            a.text-gray-600(href='#!') Philosophie
          p
            a.text-gray-600(href='#!') Geschichte
        div
          h6.uppercase.font-semibold.mb-4.flex.justify-center(class='md:justify-start')
            | PEMBEEF
          p.mb-4
            a.text-gray-600(href='#!') Produkte
          p.mb-4
            a.text-gray-600(href='#!') Versand
          p.mb-4
            a.text-gray-600(href='#!') H&auml;ufige Fragen
        div
          h6.uppercase.font-semibold.mb-4.flex.justify-center(class='md:justify-start')
            | Contact
          p.flex.items-center.justify-center.mb-4(class='md:justify-start')
            svg.w-4.mr-4(aria-hidden='true' focusable='false' data-prefix='fas' data-icon='home' role='img' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 576 512')
              path(fill='currentColor' d='M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z')
            |           Pemperreith 4, 3681 Hofamt Priel
          p.flex.items-center.justify-center.mb-4(class='md:justify-start')
            svg.w-4.mr-4(aria-hidden='true' focusable='false' data-prefix='fas' data-icon='envelope' role='img' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512')
              path(fill='currentColor' d='M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z')
            |           info@pembeef.at
          p.flex.items-center.justify-center.mb-4(class='md:justify-start')
            svg.w-4.mr-4(aria-hidden='true' focusable='false' data-prefix='fas' data-icon='phone' role='img' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512')
              path(fill='currentColor' d='M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z')
            |           + 43 699 81758949
    .text-center.p-6.bg-gray-200
      span &copy; 2022 Copyright:
      a.text-gray-600.font-semibold(href='https://pembeef.com/') PEMBEEF
</template>

<script>

export default {
  components: {    
  }
}
</script>

<style>
.emoji {
  font-size: 30px;
}
</style>
