<template lang="pug">
.flex.justify-center.bg-white(:id="id")
    .max-w-screen-lg.flex.flex-col.w-full  
        div.pt-20.pb-20.text-center
            .bigtitle
                h1.header.font-serif.text-5xl
                    span.pl-10.pr-10 {{title}}
            span.subtitle.font-handwritten.text-2xl.text-amber-200 {{subtitle}}
            p.pt-10.text-lg.font-light {{text}}
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
.bigtitle .header > span:before,
.bigtitle .header > span:after {
    border-top: 1px solid #d1d1d1;
    content: "";
    display: block;
    height: 1px;
    left: -160px;
    position: absolute;
    top: 28px;
    width: 160px;
    z-index: 0;
}
.bigtitle .header > span:after {
    left: auto;
    right: -160px;
}
.bigtitle .header, .bigtitle .widget-title {
    display: inline-block;
    font-size: 60px;
    font-weight: 400;
    line-height: 1.1;
    margin: 0;
    position: relative;
    text-transform: none;
    z-index: 2;
}
.subtitle {
    color: #a89c72;
}
</style>
