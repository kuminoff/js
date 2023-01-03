`use strict`;

const title = document.getElementsByTagName(`h1`)[0];
const buttonPlus = document.querySelector(`.screen-btn`);
const otherItemsPercent = document.querySelectorAll(`.other-items.percent`);
const otherItemsNumber = document.querySelectorAll(`.other-items.number`);
const inputRange = document.querySelector(`.rollback input`);
const inputRangeValue = document.querySelector(`.rollback .range-value`);
const startBtn = document.getElementsByClassName(`handler_btn`)[0];
const resetBtn = document.getElementsByClassName(`handler_btn`)[1];
const total = document.getElementsByClassName(`total-input`)[0];
const totalCount = document.getElementsByClassName(`total-input`)[1];
const totalCountOther = document.getElementsByClassName(`total-input`)[2];
const fullTotalCount = document.getElementsByClassName(`total-input`)[3];
const totalCountRollback = document.getElementsByClassName(`total-input`)[4];
const checkboxInputs = document.querySelectorAll(`.custom-checkbox`);
let screens = document.querySelectorAll(`.screen`);

const appData = {
  title: ``,
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  screenCounter: 0,
  servicesPercent: {},
  servicesNumber: {},

  init: function () {
    this.addTitle();
    this.changeInputValue();
    inputRange.addEventListener(`input`, this.changeInputValue.bind(this));
    startBtn.addEventListener(`click`, this.btnDisactivated.bind(this));
    buttonPlus.addEventListener(`click`, this.addScreenBlock);
    resetBtn.addEventListener(`click`, this.reset.bind(this));
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();
  },

  reset: function () {
    for (let i = 0; i < screens.length; i++) {
      if (i === 0) {
        continue;
      }
      screens[i].remove();
    }

    screens.forEach(function (item) {
      const input = item.querySelector(`input`);
      const select = item.querySelector(`select`);
      input.removeAttribute(`disabled`);
      select.removeAttribute(`disabled`);
      input.value = ``;
      select.selectedIndex = 0;
    });

    this.screenPrice = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.screenCounter = 0;
    this.rollback = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    checkboxInputs.forEach(function (checkbox) {
      checkbox.checked = false;
      checkbox.removeAttribute(`disabled`);
    });
    document.querySelectorAll(`.total-input`).forEach(function (input) {
      input.value = 0;
    });
    inputRange.value = 0;
    inputRange.removeAttribute(`disabled`);
    inputRangeValue.textContent = 0 + `%`;
    startBtn.removeAttribute(`disabled`);
    buttonPlus.removeAttribute(`disabled`);
    startBtn.style.display = `block`;
    resetBtn.style.display = `none`;
  },

  btnDisactivated: function () {
    const select = document.querySelectorAll(`.screen select`);
    const input = document.querySelectorAll(`.screen input`);
    for (let i = 0; i < select.length; i++) {
      if (!select[i].value || !input[i].value) {
        return alert(`Выбирете тип экранов и их количество`);
      }
    }
    this.start();
    buttonPlus.setAttribute(`disabled`, true);
    screens.forEach(function (item) {
      item.querySelector(`select`).setAttribute(`disabled`, true);
      item.querySelector(`input`).setAttribute(`disabled`, true);
    });

    checkboxInputs.forEach(function (checkbox) {
      checkbox.setAttribute(`disabled`, true);
    });
    inputRange.setAttribute(`disabled`, true);
    startBtn.style.display = `none`;
    resetBtn.style.display = `block`;
  },

  isString: function (str) {
    return typeof str === `string` && str !== null;
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCount.value = this.screenCounter;
    this.screens = [];
  },

  addScreens: function () {
    screens.forEach((screen, index) => {
      const select = screen.querySelector(`select`);
      const input = screen.querySelector(`input`);
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
    for (let key of this.screens) {
      this.screenCounter += key.count;
    }
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll(`.screen`);

    cloneScreen.querySelector(`select`).selectedIndex = 0;
    cloneScreen.querySelector(`input`).value = ``;
  },

  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector(`input[type=checkbox]`);
      const label = item.querySelector(`label`);
      const input = item.querySelector(`input[type=text]`);
      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector(`input[type=checkbox]`);
      const label = item.querySelector(`label`);
      const input = item.querySelector(`input[type=text]`);
      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addPrices: function () {
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }
    this.fullPrice =
      +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100)
    );
    totalCountRollback.value = this.servicePercentPrice;
  },

  logger: function () {
    for (let key in this) {
      console.log(key);
    }
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
    console.log(appData);
  },

  changeInputValue: function () {
    inputRangeValue.textContent = inputRange.value + `%`;
    this.rollback = inputRange.value;
  },
};

appData.init();
