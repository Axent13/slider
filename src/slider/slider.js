/* eslint-disable max-len */
import Model from './model';
import View from './view';

class Slider {
  constructor($rootElement) {
    this.model = new Model({
      minValue: 10,
      maxValue: 200,
    });

    this.view = new View($rootElement);

    // this.$rootElement = $rootElement;
    // this.$startValueElement = $(this.$rootElement).find('.js-slider__start-value');
    // this.$endValueElement = $(this.$rootElement).find('.js-slider__end-value');
    // this.$startValueElement.text(this.model.getMinValue());
    // this.$endValueElement.text(this.model.getMaxValue());

    this.$rangeLine = $(this.$rootElement).find('.js-slider__range-line');
    this.$startPointElement = $(this.$rootElement).find('.js-slider__point_position_start');
    this.$endPointElement = $(this.$rootElement).find('.js-slider__point_position_end');
    this.$startPointInfoElement = $(this.$rootElement).find('.js-slider__value_position_start');
    this.$endPointInfoElement = $(this.$rootElement).find('.js-slider__value_position_end');

    this._handleSliderClick = this._handleSliderClick.bind(this);
    this._handleStartPointMouseDown = this._handleStartPointMouseDown.bind(this);
    this._handleStartPointMouseMove = this._handleStartPointMouseMove.bind(this);
    this._handleStartPointMouseUp = this._handleStartPointMouseUp.bind(this);
    this._handleEndPointMouseDown = this._handleEndPointMouseDown.bind(this);
    this._handleEndPointMouseMove = this._handleEndPointMouseMove.bind(this);
    this._handleEndPointMouseUp = this._handleEndPointMouseUp.bind(this);

    this._initEventListeners();
  }

  // // мб это будет как раз в Фасаде?
  // _pixelsToValue(pixels) {
  //   return Math.round((pixels * this.model.getRange()) / $(this.$rootElement).width());
  // }

  // _handleSliderClick(event) {
  //   const sliderStartCoordinate = $(this.$rootElement).offset().left;
  //   const sliderEndCoordinate = sliderStartCoordinate + $(this.$rootElement).width();

  //   // Вычисляю координаты середины выделенной области слайдера,
  //   // чтобы определить, ближе к какому из бегунков был совершен клик
  //   const startPointCoordinate = parseInt($(this.$rangeLine).css('left'), 10) + sliderStartCoordinate;
  //   const rangeLineWidth = $(this.$rangeLine).width();
  //   const rangeLineCenterCoordinate = startPointCoordinate + rangeLineWidth / 2;

  //   if (event.pageX <= rangeLineCenterCoordinate) {
  //     const newPosition = event.pageX - sliderStartCoordinate;
  //     if (newPosition >= 0) {
  //       this.model.setStartSelectedValue(newPosition); // пока меняется, но нигде не используется...
  //       $(this.$rangeLine).css('left', `${newPosition}px`);

  //       // это, похоже, тоже в фасаде
  //       const newValue = this._pixelsToValue(newPosition) + this.model.getMinValue();
  //       this.$startPointInfoElement.text(newValue);
  //       this.$startValueElement.text(newValue);
  //     }
  //   } else {
  //     const newPosition = sliderEndCoordinate - event.pageX;
  //     if (newPosition >= 0) {
  //       $(this.$rangeLine).css('right', `${newPosition}px`);

  //       const newValue = this.model.getMaxValue() - this._pixelsToValue(newPosition);
  //       this.$endPointInfoElement.text(newValue);
  //       this.$endValueElement.text(newValue);
  //     }
  //   }
  // }

  // _handleStartPointMouseDown() {
  //   $(document).on('mousemove', this._handleStartPointMouseMove);
  //   $(document).on('mouseup', this._handleStartPointMouseUp);
  // }

  // _handleStartPointMouseMove(event) {
  //   console.log('Тянем-потянем! левый');
  //   const sliderStartCoordinate = $(this.$rootElement).offset().left;
  //   let newPosition = event.pageX - sliderStartCoordinate;
  //   const endPointCoordinate = $(this.$rootElement).width() - parseInt($(this.$rangeLine).css('right'), 10);

  //   if (newPosition <= 0) {
  //     newPosition = 0;
  //   } else if (newPosition >= endPointCoordinate) {
  //     newPosition = endPointCoordinate - 5; // "- 5" - это временно, для наглядности
  //   }

  //   $(this.$rangeLine).css('left', `${newPosition}px`);

  //   const newValue = this._pixelsToValue(newPosition) + this.model.getMinValue();
  //   this.$startPointInfoElement.text(newValue);
  //   this.$startValueElement.text(newValue);
  // }

  // _handleStartPointMouseUp() {
  //   $(document).off('mousemove', this._handleStartPointMouseMove);
  //   $(document).off('mouseup', this._handleStartPointMouseUp);
  // }

  // _handleEndPointMouseDown() {
  //   $(document).on('mousemove', this._handleEndPointMouseMove);
  //   $(document).on('mouseup', this._handleEndPointMouseUp);
  // }

  // _handleEndPointMouseMove(event) {
  //   console.log('Тянем-потянем! правый');
  //   const sliderEndCoordinate = $(this.$rootElement).offset().left + $(this.$rootElement).width();
  //   let newPosition = sliderEndCoordinate - event.pageX;
  //   const startPointCoordinate = $(this.$rootElement).width() - parseInt($(this.$rangeLine).css('left'), 10);

  //   if (newPosition <= 0) {
  //     newPosition = 0;
  //   } else if (newPosition >= startPointCoordinate) {
  //     newPosition = startPointCoordinate - 5; // "- 5" - это временно, для наглядности
  //   }

  //   $(this.$rangeLine).css('right', `${newPosition}px`);

  //   const newValue = this.model.getMaxValue() - this._pixelsToValue(newPosition);
  //   this.$endPointInfoElement.text(newValue);
  //   this.$endValueElement.text(newValue);
  // }

  // _handleEndPointMouseUp() {
  //   $(document).off('mousemove', this._handleEndPointMouseMove);
  //   $(document).off('mouseup', this._handleEndPointMouseUp);
  // }

  _initEventListeners() {
    $(this.$rootElement).on('mousedown', this._handleSliderClick);
    $(this.$startPointElement).on('mousedown', this._handleStartPointMouseDown);
    $(this.$endPointElement).on('mousedown', this._handleEndPointMouseDown);
  }
}

export default Slider;
