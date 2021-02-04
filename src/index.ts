import './favicons/favicons';
import Presenter from './slider/presenter';

const requireAllFiles = function requireAll(requireContext: __WebpackModuleApi.RequireContext) {
  return requireContext.keys().map(requireContext);
};

requireAllFiles(require.context('./', true, /^\.\/.*\.(scss|js)$/));

const $sliderContainers = ('.js-slider-page__slider-container');

$($sliderContainers).each((index, node) => {
  new Presenter(node);
});
