/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
class Slider {
  constructor($rootElement) {
    this.$rootElement = $rootElement;
    this.$rangeLine = $(this.$rootElement).find('.js-slider__range-line');
    this.$startPointElement = $(this.$rootElement).find('.js-slider__point_position_start');
    this.$endPointElement = $(this.$rootElement).find('.js-slider__point_position_end');

    this._handleSliderClick = this._handleSliderClick.bind(this);
    this._handleStartPointMouseDown = this._handleStartPointMouseDown.bind(this);
    this._handleStartPointMouseMove = this._handleStartPointMouseMove.bind(this);
    this._handleStartPointMouseUp = this._handleStartPointMouseUp.bind(this);
    this._handleEndPointMouseDown = this._handleEndPointMouseDown.bind(this);
    this._handleEndPointMouseMove = this._handleEndPointMouseMove.bind(this);
    this._handleEndPointMouseUp = this._handleEndPointMouseUp.bind(this);

    this._initEventListeners();
  }

  _handleSliderClick(event) {
    const sliderStartCoordinate = $(this.$rootElement).offset().left;
    const sliderEndCoordinate = sliderStartCoordinate + $(this.$rootElement).width();

    // Вычисляю координаты середины выделенной области слайдера,
    // чтобы определить, ближе к какому из бегунков был совершен клик
    const startPointCoordinate = parseInt($(this.$rangeLine).css('left'), 10) + sliderStartCoordinate;
    const rangeLineWidth = $(this.$rangeLine).width();
    const rangeLineCenterCoordinate = startPointCoordinate + rangeLineWidth / 2;

    if (event.pageX <= rangeLineCenterCoordinate) {
      const newPosition = event.pageX - sliderStartCoordinate;
      if (newPosition >= 0) {
        $(this.$rangeLine).css('left', `${newPosition}px`);
      }
    } else {
      const newPosition = sliderEndCoordinate - event.pageX;
      if (newPosition >= 0) {
        $(this.$rangeLine).css('right', `${newPosition}px`);
      }
    }
  }

  _handleStartPointMouseDown(event) {
    $(document).on('mousemove', this._handleStartPointMouseMove);
    $(document).on('mouseup', this._handleStartPointMouseUp);
  }

  _handleStartPointMouseMove(event) {
    console.log('Тянем-потянем! левый');
    const sliderStartCoordinate = $(this.$rootElement).offset().left;
    const newPosition = event.pageX - sliderStartCoordinate;
    if (newPosition >= 0) {
      $(this.$rangeLine).css('left', `${newPosition}px`);
    }
  }

  _handleStartPointMouseUp(event) {
    $(document).off('mousemove', this._handleStartPointMouseMove);
    $(document).off('mouseup', this._handleStartPointMouseUp);
    console.log('mouse up! левый');
  }

  _handleEndPointMouseDown(event) {
    $(document).on('mousemove', this._handleEndPointMouseMove);
    $(document).on('mouseup', this._handleEndPointMouseUp);
  }

  _handleEndPointMouseMove(event) {
    console.log('Тянем-потянем! правый');
    const sliderEndCoordinate = $(this.$rootElement).offset().left + $(this.$rootElement).width();
    const newPosition = sliderEndCoordinate - event.pageX;
    if (newPosition >= 0) {
      $(this.$rangeLine).css('right', `${newPosition}px`);
    }
  }

  _handleEndPointMouseUp(event) {
    $(document).off('mousemove', this._handleEndPointMouseMove);
    $(document).off('mouseup', this._handleEndPointMouseUp);
    console.log('mouse up! правый');
  }

  _initEventListeners() {
    $(this.$rootElement).on('mousedown', this._handleSliderClick);
    $(this.$startPointElement).on('mousedown', this._handleStartPointMouseDown);
    $(this.$endPointElement).on('mousedown', this._handleEndPointMouseDown);
  }
}

export default Slider;
