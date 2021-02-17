import './favicons/favicons';
import Presenter from './slider/presenter';

const requireAllFiles = function requireAll(requireContext: __WebpackModuleApi.RequireContext) {
  return requireContext.keys().map(requireContext);
};

requireAllFiles(require.context('./', true, /^\.\/.*\.(scss|js)$/));

const $sliderContainers = ('.js-slider-page__slider-container');
const sliderOptions = {
  minValue: 0,
  maxValue: 100,
  step: 10,
};

$($sliderContainers).each((index, node) => {
  new Presenter(node, sliderOptions);
});
