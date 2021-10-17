interface IPoint {
  isStart: boolean;
}

class Point {
  isStart: boolean;
  $pointElement: HTMLElement;
  $tipElement: HTMLElement;

  constructor(options: IPoint) {
    this.isStart = options.isStart;

    this.$pointElement = this.createPointElement();
    this.$tipElement = this.createTipElement();
    this.$pointElement.append(this.$tipElement);
  }

  createPointElement() {
    const $pointElement = document.createElement('div');
    if (this.isStart) {
      $pointElement.classList.add(
        'slider__point',
        'slider__point_position_start',
        'js-slider__point_position_start',
      );
    } else {
      $pointElement.classList.add(
        'slider__point',
        'slider__point_position_end',
        'js-slider__point_position_end',
      );
    }
    // if (this.isVertical) {
    //   $pointElement.classList.add('slider__point_position_start_vertical');
    // }

    return $pointElement;
  }

  createTipElement() {
    const $tipElement = document.createElement('div');
    $tipElement.classList.add(
      'slider__tip',
      'slider__tip_position_start',
      'js-slider__tip_position_start',
    );

    return $tipElement;
  }
}

export default Point;
