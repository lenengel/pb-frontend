<template lang="pug">
  .p-12.text-center.relative.overflow-hidden.bg-no-repeat.bg-cover(style="background-image: url('/PEMBEEF_Header_Lukas_Enengel.jpg'); height: 800px;")
    .absolute.top-0.right-0.bottom-0.left-0.w-full.h-full.overflow-hidden.bg-fixed(style='background-color: rgba(0, 0, 0, 0.3)')
      .grid.grid-cols-1.justify-center.items-center.h-full
        .text-white.w-full
          h1.font-black.tracking-widest.text-5xl.text-focus-in-1 
            | BIO Rindfleisch aus Weidehaltung
          p.font-thin.tracking-widest.mb-6.text-2xl.text-focus-in-2 
            | Da RIND mir das Wasser im Mund zusammen...
          a.text-focus-in-3.inline-block.px-7.py-3.mb-1.pl-3.pr-3.bg-white.text-black.font-semibold.leading-snug.uppercase.rounded.transition.duration-150.ease-in-out(class='hover:bg-opacity-5 focus:outline-none focus:ring-0' href='/vorbestellen' role='button' data-mdb-ripple='true' data-mdb-ripple-color='light') 
            | PEMBEEF vorbestellen
</template>

<script>
</script>

<style>
.text-focus-in-1{-webkit-animation:text-focus-in 1s cubic-bezier(.55,.085,.68,.53) 0.2s both;animation:text-focus-in 1s cubic-bezier(.55,.085,.68,.53) 0.2s both}
.text-focus-in-2{-webkit-animation:text-focus-in 1s cubic-bezier(.55,.085,.68,.53) 2s both;animation:text-focus-in 1s cubic-bezier(.55,.085,.68,.53) 2s both}
.text-focus-in-3{-webkit-animation:text-focus-in 1s cubic-bezier(.55,.085,.68,.53) 3s both;animation:text-focus-in 1s cubic-bezier(.55,.085,.68,.53) 3s both}
.kenburns-top{-webkit-animation:kenburns-top 5s ease-out both;animation:kenburns-top 5s ease-out both}

@-webkit-keyframes text-focus-in{0%{-webkit-filter:blur(12px);filter:blur(12px);opacity:0}100%{-webkit-filter:blur(0);filter:blur(0);opacity:1}}@keyframes text-focus-in{0%{-webkit-filter:blur(12px);filter:blur(12px);opacity:0}100%{-webkit-filter:blur(0);filter:blur(0);opacity:1}}
@-webkit-keyframes kenburns-top{0%{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0);-webkit-transform-origin:50% 16%;transform-origin:50% 16%}100%{-webkit-transform:scale(1.25) translateY(-15px);transform:scale(1.25) translateY(-15px);-webkit-transform-origin:top;transform-origin:top}}@keyframes kenburns-top{0%{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0);-webkit-transform-origin:50% 16%;transform-origin:50% 16%}100%{-webkit-transform:scale(1.25) translateY(-15px);transform:scale(1.25) translateY(-15px);-webkit-transform-origin:top;transform-origin:top}}
</style>