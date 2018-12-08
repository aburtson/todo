import 'bootstrap'
import './sass/main.scss'

const input = document.getElementById('input');
const ul = document.getElementById('list');
const submit = document.getElementById('submit');
const clear = document.getElementById('clear');

// if localStorage exists, itemsArray becomes the items in localStorage. otherwise, it is an empty array
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// setItem adds key and value to local storage
// JSON.stringify() converts the itemsArray data array to a string
localStorage.setItem('items', JSON.stringify(itemsArray));

// JSON.parse converts the contents of localStorage back into something we can work with
// getItem() retrieves a value by the key
const data = JSON.parse(localStorage.getItem('items'));

const createLI = text => {
    if (text !== '') {
        const li = document.createElement('li');
        li.textContent = text;
        ul.appendChild(li);
    }
}

submit.addEventListener('click', event => {
    event.preventDefault();

    // push any input.value into the itemsArray
    itemsArray.push(input.value);

    // set localStorage to the new updated value
    localStorage.setItem('items', JSON.stringify(itemsArray));

    createLI(input.value);
    input.value = '';
});

// loop through everything in our data variable, which contains all the existing localStorage data in a form JavaScript can understand
// createLI() for each item again
data.forEach(item => {
    createLI(item);
});

clear.addEventListener('click', event => {
    event.preventDefault();

    localStorage.clear();

    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
});






// Things todo with the todo list:

// add edit button that shows delete buttons

// a way to edit the text after it's been added