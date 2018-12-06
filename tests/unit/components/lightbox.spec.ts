import { shallowMount } from '@vue/test-utils';
import Lightbox from '@/components/lightbox.vue';
import Slide from '@/components/slide.vue';
import { gallery } from './fixtures/galleryFixture';

describe('Lightbox.vue', () => {

  let props: {};

  const build = () => {
    const wrapper = shallowMount(Lightbox, {
      propsData: props
    });
    return {
      wrapper,
      slides: () => wrapper.findAll(Slide),
      firstSlide: () => wrapper.find(Slide),
      anySlide: () => wrapper.find(Slide)
    };
  };

  beforeEach(() => {
    props = { images: gallery };
  });

  it('renders the component', () => {
    const { wrapper } = build();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders child components', () => {
    const { slides } = build();
    expect(slides().exists()).toBe(true);
  });

  it('Has images', () => {
    const { wrapper } = build();
    expect(wrapper.vm.$props.images).toBe(gallery);
  });

  it('doesn\'t render slides with empty images array', () => {
    const { slides, wrapper } = build();
    wrapper.setProps({
      images: [],
    });
    expect(slides().exists()).toBe(false);
  });

  it('Passes an image to the child component', () => {
    const { firstSlide, wrapper } = build();
    expect(firstSlide().props().image.imgsrc).toBe(wrapper.props().images[0].imgsrc);
  });

  it('toggles the lightbox when a slide emits the toggle event', () => {
    const { anySlide, wrapper } = build();
    anySlide().vm.$emit('toggle');
    expect(wrapper.emitted().input).toBeTruthy();
  });
});
