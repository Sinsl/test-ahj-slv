import { arrPaySystem } from "./paySystem";

export default class Cards {
  constructor() {
    this.cardsEl = document.createElement("UL");
    this.arrLi = [];
    this.init();
  }

  init() {
    this.cardsEl.classList.add("cards");
    arrPaySystem.forEach((item) => {
      const cardEl = document.createElement("LI");
      cardEl.className = "card card-" + item;
      cardEl.dataset.type = item;
      this.cardsEl.append(cardEl);
      this.arrLi.push(cardEl);
    });
  }

  activeAll() {
    this.arrLi.forEach((elem) => {
      elem.classList.remove("inactive");
    });
  }

  inactiveAll() {
    this.arrLi.forEach((elem) => {
      elem.classList.add("inactive");
    });
  }

  activeSome(arrIdx) {
    this.inactiveAll();
    arrIdx.forEach((elem) => {
      this.arrLi[elem].classList.remove("inactive");
    });
  }
}
