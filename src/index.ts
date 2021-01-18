import './favicons/favicons';
import Slider from './slider/slider.js';

const requireAllFiles = function requireAll(requireContext: __WebpackModuleApi.RequireContext) {
  return requireContext.keys().map(requireContext);
};

requireAllFiles(require.context('./', true, /^\.\/.*\.(scss|js)$/));

const $rootElement = $('.js-slider-page');
const $sliderContainers = $rootElement.find('.js-slider-page__slider-container');

$sliderContainers.each((index, node) => {
  new Slider(node, {startValue: 100, endValue: 200});
});
