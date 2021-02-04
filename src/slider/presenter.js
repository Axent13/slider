import Model from './model';
import View from './view';

class Presenter {
  constructor($rootElement) {
    this.$rootElement = $rootElement;
    this.model = new Model({
      minValue: 10,
      maxValue: 200,
    });
    this.view = new View($rootElement);

    this.view.subscribe(this);
  }

  _pixelsToValue(pixels) {
    return Math.round((pixels * this.model.getRange()) / $(this.$rootElement).width());
  }

  update(action) {
    switch (action.type) {
      case 'sliderClickedCloserToStartPoint': {
        const newStartValue = this._pixelsToValue(action.data);
        console.log(`Clicked closer to start: ${newStartValue}`);
        break;
      }
      case 'sliderClickedCloserToEndPoint': {
        const newStartValue = this._pixelsToValue(action.data);
        console.log(`Clicked closer to end: ${newStartValue}`);
        break;
      }
      default:
        this.model.receivedData = 'no data received';
        break;
    }
  }
}

export default Presenter;
