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
    $(this.$rangeLineElement).css('left', `${coordinate}%`);
  }

  setStartTipValue(value: number) {
    $(this.$startTipElement).text(value);
  }

  setStartLimitValue(value: number) {
    $(this.$startLimitValueElement).text(value);
  }

  setEndPointPosition(coordinate: number) {
    $(this.$rangeLineElement).css('right', `${100 - coordinate}%`);
  }

  setEndTipValue(value: number) {
    $(this.$endTipElement).text(100 - value);
  }

  setEndLimitValue(value: number) {
    $(this.$endLimitValueElement).text(value);
  }

  getSliderWidth() {
    return $(this.$rootElement).width();
  }

  _handleSliderClick(event: any) {
    const sliderStartCoordinate = $(this.$rootElement).offset()?.left || 0;
    const sliderWidth = this.getSliderWidth() || 0;

    // Вычисляю координаты середины выделенной области слайдера,
    // чтобы определить, ближе к какому из бегунков был совершен клик
    const rangeLineCssLeftValue = this.$rangeLineElement.style.left;
    const startPointCoordinate = parseInt(rangeLineCssLeftValue.slice(0, -1), 10);
    const rangeLineCssRightValue = this.$rangeLineElement.style.right;
    const endPointCoordinate = 100 - parseInt(rangeLineCssRightValue.slice(0, -1), 10);

    const rangeLineCenterCoordinate = (startPointCoordinate + endPointCoordinate) / 2;
    const mouseCoordinateInPercents = ((event.pageX - sliderStartCoordinate) * 100) / sliderWidth;

    if (mouseCoordinateInPercents < rangeLineCenterCoordinate) {
      this.emit({ type: 'sliderClickedCloserToStartPoint', data: mouseCoordinateInPercents });
    } else {
      this.emit({ type: 'sliderClickedCloserToEndPoint', data: mouseCoordinateInPercents });
    }
  }

  _handleStartPointMouseDown() {
    $(document).on('mousemove', this._handleStartPointMouseMove);
    $(document).on('mouseup', this._handleStartPointMouseUp);
  }

  _handleStartPointMouseMove(event: any) {
    const sliderStartCoordinate = $(this.$rootElement).offset()?.left || 0;
    const sliderWidth = this.getSliderWidth() || 0;
    const rangeLineCssRightValue = this.$rangeLineElement.style.right;
    const endPointCoordinate = 100 - parseInt(rangeLineCssRightValue.slice(0, -1), 10);

    const mouseCoordinateInPercents = ((event.pageX - sliderStartCoordinate) * 100) / sliderWidth;
    let newStartPointPostion = mouseCoordinateInPercents;

    if (mouseCoordinateInPercents <= 0) {
      newStartPointPostion = 0;
    } else if (mouseCoordinateInPercents >= endPointCoordinate) {
      newStartPointPostion = endPointCoordinate;
    }

    this.emit({ type: 'startPointMoved', data: newStartPointPostion });
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
    const sliderStartCoordinate = $(this.$rootElement).offset()?.left || 0;
    const sliderWidth = this.getSliderWidth() || 0;
    const rangeLineCssLeftValue = this.$rangeLineElement.style.left;
    const startPointCoordinate = parseInt(rangeLineCssLeftValue.slice(0, -1), 10);

    const mouseCoordinateInPercents = ((event.pageX - sliderStartCoordinate) * 100) / sliderWidth;
    let newEndPointPostion = mouseCoordinateInPercents;

    if (mouseCoordinateInPercents >= 100) {
      newEndPointPostion = 100;
    } else if (mouseCoordinateInPercents <= startPointCoordinate) {
      newEndPointPostion = startPointCoordinate;
    }
    this.emit({ type: 'endPointMoved', data: newEndPointPostion });
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
