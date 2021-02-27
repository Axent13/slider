class Observer {
  constructor() {
    this.observers = [];
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

export default Observer;
