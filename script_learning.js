
const selectElementsDOM = () => {
    let output;
    output = document.documentElement.innerHTML;
    output = document.head.children;
    output = document.URL;
    output = document.forms;
    document.forms[0].id = 'new_id';

    // search for 3rd li in the file
    output = document.querySelector('li:nth-child(3)');
    // search by className: 
    output = document.querySelector('.container');
    // search for first h1 element
    output = document.querySelector('h1').innerText = "Hello Balls";
    // search by id
    output = document.querySelector('#new_id');

    // select multiple elements at once
    // all elements of certain class
    listitems = document.querySelectorAll('.remove-item')
    listitems[1].style.color = 'blue' 
    listitems.forEach(item => item.style.color = 'blue');

    // select all li elements
    output = document.querySelectorAll('li');

    output = document.querySelector('h1').children;

    console.log(output);
}

const createElementsDOM = () => {
    const div = document.createElement('div');
    div.setAttribute('title', 'My-div-title');
    div.className = 'my-element';
    div.id = 'my-div';
    const text = document.createTextNode('Hello Balls');
    div.appendChild(text);
    const pageTitle = document.querySelector('h1');
    pageTitle.appendChild(div);

    // dirty way, browser has to re-render all nodes + other complicationes
    function addListItem(item) {
        const li = document.createElement('li');
        li.innerHTML = `${item}<button class="remove-item btn-link text-red">
            <i class="fa-solid fa-xmark"></i>
        </button>`;
        document.querySelector('#item-list').appendChild(li);
    }

    // more clean and performant
    function addListItemClean(item) {
        const li = document.createElement('li');
        const button = document.createElement('button');
        const i = document.createElement('i');

        li.appendChild(document.createTextNode(item));
        button.className = 'remove-item btn-link text-red';
        i.className = 'fa-solid fa-xmark';

        button.appendChild(i);
        li.appendChild(button);

        document.querySelector('#item-list').appendChild(li);
    }

    addListItemClean('Oua')

    function insertMethods() {
        const h1 = document.createElement('h3');
        h1.textContent = 'Salut fratele meleu!';
        h1.style.color = 'red';
        document.querySelector('.filter').insertAdjacentElement('afterend', h1);

        const text = 'This is my text';
        document.querySelector('.filter').insertAdjacentText('beforebegin', text);

        const html = '<h3>This is HTML</h3>';
        document.querySelector('.filter').insertAdjacentHTML('afterbegin', html);

        const parent = document.querySelector('ul');
        const li = document.createElement('li');
        li.textContent = 'LI text';
        const thirdChild = parent.querySelectorAll('li')[2];
        parent.insertBefore(li, thirdChild);
        
    }

}

function challengeInsertAfter() {
    const insertAfterChallenge = (newEl, existingEl) => {
        console.log(existingEl.nextSibling);
        existingEl.parentElement.insertBefore(newEl, existingEl.nextElementSibling);
    }

    const li = document.createElement('li');
    li.textContent = 'Insert me after';
    const firstItem = document.querySelector('li:last-child');
    console.log(firstItem.parentElement.querySelectorAll('li'))
    insertAfterChallenge(li, firstItem)
}

const replaceElements = () => {
    li = document.querySelector('li:first-child');
    new_li = document.createElement('li');
    new_li.innerText = 'Replaced First!';
    li.replaceWith(new_li);
    
    const replaceAllLi = () => {
        lis = document.querySelectorAll('li');
        lis.forEach( (element, index) => element.outerHTML = index === 0 ? '<li>Cristi was here first</li>' : '<li>Cristi was second</li>'
            
        )
    };

    replaceAllLi();
}

const removeElements = () => {
    document.querySelector('#clear').remove();
    const ul = document.querySelector('ul');
    const li = ul.querySelector('li');
    ul.removeChild(li);
}

const events = () => {
    function handleClearButton () {
        const ul = document.querySelector('#item-list');
        const li = ul.querySelectorAll('li');
        // ul.innerHTML = '';
        // li.forEach(el => ul.removeChild(el));
        li.forEach(el => el.remove());
    }
    const clearBtn = document.querySelector('#clear');
    clearBtn.addEventListener('click', handleClearButton);

    function doCrazyShit1() {
        document.querySelector('h1').innerText = 'Shopping List';
    }

    const doCrazyShit2 = () => {
        document.querySelector('h1').innerText = 'Please move the mouse';
    }

    const doCrazyShit3 = () => {
        document.querySelector('h1').innerText = 'Shopping List';
    }

    const img = document.querySelector('img');
    img.addEventListener('mouseup', doCrazyShit1);
    img.addEventListener('mousedown', doCrazyShit2);
    img.addEventListener('mouseover', doCrazyShit2);
    img.addEventListener('mouseout', doCrazyShit3);

    const handleFocus = (e) => {
        e.target.style.outlineStyle = 'solid';
        e.target.style.outlineWidth = '2px';
        e.target.style.outlineColor = 'darkGreen';
    }
    const handleBlur = (e) => {
        e.target.style.outlineStyle = 'none';
        e.stopPropagation(); // stops event from bubbling up
    } 
    const form = document.getElementById('item-input');
    form.addEventListener('input', function (e) { console.log(e.target.value) });
    form.addEventListener('focus', handleFocus);
    form.addEventListener('blur', handleBlur);
}

events();