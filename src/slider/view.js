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

    this.$startPointElement = document.createElement('div');
    this.$startPointElement.classList.add(
      'slider__point',
      'slider__point_position_start',
      'js-slider__point_position_start',
    );

    this.$startTipElement = document.createElement('div');
    this.$startTipElement.classList.add(
      'slider__tip',
      'slider__tip_position_start',
      'js-slider__tip_position_start',
    );

    this.$startPointElement.append(this.$startTipElement);

    this.$endPointElement = document.createElement('div');
    this.$endPointElement.classList.add(
      'slider__point',
      'slider__point_position_end',
      'js-slider__point_position_end',
    );

    this.$endTipElement = document.createElement('div');
    this.$endTipElement.classList.add(
      'slider__tip',
      'slider__tip_position_end',
      'js-slider__tip_position_end',
    );

    this.$endPointElement.append(this.$endTipElement);

    this.$rangeLineElement.append(this.$startPointElement);
    this.$rangeLineElement.append(this.$endPointElement);
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
    $(this.$startPointElement).on('click', this._handleTestClick);
  }
}

export default View;
