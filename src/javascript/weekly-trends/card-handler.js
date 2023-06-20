export class CardHandler {
  constructor() {
    this.prevAmount = null;
    this.currentAmount = null;
  }

  setCurrentAmount() {
    const screenWidth = window.innerWidth;
    this.setPrevAmount();
    this.currentAmount = screenWidth < 768 ? 1 : 3;
  }

  setPrevAmount() {
    this.prevAmount = this.currentAmount;
  }
}
