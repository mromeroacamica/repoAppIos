class Observable<T> {
  private observers: ((value: T) => void)[];
  private value: T | null;
  constructor() {
    this.observers = [];
    this.value = null;
  }
  public attach(observer: (value: T) => void) {
    this.observers.push(observer);
  }
  public detach(observerToRemove: (value: T) => void) {
    this.observers = this.observers.filter(
      (observer) => observerToRemove !== observer,
    );
  }
  public notify(value: T) {
    this.value = value;
    this.observers.forEach((obs) => {
      obs(value);
    });
  }
  public getValue() {
    return this.value;
  }
}

export default Observable;
