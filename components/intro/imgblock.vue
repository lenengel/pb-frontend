<template lang="pug">
  .p-12.text-center.relative.overflow-hidden.bg-fixed.bg-no-repeat.bg-center.bg-cover(:style='bgImage')
    .absolute.top-0.right-0.bottom-0.left-0.w-full.h-full.overflow-hidden.bg-fixed(style='background-color: rgba(0, 0, 0, 0.3)')
      .grid.grid-cols-1.justify-center.items-center.h-full
        .text-white.w-full(v-show="showTitle")
          div.pt-20.pb-20.text-center
            .font-serif.text-5xl {{title}}
            span.font-handwritten.text-2xl {{subtitle}}
</template>

<script>
export default {
  components: {
  },
  props: {
      title: 
      { 
        type: String,
        default: ""
      },
      subtitle: String,
      image: String,
      height: { type: String, default: "450px" },
  },
  computed: {
    bgImage() {
      return  `background-image: url('/${this.image}'); height: ${this.height};`;
    },
    showTitle () {
      return (this.title.length > 0);
    }
  }
}
</script>


<style>
/*.bigtitle .header > span:before,
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
}*/
.bigtitle .header, .bigtitle .widget-title {
    font-size: 60px;
    font-weight: 400;
    line-height: 1.1;
    margin: 0;
    text-transform: none;
    z-index: 2;
}
</style>