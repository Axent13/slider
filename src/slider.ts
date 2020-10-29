class Slider {
  $rootElement: any;
  constructor($rootElement: any) {
    this.$rootElement = $rootElement;
    console.log('Slider constructor');
    console.log(this.$rootElement);
  }
}

export default Slider;
