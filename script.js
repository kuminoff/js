"use strict"; 

text.addEventListener("click", btnClick);

function btnClick() {
    let word = document.querySelector('input').value;
    let node = document.createElement('li');
    if (word.charAt(0) !== ' ') {
        node.appendChild(document.createTextNode(word));
        document.querySelector('ul').appendChild(node);
        document.querySelector('input').value = '';
    } 
}