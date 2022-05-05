export default {
  target: 'static',
  head: {
    title: "PEMBEEF | BioBauernhof Pemperreith",
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: "PEMBEEF BIO Rindfleisch"
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Old+Standard+TT&family=Questrial&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap",
      }, 
    ],
  },
  css: [],
  plugins: [
     { src: '~/plugins/persistedState.client.js' },
     { src: '~/plugins/axios.js'},
  ],
  components: true,
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],
  modules: [
    '@nuxtjs/strapi', 
    '@nuxtjs/auth-next',
    '@nuxtjs/axios', 
    'vue-toastification/nuxt'
  ],
  toast: {
    timeout: 2000,
    closeOnClick: false,
    position: "top-center",
    hideProgressBar: true,
  },
  axios: {
    baseURL: (process.env.NODE_ENV == 'production') ? 'https://strapi-4n8f.onrender.com/api' : 'http://localhost:1337/api',
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'jwt',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {
            url: 'auth/local',
            method: 'post',
          },
          user: {
            url: 'users/me',
            method: 'get',
          },
          logout: false,
        },
      },
    },
    redirect: {
      login: '/user/login',
      logout: '/',
      callback: '/user/login',
      home: '/'
    },
  },
  strapi: {
    url: (process.env.NODE_ENV == 'production') ? 'https://strapi-4n8f.onrender.com/api' : 'http://localhost:1337/api',
    entities: [
      'products',
      'categories'
    ],
  },
  env: {
    storeUrl: (process.env.NODE_ENV == 'production') ? 'https://strapi-4n8f.onrender.com' : 'http://localhost:1337',
  },
  build: {},
}