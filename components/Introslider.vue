<template>
 <!-- Background image   
   <div
    class="p-12 text-center relative overflow-hidden bg-no-repeat bg-cover lg:h-screen text-focus-in"
    style="background-image: url('/PEMBEEF_Header_Lukas_Enengel.jpg');"
  >
 -->
 <div
  class="p-12 text-center relative overflow-hidden bg-no-repeat bg-cover rounded-lg"
  style="
    background-image: url('/PEMBEEF_Header_Lukas_Enengel.jpg');
    height: 800px;
  "
>

    <div
      class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
      style="background-color: rgba(0, 0, 0, 0.3)"
    >
      <div class="grid grid-cols-1 justify-center items-center h-full">
        <div class="mb-5 content-center">
            <img class="text-focus-in justify-center tracking-widest" src="/pembeef-header-logo.png" width="180" height="180">
        </div>
        <div class="text-white w-full"> 
          <h1 class="font-black tracking-widest text-4xl mb-20 text-focus-in-2 uppercase">Bio Rindfleisch aus Weidehaltung</h1>
          <p class="font-serif tracking-widest mb-6 anim-typewriter line-1">Da RIND mir das Wasser im Mund zusammen...</p>
          <a
            class=" text-focus-in-7 inline-block px-7 py-3 mb-1 pl-3 pr-3  bg-white text-black font-semibold leading-snug uppercase rounded hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            href="#!"
            role="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            >MEHR ERFAHREN</a
          >
        </div>
      </div>
    </div>
  </div>
  <!-- Background image -->
</template>

<script>
</script>

<style>
.text-focus-in{-webkit-animation:text-focus-in 1s; animation:text-focus-in 1s}
.text-focus-in-2{-webkit-animation:text-focus-in 1s cubic-bezier(.55,.085,.68,.53) 2s both;animation:text-focus-in 1s cubic-bezier(.55,.085,.68,.53) 2s both}
.text-focus-in-3{-webkit-animation:text-focus-in 1s cubic-bezier(.55,.085,.68,.53) 3s both;animation:text-focus-in 1s cubic-bezier(.55,.085,.68,.53) 3s both}
.text-focus-in-7{-webkit-animation:text-focus-in 1s cubic-bezier(.55,.085,.68,.53) 7s both;animation:text-focus-in 1s cubic-bezier(.55,.085,.68,.53) 7s both}
.line-1{
    position: relative;
    top: 50%;  
    width: 26em;
    margin: 0 auto;
    border-right: 2px solid rgba(255,255,255,.75);
    font-size: 300%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    transform: translateY(-50%);    
}
.anim-typewriter{  animation: typewriter 4s steps(45) 3s 1 normal both,        blinkTextCursor 500ms steps(45) 3s 1 normal both;  }

.tracking-in-expand-fwd-bottom{-webkit-animation:tracking-in-expand-fwd-bottom 1s linear 1s both;animation:tracking-in-expand-fwd-bottom 1s linear 1s both}
.kenburns-top{-webkit-animation:kenburns-top 2s ease-out reverse both;animation:kenburns-top 2s ease-out reverse both}

@-webkit-keyframes text-focus-in{0%{-webkit-filter:blur(12px);filter:blur(12px);opacity:0}100%{-webkit-filter:blur(0);filter:blur(0);opacity:1}}@keyframes text-focus-in{0%{-webkit-filter:blur(12px);filter:blur(12px);opacity:0}100%{-webkit-filter:blur(0);filter:blur(0);opacity:1}}
@-webkit-keyframes tracking-in-expand-fwd-bottom{0%{letter-spacing:-.5em;-webkit-transform:translateZ(-700px) translateY(500px);transform:translateZ(-700px) translateY(500px);opacity:0}40%{opacity:.6}100%{-webkit-transform:translateZ(0) translateY(0);transform:translateZ(0) translateY(0);opacity:1}}@keyframes tracking-in-expand-fwd-bottom{0%{letter-spacing:-.5em;-webkit-transform:translateZ(-700px) translateY(500px);transform:translateZ(-700px) translateY(500px);opacity:0}40%{opacity:.6}100%{-webkit-transform:translateZ(0) translateY(0);transform:translateZ(0) translateY(0);opacity:1}}
@-webkit-keyframes kenburns-top{0%{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0);-webkit-transform-origin:50% 16%;transform-origin:50% 16%}100%{-webkit-transform:scale(1.25) translateY(-15px);transform:scale(1.25) translateY(-15px);-webkit-transform-origin:top;transform-origin:top}}@keyframes kenburns-top{0%{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0);-webkit-transform-origin:50% 16%;transform-origin:50% 16%}100%{-webkit-transform:scale(1.25) translateY(-15px);transform:scale(1.25) translateY(-15px);-webkit-transform-origin:top;transform-origin:top}}
@keyframes typewriter{ from{width: 0;} to{width: 26em;}}
@keyframes blinkTextCursor{  from{border-right-color: transparent;}  to{border-right-color: rgba(255,255,255,.75);}
/* Animation */

}
</style>
