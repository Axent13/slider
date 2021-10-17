class RangeLine {
  $rangeLineElement: HTMLElement;

  constructor() {
    this.$rangeLineElement = this.createRangeLineElement();
  }

  createRangeLineElement() {
    const $rangeLineElement = document.createElement('div');
    $rangeLineElement.classList.add('slider__range-line', 'js-slider__range-line');
    // if (this.isVertical) {
    //   $rangeLineElement.classList.add('slider__range-line_vertical');
    // }

    return $rangeLineElement;
  }
}

export default RangeLine;
