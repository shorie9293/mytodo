class Singleton {
  constructor() {
    let instance;

    Singleton() = function () {
      return instance;
    };

    Singleton.prototype = this;

    instance = new Singleton();

    instance.constructor = Singleton;

    this.myName = 'Singleton';
    this.method = function () {
      console.log('hogehogehoge');
    };

    return instance;

  }
}

export default {
  Singleton,
}
