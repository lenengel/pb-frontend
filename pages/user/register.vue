<template lang="pug">
  .max-w-md.w-full.mx-auto.mt-8
    h1.text-3xl.font-extrabold.mb-4 Sign up
    form(@submit.prevent='userRegister')
      .p-4.mb-4.text-base.text-red-700.bg-red-100.rounded-lg(v-if='err' class='dark:bg-red-200 dark:text-red-800' role='alert')
        | {{ err }}
      .p-4.mb-4.text-base.text-green-700.bg-green-100.rounded-lg(v-if='success' class='dark:bg-green-200 dark:text-green-800' role='alert')
        | Dein Account wurde erfolgreich erstellt.
        br
        nuxt-link.font-medium(to='/user/login') Login
      .mb-6
        label.block.mb-2.text-base.font-medium.text-gray-900(for='username' class='dark:text-gray-300') Name
        input.p-3.shadow-sm.bg-gray-50.border.border-gray-300.text-gray-900.text-base.rounded-lg.block.w-full(v-model='username' type='text' class='focus:ring-gray-500 focus:border-gray-500 p-2.5 ' placeholder='Name' required='')
      .mb-6
        label.block.mb-2.text-base.font-medium.text-gray-900(for='email' class='dark:text-gray-300') Email
        input.p-3.shadow-sm.bg-gray-50.border.border-gray-300.text-gray-900.text-base.rounded-lg.block.w-full(v-model='email' type='email' class='focus:ring-gray-500 focus:border-gray-500 p-2.5 ' placeholder='Email' required='')
      .mb-6
        label.block.mb-2.text-base.font-medium.text-gray-900(for='password' class='dark:text-gray-300') Passwort
        input.p-3.shadow-sm.bg-gray-50.border.border-gray-300.text-gray-900.text-base.rounded-lg.block.w-full(v-model='password' type='password' class='focus:ring-gray-500 focus:border-gray-500 p-2.5 ' required='')
      .mb-6
        button.text-white.bg-black.font-medium.rounded-lg.border.border-black.text-xl.px-5.text-center.w-full(type='submit' class='hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-black py-3')
          | Registrieren

</template>

<script>
export default {
  layout: 'admin',
  auth: 'guest',
  data() {
    return {
      success: false,
      err: null,
      username: '',
      email: '',
      password: '',
    }
  },
  methods: {
    async userRegister() {
      try {
        this.$axios.setToken(false)
        await this.$axios.post('auth/local/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.success = true
      } catch (e) {
        if (e.response) this.err = e.response.data.error.message
      }
    },
  },
}
</script>