"use strict"; 

let rollback = 50;
let screens;
let screenPrice;
let adaptive;
let service1;
let servicePrice1;
let service2;
let servicePrice2;
let allServicePrices;
let fullPrice;
let title;
let servicePercentPrice;
let roundedServicePercentPrice;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num) && !/\s/g.test(num);
};


const asking = function () {
  title = prompt('Как называется ваш проект?', "ГриЛьНИцА");
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

  do {
    screenPrice = prompt("Сколько будет стоить данная работа?", 12000);
  } while (!isNumber(screenPrice));
  screenPrice = +screenPrice;
  adaptive = confirm("Нужен ли адаптив на сайте? (Ок - да, отмена - нет)");
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
  switch (true) {
    case price >= 3000:
      return "Даём скидку 10%";

    case price >= 1500:
      return "Даём скидку 5%";

    case price > 0:
      return "Скидка не предусмотрена";

    default:
      return "Something wrong";
  }
};

const getAllServicePrices = function () {

  let sum = 0;
  let servicePrice;

  for (let i = 0; i < 2; i++) {

    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?', 'Текущее обслуживание веб-сайта');
    }
    if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?', 'Поддержка WordPress');
    }

    do {
      servicePrice = prompt('Сколько это будет стоить?', 1000);
    }
    while (!isNumber(servicePrice));
    servicePrice = +servicePrice;
    console.log(servicePrice);
    sum += servicePrice;
  }

  return sum;
};

function getFullPrice(price, servPrices) {
    return price + servPrices;
}

const getTitle = function (name) {
  let nameTrans = name.trim();
  return nameTrans.charAt(0).toUpperCase() + nameTrans.slice(1).toLowerCase();
};


const getServicePercentPrices = function (price, roll) {
  return price - price * (roll / 100);
};

asking();
allServicePrices = getAllServicePrices(); 
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
roundedServicePercentPrice = Math.ceil(servicePercentPrice);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log((screens.toLowerCase()).split(", "));
console.log(getRollbackMessage(fullPrice));
console.log("Итоговая стоимость за вычетом отката посреднику: " + roundedServicePercentPrice + " рублей");