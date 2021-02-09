import Model from './model';
import View from './view';

class Presenter {
  constructor($rootElement) {
    this.$rootElement = $rootElement;
    this.model = new Model({
      minValue: 0,
      maxValue: 100,
    });
    this.view = new View($rootElement);

    this.model.subscribe(this);
    this.view.subscribe(this);

    this.setInitaialValues();
  }

  setInitaialValues() {
    const startValue = this.model.getStartSelectedValue();
    const endValue = this.model.getEndSelectedValue();
    this.view.setStartPointPosition(this._valueToPixels(startValue));
    this.view.setStartTipValue(startValue);
    this.view.setStartLimitValue(this.model.getMinValue());
    this.view.setEndPointPosition(this._valueToPixels(this.model.getMaxValue() - endValue));
    this.view.setEndTipValue(endValue);
    this.view.setEndLimitValue(this.model.getMaxValue());
  }

  _pixelsToValue(pixels) {
    return Math.round((pixels * this.model.getRange()) / $(this.$rootElement).width());
  }

  _valueToPixels(value) {
    return Math.round(($(this.$rootElement).width() * value) / this.model.getRange());
  }

  update(action) {
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
      default:
        this.model.receivedData = 'no data received';
        break;
    }
  }
}

export default Presenter;
