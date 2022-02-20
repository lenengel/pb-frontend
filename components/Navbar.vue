<template>
<div>
	<nav class="bg-gray-100 p-2 mt-8 w-full  border-t border-b border-gray-400 font-sans text-xl"> <!-- Add this to make the nav fixed: "fixed z-10 top-0" -->
		<div class="max-w-screen-lg container mx-auto flex flex-wrap items-center">
			<div class="flex w-full md:w-1/2 justify-center md:justify-start">
        <nuxt-link to="/">
          <span class="emoji">
            <img src="~/assets/pembeef_header_logo.svg" class="logo" height="120" width="120" />
          </span>
        </nuxt-link>
			</div>
			<div class="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
				<ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
					<li class="mr-3">
						<a class="inline-block py-2 px-4 text-black no-underline" href="#">Shop</a>
					</li>
					<li class="mr-3">
						<a class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#">Philosophie</a>
					</li>
					<li class="mr-3">
						<a class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#">Unsere Rinder</a>
					</li>
					<li class="mr-3">
						<a class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#">Kontakt</a>
					</li>
          <li>
            
          </li>
				</ul>
        <div class="ml-20">
          <svg class="h-8 w-8 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="9" cy="21" r="1" />  <circle cx="20" cy="21" r="1" />  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
        </div>
        
			</div>
		</div>
	</nav>
</div>
</template>


<script>
import Cart from "./icons/cart.vue"

export default {
  components: {
    Cart
  }
}
</script>

<style>

.pb-header {
  border-top: 1px solid rgba(0,0,0,.1);
  border-bottom: 1px solid rgba(0,0,0,.1);
  background-color: rgb(244, 244, 244)
}
</style>
