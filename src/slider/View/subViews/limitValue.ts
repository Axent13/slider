class LimitValue {
  $limitValueElement: HTMLElement;

  constructor() {
    this.$limitValueElement = this.createLimitValueElement();
  }

  createLimitValueElement() {
    const $limitValueElement = document.createElement('span');
    $limitValueElement.classList.add('slider__start-limit-value');

    return $limitValueElement;
  }
}

export default LimitValue;
