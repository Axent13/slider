/* eslint-disable max-len */
import Model from '../Model/model.ts';
import View from '../View/view.ts';

interface IPresenterOptions {
  step: number;
  minValue: number;
  maxValue: number;
}

class Presenter {
  $rootElement: HTMLElement;
  model: Model;
  view: View;

  constructor($rootElement: HTMLElement, options: IPresenterOptions) {
    this.$rootElement = $rootElement;

    this.model = new Model({
      minValue: options.minValue,
      maxValue: options.maxValue,
      step: options.step,
    });
    this.view = new View($rootElement);

    this.model.subscribe(this);
    this.view.subscribe(this);

    this.setInitialViewValues();
  }

  setInitialViewValues() {
    const startSelectedValue = this.model.getStartSelectedValue();
    const endSelectedValue = this.model.getEndSelectedValue();
    this.view.setStartPointPosition(this._transformModelValueToViewPercent(startSelectedValue));
    this.view.setStartTipValue(startSelectedValue);
    this.view.setStartLimitValue(this.model.getMinValue());
    this.view.setEndPointPosition(this._transformModelValueToViewPercent(endSelectedValue));
    this.view.setEndTipValue(100 - endSelectedValue);
    this.view.setEndLimitValue(this.model.getMaxValue());
  }

  // eslint-disable-next-line class-methods-use-this
  _transformViewPercentToModelValue(percents: number) {
    return ((percents * this.model.getRange()) / 100) + this.model.getMinValue();
  }

  // eslint-disable-next-line class-methods-use-this
  _transformModelValueToViewPercent(value: number) {
    return ((value - this.model.getMinValue()) * 100) / this.model.getRange();
  }

  update(action: {type: string, data: number}) {
    switch (action.type) {
      case 'sliderClickedCloserToStartPoint': {
        const newValue = this._transformViewPercentToModelValue(action.data);
        this.model.setStartSelectedValue(newValue);
        break;
      }
      case 'sliderClickedCloserToEndPoint': {
        const newValue = this._transformViewPercentToModelValue(action.data);
        this.model.setEndSelectedValue(newValue);
        break;
      }
      case 'modelUpdatedStartSelectedValue': {
        const newValue = this._transformModelValueToViewPercent(action.data);
        this.view.setStartPointPosition(newValue);
        this.view.setStartTipValue(action.data);
        break;
      }
      case 'modelUpdatedEndSelectedValue': {
        const newValue = this._transformModelValueToViewPercent(action.data);
        this.view.setEndPointPosition(newValue);
        this.view.setEndTipValue(100 - action.data);
        break;
      }
      case 'startPointMoved': {
        const newValue = this._transformViewPercentToModelValue(action.data);
        this.model.setStartSelectedValue(newValue);
        break;
      }
      case 'endPointMoved': {
        const newValue = this._transformViewPercentToModelValue(action.data);
        this.model.setEndSelectedValue(newValue);
        break;
      }
      case 'modelUpdatedMinValue': {        
        this.view.setStartLimitValue(action.data);
        break;
      }
      case 'modelUpdatedMaxValue': {        
        this.view.setEndLimitValue(action.data);
        break;
      }
      default:
        console.log('Unknown action type');
        break;
    }
  }
}

export default Presenter;
