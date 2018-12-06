<template>
  <div class="tobi__slider__slide" @click.self="toggle()" :style="{left: index * 100 + '%'}">
    <div class="tobi__slider__slide__content">
      <figure>
        <img :src="source" :alt="description">
      </figure>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    imageHasLoaded: false
  }),
  props: ["image", "currentIndex", "index"],
  computed: {
    source() {
      if (!this.imageHasLoaded) {
        if (this.currentIndex + 1 >= this.index && this.currentIndex - 1 <= this.index) {
          return this.image.imgsrc;
        }
      } else {
        return this.image.imgsrc;
      }
    },
    description() {
      if (!this.imageHasLoaded) {
        if (this.currentIndex + 1 >= this.index && this.currentIndex - 1 <= this.index) {
          this.imageHasLoaded = true;
          return this.image.description;
        }
      } else {
        return this.image.description;
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.resizeListener);
    window.addEventListener("keydown", this.keydownHandler);
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    }
  }
};
</script>
<style lang="scss" scoped></style>