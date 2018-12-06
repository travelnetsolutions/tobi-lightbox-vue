<template>
  <div
    class="tobi"
    role="dialog"
    :aria-hidden="!value"
    @touchstart="touchstartHandler"
    @touchmove="touchmoveHandler"
    @touchend="touchendHandler"
    @mousedown="mousedownHandler"
    @mouseup="mouseupHandler"
    @mousemove="mousemoveHandler"
    @mouseout="mouseupHandler"
  >
    <div class="tobi__overlay" @click="toggle()"></div>
    <div class="tobi__slider" :style="{transform: 'translate3d(' + currentOffset + 'px, 0, 0)'}">
      <template v-for="(image, index) in images">
        <slide
          :image="image"
          :currentIndex="currentIndex"
          :key="index"
          :index="index"
          @toggle="toggle"
        ></slide>
      </template>
    </div>
    <button
      class="tobi__prev"
      v-if="currentIndex &gt; 0"
      @click="prev()"
      type="button"
      :aria-label="navLabels.prev"
      v-html="navText.prev"
    ></button>
    <button
      class="tobi__next"
      v-if="currentIndex &lt; images.length - 1"
      @click="next()"
      type="button"
      :aria-label="navLabels.next"
      v-html="navText.next"
    ></button>
    <button
      class="tobi__close"
      @click="toggle()"
      type="button"
      :aria-label="closeLabel"
      v-html="closeText"
    ></button>
    <div class="tobi__counter">{{currentIndex + 1}}/{{images.length}}</div>
  </div>
</template>
<script lang="ts">
import { throttle } from 'lodash';
import Vue from 'vue';
import Slide from './slide.vue';

export default Vue.extend({
  components: {
    Slide,
  },
  computed: {},
  data() {
    return {
      resizeTicking: false,
      navLabels: {
        next: 'Next',
        prev: 'Previous',
      },
      navText: {
        prev:
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>',
        next:
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>',
      },
      closeLabel: 'Close',
      closeText:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>',
      pointerDown: false,
      drag: {
        endX: 0,
        endY: 0,
        startX: 0,
        startY: 0,
      },
      offset: 0,
      currentOffset: 0,
      threshold: 100,
      swipeClose: true,
      currentIndex: 0,
    };
  },
  props: ['images', 'value'],
  mounted() {
    window.addEventListener('resize', this.resizeListener);
    window.addEventListener('keydown', this.keydownHandler);
  },
  methods: {
    backgroundImage(image: string) {
      return 'url("' + image + '")';
    },
    resizeListener: throttle(function(this: any) {
      this.updateOffset();
    }, 250),
    keydownHandler(event: KeyboardEvent) {
      if (event.keyCode === 27) {
        // `ESC` Key: Close the lightbox
        event.preventDefault();
        this.toggle();
      } else if (event.keyCode === 37) {
        // `PREV` Key: Navigate to the previous slide
        event.preventDefault();
        this.prev();
      } else if (event.keyCode === 39) {
        // `NEXT` Key: Navigate to the next slide
        event.preventDefault();
        this.next();
      }
    },
    touchstartHandler(event: TouchEvent) {
      event.stopPropagation();

      this.pointerDown = true;

      this.drag.startX = event.touches[0].pageX;
      this.drag.startY = event.touches[0].pageY;
    },
    touchmoveHandler(event: TouchEvent) {
      event.preventDefault();
      event.stopPropagation();

      if (this.pointerDown) {
        this.drag.endX = event.touches[0].pageX;
        this.drag.endY = event.touches[0].pageY;

        this.currentOffset =
          this.offset - Math.round(this.drag.startX - this.drag.endX);
      }
    },
    touchendHandler(event: TouchEvent) {
      event.stopPropagation();
      this.pointerDown = false;
      if (this.drag.endX) {
        this.updateAfterDrag();
      }
      this.clearDrag();
    },
    mousedownHandler(event: MouseEvent) {
      event.preventDefault();
      event.stopPropagation();

      this.pointerDown = true;
      this.drag.startX = event.pageX;
      // slider.style.cursor = '-webkit-grabbing';
    },
    mouseupHandler(event: MouseEvent) {
      event.stopPropagation();

      this.pointerDown = false;
      if (this.drag.endX) {
        this.updateAfterDrag();
      }

      this.clearDrag();
    },
    mousemoveHandler(event: MouseEvent) {
      if (!this.pointerDown) { return; }
      event.preventDefault();

      if (this.pointerDown) {
        this.drag.endX = event.pageX;
        this.currentOffset =
          this.offset - Math.round(this.drag.startX - this.drag.endX);
      }
    },
    updateAfterDrag() {
      const movementX = this.drag.endX - this.drag.startX;
      const movementY = this.drag.endY - this.drag.startY;
      const movementXDistance = Math.abs(movementX);
      const movementYDistance = Math.abs(movementY);

      if (movementX > 0 && movementXDistance > this.threshold) {
        this.prev();
      } else if (movementX < 0 && movementXDistance > this.threshold) {
        this.next();
      } else if (
        movementY < 0 &&
        movementYDistance > this.threshold &&
        this.swipeClose
      ) {
        this.toggle();
      } else {
        this.updateOffset();
      }
    },
    clearDrag() {
      this.drag = {
        startX: 0,
        endX: 0,
        startY: 0,
        endY: 0,
      };
    },
    updateOffset() {
      this.offset = -this.currentIndex * window.innerWidth;
      this.currentOffset = this.offset;
    },
    toggle() {
      this.$emit('input', !this.value);
    },
    prev() {
      if (this.currentIndex <= 0) { return this.updateOffset(); }
      this.currentIndex--;
      this.updateOffset();
    },
    next() {
      if (this.currentIndex >= this.images.length - 1) {
        return this.updateOffset();
      }
      this.currentIndex++;
      this.updateOffset();
    },
  },
});
</script>
<style lang="scss" scoped></style>
