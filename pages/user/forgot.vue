<template lang="pug">
  .max-w-md.w-full.mx-auto.mt-8
    h1.text-3xl.font-extrabold.mb-4 Neues Passwort
    form(@submit.prevent='userPassword')
      .p-4.mb-4.text-base.text-red-700.bg-red-100.rounded-lg(v-if='err' class='dark:bg-red-200 dark:text-red-800' role='alert')
        | {{ err }}
      .mb-6
        label.block.mb-2.text-base.font-medium.text-gray-900(for='email' class='dark:text-gray-300') Email
        input.p-3.shadow-sm.bg-gray-50.border.border-gray-300.text-gray-900.text-base.rounded-lg.block.w-full(v-model='email' type='email' class='focus:ring-gray-500 focus:border-gray-500 p-2.5 ' placeholder='Email' required='')
      .mb-6
        button.p-3.text-white.bg-black.border.border-black.font-medium.rounded-lg.text-base.px-5.text-center.w-full(type='submit' class='hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-gray-300 py-2.5')
          | Neues Passwort
</template>

 <script>
    export default {
      layout: 'admin',
      auth: 'guest',
      data() {
        return {
          err: null,
          email: '',
        }
      },
      methods: {
        async userPassword() {
          try {
            await this.$axios.post('auth/forgot-password', {
              email: this.email,
            })
          } catch (e) {
            if (e.response) this.err = e.response.data.error.message
          }
        },
      },
    }
</script>