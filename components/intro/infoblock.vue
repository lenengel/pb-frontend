<template lang="pug">
.flex.justify-center.p-5.pr-5.bg-white(:id="id")
  .flex.flex-col.w-full(class="lg:max-w-screen-lg")
    div.pt-20.pb-20.text-center
      .font-serif.text-5xl {{title}}
      span.subtitle.font-handwritten.text-2xl.text-amber-200 {{subtitle}}
      p.pt-10.text-xl.font-light {{text}}
</template>

<script>

export default {
  components: {
  },
  props: {
      id: String,
      title: String,
      subtitle: String,
      text: String,
  }
}
</script>

<style>
/*.bigtitle .header > span:before,
.bigtitle .header > span:after {
    border-top: 1px solid #d1d1d1;
    content: "";
    height: 1px;
    left: -160px;
    top: 28px;
    width: 160px;
    z-index: 0;
}
.bigtitle .header > span:after {
    left: auto;
    right: -160px;
}*/
.bigtitle .header, .bigtitle .widget-title {
    font-size: 60px;
    font-weight: 400;
    line-height: 1.1;
    margin: 0;
    text-transform: none;
    z-index: 2;
}
.subtitle {
    color: #a89c72;
}
</style>
