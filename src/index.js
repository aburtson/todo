import 'bootstrap'
import './sass/main.scss'

const input = document.getElementById('input');
const ul = document.getElementById('list');
const submit = document.getElementById('submit');
const clear = document.getElementById('clear');

// if localStorage exists, itemsArray becomes the items in localStorage. otherwise, it is an empty array
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
let spanLength = 0;

// setItem adds key and value to local storage
// JSON.stringify() converts the itemsArray data array to a string
localStorage.setItem('items', JSON.stringify(itemsArray));
localStorage.setItem('spanLength', JSON.stringify(spanLength))

// JSON.parse converts the contents of localStorage back into something we can work with
// getItem() retrieves a value by the key
const data = JSON.parse(localStorage.getItem('items'));

const createDeleteButton = li => {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    li.appendChild(deleteButton);
}

const createTodo = text => {
    if (text !== '') {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = text;
        li.id = text;
        li.appendChild(span);
        ul.appendChild(li);
        console.log('Our created ul', ul)
        createDeleteButton(li);
    }
}

// create todo when clicking submit button
submit.addEventListener('click', event => {
    event.preventDefault();

    // push any input.value into the itemsArray
    itemsArray.push(input.value);

    // set localStorage to the new updated value
    localStorage.setItem('items', JSON.stringify(itemsArray));

    createTodo(input.value);
    input.value = '';
});

// loop through everything in our data variable, which contains all the existing localStorage data in a form JavaScript can understand
// createTodo() for each item again
data.forEach(item => {
    createTodo(item);
});

// clear all todos
clear.addEventListener('click', event => {
    event.preventDefault();

    localStorage.clear();

    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
});

// remove todo
ul.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        const deleteButton = event.target;
        const li = deleteButton.parentNode;
        const ul = li.parentNode;

        ul.removeChild(li);

        localStorage.removeItem('items', JSON.stringify(itemsArray));
    }
});

// edit todo
ul.addEventListener('click', event => {
    const todoData = JSON.parse(localStorage.getItem('items'));
    if (event.target.tagName === 'SPAN') {
        const span = event.target;
        const li = span.parentNode;
        const text = span.textContent;
        const input = document.createElement('input');

        input.type = 'text';
        input.value = '';
        input.setAttribute('maxlength', 50);
        li.insertBefore(input, span);
        li.removeChild(span);
        input.value = text;
        createDeleteButton(input);
    }
});

const convertToSpan = event => {
    const input = event.target;
    const li = input.parentNode;
    const text = input.value;
    const span = document.createElement('span');
    li.insertBefore(span, input);
    li.removeChild(input);
    span.textContent = text;

    itemsArray.push(text);
    const oldData = JSON.parse(localStorage.getItem("items"));
    const modifiedData = oldData.filter(todo => todo !== li.id);
    modifiedData.push(text);
    localStorage.setItem('items', JSON.stringify(modifiedData));

    createDeleteButton(input);
}

// convert input back to span when hitting ENTER
ul.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        convertToSpan(event);
    }
}); 

// convert input back to span when mouse leaves input
ul.addEventListener('mouseout', event => {
    if (event.target.tagName === 'INPUT') {
        convertToSpan(event);
    }
}); 