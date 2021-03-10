import Model from '../Model/model.ts';
import View from '../View/view.ts';

interface IControllerOptions {
  step: number;
  minValue: number;
  maxValue: number;
}

class Presenter {
  $rootElement: HTMLElement;
  step: number;
  model: Model;
  view: View;

  constructor($rootElement: HTMLElement, options: IControllerOptions) {
    this.$rootElement = $rootElement;
    this.step = 1 / options.step;

    this.model = new Model({
      minValue: options.minValue,
      maxValue: options.maxValue,
    });
    this.view = new View($rootElement);

    this.model.subscribe(this);
    this.view.subscribe(this);

    this.setInitialViewValues();
  }

  setInitialViewValues() {
    const startValue = this.model.getStartSelectedValue();
    const endValue = this.model.getEndSelectedValue();
    this.view.setStartPointPosition(this._valueToPixels(startValue));
    this.view.setStartTipValue(startValue);
    this.view.setStartLimitValue(this.model.getMinValue());
    this.view.setEndPointPosition(this._valueToPixels(this.model.getMaxValue() - endValue));
    this.view.setEndTipValue(endValue);
    this.view.setEndLimitValue(this.model.getMaxValue());
  }

  _pixelsToValue(pixels: number) {
    const sliderWidth = $(this.$rootElement).width() || 0;
    return Math.round(((pixels * this.model.getRange()) / sliderWidth) * this.step) / this.step;
  }

  _valueToPixels(value: number) {
    const sliderWidth = $(this.$rootElement).width() || 0;
    return Math.round((sliderWidth * value) / this.model.getRange());
  }

  update(action: {type: string, data: number}) {
    switch (action.type) {
      case 'sliderClickedCloserToStartPoint': {
        const newValue = this._pixelsToValue(action.data);
        this.model.setStartSelectedValue(newValue);
        break;
      }
      case 'sliderClickedCloserToEndPoint': {
        const newValue = this._pixelsToValue(action.data);
        this.model.setEndSelectedValue(newValue);
        break;
      }
      case 'modelUpdatedStartSelectedValue': {
        const newValue = this._valueToPixels(action.data);
        this.view.setStartPointPosition(newValue);
        this.view.setStartTipValue(action.data);
        break;
      }
      case 'modelUpdatedEndSelectedValue': {
        const newValue = this._valueToPixels(action.data);
        this.view.setEndPointPosition(newValue);
        this.view.setEndTipValue(this.model.getMaxValue() - action.data);
        break;
      }
      case 'startPointMoved': {
        const newValue = this._pixelsToValue(action.data);
        this.model.setStartSelectedValue(newValue);
        break;
      }
      case 'endPointMoved': {
        const newValue = this._pixelsToValue(action.data);
        this.model.setEndSelectedValue(newValue);
        break;
      }
      default:
        console.log('Unknown action type');
        break;
    }
  }
}

export default Presenter;
