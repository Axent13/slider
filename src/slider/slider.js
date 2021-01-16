class Slider {
  constructor($rootElement) {
    this.$rootElement = $rootElement;
    this.$rangeLine = $(this.$rootElement).find('.js-slider__range-line');
    this.$startPointElement = $(this.$rootElement).find('.js-slider__point_position_start');
    this.$endPointElement = $(this.$rootElement).find('.js-slider__point_position_end');

    this._initEventListeners();
  }

  _handleSliderClick(event) {
    const sliderStartCoordinate = $(this.$rootElement).offset().left;
    const sliderWidth = $(this.$rootElement).width();
    const sliderEndCoordinate = sliderStartCoordinate + sliderWidth;

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

  _initEventListeners() {
    $(this.$rootElement).on('mousedown', this._handleSliderClick.bind(this));
  }
}

export default Slider;
