import Model from './model';
import View from './view';

class Presenter {
  constructor($rootElement) {
    this.model = new Model({
      minValue: 10,
      maxValue: 200,
    });
    this.view = new View($rootElement);

    this.view.subscribe(this);
  }

  update(action) {
    switch (action.type) {
      case 'click':
        this.model.receivedData = action.data;
        console.log(this.model.getReceivedData());
        break;
      default:
        this.model.receivedData = 'no data received';
        break;
    }
  }
}

export default Presenter;
