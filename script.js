const title = "Верстка";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 100;
let rollback = 50;
let fullPrice = 1000;
let adaptive = true;

console.log('тип title - ' + typeof title);
console.log('тип fullPrice - ' + typeof fullPrice);
console.log('тип adaptive - ' + typeof adaptive);

console.log('длина строки screens - ' + screens.length);

console.log('Стоимость верстки экранов ' + screenPrice + ' рублей');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей');

screensLower = screens.toLowerCase();
console.log(screensLower.split());

console.log('Процент отката посреднику за работу ' + fullPrice * (rollback/100));