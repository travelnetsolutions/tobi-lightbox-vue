<template>
  <div class="tobi__slider__slide" @click.self="toggle()" :style="{left: index * 100 + '%'}">
    <div class="tobi__slider__slide__content">
      <figure>
        <img :src="source" :alt="description">
      </figure>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data: () => ({
    imageHasLoaded: false,
  }),
  props: ['image', 'currentIndex', 'index'],
  computed: {
    source(): string {
      if (!this.imageHasLoaded) {
        if (
          this.currentIndex + 1 >= this.index &&
          this.currentIndex - 1 <= this.index
        ) {
          return this.image.imgsrc;
        }
      } else {
        return this.image.imgsrc;
      }
      return '';
    },
    description(): string {
      if (!this.imageHasLoaded) {
        if (
          this.currentIndex + 1 >= this.index &&
          this.currentIndex - 1 <= this.index
        ) {
          this.imageHasLoaded = true;
          return this.image.description;
        }
      } else {
        return this.image.description;
      }
      return '';
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle');
    },
  },
});
</script>
<style lang='scss' scoped></style>