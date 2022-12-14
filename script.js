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

    // мне пришел в голову такой "гениальный" способ
    appData.title = prompt(`Как называется ваш проект?`, `ГриЛьНИцА`);
    if (appData.title !== null) {
      while (appData.isNumber(+appData.title.replace(/ /g, ''))) {
        appData.title = prompt(`Как называется ваш проект?`, `ГриЛьНИцА`);
      }
    }

    for (let i = 0; i < 2; i++) {

      let name;
      let price;

      name = prompt(`Какие типы экранов нужно разработать?`, `Простые, Сложные, Интерактивные`);
      if (name !== null) {
        while (appData.isNumber(+name.replace(/ /g, ''))) {
          name = prompt(`Какие типы экранов нужно разработать?`, `Простые, Сложные, Интерактивные`)
        }
        price = prompt(`Сколько будет стоить данная работа?`, 12000);
        price === null ? "" : !appData.isNumber(price) ? price = prompt(`Сколько будет стоить данная работа?`, 12000) : "";
      }

      appData.screens.push({
        id: i,
        name: name,
        price: price
      });
    }

    for (let i = 0; i < 2; i++) {
      let servicePrice;
      let name;

      name = prompt(`Какой дополнительный тип услуги нужен?`, `Текущее обслуживание веб-сайта`);
      if (name !== null) {
        while (appData.isNumber(+name.replace(/ /g, ''))) {
          name = prompt(`Какой дополнительный тип услуги нужен?`, `Текущее обслуживание веб-сайта`);
        }
        servicePrice = prompt(`Сколько это будет стоить?`, 1000);
        servicePrice === null ? "" : !appData.isNumber(servicePrice) ? servicePrice = prompt(`Сколько это будет стоить?`, 1000) : "";
      }

      while (!appData.isNumber(servicePrice));
      appData.services[name] = +servicePrice;
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

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && !/\s/g.test(num);
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
  }

};

appData.start();

console.log(appData.allServicePrices);
console.log(appData.servicePercentPrice);
console.log(appData.screens);