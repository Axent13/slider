import Observer from '../observer';

describe('Testing Observer functions', () => {
  test('Observer object must have the obesrvers array', () => {
    const observer = new Observer();
    expect(observer.observers).toBeDefined();
  });
  test('subscribe function must add a new elements to its array', () => {
    const observer = new Observer();
    observer.subscribe({ first: 'test' });
    expect(observer.observers).toEqual([{ first: 'test' }]);
    observer.subscribe({ second: 'test' });
    expect(observer.observers).toEqual([{ first: 'test' }, { second: 'test' }]);
  });
  test('unsubscribe function must remove the specified observer', () => {
    const observer = new Observer();

    const firstObject = { first: 'test' };
    const secondObject = { second: 'test' };
    const thirdObject = { third: 'test' };
    observer.subscribe(firstObject);
    observer.subscribe(secondObject);
    observer.subscribe(thirdObject);

    observer.unsubscribe(secondObject);
    expect(observer.observers).toEqual([{ first: 'test' }, { third: 'test' }]);
  });
});
