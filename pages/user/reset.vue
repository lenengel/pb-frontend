<template lang="pug">
  .max-w-md.w-full.mx-auto.mt-8
    h1.text-3xl.font-extrabold.mb-4 New password
    form(@submit.prevent='userPassword')
      .p-4.mb-4.text-base.text-red-700.bg-red-100.rounded-lg(v-if='err' class='dark:bg-red-200 dark:text-red-800' role='alert')
        | {{ err }}
      .p-4.mb-4.text-base.text-green-700.bg-green-100.rounded-lg(v-if='success' class='dark:bg-green-200 dark:text-green-800' role='alert')
        | Your password has been updated successfully you can now
        nuxt-link.font-medium(to='/user/login') Login
      .mb-6
        label.block.mb-2.text-base.font-medium.text-gray-900(for='password' class='dark:text-gray-300') New password
        input.shadow-sm.bg-gray-50.border.border-gray-300.text-gray-900.text-base.rounded-lg.block.w-full(v-model='password' type='password' class='focus:ring-gray-500 focus:border-gray-500 p-2.5 ' required='')
      .mb-6
        label.block.mb-2.text-base.font-medium.text-gray-900(for='password-confirmation' class='dark:text-gray-300') Confirm new password
        input.shadow-sm.bg-gray-50.border.border-gray-300.text-gray-900.text-base.rounded-lg.block.w-full(v-model='passwordConfirmation' type='password' class='focus:ring-gray-500 focus:border-gray-500 p-2.5 ' required='')
      .mb-6
        button.text-white.bg-black.border.border-black.font-medium.rounded-lg.text-base.px-5.text-center.w-full(type='submit' class='hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-gray-300 py-2.5')
          | New password

</template>

  <script>
    export default {
      layout: 'admin',
      auth: 'guest',
      data() {
        return {
          success: false,
          err: null,
          password: '',
          passwordConfirmation: '',
        }
      },
      methods: {
        async userPassword() {
          try {
            await this.$axios.post('auth/reset-password', {
              code: this.$route.query.code,
              password: this.password,
              passwordConfirmation: this.passwordConfirmation,
            })
            this.success = true
          } catch (e) {
            if (e.response) this.err = e.response.data.error.message
          }
        },
      },
    }
    </script>