import Slider from './slider/slider';

class SliderTweak {
  slider: Slider;
  $sliderElement: HTMLElement;

  constructor(slider: Slider) {
    this.slider = slider;
    this.$sliderElement = slider.presenter.$rootElement;
    this.handleMinElementChange = this.handleMinElementChange.bind(this);
    this.handleMaxElementChange = this.handleMaxElementChange.bind(this);
    this.$sliderElement.appendChild(this.createTweakFields());
  }

  createTweakFields() {
    const $rootTweakElement = document.createElement('div');
    $rootTweakElement.classList.add('slider-tweak');

    const $minElement = this.createMinElement();
    $rootTweakElement.appendChild($minElement);
    const $maxElement = this.createMaxElement();
    $rootTweakElement.appendChild($maxElement);

    return $rootTweakElement;
  }

  createMinElement() {
    const $minElement: HTMLElement = document.createElement('div');
    $minElement.classList.add('slider-tweak__input-element');

    const $minLabel: HTMLElement = document.createElement('label');
    $minLabel.classList.add('slider-tweak__input-label');
    $minLabel.innerText = 'min';

    const $minInput: HTMLElement = document.createElement('input');
    $minInput.classList.add('slider-tweak__input');
    $minInput.setAttribute('type', 'number');
    $minInput.setAttribute('value', `${this.slider.presenter.model.getMinValue()}`);
    $minInput.setAttribute('step', `${this.slider.presenter.model.getStep()}`);
    $($minInput).on('change', this.handleMinElementChange);

    $minElement.appendChild($minLabel);
    $minElement.appendChild($minInput);

    return $minElement;
  }

  handleMinElementChange(event: any) {    
    this.slider.presenter.model.setMinValue(event.currentTarget.value);
  }

  createMaxElement() {
    const $maxElement: HTMLElement = document.createElement('div');
    $maxElement.classList.add('slider-tweak__input-element');

    const $maxLabel: HTMLElement = document.createElement('label');
    $maxLabel.classList.add('slider-tweak__input-label');
    $maxLabel.innerText = 'max';
    
    const $maxInput: HTMLElement = document.createElement('input');
    $maxInput.classList.add('slider-tweak__input');
    $maxInput.setAttribute('type', 'number');
    $maxInput.setAttribute('value', `${this.slider.presenter.model.getMaxValue()}`);
    $maxInput.setAttribute('step', `${this.slider.presenter.model.getStep()}`);
    $($maxInput).on('change', this.handleMaxElementChange);

    $maxElement.appendChild($maxLabel);
    $maxElement.appendChild($maxInput);

    return $maxElement;
  }

  handleMaxElementChange(event: any) {    
    this.slider.presenter.model.setMaxValue(event.currentTarget.value);
  }

}

export default SliderTweak;
