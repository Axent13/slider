interface Action {
  type: string;
  data: number;
}

class Observer {
  observers: any[];

  constructor() {
    this.observers = [];
  }

  subscribe(observer: any) {
    this.observers.push(observer);
  }

  unsubscribe(observer: any) {
    this.observers = this.observers.filter((currentObserver) => currentObserver !== observer);
  }

  emit(action: Action) {
    this.observers.forEach((currentObserver) => {
      currentObserver.update(action);
    });
  }
}

export default Observer;
