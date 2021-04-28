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
    this.handleToElementChange = this.handleToElementChange.bind(this);
    this.handleVerticalElementChange = this.handleVerticalElementChange.bind(this);
    this.handleRangeElementChange = this.handleRangeElementChange.bind(this);
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
    const $toElement = this.createToElement();
    $rootTweakElement.appendChild($toElement);
    const $verticalElement = this.createVerticalElement();
    $rootTweakElement.appendChild($verticalElement);
    const $rangeElement = this.createRangeElement();
    $rootTweakElement.appendChild($rangeElement);
    const $scaleElement = this.createScaleElement();
    $rootTweakElement.appendChild($scaleElement);
    const $barElement = this.createBarElement();
    $rootTweakElement.appendChild($barElement);
    const $tipElement = this.createTipElement();
    $rootTweakElement.appendChild($tipElement);

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

  createToElement() {
    const $toElement: HTMLElement = document.createElement('div');
    $toElement.classList.add('slider-tweak__input-element');

    const $toLabel: HTMLElement = document.createElement('label');
    $toLabel.classList.add('slider-tweak__input-label');
    $toLabel.innerText = 'to';

    const $toInput: HTMLElement = document.createElement('input');
    $toInput.classList.add('slider-tweak__input');
    $toInput.setAttribute('type', 'number');
    $toInput.setAttribute('value', `${this.slider.presenter.model.getEndSelectedValue()}`);
    $toInput.setAttribute('step', `${this.slider.presenter.model.getStep()}`);
    $($toInput).on('change', this.handleToElementChange);

    $toElement.appendChild($toLabel);
    $toElement.appendChild($toInput);

    return $toElement;
  }

  handleToElementChange(event: any) {    
    this.slider.presenter.model.setEndSelectedValue(event.currentTarget.value);
  }

  createVerticalElement() {
    const $verticalElement: HTMLElement = document.createElement('div');
    $verticalElement.classList.add('slider-tweak__checkbox-element');

    const $verticalLabel: HTMLElement = document.createElement('label');
    $verticalLabel.classList.add('slider-tweak__checkbox-label');

    const $verticalInput: HTMLElement = document.createElement('input');
    $verticalInput.classList.add('slider-tweak__checkbox');
    $verticalInput.setAttribute('type', 'checkbox');
    // $verticalInput.setAttribute('value', `${this.slider.presenter.model.getEndSelectedValue()}`); <- model.isVertical
    $($verticalInput).on('change', this.handleVerticalElementChange);

    const $verticalSpan: HTMLElement = document.createElement('span');
    $verticalSpan.classList.add('slider-tweak__checkbox-span');
    $verticalSpan.innerText = 'vertical';

    $verticalLabel.appendChild($verticalInput);
    $verticalLabel.appendChild($verticalSpan);
    $verticalElement.appendChild($verticalLabel);

    return $verticalElement;
  }

  handleVerticalElementChange(event: any) {    
    // this.slider.presenter.model.setEndSelectedValue(event.currentTarget.value); <- model.setVertical(true|false)
  }

  createRangeElement() {
    const $rangeElement: HTMLElement = document.createElement('div');
    $rangeElement.classList.add('slider-tweak__checkbox-element');

    const $rangeLabel: HTMLElement = document.createElement('label');
    $rangeLabel.classList.add('slider-tweak__checkbox-label');

    const $rangeInput: HTMLElement = document.createElement('input');
    $rangeInput.classList.add('slider-tweak__checkbox');
    $rangeInput.setAttribute('type', 'checkbox');
    // $rangeInput.setAttribute('value', `${this.slider.presenter.model.getEndSelectedValue()}`); <- model.isRange
    $($rangeInput).on('change', this.handleVerticalElementChange);

    const $rangeSpan: HTMLElement = document.createElement('span');
    $rangeSpan.classList.add('slider-tweak__checkbox-span');
    $rangeSpan.innerText = 'range';

    $rangeLabel.appendChild($rangeInput);
    $rangeLabel.appendChild($rangeSpan);
    $rangeElement.appendChild($rangeLabel);

    return $rangeElement;
  }

  handleRangeElementChange(event: any) {    
    // this.slider.presenter.model.setEndSelectedValue(event.currentTarget.value); <- model.setRange(true|false)
  }

  createScaleElement() {
    const $scaleElement: HTMLElement = document.createElement('div');
    $scaleElement.classList.add('slider-tweak__checkbox-element');

    const $scaleLabel: HTMLElement = document.createElement('label');
    $scaleLabel.classList.add('slider-tweak__checkbox-label');

    const $scaleInput: HTMLElement = document.createElement('input');
    $scaleInput.classList.add('slider-tweak__checkbox');
    $scaleInput.setAttribute('type', 'checkbox');
    // $scaleInput.setAttribute('value', `${this.slider.presenter.model.getEndSelectedValue()}`); <- model.hasScale
    $($scaleInput).on('change', this.handleVerticalElementChange);

    const $scaleSpan: HTMLElement = document.createElement('span');
    $scaleSpan.classList.add('slider-tweak__checkbox-span');
    $scaleSpan.innerText = 'scale';

    $scaleLabel.appendChild($scaleInput);
    $scaleLabel.appendChild($scaleSpan);
    $scaleElement.appendChild($scaleLabel);

    return $scaleElement;
  }

  handleScaleElementChange(event: any) {    
    // this.slider.presenter.model.setEndSelectedValue(event.currentTarget.value); <- model.toogleScale(true|false)
  }

  createBarElement() {
    const $barElement: HTMLElement = document.createElement('div');
    $barElement.classList.add('slider-tweak__checkbox-element');

    const $barLabel: HTMLElement = document.createElement('label');
    $barLabel.classList.add('slider-tweak__checkbox-label');

    const $barInput: HTMLElement = document.createElement('input');
    $barInput.classList.add('slider-tweak__checkbox');
    $barInput.setAttribute('type', 'checkbox');
    // $barInput.setAttribute('value', `${this.slider.presenter.model.getEndSelectedValue()}`); <- model.hasBar
    $($barInput).on('change', this.handleVerticalElementChange);

    const $barSpan: HTMLElement = document.createElement('span');
    $barSpan.classList.add('slider-tweak__checkbox-span');
    $barSpan.innerText = 'bar';

    $barLabel.appendChild($barInput);
    $barLabel.appendChild($barSpan);
    $barElement.appendChild($barLabel);

    return $barElement;
  }

  handleBarElementChange(event: any) {    
    // this.slider.presenter.model.setEndSelectedValue(event.currentTarget.value); <- model.toogleBar(true|false)
  }

  createTipElement() {
    const $tipElement: HTMLElement = document.createElement('div');
    $tipElement.classList.add('slider-tweak__checkbox-element');

    const $tipLabel: HTMLElement = document.createElement('label');
    $tipLabel.classList.add('slider-tweak__checkbox-label');

    const $tipInput: HTMLElement = document.createElement('input');
    $tipInput.classList.add('slider-tweak__checkbox');
    $tipInput.setAttribute('type', 'checkbox');
    // $tipInput.setAttribute('value', `${this.slider.presenter.model.getEndSelectedValue()}`); <- model.hasTip
    $($tipInput).on('change', this.handleVerticalElementChange);

    const $tipSpan: HTMLElement = document.createElement('span');
    $tipSpan.classList.add('slider-tweak__checkbox-span');
    $tipSpan.innerText = 'tip';

    $tipLabel.appendChild($tipInput);
    $tipLabel.appendChild($tipSpan);
    $tipElement.appendChild($tipLabel);

    return $tipElement;
  }

  handleTipElementChange(event: any) {    
    // this.slider.presenter.model.setEndSelectedValue(event.currentTarget.value); <- model.toogleTip(true|false)
  }

}

export default SliderTweak;
