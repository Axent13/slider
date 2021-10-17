interface IScaleOptions {
  $sliderElement: HTMLElement;
  scalePoints?: number;
}

class Scale {
  $scaleElement: HTMLElement;
  $sliderElement: HTMLElement;
  scalePoints: number;

  constructor(options: IScaleOptions) {
    this.$sliderElement = options.$sliderElement;
    this.scalePoints = options.scalePoints || 5;

    this.$scaleElement = document.createElement('div');
    this.$scaleElement.classList.add('slider__scale');
    const $scalePointsElement = document.createElement('div');
    $scalePointsElement.classList.add('slider__scale-points');
    const $scaleValuesElement = document.createElement('div');
    $scaleValuesElement.classList.add('slider__scale-values');

    for (let pointIndex = 0; pointIndex < this.scalePoints - 1; pointIndex += 1) {
      const $scalePointElement = document.createElement('div');
      $scalePointElement.classList.add('slider__scale-point');
      $scalePointsElement.append($scalePointElement);
    }
    $scalePointsElement.children[this.scalePoints - 2].classList.add('slider__scale-point_last'); // либо в css поиграться с last-child
    this.$scaleElement.appendChild($scalePointsElement);

    for (let valueIndex = 0; valueIndex < this.scalePoints; valueIndex += 1) {
      const $scaleValueElement = document.createElement('div');
      $scaleValueElement.classList.add('slider__scale-value');
      $scaleValuesElement.append($scaleValueElement);
    }
    $scaleValuesElement.children[this.scalePoints - 1].classList.add('slider__scale-value_last'); // либо в css поиграться с last-child
    this.$scaleElement.appendChild($scaleValuesElement);

    this.$sliderElement.appendChild(this.$scaleElement);
  }

  getScalePoints() {
    return this.scalePoints;
  }

  setScaleValues(scaleValues: number[]) {
    const $valuesElement = this.$scaleElement.children[this.$scaleElement.children.length - 1];

    $($valuesElement.children).each((elementIndex, $valueElement) => {
      $($valueElement).text(`${scaleValues[elementIndex]}`);
    });
  }
}

export default Scale;
