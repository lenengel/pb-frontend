<template lang="pug">
div
    Orders
  
</template>
<script>
import Orders from "./../components/admin/Orders.vue"

import { mapGetters } from 'vuex'
export default {
    layout: 'admin',
    middleware: 'auth',
    computed: {
    ...mapGetters(['loggedInUser']),
    },
    components: {
      Orders,
    }
}
</script>