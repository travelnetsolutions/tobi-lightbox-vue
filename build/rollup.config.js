import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
import typescript from 'rollup-plugin-typescript';
export default {
  input: 'src/index.ts', // Path relative to package.json
  output: {
    name: 'TobiLightboxVue',
    globals: {
      vue: 'vue'
    }
  },
  external: [
    'Vue',
  ],
  plugins: [
    typescript(),
    vue({
      css: true, // Dynamically inject css as a <style> tag
    }),
    buble(), // Transpile to ES5
  ],
};
