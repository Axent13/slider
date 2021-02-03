import Model from './model';
import View from './view';
import Observer from './observer';

class Presenter {
  constructor($rootElement) {
    this.model = new Model({
      minValue: 10,
      maxValue: 200,
    });
    this.view = new View($rootElement);
    this.observer = new Observer(this.model);

    this.view.subscribe(this.observer);
  }
}

export default Presenter;
