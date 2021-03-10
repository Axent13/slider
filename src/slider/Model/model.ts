import Observer from '../Observer/observer.ts';

interface ModelOptions {
  minValue?: number;
  maxValue?: number;
  startSelectedValue?: number;
  endSelectedValue?: number;
}

class Model extends Observer {
  minValue: number;
  maxValue: number;
  range: number;
  startSelectedValue: number;
  endSelectedValue: number;

  constructor(options: ModelOptions) {
    super();

    this.minValue = options.minValue || 0;
    this.maxValue = options.maxValue || 100;
    this.range = this.maxValue - this.minValue;
    this.startSelectedValue = options.startSelectedValue || this.range / 4;
    this.endSelectedValue = options.endSelectedValue || this.range - this.range / 4;
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
    return this.startSelectedValue;
  }

  getEndSelectedValue() {
    return this.endSelectedValue;
  }

  setMinValue(newValue: number) {
    this.minValue = newValue;
    this.setRange(this.minValue, this.maxValue);
  }

  setMaxValue(newValue: number) {
    this.maxValue = newValue;
    this.setRange(this.minValue, this.maxValue);
  }

  setRange(newMinValue: number, newMaxValue: number) {
    this.range = newMaxValue - newMinValue;
  }

  setStartSelectedValue(newValue: number) {
    this.startSelectedValue = newValue;
    this.emit({ type: 'modelUpdatedStartSelectedValue', data: this.startSelectedValue });
  }

  setEndSelectedValue(newValue: number) {
    this.endSelectedValue = newValue;
    this.emit({ type: 'modelUpdatedEndSelectedValue', data: this.endSelectedValue });
  }
}

export default Model;
