import Observer from '../Observer/observer.ts';

class View extends Observer {
  $rootElement: HTMLElement;
  $sliderElement: HTMLElement;
  $sliderValuesElement: HTMLElement;
  $startLimitValueElement: HTMLElement;
  $delimiterElement: HTMLElement;
  $endLimitValueElement: HTMLElement;
  $backgroundLineElement: HTMLElement;
  $rangeLineElement: HTMLElement;
  $startPointElement: HTMLElement;
  $startTipElement: HTMLElement;
  $endPointElement: HTMLElement;
  $endTipElement: HTMLElement;

  constructor($rootElement: HTMLElement) {
    super();

    this.$rootElement = $rootElement;
    this.$sliderElement = View.createSliderElement();
    this.$sliderValuesElement = View.createSliderValuesElement();
    this.$startLimitValueElement = View.createStartLimitValueElement();
    this.$sliderValuesElement.append(this.$startLimitValueElement);
    this.$delimiterElement = View.createDelimeterElement();
    this.$sliderValuesElement.append(this.$delimiterElement);
    this.$endLimitValueElement = View.createEndLimitValueElement();
    this.$sliderValuesElement.append(this.$endLimitValueElement);
    this.$sliderElement.append(this.$sliderValuesElement);
    this.$backgroundLineElement = View.createBackgroundLineElement();
    this.$rangeLineElement = View.createRangeLineElement();
    this.$startPointElement = View.createStartPointElement();
    this.$startTipElement = View.createStartTipElement();
    this.$startPointElement.append(this.$startTipElement);
    this.$endPointElement = View.createEndPointElement();
    this.$endTipElement = View.createEndTipElement();
    this.$endPointElement.append(this.$endTipElement);
    this.$rangeLineElement.append(this.$startPointElement);
    this.$rangeLineElement.append(this.$endPointElement);
    this.$backgroundLineElement.append(this.$rangeLineElement);
    this.$sliderElement.append(this.$backgroundLineElement);
    this.$rootElement.append(this.$sliderElement);

    this._handleSliderClick = this._handleSliderClick.bind(this);
    this._handleStartPointMouseDown = this._handleStartPointMouseDown.bind(this);
    this._handleStartPointMouseMove = this._handleStartPointMouseMove.bind(this);
    this._handleStartPointMouseUp = this._handleStartPointMouseUp.bind(this);
    this._handleEndPointMouseDown = this._handleEndPointMouseDown.bind(this);
    this._handleEndPointMouseMove = this._handleEndPointMouseMove.bind(this);
    this._handleEndPointMouseUp = this._handleEndPointMouseUp.bind(this);
    this._initEventListeners();
  }

  static createSliderElement() {
    const $sliderElement = document.createElement('div');
    $sliderElement.classList.add('slider');

    return $sliderElement;
  }

  static createSliderValuesElement() {
    const $sliderValuesElement = document.createElement('div');
    $sliderValuesElement.classList.add('slider__values');

    return $sliderValuesElement;
  }

  static createStartLimitValueElement() {
    const $startLimitValueElement = document.createElement('span');
    $startLimitValueElement.classList.add('slider__start-limit-value', 'js-slider__start-limit-value');

    return $startLimitValueElement;
  }

  static createDelimeterElement() {
    const $delimiterElement = document.createElement('span');
    $delimiterElement.classList.add('slider__delimiter');

    return $delimiterElement;
  }

  static createEndLimitValueElement() {
    const $endLimitValueElement = document.createElement('span');
    $endLimitValueElement.classList.add('slider__end-limit-value', 'js-slider__end-limit-value');

    return $endLimitValueElement;
  }

  static createBackgroundLineElement() {
    const $backgroundLineElement = document.createElement('div');
    $backgroundLineElement.classList.add('slider__background-line');

    return $backgroundLineElement;
  }

  static createRangeLineElement() {
    const $rangeLineElement = document.createElement('div');
    $rangeLineElement.classList.add('slider__range-line', 'js-slider__range-line');

    return $rangeLineElement;
  }

  static createStartPointElement() {
    const $startPointElement = document.createElement('div');
    $startPointElement.classList.add(
      'slider__point',
      'slider__point_position_start',
      'js-slider__point_position_start',
    );

    return $startPointElement;
  }

  static createStartTipElement() {
    const $startTipElement = document.createElement('div');
    $startTipElement.classList.add(
      'slider__tip',
      'slider__tip_position_start',
      'js-slider__tip_position_start',
    );

    return $startTipElement;
  }

  static createEndPointElement() {
    const $endPointElement = document.createElement('div');
    $endPointElement.classList.add(
      'slider__point',
      'slider__point_position_end',
      'js-slider__point_position_end',
    );

    return $endPointElement;
  }

  static createEndTipElement() {
    const $endTipElement = document.createElement('div');
    $endTipElement.classList.add(
      'slider__tip',
      'slider__tip_position_end',
      'js-slider__tip_position_end',
    );

    return $endTipElement;
  }

  setStartPointPosition(coordinate: number) {
    $(this.$rangeLineElement).css('left', `${coordinate}px`);
  }

  setStartTipValue(value: number) {
    $(this.$startTipElement).text(value);
  }

  setStartLimitValue(value: number) {
    $(this.$startLimitValueElement).text(value);
  }

  setEndPointPosition(coordinate: number) {
    $(this.$rangeLineElement).css('right', `${coordinate}px`);
  }

  setEndTipValue(value: number) {
    $(this.$endTipElement).text(value);
  }

  setEndLimitValue(value: number) {
    $(this.$endLimitValueElement).text(value);
  }

  _handleSliderClick(event: any) {
    console.log('Slider clicked!');
    const sliderStartCoordinate = $(this.$backgroundLineElement).offset()?.left || 0;
    const sliderWidth = $(this.$rootElement).width() || 0;
    const sliderEndCoordinate = sliderStartCoordinate + sliderWidth;

    // Вычисляю координаты середины выделенной области слайдера,
    // чтобы определить, ближе к какому из бегунков был совершен клик
    const startPointCoordinate = parseInt($(this.$rangeLineElement).css('left'), 10) + sliderStartCoordinate;
    const rangeLineWidth = $(this.$rangeLineElement).width() || 0;
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

  _handleStartPointMouseMove(event: any) {
    console.log(event.type);
    const sliderStartCoordinate = $(this.$rootElement).offset()?.left || 0;
    let newPosition = event.pageX - sliderStartCoordinate;
    const sliderWidth = $(this.$rootElement).width() || 0;
    const endPointCoordinate = sliderWidth - parseInt($(this.$rangeLineElement).css('right'), 10);

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

  _handleEndPointMouseMove(event: any) {
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

  _initEventListeners() {
    $(this.$rootElement).on('mousedown', this._handleSliderClick);
    $(this.$startPointElement).on('mousedown', this._handleStartPointMouseDown);
    $(this.$endPointElement).on('mousedown', this._handleEndPointMouseDown);
  }
}

export default View;
