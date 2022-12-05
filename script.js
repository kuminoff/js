let title = prompt('Как называется ваш проект?', 'Грильница');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
let screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');
let adaptive = confirm("Нужен ли адаптив на сайте? (Ок - да, отмена - нет)");
let service1 = prompt('Какой дополнительный тип услуги нужен?', 'Текущее обслуживание веб-сайта');
let servicePrice1 = +prompt('Сколько это будет стоить?', '1000');
let service2 = prompt('Какой дополнительный тип услуги нужен?', 'Поддержка WordPress');
let servicePrice2 = +prompt('Сколько это будет стоить?', '2003');
let rollback = 50;

let fullPrice = screenPrice + servicePrice1 + servicePrice2;

let servicePercentPrice = fullPrice - fullPrice * (rollback / 100);

roundedServicePercentPrice = Math.ceil(servicePercentPrice); //округление в большую сторону   
console.log(roundedServicePercentPrice);

switch (true) {
  case fullPrice >= 30000:
    console.log('Даем скидку в 10%');
    break;
  
  case fullPrice >= 15000:
    console.log('Даем скидку в 5%');
    break;
  
  case fullPrice > 0:
    console.log('Скидка не предусмотрена');
    break;
  
  default:
    console.log("Упс. Что-то пошло не так");
    break;
}

// предудущие уроки
// console.log('тип title - ' + typeof title + '\n' + 'тип fullPrice - ' + typeof fullPrice + '\n' + 'тип adaptive - ' + typeof adaptive);
// console.log('длина строки screens - ' + screens.length);
// console.log('Стоимость верстки экранов ' + screenPrice + ' рублей' + '\n' + 'Стоимость разработки сайта ' + fullPrice + ' рублей');
// screensLower = screens.toLowerCase();
// console.log(screensLower.split(', '));
// console.log('Процент отката посреднику за работу ' + fullPrice * (rollback / 100));