import Observer from '../Observer/observer.ts';

interface ModelOptions {
  minValue?: number;
  maxValue?: number;
  startSelectedValue?: number;
  endSelectedValue?: number;
  step?: number;
}

class Model extends Observer {
  minValue: number;
  maxValue: number;
  range: number;
  startSelectedValue: number;
  endSelectedValue: number;
  step: number;

  constructor(options: ModelOptions) {
    super();

    this.minValue = options.minValue || 0;
    this.maxValue = options.maxValue || 100;
    this.range = this.maxValue - this.minValue;
    this.startSelectedValue = options.startSelectedValue || (this.range / 4 + this.minValue);
    this.endSelectedValue = options.endSelectedValue || (this.range - this.range / 4 + this.minValue);
    this.step = options.step || 1;
  }

  correctNewValueToStep(newValue: number) {
    const reminder = newValue % this.step;

    if (reminder < this.step / 2) {
      return newValue - reminder;
    }

    return newValue - reminder + this.step;
  }

  getMinValue() {
    return this.minValue;
  }

  getMaxValue() {
    return this.maxValue;
  }

  getRange() {
    return this.range;
  }

  getStartSelectedValue() {
    return this.correctNewValueToStep(this.startSelectedValue);
  }

  getEndSelectedValue() {
    return this.correctNewValueToStep(this.endSelectedValue);
  }

  setMinValue(newValue: number) {
    this.minValue = this.correctNewValueToStep(newValue);
    this.setRange(this.minValue, this.maxValue);
  }

  setMaxValue(newValue: number) {
    this.maxValue = this.correctNewValueToStep(newValue);
    this.setRange(this.minValue, this.maxValue);
  }

  setRange(newMinValue: number, newMaxValue: number) {
    this.range = newMaxValue - newMinValue;
  }

  setStartSelectedValue(newValue: number) {
    this.startSelectedValue = this.correctNewValueToStep(newValue);
    this.emit({ type: 'modelUpdatedStartSelectedValue', data: this.startSelectedValue });
  }

  setEndSelectedValue(newValue: number) {
    this.endSelectedValue = this.correctNewValueToStep(newValue);
    this.emit({ type: 'modelUpdatedEndSelectedValue', data: this.endSelectedValue });
  }
}

export default Model;
