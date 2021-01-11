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

    this._initEventListeners();
  }

  _handleSliderClick(event: any) {
    // странный код, но здесь мне мешает ошибка - Object is possibly 'undefined'.ts(2532)
    // постараюсь переписать позже
    const shiftX = $(this.$rootElement)?.offset()?.left || 0;
    const newPos = event.pageX - shiftX;

    $(this.$rangeLine).css('left', `${newPos}px`);
  }

  _initEventListeners() {
    $(this.$rootElement).on('mousedown', this._handleSliderClick.bind(this));
  }
}

export default Slider;
