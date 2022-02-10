import Observer from '../Observer/observer';
import Scale from './subViews/scale';
import Point from './subViews/point';
import LimitValue from './subViews/limitValue';
import BackgroundLine from './subViews/backgroundLine';
import RangeLine from './subViews/rangeLine';

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
  $sliderLimitValuesElement: HTMLElement;
  startLimitValueElement: LimitValue;
  endLimitValueElement: LimitValue;
  backgroundLineElement: BackgroundLine;
  rangeLineElement: RangeLine;
  startPointElement: Point;
  endPointElement: Point;
  scaleElement: Scale;

  constructor(options: IViewOptions) {
    super();

    this.$rootElement = options.$rootElement;
    this.isVertical = options.isVertical || false;
    this.hasScale = options.hasScale || false;
    this.scalePoints = options.scalePoints || 5;

    this.$sliderElement = View.createSliderElement();

    this.$sliderLimitValuesElement = View.createSliderValuesElement();
    this.startLimitValueElement = new LimitValue();
    this.$sliderLimitValuesElement.append(this.startLimitValueElement.$limitValueElement);
    this.endLimitValueElement = new LimitValue();
    this.$sliderLimitValuesElement.append(this.endLimitValueElement.$limitValueElement);
    this.$sliderElement.append(this.$sliderLimitValuesElement);

    this.backgroundLineElement = new BackgroundLine({
      isVertical: this.isVertical,
    });
    this.rangeLineElement = new RangeLine({
      isVertical: this.isVertical,
    });

    this.startPointElement = new Point({
      isStart: true,
      isVertical: this.isVertical,
    });
    this.endPointElement = new Point({
      isStart: false,
      isVertical: this.isVertical,
    });

    this.rangeLineElement.$rangeLineElement.append(this.startPointElement.$pointElement);
    this.rangeLineElement.$rangeLineElement.append(this.endPointElement.$pointElement);

    this.backgroundLineElement.$backgroundLineElement.append(this.rangeLineElement.$rangeLineElement);
    this.$sliderElement.append(this.backgroundLineElement.$backgroundLineElement);

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
    const $sliderLimitValuesElement = document.createElement('div');
    $sliderLimitValuesElement.classList.add('slider__limit-values');

    return $sliderLimitValuesElement;
  }

  setScaleValues(scaleValues: number[]) {
    this.scaleElement.setScaleValues(scaleValues);
  }

  getScalePoints() {
    return this.scaleElement.getScalePoints();
  }

  setStartPointPosition(coordinate: number) {
    if (this.isVertical) {
      $(this.rangeLineElement.$rangeLineElement).css('top', `${coordinate}%`);
      $(this.rangeLineElement.$rangeLineElement).css('height', `${100 - coordinate}%`);
    } else {
      $(this.rangeLineElement.$rangeLineElement).css('left', `${coordinate}%`);
    }
  }

  setStartTipValue(value: number) {
    $(this.startPointElement.$tipElement).text(value);
  }

  setStartLimitValue(value: number) {
    $(this.startLimitValueElement.$limitValueElement).text(value);
  }

  setEndPointPosition(coordinate: number) {
    if (this.isVertical) {
      const rangeLineCssTopValue = this.rangeLineElement.$rangeLineElement.style.top;
      const startPointCoordinate = parseInt(rangeLineCssTopValue.slice(0, -1), 10);
      $(this.rangeLineElement.$rangeLineElement).css('height', `${coordinate - startPointCoordinate}%`);
    } else {
      $(this.rangeLineElement.$rangeLineElement).css('right', `${100 - coordinate}%`);
    }
  }

  setEndTipValue(value: number) {
    $(this.endPointElement.$tipElement).text(100 - value);
  }

  setEndLimitValue(value: number) {
    $(this.endLimitValueElement.$limitValueElement).text(value);
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
      const backgroundLineHeight = $(this.backgroundLineElement.$backgroundLineElement).height() || 0;

      // Вычисляю координаты середины выделенной области слайдера,
      // чтобы определить, ближе к какому из бегунков был совершен клик
      const rangeLineCssTopValue = this.rangeLineElement.$rangeLineElement.style.top;
      const startPointCoordinate = parseInt(rangeLineCssTopValue.slice(0, -1), 10);
      const rangeLineCssHeightValue = this.rangeLineElement.$rangeLineElement.style.height;
      const endPointCoordinate = parseInt(rangeLineCssHeightValue.slice(0, -1), 10) + startPointCoordinate;

      rangeLineCenterCoordinate = (startPointCoordinate + endPointCoordinate) / 2;
      mouseCoordinateInPercents = ((event.pageY - sliderStartCoordinate) * 100) / backgroundLineHeight;
    } else {
      const sliderStartCoordinate = $(this.$rootElement).offset()?.left || 0;
      const sliderWidth = this.getSliderWidth() || 0;

      // Вычисляю координаты середины выделенной области слайдера,
      // чтобы определить, ближе к какому из бегунков был совершен клик
      const rangeLineCssLeftValue = this.rangeLineElement.$rangeLineElement.style.left;
      const startPointCoordinate = parseInt(rangeLineCssLeftValue.slice(0, -1), 10);
      const rangeLineCssRightValue = this.rangeLineElement.$rangeLineElement.style.right;
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
      const backgroundLineHeight = $(this.backgroundLineElement.$backgroundLineElement).height() || 0;
      const mouseCoordinateInPercents = ((event.pageY - sliderStartCoordinate) * 100) / backgroundLineHeight;

      newStartPointPostion = mouseCoordinateInPercents;
    } else {
      const sliderStartCoordinate = $(this.$rootElement).offset()?.left || 0;
      const sliderWidth = this.getSliderWidth() || 0;
      const rangeLineCssRightValue = this.rangeLineElement.$rangeLineElement.style.right;
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
      const backgroundLineHeight = $(this.backgroundLineElement.$backgroundLineElement).height() || 0;
      const mouseCoordinateInPercents = ((event.pageY - sliderStartCoordinate) * 100) / backgroundLineHeight;

      newEndPointPostion = mouseCoordinateInPercents;
    } else {
      const sliderStartCoordinate = $(this.$rootElement).offset()?.left || 0;
      const sliderWidth = this.getSliderWidth() || 0;
      const rangeLineCssLeftValue = this.rangeLineElement.$rangeLineElement.style.left;
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
    $(this.startPointElement.$pointElement).on('mousedown', this._handleStartPointMouseDown);
    $(this.endPointElement.$pointElement).on('mousedown', this._handleEndPointMouseDown);
  }
}

export default View;
