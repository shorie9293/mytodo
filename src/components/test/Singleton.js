class Singleton {
  constructor() {
    this.x = 0;
  }

  getX() {
    this.x++;
    console.log(this.x);
  }

}

export default new Singleton();