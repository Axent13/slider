interface IBackgroundLine {
  isVertical: boolean;
}

class BackgroundLine {
  $backgroundLineElement: HTMLElement;
  isVertical: boolean;

  constructor(options: IBackgroundLine) {
    this.isVertical = options.isVertical || false;
    this.$backgroundLineElement = this.createBackgroundLineElement();
  }

  createBackgroundLineElement() {
    const $backgroundLineElement = document.createElement('div');
    $backgroundLineElement.classList.add('slider__background-line');
    if (this.isVertical) {
      $backgroundLineElement.classList.add('slider__background-line_vertical');
    }

    return $backgroundLineElement;
  }
}

export default BackgroundLine;
