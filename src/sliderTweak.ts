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

    const minValue = this.slider.presenter.model.getMinValue();
    const step = this.slider.presenter.model.getStep();
    const maxValue = this.slider.presenter.model.getMaxValue();
    const startSelectedValue = this.slider.presenter.model.getStartSelectedValue();
    const endSelectedValue = this.slider.presenter.model.getEndSelectedValue();

    const $inputsSectionElement = document.createElement('div');
    $inputsSectionElement.classList.add('slider-tweak__inputs-section');
    const $minElement = this.createInputElement('min', minValue, step, this.handleMinElementChange);
    $inputsSectionElement.appendChild($minElement);
    const $maxElement = this.createInputElement('max', maxValue, step, this.handleMaxElementChange);
    $inputsSectionElement.appendChild($maxElement);
    const $stepElement = this.createInputElement('step', step, 1, this.handleStepElementChange);
    $inputsSectionElement.appendChild($stepElement);
    const $fromElement = this.createInputElement('from', startSelectedValue, step, this.handleFromElementChange);
    $inputsSectionElement.appendChild($fromElement);
    const $toElement = this.createInputElement('to', endSelectedValue, step, this.handleToElementChange);;
    $inputsSectionElement.appendChild($toElement);
    $rootTweakElement.appendChild($inputsSectionElement);

    const $checkboxesSectionElement = document.createElement('div');
    $checkboxesSectionElement.classList.add('slider-tweak__checkboxes-section');
    const $verticalElement = this.createVerticalElement();
    $checkboxesSectionElement.appendChild($verticalElement);
    const $rangeElement = this.createRangeElement();
    $checkboxesSectionElement.appendChild($rangeElement);
    const $scaleElement = this.createScaleElement();
    $checkboxesSectionElement.appendChild($scaleElement);
    const $barElement = this.createBarElement();
    $checkboxesSectionElement.appendChild($barElement);
    const $tipElement = this.createTipElement();
    $checkboxesSectionElement.appendChild($tipElement);
    $rootTweakElement.appendChild($checkboxesSectionElement);

    return $rootTweakElement;
  }

  createInputElement(innerText: string, value: number, step: number, onChangeFunction: any) {
    const $newElement: HTMLElement = document.createElement('div');
    $newElement.classList.add('slider-tweak__input-element');

    const $newLabel: HTMLElement = document.createElement('label');
    $newLabel.classList.add('slider-tweak__input-label');
    $newLabel.innerText = innerText;

    const $newInput: HTMLElement = document.createElement('input');
    $newInput.classList.add('slider-tweak__input');
    $newInput.setAttribute('type', 'number');
    $newInput.setAttribute('value', `${value}`);
    $newInput.setAttribute('step', `${step}`);
    $($newInput).on('change', onChangeFunction);

    $newElement.appendChild($newLabel);
    $newElement.appendChild($newInput);

    return $newElement;
  }

  handleMinElementChange(event: any) {
    this.slider.presenter.model.setMinValue(event.currentTarget.value);
  }

  handleMaxElementChange(event: any) {
    this.slider.presenter.model.setMaxValue(event.currentTarget.value);
  }

  handleStepElementChange(event: any) {
    this.slider.presenter.model.setStep(event.currentTarget.value);
  }

  handleFromElementChange(event: any) {
    this.slider.presenter.model.setStartSelectedValue(event.currentTarget.value);
  }

  handleToElementChange(event: any) {
    this.slider.presenter.model.setEndSelectedValue(event.currentTarget.value);
  }

  // TODO: По-аналогии с инпутами попробовать сделать одну функцию для всех чекбоксов
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
