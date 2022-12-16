"use strict";

const titleProject = document.getElementsByTagName("h1")[0];
const buttonResult = document.getElementsByClassName("handler_btn")[0];
const buttonReset = document.getElementsByClassName("handler_btn")[1];
const buttonPluse = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const inputRange = document.querySelector(".rollback  input[type=range]");
const spanRange = document.querySelector(".rollback  span.range-value");
const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const totalFullCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];
let screenDiv = document.querySelectorAll("div.screen");

const appData = {
  services: {},
  allServicePrices: 0,
  fullPrice: 0,
  title: "",
  servicePercentPrice: 0,
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 50,

  asking: function () {
    appData.title = prompt(`Как называется ваш проект?`, `ГриЛьНИцА`);
    appData.title === null
      ? (appData.title = 'user did not enter the "appData.title"')
      : "";
    while (!isNaN(+appData.title.replace(/ /g, ""))) {
      appData.title = prompt(`Как называется ваш проект?`, `ГриЛьНИцА`);
    }

    for (let i = 0; i < 2; i++) {
      let name;
      let price;

      name = prompt(
        `Какие типы экранов нужно разработать?`,
        `Простые, Сложные, Интерактивные`
      );
      if (name !== null) {
        while (!isNaN(+name.replace(/ /g, ""))) {
          appData.name = prompt(
            `Какие типы экранов нужно разработать?`,
            `Простые, Сложные, Интерактивные`
          );
        }
        price = prompt(`Сколько будет стоить данная работа?`, 12000);
        price === null ? (price = 'user did not enter the "price"') : "";
      }

      appData.screens.push({
        id: i,
        name: name,
        price: price,
      });
    }

    for (let i = 0; i < 2; i++) {
      let servicePrice;
      let name;

      name = prompt(
        `Какой дополнительный тип услуги нужен?`,
        `Текущее обслуживание веб-сайта`
      );
      if (name !== null) {
        while (!isNaN(+name.replace(/ /g, ""))) {
          appData.name = prompt(
            `Какой дополнительный тип услуги нужен?`,
            `Текущее обслуживание веб-сайта`
          );
        }
        servicePrice = prompt(`Сколько это будет стоить?`, 1000);
        servicePrice === null
          ? (servicePrice = 'user did not enter the "price"')
          : "";
        appData.services[name] = +servicePrice;
      }
    }
  },

  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  getRollbackMessage: function (price) {
    switch (true) {
      case price >= 3000:
        return `Даём скидку 10%`;

      case price >= 1500:
        return `Даём скидку 5%`;

      case price > 0:
        return `Скидка не предусмотрена`;

      default:
        return `Упс. Что-то пошло не так`;
    }
  },

  getFullPrice: function (price, servPrices) {
    appData.fullPrice = price + servPrices;
  },

  getTitle: function (name) {
    let nameTrans = name.trim();
    return nameTrans.charAt(0).toUpperCase() + nameTrans.slice(1).toLowerCase();
  },

  getServicePercentPrices: function (price, roll) {
    appData.servicePercentPrice = price - price * (roll / 100);
  },

  logger: function (obj) {
    for (let key in obj) {
      console.log(`Свойство/метод: ${key}`);
    }
  },

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.getTitle(appData.title);
    appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
    appData.logger(appData);
  },
};

appData.start();

console.log(appData.allServicePrices);
console.log(appData.servicePercentPrice);
console.log(appData.screens);
