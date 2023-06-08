const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');

const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = itemInput.value;
    if (newItem === '') {
        alert('Please enter an item before submitting.');
        return;
    }
    const li = document.createElement('li');
    li.innerHTML = `${newItem}
        <button class="remove-item btn-link text-red">
            <i class="fa-solid fa-xmark"></i>
        </button>`
    itemList.appendChild(li);
    itemInput.value = '';
}

itemForm.addEventListener('submit', handleSubmit)