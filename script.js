"use strict"; 

const appData = {
  service1: "",
  service2: "",
  allServicePrices: 0,
  fullPrice: 0,
  title: "",
  servicePercentPrice: 0,
  screens: "",
  screenPrice: 0,
  adaptive: true,
  rollback: 50,
    
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && !/\s/g.test(num);
  },

  asking: function () {
    appData.title = prompt(`Как называется ваш проект?`, `ГриЛьНИцА`);
    appData.screens = prompt(`Какие типы экранов нужно разработать?`, `Простые, Сложные, Интерактивные`);
    do {
      appData.screenPrice = prompt(`Сколько будет стоить данная работа?`, 12000);
    } while (!appData.isNumber(appData.screenPrice));
    appData.screenPrice = +appData.screenPrice;
    appData.adaptive = confirm(`Нужен ли адаптив на сайте?`);
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

  getAllServicePrices: function () {
    let sum = 0;
    let servicePrice;

    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt(`Какой дополнительный тип услуги нужен?`, `Текущее обслуживание веб-сайта`);
      }
      if (i === 1) {
        appData.service2 = prompt(`Какой дополнительный тип услуги нужен?`, `Поддержка WordPress`);
      }
      do {
        servicePrice = prompt(`Сколько это будет стоить?`, 1000);
      }
      while (!appData.isNumber(servicePrice));
      servicePrice = +servicePrice;
      sum += servicePrice;
    }
    return sum;
  },

  getFullPrice: function (price, servPrices) {
    return price + servPrices;
  },

  getTitle: function (name) {
    let nameTrans = name.trim();
    return nameTrans.charAt(0).toUpperCase() + nameTrans.slice(1).toLowerCase();
  },

  getServicePercentPrices: function (price, roll) {
    return price - price * (roll / 100);
  },

  logger: function (obj) {
    for (let key in obj) {
      console.log("Свойство/метод: " + key);
    }
  },

  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
    appData.title = appData.getTitle(appData.title);
    appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
    appData.logger(appData);
  }

};

appData.start();