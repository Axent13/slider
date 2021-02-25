import './index.scss';
import './favicons/favicons';
import Presenter from './slider/Presenter/presenter';

const $sliderContainers = ('.js-slider-page__slider-container');
const sliderOptions = {
  minValue: 0,
  maxValue: 100,
  step: 10,
};

$($sliderContainers).each((index, node) => {
  new Presenter(node, sliderOptions);
});
