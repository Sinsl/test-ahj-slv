/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/paySystem.js
const arrPaySystem = ["visa", "mastercard", "mir", "amex", "jcb", "diners", "discover"];
;// CONCATENATED MODULE: ./src/js/Cards.js

class Cards {
  constructor() {
    this.cardsEl = document.createElement("UL");
    this.arrLi = [];
    this.init();
  }
  init() {
    this.cardsEl.classList.add("cards");
    arrPaySystem.forEach(item => {
      const cardEl = document.createElement("LI");
      cardEl.className = "card card-" + item;
      cardEl.dataset.type = item;
      this.cardsEl.append(cardEl);
      this.arrLi.push(cardEl);
    });
  }
  activeAll() {
    this.arrLi.forEach(elem => {
      elem.classList.remove("inactive");
    });
  }
  inactiveAll() {
    this.arrLi.forEach(elem => {
      elem.classList.add("inactive");
    });
  }
  activeSome(arrIdx) {
    this.inactiveAll();
    arrIdx.forEach(elem => {
      this.arrLi[elem].classList.remove("inactive");
    });
  }
}
;// CONCATENATED MODULE: ./src/js/defPaySystem.js

function defPaySystem(setValue) {
  const arrIdx = [];
  if (setValue.length === 1) {
    switch (setValue) {
      case "4":
        arrIdx.push(arrPaySystem.indexOf("visa"));
        break;
      case "2":
        arrIdx.push(arrPaySystem.indexOf("mastercard"));
        arrIdx.push(arrPaySystem.indexOf("mir"));
        break;
      case "3":
        arrIdx.push(arrPaySystem.indexOf("amex"));
        arrIdx.push(arrPaySystem.indexOf("jcb"));
        arrIdx.push(arrPaySystem.indexOf("diners"));
        break;
      case "5":
        arrIdx.push(arrPaySystem.indexOf("mastercard"));
        arrIdx.push(arrPaySystem.indexOf("diners"));
        break;
      case "6":
        arrIdx.push(arrPaySystem.indexOf("discover"));
        arrIdx.push(arrPaySystem.indexOf("mastercard"));
        break;
      default:
        arrIdx.push("Платежная система не определена");
        break;
    }
    return arrIdx;
  } else {
    if (setValue.substr(0, 1) === "4") {
      arrIdx.push(arrPaySystem.indexOf("visa"));
      return arrIdx;
    }
    const twoSymbols = setValue.substr(0, 2);
    switch (twoSymbols) {
      case "60":
        arrIdx.push(arrPaySystem.indexOf("discover"));
        break;
      case "22":
        arrIdx.push(arrPaySystem.indexOf("mir"));
        break;
      case "34":
        arrIdx.push(arrPaySystem.indexOf("amex"));
        break;
      case "35":
        arrIdx.push(arrPaySystem.indexOf("jcb"));
        break;
      case "53":
      case "27":
      case "58":
      case "67":
        arrIdx.push(arrPaySystem.indexOf("mastercard"));
        break;
      case "30":
      case "36":
      case "54":
      case "55":
        arrIdx.push(arrPaySystem.indexOf("diners"));
        break;
      default:
        arrIdx.push("Платежная система не определена");
        break;
    }
    return arrIdx;
  }
}
;// CONCATENATED MODULE: ./src/js/validateCardNum.js
function validateCardNum(setValue) {
  let ch = 0;
  const num = String(setValue).replace(/\D/g, "");
  const isOdd = num.length % 2 !== 0;
  if ("" === num) return false;
  for (let i = 0; i < num.length; i++) {
    let n = parseInt(num[i], 10);
    ch += (isOdd | 0) === i % 2 && 9 < (n *= 2) ? n - 9 : n;
  }
  return 0 === ch % 10;
}
;// CONCATENATED MODULE: ./src/js/FormField.js



class FormField {
  constructor(element) {
    this.parentEl = element;
    this.cards = new Cards();
    this.formEl = null;
    this.msgEl = null;
    this.inputEl = null;
    this.init();
  }
  init() {
    this.parentEl.append(this.cards.cardsEl);
    this.createForm();
    this.createMsg();
    this.registerEvents();
  }
  createForm() {
    this.formEl = document.createElement("form");
    this.formEl.className = "valid-form";
    this.formEl.insertAdjacentHTML("beforeend", `<input type="text" id="card-number"></input>
      <button type="submit" class="card-submit">Click to Validate</button>`);
    this.parentEl.append(this.formEl);
    this.inputEl = this.formEl.querySelector("input");
  }
  createMsg() {
    this.msgEl = document.createElement("div");
    this.msgEl.className = "message";
    this.parentEl.append(this.msgEl);
  }
  registerEvents() {
    this.inputEl.addEventListener("focus", this.onFocusInput.bind(this));
    this.inputEl.addEventListener("blur", this.onBlurInput.bind(this));
    this.inputEl.addEventListener("input", this.onChangeInput.bind(this));
    this.formEl.addEventListener("submit", this.onSubmit.bind(this));
  }
  onFocusInput() {
    this.cards.inactiveAll();
  }
  onBlurInput() {
    this.cards.activeAll();
    this.deleteMessage();
  }
  onChangeInput() {
    this.deleteMessage();
    const value = this.inputEl.value.trim().replace(/\D/g, "");
    if (this.inputEl.value.length === 0) {
      this.setMessage("Поле ввода не должно быть пустым.");
      this.inputEl.value = value;
      this.cards.inactiveAll();
    }
    if (this.inputEl.value.length !== value.length) {
      this.setMessage("Номер карты не должен содержать буквы. Буквы удалены.");
      this.inputEl.value = value;
    }
    if (value.length > 0) {
      const arrIdx = defPaySystem(value);
      if (typeof arrIdx[0] === "string") {
        this.setMessage(arrIdx);
        this.cards.inactiveAll();
      } else {
        this.cards.activeSome(arrIdx);
      }
    }
  }
  onSubmit(e) {
    e.preventDefault();
    this.deleteMessage();
    const isValid = validateCardNum(this.inputEl.value.trim());
    isValid ? this.setMessage("Валидный номер карты") : this.setMessage("Не валидный номер карты");
  }
  setMessage(str) {
    this.msgEl.textContent = str;
  }
  deleteMessage() {
    this.msgEl.textContent = "";
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const validator = document.querySelector(".validator");

// eslint-disable-next-line no-unused-vars
const validFormBlock = new FormField(validator);
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;