class View {
  constructor($rootElement) {
    this.$rootElement = $rootElement;
    this.createSliderElements();

    this.observers = [];

    this._handleTestClick = this._handleTestClick.bind(this);
    this._initEventListeners();
  }

  createSliderElements() {
    this.$sliderElement = document.createElement('div');
    this.$sliderElement.classList.add('slider');

    this.$sliderValuesElement = document.createElement('div');
    this.$sliderValuesElement.classList.add('slider__values');

    this.$startValueElement = document.createElement('span');
    this.$startValueElement.classList.add('slider__start-value', 'js-slider__start-value');
    this.$sliderValuesElement.append(this.$startValueElement);

    this.$delimiterElement = document.createElement('span');
    this.$delimiterElement.classList.add('slider__delimiter');
    this.$sliderValuesElement.append(this.$delimiterElement);

    this.$endValueElement = document.createElement('span');
    this.$endValueElement.classList.add('slider__end-value', 'js-slider__end-value');
    this.$sliderValuesElement.append(this.$endValueElement);

    this.$sliderElement.append(this.$sliderValuesElement);

    this.$backgroundLineElement = document.createElement('div');
    this.$backgroundLineElement.classList.add('slider__background-line');

    this.$rangeLineElement = document.createElement('div');
    this.$rangeLineElement.classList.add('slider__range-line', 'js-slider__range-line');

    this.$pointStartElement = document.createElement('div');
    this.$pointStartElement.classList.add(
      'slider__point',
      'slider__point_position_start',
      'js-slider__point_position_start',
    );

    this.$valueStartElement = document.createElement('div');
    this.$valueStartElement.classList.add(
      'slider__value',
      'slider__value_position_start',
      'js-slider__value_position_start',
    );

    this.$pointStartElement.append(this.$valueStartElement);

    this.$pointEndElement = document.createElement('div');
    this.$pointEndElement.classList.add(
      'slider__point',
      'slider__point_position_end',
      'js-slider__point_position_end',
    );

    this.$valueEndElement = document.createElement('div');
    this.$valueEndElement.classList.add(
      'slider__value',
      'slider__value_position_end',
      'js-slider__value_position_end',
    );

    this.$pointEndElement.append(this.$valueEndElement);
    this.$rangeLineElement.append(this.$pointStartElement);
    this.$backgroundLineElement.append(this.$rangeLineElement);
    this.$sliderElement.append(this.$backgroundLineElement);
    this.$rootElement.append(this.$sliderElement);
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((currentObserver) => currentObserver !== observer);
  }

  emit(changes) {
    this.observers.forEach((currentObserver) => {
      currentObserver.update(changes);
    });
  }

  _handleTestClick() {
    console.log('click');
    console.log(this);
    this.emit({ type: 'click', data: 'data to model' });
  }

  _initEventListeners() {
    $(this.$pointStartElement).on('click', this._handleTestClick);
  }
}

export default View;
