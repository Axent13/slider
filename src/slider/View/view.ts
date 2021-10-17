import Observer from '../Observer/observer.ts';
import Scale from '../View/subViews/scale.ts';

interface IViewOptions {
  $rootElement: HTMLElement;
  isVertical?: boolean;
  hasScale?: boolean;
  scalePoints?: number;
}

class View extends Observer {
  $rootElement: HTMLElement;
  isVertical: boolean;
  hasScale: boolean;
  scalePoints: number;
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
  scaleElement: Scale;

  constructor(options: IViewOptions) {
    super();

    this.$rootElement = options.$rootElement;
    this.isVertical = options.isVertical || false;
    this.hasScale = options.hasScale || false;
    this.scalePoints = options.scalePoints || 5;

    this.$sliderElement = View.createSliderElement();
    this.$sliderValuesElement = View.createSliderValuesElement();
    this.$startLimitValueElement = View.createStartLimitValueElement();
    this.$sliderValuesElement.append(this.$startLimitValueElement);
    this.$delimiterElement = View.createDelimeterElement();
    this.$sliderValuesElement.append(this.$delimiterElement);
    this.$endLimitValueElement = View.createEndLimitValueElement();
    this.$sliderValuesElement.append(this.$endLimitValueElement);
    this.$sliderElement.append(this.$sliderValuesElement);

    this.$backgroundLineElement = this.createBackgroundLineElement();
    this.$rangeLineElement = this.createRangeLineElement();
    this.$startPointElement = this.createStartPointElement();
    this.$startTipElement = View.createStartTipElement();
    this.$startPointElement.append(this.$startTipElement);
    this.$endPointElement = this.createEndPointElement();
    this.$endTipElement = View.createEndTipElement();
    this.$endPointElement.append(this.$endTipElement);
    this.$rangeLineElement.append(this.$startPointElement);
    this.$rangeLineElement.append(this.$endPointElement);
    this.$backgroundLineElement.append(this.$rangeLineElement);
    this.$sliderElement.append(this.$backgroundLineElement);

    this.scaleElement = new Scale({
      $sliderElement: this.$sliderElement,
      scalePoints: this.scalePoints,
    });

    this.$sliderElement.append(this.scaleElement.$scaleElement);

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

  createBackgroundLineElement() {
    const $backgroundLineElement = document.createElement('div');
    $backgroundLineElement.classList.add('slider__background-line');
    if (this.isVertical) {
      $backgroundLineElement.classList.add('slider__background-line_vertical');
    }

    return $backgroundLineElement;
  }

  createRangeLineElement() {
    const $rangeLineElement = document.createElement('div');
    $rangeLineElement.classList.add('slider__range-line', 'js-slider__range-line');
    if (this.isVertical) {
      $rangeLineElement.classList.add('slider__range-line_vertical');
    }

    return $rangeLineElement;
  }

  createStartPointElement() {
    const $startPointElement = document.createElement('div');
    $startPointElement.classList.add(
      'slider__point',
      'slider__point_position_start',
      'js-slider__point_position_start',
    );
    if (this.isVertical) {
      $startPointElement.classList.add('slider__point_position_start_vertical');
    }

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

  setScaleValues(scaleValues: number[]) {
    this.scaleElement.setScaleValues(scaleValues);
  }

  getScalePoints() {
    return this.scaleElement.getScalePoints();
  }

  createEndPointElement() {
    const $endPointElement = document.createElement('div');
    $endPointElement.classList.add(
      'slider__point',
      'slider__point_position_end',
      'js-slider__point_position_end',
    );
    if (this.isVertical) {
      $endPointElement.classList.add('slider__point_position_end_vertical');
    }

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
    if (this.isVertical) {
      $(this.$rangeLineElement).css('top', `${coordinate}%`);
      $(this.$rangeLineElement).css('height', `${100 - coordinate}%`);
    } else {
      $(this.$rangeLineElement).css('left', `${coordinate}%`);
    }
  }

  setStartTipValue(value: number) {
    $(this.$startTipElement).text(value);
  }

  setStartLimitValue(value: number) {
    $(this.$startLimitValueElement).text(value);
  }

  setEndPointPosition(coordinate: number) {
    if (this.isVertical) {
      const rangeLineCssTopValue = this.$rangeLineElement.style.top;
      const startPointCoordinate = parseInt(rangeLineCssTopValue.slice(0, -1), 10);
      $(this.$rangeLineElement).css('height', `${coordinate - startPointCoordinate}%`);
    } else {
      $(this.$rangeLineElement).css('right', `${100 - coordinate}%`);
    }
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

  getSliderHeight() {
    return $(this.$rootElement).height();
  }

  _handleSliderClick(event: any) {
    let rangeLineCenterCoordinate = 0; // null
    let mouseCoordinateInPercents = 0; // null

    if (this.isVertical) {
      const sliderStartCoordinate = $(this.$rootElement).offset()?.top || 0;
      const backgroundLineHeight = $(this.$backgroundLineElement).height() || 0;

      // Вычисляю координаты середины выделенной области слайдера,
      // чтобы определить, ближе к какому из бегунков был совершен клик
      const rangeLineCssTopValue = this.$rangeLineElement.style.top;
      const startPointCoordinate = parseInt(rangeLineCssTopValue.slice(0, -1), 10);
      const rangeLineCssHeightValue = this.$rangeLineElement.style.height;
      const endPointCoordinate = parseInt(rangeLineCssHeightValue.slice(0, -1), 10) + startPointCoordinate;

      rangeLineCenterCoordinate = (startPointCoordinate + endPointCoordinate) / 2;
      mouseCoordinateInPercents = ((event.pageY - sliderStartCoordinate) * 100) / backgroundLineHeight;
    } else {
      const sliderStartCoordinate = $(this.$rootElement).offset()?.left || 0;
      const sliderWidth = this.getSliderWidth() || 0;

      // Вычисляю координаты середины выделенной области слайдера,
      // чтобы определить, ближе к какому из бегунков был совершен клик
      const rangeLineCssLeftValue = this.$rangeLineElement.style.left;
      const startPointCoordinate = parseInt(rangeLineCssLeftValue.slice(0, -1), 10);
      const rangeLineCssRightValue = this.$rangeLineElement.style.right;
      const endPointCoordinate = 100 - parseInt(rangeLineCssRightValue.slice(0, -1), 10);

      rangeLineCenterCoordinate = (startPointCoordinate + endPointCoordinate) / 2;
      mouseCoordinateInPercents = ((event.pageX - sliderStartCoordinate) * 100) / sliderWidth;
    }

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
    let newStartPointPostion = null;
    if (this.isVertical) {
      const sliderStartCoordinate = $(this.$rootElement).offset()?.top || 0;
      const backgroundLineHeight = $(this.$backgroundLineElement).height() || 0;
      const mouseCoordinateInPercents = ((event.pageY - sliderStartCoordinate) * 100) / backgroundLineHeight;

      newStartPointPostion = mouseCoordinateInPercents;
    } else {
      const sliderStartCoordinate = $(this.$rootElement).offset()?.left || 0;
      const sliderWidth = this.getSliderWidth() || 0;
      const rangeLineCssRightValue = this.$rangeLineElement.style.right;
      const endPointCoordinate = 100 - parseInt(rangeLineCssRightValue.slice(0, -1), 10);

      const mouseCoordinateInPercents = ((event.pageX - sliderStartCoordinate) * 100) / sliderWidth;
      newStartPointPostion = mouseCoordinateInPercents;

      if (mouseCoordinateInPercents <= 0) {
        newStartPointPostion = 0;
      } else if (mouseCoordinateInPercents >= endPointCoordinate) {
        newStartPointPostion = endPointCoordinate;
      }
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
    let newEndPointPostion = null;
    if (this.isVertical) {
      const sliderStartCoordinate = $(this.$rootElement).offset()?.top || 0;
      const backgroundLineHeight = $(this.$backgroundLineElement).height() || 0;
      const mouseCoordinateInPercents = ((event.pageY - sliderStartCoordinate) * 100) / backgroundLineHeight;

      newEndPointPostion = mouseCoordinateInPercents;
    } else {
      const sliderStartCoordinate = $(this.$rootElement).offset()?.left || 0;
      const sliderWidth = this.getSliderWidth() || 0;
      const rangeLineCssLeftValue = this.$rangeLineElement.style.left;
      const startPointCoordinate = parseInt(rangeLineCssLeftValue.slice(0, -1), 10);

      const mouseCoordinateInPercents = ((event.pageX - sliderStartCoordinate) * 100) / sliderWidth;
      newEndPointPostion = mouseCoordinateInPercents;

      if (mouseCoordinateInPercents >= 100) {
        newEndPointPostion = 100;
      } else if (mouseCoordinateInPercents <= startPointCoordinate) {
        newEndPointPostion = startPointCoordinate;
      }
    }

    this.emit({ type: 'endPointMoved', data: newEndPointPostion });
  }

  _handleEndPointMouseUp() {
    $(document).off('mousemove', this._handleEndPointMouseMove);
    $(document).off('mouseup', this._handleEndPointMouseUp);
  }

  _initEventListeners() {
    $(this.$sliderElement).on('mousedown', this._handleSliderClick);
    $(this.$startPointElement).on('mousedown', this._handleStartPointMouseDown);
    $(this.$endPointElement).on('mousedown', this._handleEndPointMouseDown);
  }
}

export default View;
