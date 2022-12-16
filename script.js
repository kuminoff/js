"use strict";

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
    while (!isNaN(appData.title)) {
      appData.title = prompt(`Как называется ваш проект?`, `ГриЛьНИцА`);
    }

    for (let i = 0; i < 2; i++) {
      let name;
      let price;

      name = prompt(
        `Какие типы экранов нужно разработать?`,
        `Простые, Сложные, Интерактивные`
      );

      while (!isNaN(name)) {
        name = prompt(
          `Какие типы экранов нужно разработать?`,
          `Простые, Сложные, Интерактивные`
        );
      }

      price = prompt(`Сколько будет стоить данная работа?`, 12000);
      while (!Number(price)) {
        price = prompt(`Сколько будет стоить данная работа?`, 12000);
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

      while (!isNaN(name)) {
        name = prompt(
          `Какой дополнительный тип услуги нужен?`,
          `Текущее обслуживание веб-сайта`
        );
      }

      name = name + "_" + (i + 1);

      servicePrice = prompt(`Сколько это будет стоить?`, 1000);

      while (!Number(servicePrice)) {
        servicePrice = prompt(`Сколько это будет стоить?`, 1000);
      }
      appData.services[name] = +servicePrice;
    }
  },

  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, screen) {
      return (sum += +screen.price);
    }, 0);

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
console.log(appData.services);
