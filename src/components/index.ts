import Vue from 'vue';
import Lightbox from './lightbox.vue';
import Slide from './slide.vue';

const Components: any = {
    Lightbox,
    Slide,
};

Object.keys(Components).forEach((name) => {
    Vue.component(name, Components[name]);
});

export default Components;
