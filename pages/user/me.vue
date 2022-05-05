<template lang="pug">
.max-w-md.w-full.mx-auto.mt-8
  h1.text-3xl.font-extrabold.mb-4 Dein Profil
  form(@submit.prevent='userLogin')
    .mb-6
      label.block.mb-2.text-base.font-medium.text-gray-900(for='email' class='dark:text-gray-300') Your email
      input.p-3.mb-6.bg-gray-100.border.border-gray-300.text-gray-900.text-base.rounded-lg.block.w-full.cursor-not-allowed(type='email' class='focus:ring-gray-500 focus:border-gray-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-gray-500 dark:focus:ring-gray-500 dark:focus:border-gray-500' :value='loggedInUser.email' disabled='')
    .mb-6
      label.block.mb-2.text-base.font-medium.text-gray-900(for='username' class='dark:text-gray-300') Your username
      input.p-3.mb-6.bg-gray-100.border.border-gray-300.text-gray-900.text-base.rounded-lg.block.w-full.cursor-not-allowed(type='text' class='focus:ring-gray-500 focus:border-gray-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-gray-500 dark:focus:ring-gray-500 dark:focus:border-gray-500' :value='loggedInUser.username' disabled='')
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    layout: 'admin',
    middleware: 'auth',
    computed: {
    ...mapGetters(['loggedInUser']),
    },
}
</script>