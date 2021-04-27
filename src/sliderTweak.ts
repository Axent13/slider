import Slider from './slider/slider';

class SliderTweak {
  slider: Slider;
  $sliderElement: HTMLElement;

  constructor(slider: Slider) {
    this.slider = slider;
    this.$sliderElement = slider.presenter.$rootElement;
    this.handleMinElementChange = this.handleMinElementChange.bind(this);
    this.handleMaxElementChange = this.handleMaxElementChange.bind(this);
    this.handleStepElementChange = this.handleStepElementChange.bind(this);
    this.handleFromElementChange = this.handleFromElementChange.bind(this);
    this.$sliderElement.appendChild(this.createTweakFields());
  }

  createTweakFields() {
    const $rootTweakElement = document.createElement('div');
    $rootTweakElement.classList.add('slider-tweak');

    const $minElement = this.createMinElement();
    $rootTweakElement.appendChild($minElement);
    const $maxElement = this.createMaxElement();
    $rootTweakElement.appendChild($maxElement);
    const $stepElement = this.createStepElement();
    $rootTweakElement.appendChild($stepElement);
    const $fromElement = this.createFromElement();
    $rootTweakElement.appendChild($fromElement);

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

  createStepElement() {
    const $stepElement: HTMLElement = document.createElement('div');
    $stepElement.classList.add('slider-tweak__input-element');

    const $stepLabel: HTMLElement = document.createElement('label');
    $stepLabel.classList.add('slider-tweak__input-label');
    $stepLabel.innerText = 'step';
    
    const $stepInput: HTMLElement = document.createElement('input');
    $stepInput.classList.add('slider-tweak__input');
    $stepInput.setAttribute('type', 'number');
    $stepInput.setAttribute('value', `${this.slider.presenter.model.getStep()}`);
    $($stepInput).on('change', this.handleStepElementChange);

    $stepElement.appendChild($stepLabel);
    $stepElement.appendChild($stepInput);

    return $stepElement;
  }

  handleStepElementChange(event: any) {    
    this.slider.presenter.model.setStep(event.currentTarget.value);
  }

  createFromElement() {
    const $fromElement: HTMLElement = document.createElement('div');
    $fromElement.classList.add('slider-tweak__input-element');

    const $fromLabel: HTMLElement = document.createElement('label');
    $fromLabel.classList.add('slider-tweak__input-label');
    $fromLabel.innerText = 'from';

    const $fromInput: HTMLElement = document.createElement('input');
    $fromInput.classList.add('slider-tweak__input');
    $fromInput.setAttribute('type', 'number');
    $fromInput.setAttribute('value', `${this.slider.presenter.model.getStartSelectedValue()}`);
    $fromInput.setAttribute('step', `${this.slider.presenter.model.getStep()}`);
    $($fromInput).on('change', this.handleFromElementChange);

    $fromElement.appendChild($fromLabel);
    $fromElement.appendChild($fromInput);

    return $fromElement;
  }

  handleFromElementChange(event: any) {    
    this.slider.presenter.model.setStartSelectedValue(event.currentTarget.value);
  }

}

export default SliderTweak;
