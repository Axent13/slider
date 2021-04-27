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

    return newValue - reminder + Number(this.step);
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

  getStep() {
    return this.step;
  }

  setMinValue(newValue: number) {
    this.minValue = this.correctNewValueToStep(newValue);
    this.setRange(this.minValue, this.maxValue);
    this.emit({ type: 'modelUpdatedMinValue', data: this.minValue });
    
    this.startSelectedValue = this.correctNewValueToStep(this.range / 4 + this.minValue);
    this.emit({ type: 'modelUpdatedStartSelectedValue', data: this.startSelectedValue });
  }

  setMaxValue(newValue: number) {
    this.maxValue = this.correctNewValueToStep(newValue);
    this.setRange(this.minValue, this.maxValue);
    this.emit({ type: 'modelUpdatedMaxValue', data: this.maxValue });
    
    this.endSelectedValue = this.correctNewValueToStep(this.range - this.range / 4 + this.minValue);
    this.emit({ type: 'modelUpdatedEndSelectedValue', data: this.endSelectedValue });
  }

  setStep(newValue: number) {
    if (newValue <= 0) {
      this.step = 1;
    } else {
      this.step = newValue;
      console.log(`new step: ${this.step}`);
      
      console.log(`Before: ${this.startSelectedValue}`);
      
      this.startSelectedValue = this.correctNewValueToStep(this.startSelectedValue);
      console.log(`After: ${this.startSelectedValue}`);
      this.emit({ type: 'modelUpdatedStartSelectedValue', data: this.startSelectedValue });
      this.endSelectedValue = this.correctNewValueToStep(this.endSelectedValue);
      this.emit({ type: 'modelUpdatedEndSelectedValue', data: this.endSelectedValue });
    }
  }

  setRange(newMinValue: number, newMaxValue: number) {
    this.range = newMaxValue - newMinValue;
  }

  setStartSelectedValue(newValue: number) {
    const newValueCorrectedToStep = this.correctNewValueToStep(newValue);
    if (newValueCorrectedToStep < this.endSelectedValue) {
      this.startSelectedValue = newValueCorrectedToStep;
      this.emit({ type: 'modelUpdatedStartSelectedValue', data: this.startSelectedValue });
    }
  }

  setEndSelectedValue(newValue: number) {
    this.endSelectedValue = this.correctNewValueToStep(newValue);
    this.emit({ type: 'modelUpdatedEndSelectedValue', data: this.endSelectedValue });
  }
}

export default Model;
