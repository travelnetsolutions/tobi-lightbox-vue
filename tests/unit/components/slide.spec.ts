import Slide from '@/components/slide.vue';
import { createWrapper, shallowMount } from '@vue/test-utils';
import { gallery } from './fixtures/galleryFixture';

describe('Lightbox.vue', () => {

  let props: {};

  const build = () => {
    const wrapper = shallowMount(Slide, {
      propsData: props,
    });
    return {
      wrapper,
      img: () => wrapper.find('img'),
    };
  };

  beforeEach(() => {
    props = {
      image: {},
    };
  });

  it('renders the component', () => {
    const { wrapper } = build();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('doesn\'t renders the image if the current index isn\'t/hasn\'t been within 1 of the index', () => {
    const { wrapper, img } = build();
    const imageIndex = 5;
    const image = gallery[imageIndex];
    wrapper.setProps({
      image,
      index: imageIndex,
      currentIndex: 0,
    });
    expect(img().attributes('src')).toBeFalsy();
  });
  it('renders the image if the current index is within 1 of the index', () => {
    const { wrapper, img } = build();
    const image = gallery[0];
    wrapper.setProps({
      image,
      index: 1,
      currentIndex: 0,
    });
    expect(img().attributes('src')).toBe(image.imgsrc);
  });
  it('renders the image if it has rendered before', () => {
    const { wrapper, img } = build();
    const image = gallery[0];
    wrapper.setProps({
      image,
      index: 1,
      currentIndex: 0,
    });
    wrapper.setProps({
      currentIndex: 5,
    });
    expect(img().attributes('src')).toBe(image.imgsrc);
  });
  it('has alt text when the image is rendered', () => {
    const { wrapper, img } = build();
    const image = gallery[0];
    wrapper.setProps({
      image,
      index: 1,
      currentIndex: 0,
    });
    expect(img().attributes('alt')).toBe(image.description);
  });
});
