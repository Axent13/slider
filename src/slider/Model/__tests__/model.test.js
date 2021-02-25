import Model from '../model';

describe('Model returns current specified values', () => {
  const model = new Model({
    minValue: 10,
    maxValue: 90,
    startSelectedValue: 25,
    endSelectedValue: 50,
  });
  test('checking minValue', () => {
    expect(model.getMinValue()).toBe(10);
  });

  test('checking maxValue', () => {
    expect(model.getMaxValue()).toBe(90);
  });
  test('checking range', () => {
    expect(model.getRange()).toBe(80);
  });
  test('checking startSelectedValue', () => {
    expect(model.getStartSelectedValue()).toBe(25);
  });
  test('checking endSelectedValue', () => {
    expect(model.getEndSelectedValue()).toBe(50);
  });
});

describe('Model returns current default values', () => {
  const model = new Model({});
  test('checking minValue', () => {
    expect(model.getMinValue()).toBe(0);
  });
  test('checking maxValue', () => {
    expect(model.getMaxValue()).toBe(100);
  });
  test('checking range', () => {
    expect(model.getRange()).toBe(100);
  });
  test('checking startSelectedValue', () => {
    expect(model.getStartSelectedValue()).toBe(25);
  });
  test('checking endSelectedValue', () => {
    expect(model.getEndSelectedValue()).toBe(75);
  });
});

describe('Model sets current values', () => {
  const model = new Model({});
  test('checking setMinValue', () => {
    model.setMinValue(42);
    expect(model.getMinValue()).toBe(42);
  });
  test('checking setMaxValue', () => {
    model.setMaxValue(42);
    expect(model.getMaxValue()).toBe(42);
  });
  test('checking setRange', () => {
    model.setRange(10, 30);
    expect(model.getRange()).toBe(20);
  });
  test('checking setStartSelectedValue', () => {
    model.setStartSelectedValue(42);
    expect(model.getStartSelectedValue()).toBe(42);
  });
  test('checking setEndSelectedValue', () => {
    model.setEndSelectedValue(42);
    expect(model.getEndSelectedValue()).toBe(42);
  });
});
