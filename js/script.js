`use strict`;

const title = document.getElementsByTagName(`h1`)[0];
const startBtn = document.getElementsByClassName(`handler_btn`)[0];
const resetBtn = document.getElementsByClassName(`handler_btn`)[1];
const buttonPluse = document.querySelector(`.screen-btn`);
const otherItemsPercent = document.querySelectorAll(`.other-items.percent`);
const otherItemsNumber = document.querySelectorAll(`.other-items.number`);
const inputRange = document.querySelector(`.rollback  input[type=range]`);
const spanRange = document.querySelector(`.rollback  span.range-value`);
const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const totalFullCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];
let screens = document.querySelectorAll(`.screen`);
let inputRangeFlag = true;
const checkbox = document.querySelectorAll(".custom-checkbox");
const cmsCheckbox = document.getElementById(`cms-open`);
const cmsSelect = document.getElementById(`cms-select`);
const cmsVariants = document.querySelector(`.hidden-cms-variants`);
const cmsOther = document.querySelector(
  `.hidden-cms-variants .main-controls__input`
);
let cmsPercentPrice = 0;
const cmsInput = document.getElementById(`cms-other-input`);

console.log(cmsCheckbox);
console.log(cmsVariants);

const appData = {
  servicesPercent: {},
  servicesNumber: {},
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  title: ``,
  servicePercentPrice: 0,
  screens: [],
  screenPrice: 0,
  rollback: 0,
  screenCount: 0,

  newCalc: function () {
    inputRange.value = 0;
    this.rollback = 0;
    this.servicePercentPrice = 0;
    this.screenPrice = 0;
    this.fullPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.screens = [];
    this.screenCount = 0;
    cmsPercentPrice = 0;
    spanRange.textContent = `${inputRange.value}%`;

    for (let index = 1; index < screens.length; index++) {
      screens[index].remove();
    }
    screens = document.querySelectorAll(".screen");

    checkbox.forEach((item) => {
      item.checked = false;
    });

    cmsInput.value = ``;

    screens[0].childNodes[3].childNodes[1].value = ``;
    screens[0].childNodes[1].childNodes[1].childNodes[1].selected = true;
    cmsSelect.querySelectorAll("option")[0].selected = true;
    console.log(screens);
  },

  add: function () {
    this.screens = [];
  },

  init: function () {
    this.addTitle();
    inputRange.addEventListener("input", appData.spanChange);
    startBtn.addEventListener("click", appData.start);
    buttonPluse.addEventListener("click", appData.addScreenBlock);
    resetBtn.addEventListener("click", appData.reset);
    cmsCheckbox.addEventListener("change", appData.cmsSwitch);
    cmsSelect.addEventListener("change", appData.cmsChange);
    cmsSelect.addEventListener("change", appData.cmsSelectPrice);
    cmsInput.addEventListener("input", this.cmsPriceOther);
  },

  start: function () {
    if (!appData.addScreens()) {
      appData.showResult();
      inputRangeFlag = false;
      appData.add();
      return;
    }

    if (
      (cmsInput.value === `` &&
        cmsSelect.querySelector(`option[value=other]`).selected) ||
      (cmsSelect.querySelector(`option[value='']`).selected &&
        cmsCheckbox.checked)
    ) {
      alert(`Выберите тип экранов и их количество`);
      return;
    }
    inputRangeFlag = true;
    appData.addServices();
    appData.addPrices();
    appData.add();
    appData.showResult();
    appData.inputBlocked();
    appData.buttonSwitch();
  },

  inputBlocked: function () {
    screens.forEach((item) => {
      const input = item.querySelector(`input[type=text]`);
      const select = item.querySelector(`select`);

      input.disabled = !input.disabled;
      select.disabled = !select.disabled;
    });
    buttonPluse.disabled = !buttonPluse.disabled;

    checkbox.forEach((item) => {
      item.disabled = !item.disabled;
    });

    cmsSelect.disabled = !cmsSelect.disabled;

    cmsInput.disabled = !cmsInput.disabled;
  },

  buttonSwitch: function () {
    startBtn.style.display === `none`
      ? (startBtn.style.display = `block`)
      : (startBtn.style.display = `none`);
    resetBtn.style.display === `none`
      ? (resetBtn.style.display = `block`)
      : (resetBtn.style.display = `none`);
  },

  cmsSwitch: function () {
    cmsVariants.style.display === `none`
      ? (cmsVariants.style.display = `flex`)
      : (cmsVariants.style.display = `none`);
  },

  cmsChange: function () {
    cmsSelect.querySelector(`option[value=other]`).selected
      ? (cmsOther.style.display = `flex`)
      : (cmsOther.style.display = `none`);
  },

  cmsPriceOther: function () {
    cmsPercentPrice = cmsInput.value;
  },

  cmsSelectPrice: function () {
    cmsSelect.querySelector(`option[value='50']`).selected
      ? (cmsPercentPrice = 50)
      : (cmsPercentPrice = 0);
  },

  reset: function () {
    cmsOther.style.display = `none`;
    cmsVariants.style.display = `none`;
    appData.newCalc();
    appData.inputBlocked();
    appData.buttonSwitch();
    appData.showResult();
    appData.init();
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    totalFullCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    totalCount.value = this.screenCount;
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  spanChange: function () {
    spanRange.textContent = `${inputRange.value}%`;
    if (inputRangeFlag === true) {
      appData.rollback = +inputRange.value;
      appData.servicePercentPrice =
        appData.fullPrice -
        Math.ceil(appData.fullPrice * (appData.rollback / 100));
      appData.showResult();
    }
  },

  addScreens: function () {
    this.screens.length = 0;
    screens.forEach((screen, index) => {
      const select = screen.querySelector(`select`);
      const input = screen.querySelector(`input`);
      const selectName = select.options[select.selectedIndex].textContent;

      if (selectName !== `Тип экранов` || input.value !== ``) {
        this.screens.push({
          id: index,
          name: selectName,
          count: input.value,
          price: +select.value * +input.value,
        });
      }
    });

    const screensArr = Array.from(screens);

    if (
      screensArr.some((screen) => {
        const select = screen.querySelector(`select`);
        const input = screen.querySelector(`input`);
        const selectName = select.options[select.selectedIndex].textContent;

        return selectName === `Тип экранов` || input.value === ``;
      })
    ) {
      alert(`Выберите тип экранов и их количество`);
      this.screens.length = 0;
      return false;
    }
    return true;
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    cloneScreen.childNodes[3].childNodes[1].value = ``;
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll(`.screen`);
  },

  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector(`input[type=checkbox]`);
      const label = item.querySelector(`label`);
      const input = item.querySelector(`input[type=text]`);

      if (check.checked) this.servicesPercent[label.textContent] = +input.value;
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector(`input[type=checkbox]`);
      const label = item.querySelector(`label`);
      const input = item.querySelector(`input[type=text]`);

      if (check.checked) this.servicesNumber[label.textContent] = +input.value;
    });
  },

  addPrices: function () {
    this.screenPrice = this.screens.reduce((sum, screen) => {
      return (sum += +screen.price);
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.fullPrice = this.fullPrice + (this.fullPrice * cmsPercentPrice) / 100;

    this.servicePercentPrice =
      this.fullPrice - Math.ceil(this.fullPrice * (this.rollback / 100));

    this.screenCount = this.screens.reduce((sum, screen) => {
      return (sum += +screen.count);
    }, 0);
  },

  logger: function (obj) {
    for (let key in obj) {
      console.log(`Свойство/метод: ${key}`);
    }
  },
};

appData.init();
