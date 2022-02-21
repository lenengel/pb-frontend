<template>
<div>
	<nav class="bg-gray-100 p-2 mt-8 w-full  border-t border-b border-gray-400 font-sans text-xl"> <!-- Add this to make the nav fixed: "fixed z-10 top-0" -->
		<div class="max-w-screen-lg container mx-auto flex flex-wrap items-center">
			<div class="flex w-full md:w-1/2 justify-center md:justify-start">
        <nuxt-link to="/">
          <span class="emoji">
            <img src="~/assets/pembeef_header_logo.svg" class="logo" height="80" width="80" />
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
				</ul>
        <div class="ml-20">
          <a href="#">
            <Cart />
          </a>
        </div>
        
			</div>
		</div>
	</nav>
</div>
</template>

<script>
import Cart from "~/components/icons/cart.vue";

export default {
  components: {
    Cart
  }
}
</script>

<style>
</style>
