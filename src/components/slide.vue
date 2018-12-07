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
<style lang='scss'>
$zoomIconColor: #fff;

$overlayBackground: rgba(0, 0, 0, 0.8);

$figcaptionBackground: rgba(0, 0, 0, 0.8);
$figcaptionColor: #fff;

$counterBackground: transparent;
$counterColor: #fff;

$buttonBackground: transparent;
$buttonColor: #fff;

$iframeHeight: 85vh;
$iframeWidth: 85vw;
.tobi__slider__slide {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  & .tobi__slider__slide__content {
    max-height: 85vh;
    max-width: 85vw;
  }

  & figure {
    margin: 0;
    max-width: 100%;
    position: relative;
  }

  & img {
    display: block;
    height: auto;
    max-height: 85vh;
    max-width: 85vw;
    width: auto;
  }

  & iframe {
    height: $iframeHeight;
    width: $iframeWidth;
  }

  & video {
    max-height: 85vh;
    max-width: 85vw;
  }

  & figcaption {
    // background-color: $figcaptionBackground;
    bottom: -5vh;
    color: $figcaptionColor;
    text-align: center;
    display: block;
    left: 0;
    padding-bottom: 0.222em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    padding-top: 0.222em;
    position: absolute;
    white-space: pre-wrap;
    width: 100%;
  }
}
</style>