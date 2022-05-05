export default function ({ $axios, redirect }) {
    $axios.onError((error) => {
      const code = parseInt(error.response && error.response.status)
      console.log("CODE ",code)
      if (code === 401) redirect('/user/login')
    })
  }