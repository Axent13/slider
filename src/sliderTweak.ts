import Slider from './slider/slider';

class SliderTweak {
  slider: Slider;
  $sliderElement: HTMLElement;

  constructor(slider: Slider) {
    this.slider = slider;
    this.$sliderElement = slider.presenter.$rootElement;
    this.handleMinElementChange = this.handleMinElementChange.bind(this);
    this.$sliderElement.appendChild(this.createTweakFields());
  }

  createTweakFields() {
    const $rootTweakElement = document.createElement('div');
    $rootTweakElement.classList.add('slider-tweak');

    const $minElement = this.createMinElement();
    $rootTweakElement.appendChild($minElement);

    return $rootTweakElement;
  }

  createMinElement() {
    const $minElement: HTMLElement = document.createElement('div');
    $minElement.classList.add('slider-tweak__min-element');

    const $minLabel: HTMLElement = document.createElement('label');
    $minLabel.classList.add('slider-tweak__min-label');
    $minLabel.innerText = 'min';

    const $minInput: HTMLElement = document.createElement('input');
    $minInput.classList.add('slider-tweak__min-input');
    $minInput.setAttribute('type', 'number');
    $minInput.setAttribute('value', `${this.slider.presenter.model.getMinValue()}`);
    $minInput.setAttribute('step', `${this.slider.presenter.model.getStep()}`);
    $($minInput).on('change', this.handleMinElementChange);

    $minElement.appendChild($minLabel);
    $minElement.appendChild($minInput);

    return $minElement;
  }

  handleMinElementChange(event: any) {
    console.log(event.currentTarget.value);
    
    this.slider.presenter.model.setMinValue(event.currentTarget.value);
  }

}

export default SliderTweak;
