<template>
  <div id="app">
    <img alt="Vue logo">
    <lightbox v-model="showLightbox" :images="images"/>
    <!-- <p>Something worked!!</p> -->
  </div>
</template>

<script lang="ts">
// import Vue from 'vue';
import { gallery } from '@/gallery.ts';
import Lightbox from './components/lightbox.vue';
export default {
  components: {
    Lightbox,
  },
  data: () => ({
    images: gallery,
    showLightbox: true,
  }),
};
</script>

<style lang="scss">
</style>
