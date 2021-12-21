// README: 
// application is to create a list of books, 
// the list is stored in localStorage and displayed below the form when submitted. 
// Inputs have validation.
let form = document.querySelector("#form");
let errorMessage = document.querySelector('.error-message')
let succesMessage = document.querySelector('.success-message')

let topicInput = document.querySelector('#topic');
let authorInput = document.querySelector('#author');
let priorityInput = document.querySelector('#priority');
let categoryInput = document.querySelector('#category');

// localstorage getItem
const formData = JSON.parse(localStorage.getItem('formData')) || [];


const addBook = (topic, author, priority, category) => {
    formData.push({
        topic,
        author,
        priority,
        category,
    });
    //localStorage setItem
    localStorage.setItem('formData', JSON.stringify(formData))
    return { topic, author, priority, category }
}

const createBookElement = ({ topic, author, priority, category }) => {
    // create elements
    const bookDiv = document.createElement('div');
    const bookTopic = document.createElement('tr');
    const bookAuthor = document.createElement('tr');
    const bookPriority = document.createElement('tr');
    const bookCategory = document.createElement('tr');

    //fill the content
    bookTopic.innerText = 'Tytuł: ' + topic
    bookAuthor.innerText = 'Autor: ' + author
    bookPriority.innerText = 'Priorytet: ' + priority
    bookCategory.innerText = 'Kategoria: ' + category;

    //add to DOM
    bookDiv.append(bookTopic, bookAuthor, bookPriority, bookCategory);
    succesMessage.appendChild(bookDiv);
    bookDiv.classList.add('bookList');
}

formData.forEach(createBookElement);


form.addEventListener("submit", e => {

    e.preventDefault()
// validations
    let errors = [];

    if (topic.value.length < 1) {
        errors.push("Nazwa książki jest za krótka");
    }
    if (author.value.length < 3) {
        errors.push("Nazwa autora jest za krótka");
    }
    if (priority.value.length < 1) {
        errors.push('Wpisz liczbę od 1 do 5')
    }
    if (category.selectedIndex < 1) {
        errors.push('Wybierz kategorię')
    }
    if (errors.length <= 0) {

        errorMessage.innerHTML= '';
        const newBook = addBook(
            topicInput.value,
            authorInput.value,
            priorityInput.value,
            categoryInput.value
        )

        createBookElement(newBook)
        topicInput.value = '';
        authorInput.value = '';
        priorityInput.value = '';
        categoryInput.value = '';


    } else {
        errorMessage.innerHTML = `<h4 class="form-error-title">Przed wysłaniem proszę poprawić błędy:</h4>
            <ul class="form-error-list">
                ${errors.map(el => `<li>${el}</li>`).join("")}
            </ul>`;
    }

});