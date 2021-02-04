class Model {
  constructor(options = {}) {
    this.minValue = options.minValue || 0;
    this.maxValue = options.maxValue || 100;
    this.range = this.maxValue - this.minValue;
    this.startSelectedValue = options.startSelectedValue || this.range / 4;
    this.endSelectedValue = options.endSelectedValue || this.range - this.range / 4;

    this.receivedData = 'nothing...';
  }

  // отрефакторить название
  getAllParameters() {
    return this;
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

  setRange(newMinValue, newMaxValue) {
    this.range = newMaxValue - newMinValue;
  }

  setMinValue(newValue) {
    this.minValue = newValue;
    this.setRange(this.minValue, this.maxValue);
  }

  setMaxValue(newValue) {
    this.maxValue = newValue;
    this.setRange(this.minValue, this.maxValue);
  }

  setStartSelectedValue(newValue) {
    this.startSelectedValue = newValue;
  }
}

export default Model;
