import Observer from './observer';

class View extends Observer {
  constructor($rootElement) {
    super();

    this.$rootElement = $rootElement;
    this.createSliderElements();

    this._handleSliderClick = this._handleSliderClick.bind(this);
    this._handleStartPointMouseDown = this._handleStartPointMouseDown.bind(this);
    this._handleStartPointMouseMove = this._handleStartPointMouseMove.bind(this);
    this._handleStartPointMouseUp = this._handleStartPointMouseUp.bind(this);
    this._handleEndPointMouseDown = this._handleEndPointMouseDown.bind(this);
    this._handleEndPointMouseMove = this._handleEndPointMouseMove.bind(this);
    this._handleEndPointMouseUp = this._handleEndPointMouseUp.bind(this);
    this._initEventListeners();

    this.observers = [];
  }

  setStartPointPosition(coordinate) {
    $(this.$rangeLineElement).css('left', `${coordinate}px`);
  }

  setStartTipValue(value) {
    $(this.$startTipElement).text(value);
  }

  setStartLimitValue(value) {
    $(this.$startLimitValueElement).text(value);
  }

  setEndPointPosition(coordinate) {
    $(this.$rangeLineElement).css('right', `${coordinate}px`);
  }

  setEndTipValue(value) {
    $(this.$endTipElement).text(value);
  }

  setEndLimitValue(value) {
    $(this.$endLimitValueElement).text(value);
  }

  _handleSliderClick(event) {
    console.log('Slider clicked!');
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
      }
    } else {
      const newPosition = sliderEndCoordinate - event.pageX;
      if (newPosition >= 0) {
        this.emit({ type: 'sliderClickedCloserToEndPoint', data: newPosition });
      }
    }
  }

  _handleStartPointMouseDown() {
    $(document).on('mousemove', this._handleStartPointMouseMove);
    $(document).on('mouseup', this._handleStartPointMouseUp);
  }

  _handleStartPointMouseMove(event) {
    const sliderStartCoordinate = $(this.$rootElement).offset().left;
    let newPosition = event.pageX - sliderStartCoordinate;
    const endPointCoordinate = $(this.$rootElement).width() - parseInt($(this.$rangeLineElement).css('right'), 10);

    if (newPosition <= 0) {
      newPosition = 0;
    } else if (newPosition >= endPointCoordinate) {
      newPosition = endPointCoordinate;
    }

    this.emit({ type: 'startPointMoved', data: newPosition });
  }

  _handleStartPointMouseUp() {
    $(document).off('mousemove', this._handleStartPointMouseMove);
    $(document).off('mouseup', this._handleStartPointMouseUp);
  }

  _handleEndPointMouseDown() {
    $(document).on('mousemove', this._handleEndPointMouseMove);
    $(document).on('mouseup', this._handleEndPointMouseUp);
  }

  _handleEndPointMouseMove(event) {
    const sliderEndCoordinate = $(this.$rootElement).offset().left + $(this.$rootElement).width();
    let newPosition = sliderEndCoordinate - event.pageX;
    const startPointCoordinate = $(this.$rootElement).width() - parseInt($(this.$rangeLineElement).css('left'), 10);

    if (newPosition <= 0) {
      newPosition = 0;
    } else if (newPosition >= startPointCoordinate) {
      newPosition = startPointCoordinate;
    }
    this.emit({ type: 'endPointMoved', data: newPosition });
  }

  _handleEndPointMouseUp() {
    $(document).off('mousemove', this._handleEndPointMouseMove);
    $(document).off('mouseup', this._handleEndPointMouseUp);
  }

  createSliderElements() {
    this.$sliderElement = document.createElement('div');
    this.$sliderElement.classList.add('slider');

    this.$sliderValuesElement = document.createElement('div');
    this.$sliderValuesElement.classList.add('slider__values');

    this.$startLimitValueElement = document.createElement('span');
    this.$startLimitValueElement.classList.add('slider__start-limit-value', 'js-slider__start-limit-value');
    this.$sliderValuesElement.append(this.$startLimitValueElement);

    this.$delimiterElement = document.createElement('span');
    this.$delimiterElement.classList.add('slider__delimiter');
    this.$sliderValuesElement.append(this.$delimiterElement);

    this.$endLimitValueElement = document.createElement('span');
    this.$endLimitValueElement.classList.add('slider__end-limit-value', 'js-slider__end-limit-value');
    this.$sliderValuesElement.append(this.$endLimitValueElement);

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

  _initEventListeners() {
    $(this.$rootElement).on('mousedown', this._handleSliderClick);
    $(this.$startPointElement).on('mousedown', this._handleStartPointMouseDown);
    $(this.$endPointElement).on('mousedown', this._handleEndPointMouseDown);
  }
}

export default View;
