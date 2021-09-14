import 'react-multi-carousel/lib/styles.css';

/* responsive resolutions for multi-carousel */
export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1500 },
    items: 5,
    slidesToSlide: 4
  },
  largeDesktop: {
    breakpoint: { max: 1500, min: 1080 },
    items: 4,
    slidesToSlide: 3
  },
  desktop: {
    breakpoint: { max: 1080, min: 720 },
    items: 3,
    slidesToSlide: 2
  },
  tablet: {
    breakpoint: { max: 720, min: 480 },
    items: 2,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

export const CAROUSEL_CONFIG = {
  swipeable: true,
  draggable: true,
  showDots: true,
  infinite: true,
  responsive,
  autoPlaySpeed: 3000,
  keyBoardControl: true,
  customTransition: 'transform 300ms ease-in-out',
  transitionDuration: 500,
  centerMode: true,
  containerClass: 'carousel-container',
  removeArrowOnDeviceType: [],
  dotListClass: 'custom-dot-list-style',
  itemClass: 'carousel-item-padding-40-px'
};
