<template>
  <div class="container">
    <h4 class="font-medium leading-tight text-2xl mt-0 mb-2"> {{title}} </h4>
    <span>{{text}}</span>
    <ul v-show=(items.length) class="list-disc">
        <li v-for="item in items" :key="item">
            {{ item }}
        </li>
    </ul>
  </div>  
</template>

<script>
export default {
  computed: {
    title () {
      return this.$store.state.toast["title"];
    },
    text () {
      return this.$store.state.toast.text;
    },
    items () {
      return this.$store.state.toast.items;
    }
  }
}
</script>