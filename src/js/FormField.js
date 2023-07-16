import Cards from "./Cards";
import defPaySystem from "./defPaySystem";
import validateCardNum from "./validateCardNum";

export default class FormField {
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
    this.formEl.insertAdjacentHTML(
      "beforeend",
      `<input type="text" id="card-number"></input>
      <button type="submit" class="card-submit">Click to Validate</button>`,
    );
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
    isValid
      ? this.setMessage("Валидный номер карты")
      : this.setMessage("Не валидный номер карты");
  }

  setMessage(str) {
    this.msgEl.textContent = str;
  }

  deleteMessage() {
    this.msgEl.textContent = "";
  }
}
