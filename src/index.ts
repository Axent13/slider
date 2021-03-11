import './index.scss';
import './slider/slider.scss';
import './favicons/favicons';
import Presenter from './slider/Presenter/presenter';

const $sliderContainers = ('.js-slider-page__slider-container');
const sliderOptions = {
  minValue: 0,
  maxValue: 100,
  step: 1,
};

$($sliderContainers).each((index, node) => {
  new Presenter(node, sliderOptions);
});
