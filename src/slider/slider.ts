class Slider {
  $rootElement: HTMLElement | JQuery<HTMLElement>;

  $startPointElement: HTMLElement | JQuery<HTMLElement>;

  $endPointElement: HTMLElement | JQuery<HTMLElement>;

  $rangeLine: HTMLElement | JQuery<HTMLElement>;

  constructor($rootElement: HTMLElement) {
    this.$rootElement = $rootElement;
    this.$rangeLine = $(this.$rootElement).find('.js-slider__range-line');
    this.$startPointElement = $(this.$rootElement).find('.js-slider__point_position_start');
    this.$endPointElement = $(this.$rootElement).find('.js-slider__point_position_end');
  }
}

export default Slider;
