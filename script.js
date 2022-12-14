"use strict"; 

const books = document.querySelectorAll(".book");
const ad = document.querySelector(".adv");
const body = document.querySelector("body");
const chaptersTwo = books[0].querySelectorAll("li");
const chaptersFive = books[5].querySelectorAll("li");
const chaptersSix = books[2].querySelectorAll("li");


books[0].before(books[1]);
books[2].before(books[4]);
books[5].after(books[2]);

body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";

books[4].querySelector('h2 a').innerHTML = "Книга 3. this и Прототипы Объектов";

ad.remove();

chaptersTwo[3].after(chaptersTwo[6]);
chaptersTwo[6].after(chaptersTwo[8]);
chaptersTwo[9].after(chaptersTwo[2]);

chaptersFive[1].after(chaptersFive[9]);
chaptersFive[9].after(chaptersFive[3]);
chaptersFive[3].after(chaptersFive[4]);
chaptersFive[7].after(chaptersFive[5]);


chaptersSix[8].insertAdjacentHTML("afterend", "<li>Глава 8: За пределами ES6</li>");