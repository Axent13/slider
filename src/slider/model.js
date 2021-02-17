import Observer from './observer';

class Model extends Observer {
  constructor(options = {}) {
    super();

    this.minValue = options.minValue || 0;
    this.maxValue = options.maxValue || 100;
    this.range = this.maxValue - this.minValue;
    this.startSelectedValue = options.startSelectedValue || this.range / 4;
    this.endSelectedValue = options.endSelectedValue || this.range - this.range / 4;

    this.observers = [];
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

  setMinValue(newValue) {
    this.minValue = newValue;
    this.setRange(this.minValue, this.maxValue);
  }

  setMaxValue(newValue) {
    this.maxValue = newValue;
    this.setRange(this.minValue, this.maxValue);
  }

  setRange(newMinValue, newMaxValue) {
    this.range = newMaxValue - newMinValue;
  }

  setStartSelectedValue(newValue) {
    this.startSelectedValue = newValue;
    this.emit({ type: 'modelUpdatedStartSelectedValue', data: this.startSelectedValue });
  }

  setEndSelectedValue(newValue) {
    this.endSelectedValue = newValue;
    this.emit({ type: 'modelUpdatedEndSelectedValue', data: this.endSelectedValue });
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((currentObserver) => currentObserver !== observer);
  }

  emit({ type, data }) {
    this.observers.forEach((currentObserver) => {
      currentObserver.update({ type, data });
    });
  }
}

export default Model;
