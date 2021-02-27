/* eslint-disable no-unused-vars */
import Presenter from '../presenter';

global.$ = require('jquery');

describe('Presenter tests', () => {
  const $rootElement = document.createElement('div');
  const options = {
    step: 1,
    minValue: 10,
    maxValue: 100,
  };
  const presenter = new Presenter($rootElement, options);

  test('Presenter just succesfully created', () => {
    expect(presenter).toBeDefined();
  });
});
