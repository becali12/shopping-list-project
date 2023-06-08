const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const xButtons = document.querySelectorAll('.remove-item');
const clearButton = document.querySelector('#clear');
const itemFilter = document.querySelector('.filter');
const submitButton = document.querySelector('.fa-plus').parentElement; 
    
let isEditMode = false;
let selectedItemName = '';

function addItemToLocalStorage(itemName) {
    let storageItemsList = getItemsFromLocalStorage();
    if (storageItemsList.includes(itemName)) {
        alert('Item already in list.');
        return;
    }
    if (storageItemsList.length === 0) {
        storageItemsList.push(itemName);
        localStorage.setItem('items', storageItemsList.toString());
    }
    else {
        storageItemsList.push(itemName);
        localStorage.setItem('items', storageItemsList.toString());
    }
}

function getItemsFromLocalStorage() {
    let arr;
    if (localStorage.getItem('items'))
        arr = localStorage.getItem('items').split(',');
    if (arr)
        return arr;
    else return [];
}

function displayItems() {
    const arr = Array.from(itemList.children);
    arr.forEach(item => item.remove());
    const items = getItemsFromLocalStorage();
    if(items.length > 0)
        items.forEach(item => { if(item != '') addItemToDOM(item) });
}

function addItemToDOM(itemName) {
    const li = document.createElement('li');
    li.innerHTML = `${itemName}
        <button class="remove-item btn-link text-red">
            <i class="fa-solid fa-xmark"></i>
        </button>`
    i = li.querySelector('i');
    i.addEventListener('click', removeItem)
    itemList.appendChild(li);
}

function addItem (e) {
    e.preventDefault();
    const newItem = itemInput.value;
    if (newItem === '') {
        alert('Please enter an item before submitting.');
        return;
    }
    if (isEditMode === false) {
        console.log('adding')
        addItemToLocalStorage(newItem);
        addItemToDOM(newItem);
    }
    else {
        updateItemLocalStorage(selectedItemName, newItem);
        isEditMode = false;
        submitButton.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
    }
    checkUI();
    itemInput.value = '';
}

function removeItemFromLocalStorage(itemName) {
    let items = getItemsFromLocalStorage();
    items = items.filter(el => el !== itemName);
    localStorage.setItem('items', items.toString());
}

function removeItem(e) {
    if (confirm('Are you sure?')) {
        li = e.target.parentElement.parentElement;
        itemName = li.textContent.trim();
        removeItemFromLocalStorage(itemName);
        li.remove()
        checkUI();
    }
}

function clearItems () {
    const arr = Array.from(itemList.children);
    arr.forEach(item => removeItemFromLocalStorage(item.textContent.trim()));
    checkUI();
}

function filterItems(e) {
    const text = e.target.value;
    const listElements = itemList.querySelectorAll('li');

    listElements.forEach(el => {
        elName = el.firstChild.textContent.toLowerCase();
        if (!elName.includes(text)) {
            el.style.display = 'none';
        }
        else {
            el.style.display = 'block';
        }
    })
}

function checkUI() {
    displayItems();
    const listElements = itemList.querySelectorAll('li');
    if (listElements.length === 0) {
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none';
    }
    else {
        clearButton.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

function updateItemLocalStorage(itemName, newItemName) {
    items = getItemsFromLocalStorage();
    items.forEach((el, index, array) => {
        if (el === itemName.toLowerCase()) {
            array[index] = newItemName;
        }
    })
    localStorage.setItem('items', items.toString());
}

function editItem(e) {
    if (e.target.id === 'item-list')
        return;
    isEditMode = true;
    const li = e.target;
    itemName = li.textContent.trim();
    itemList
        .querySelectorAll('li')
        .forEach(el => el.style.color = '#000')
    li.style.color = '#ccc';
    itemInput.value = itemName;
    selectedItemName = itemName;
    submitButton.textContent = 'Update';
}

itemForm.addEventListener('submit', addItem);
clearButton.addEventListener('click', clearItems);
itemFilter.addEventListener('keyup', filterItems);
itemList.addEventListener('click', editItem);

for(const button of xButtons)
    button.addEventListener('click', removeItem);

checkUI();
// localStorage.clear();