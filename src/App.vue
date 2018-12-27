<template>
  <div id="app">
    <button @click="toggleLightbox">toggle</button>
    <lightbox v-model="showLightbox" :images="images"/>
    <!-- <p>Something worked!!</p> -->
  </div>
</template>

<script>
// import Vue from 'vue';
import { gallery } from '@/gallery.ts';
import Lightbox from './components/lightbox.vue';
export default {
  components: {
    Lightbox,
  },
  data: () => ({
    images: gallery,
    showLightbox: false,
  }),
  methods: {
    toggleLightbox() {
      this.showLightbox = !this.showLightbox;
    },
  },
};
</script>

<style lang="scss">
</style>
