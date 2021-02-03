class Observer {
  constructor(modelObject) {
    this.modelObject = modelObject;
    this.initialState = modelObject;
  }

  update(action) {
    switch (action.type) {
      case 'click':
        this.modelObject.receivedData = action.data;
        console.log(this.modelObject.getReceivedData());
        break;
      default:
        this.modelObject.receivedData = 'no data received';
        break;
    }
  }
}

export default Observer;
