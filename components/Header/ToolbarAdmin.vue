<template lang="pug">
nav.bg-black.px-2.mt-0.fixed.w-full.z-10.top-0.h-15
  .container.mx-auto.flex.flex-wrap.items-center(class="lg:max-w-screen-lg")
    .flex.pt-2.content-center.justify-start(class='w-1/3')
      ul.list-reset.flex.flex-1.items-center(class='md:flex-none')
        li.mr-1
          | 
    .flex.pt-2.content-center.justify-end(class='w-2/3')
      .flex.justify-end
        .py-4.px-4
          NuxtLink.cursor-pointer.text-white.p-2(class='hover:bg-white hover:text-black' to='/admin') PORTAL
          NuxtLink.cursor-pointer.text-white.p-2(v-if='!isAuthenticated' class='hover:bg-white hover:text-black' to='/user/login') Login
          NuxtLink.cursor-pointer.text-white.p-2(v-if='!isAuthenticated' class='hover:bg-white hover:text-black' to='/user/register') Registrieren
          NuxtLink.cursor-pointer.text-white.p-2(v-if='isAuthenticated' class='hover:bg-white hover:text-black' to='/user/me') Profil
          a.text-white.cursor-pointer.p-2(v-if='isAuthenticated' class='hover:bg-white hover:text-black' href='/' @click.prevent='userLogout') Logout

</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['isAuthenticated']),
    },
    methods: {
      async userLogout() {
        await this.$auth.logout()
      },
    },
  }
</script>
