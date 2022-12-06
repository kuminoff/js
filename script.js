"use strict";

let rollback = 50;
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
let screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');
let adaptive = confirm("Нужен ли адаптив на сайте? (Ок - да, отмена - нет)");
let service1 = prompt('Какой дополнительный тип услуги нужен?', 'Текущее обслуживание веб-сайта');
let servicePrice1 = +prompt('Сколько это будет стоить?', '1000');
let service2 = prompt('Какой дополнительный тип услуги нужен?', 'Поддержка WordPress');
let servicePrice2 = +prompt('Сколько это будет стоить?', '2003');

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
      return "Упс. Что-то пошло не так";
  }
};

const getAllServicePrices = function (servPrice1, servPrice2) {
  return servPrice1 + servPrice2;
};

function getFullPrice(price, servPrices) {
    return price + servPrices;
}

const getTitle = function (name) {
  let nameTrans = name;
  return name.charAt[0] = ' ' ? name.charAt(1).toUpperCase() + name.slice(2).toLowerCase() : ' ';
};

const getServicePercentPrices = function (price, roll) {
  return price - price * (roll / 100);
};

let allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
let fullPrice = getFullPrice(screenPrice, allServicePrices);
let title = getTitle(prompt('Как называется ваш проект?', ' ГриЛЬНИцА'));
let servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log((screens.toLowerCase()).split(", "));
console.log(getRollbackMessage(fullPrice));
console.log("Итоговая стоимость за вычетом отката посреднику: " + Math.ceil(servicePercentPrice) + " рублей");