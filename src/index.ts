import './index.scss';
import './slider/slider.scss';
import './favicons/favicons';
import Slider from './slider/slider';
import SliderTweak from './sliderTweak';
import './sliderTweak.scss';

const $sliderContainers = ('.js-slider-page__slider-container');
const sliderOptions = {
  minValue: 0,
  maxValue: 100,
  startSelectedValue: 1,
  step: 1,
  isVertical: false,
};

const sliders: Slider[] = [];

$($sliderContainers).each((index, node) => {
  sliders.push(new Slider(node, sliderOptions));
});

sliders.forEach(slider => {
  new SliderTweak(slider);
});
