class View {
  constructor($rootElement) {
    this.$rootElement = $rootElement;
    this.createSliderElements();

    this._handleSliderClick = this._handleSliderClick.bind(this);
    this._initEventListeners();

    this.observers = [];
  }

  setStartPointPosition(coordinate) {
    $(this.$rangeLineElement).css('left', `${coordinate}px`);
  }

  setEndPointPosition(coordinate) {
    $(this.$rangeLineElement).css('right', `${coordinate}px`);
  }

  _handleSliderClick(event) {
    const sliderStartCoordinate = $(this.$backgroundLineElement).offset().left;
    const sliderEndCoordinate = sliderStartCoordinate + $(this.$rootElement).width();

    // Вычисляю координаты середины выделенной области слайдера,
    // чтобы определить, ближе к какому из бегунков был совершен клик
    const startPointCoordinate = parseInt($(this.$rangeLineElement).css('left'), 10) + sliderStartCoordinate;
    const rangeLineWidth = $(this.$rangeLineElement).width();
    const rangeLineCenterCoordinate = startPointCoordinate + rangeLineWidth / 2;
    if (event.pageX <= rangeLineCenterCoordinate) {
      const newPosition = event.pageX - sliderStartCoordinate;
      if (newPosition >= 0) {
        this.emit({ type: 'sliderClickedCloserToStartPoint', data: newPosition });

        // this.model.setStartSelectedValue(newPosition);
        // $(this.$rangeLineElement).css('left', `${newPosition}px`);

        // // это, похоже, тоже в фасаде
        // const newValue = this._pixelsToValue(newPosition) + this.model.getMinValue();
        // this.$startPointInfoElement.text(newValue);
        // this.$startValueElement.text(newValue);
      }
    } else {
      const newPosition = sliderEndCoordinate - event.pageX;
      if (newPosition >= 0) {
        this.emit({ type: 'sliderClickedCloserToEndPoint', data: newPosition });
        // $(this.$rangeLineElement).css('right', `${newPosition}px`);

        // const newValue = this.model.getMaxValue() - this._pixelsToValue(newPosition);
        // this.$endPointInfoElement.text(newValue);
        // this.$endValueElement.text(newValue);
      }
    }
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

  emit({ type, data }) {
    this.observers.forEach((currentObserver) => {
      currentObserver.update({ type, data });
    });
  }

  _initEventListeners() {
    $(this.$rootElement).on('click', this._handleSliderClick);
  }
}

export default View;
