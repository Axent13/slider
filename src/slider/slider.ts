import Presenter from './Presenter/presenter';

interface ISliderOptions {
  step?: number;
  minValue?: number;
  maxValue?: number;
  isVertical?: boolean;
}

class Slider {
  presenter: Presenter;

  constructor($rootElement: HTMLElement, options: ISliderOptions) {
    this.presenter = new Presenter($rootElement, options);
  }
}

export default Slider;
