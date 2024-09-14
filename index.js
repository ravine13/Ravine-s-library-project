const url = "http://localhost:3000/Books";
const sellForm = document.getElementById('sell-form');
const hireForm = document.getElementById('hire-form');
const vitabu = document.getElementById('book-bar');
const sellBtn = document.getElementById('sell-btn');
const hireBtn = document.getElementById('hire-btn');
const Title = document.getElementById('title1');
const Price = document.getElementById('price1');
const describy = document.getElementById('description');
const Author = document.getElementById('author1');
const details = document.getElementById('detail');
const bookList = document.querySelector('.book-list');
const close = document.getElementById("close-book-details");
const picture = document.getElementById('image');

// Close the book details
close.addEventListener('click', function () {
    details.classList.remove('show-detail');
});

// Fetch individual book details
function fetchingBooks(id = 1) {
    fetch(`${url}/${id}`)
        .then(response => response.json())
        .then(data => {
            Title.innerText = 'Title: ' + data.title;
            Price.innerText = 'Ksh: ' + data.price;
            describy.innerText = 'Description: ' + data.description;
            Author.innerText = 'Author: ' + data.author;
            picture.setAttribute("src", data.image);
        });
}

// Post new books
function postBooks(obj) {
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
    });
}

// Fetch all books
function fetchAllBook() {
    fetch(url)
        .then(res => res.json())
        .then(data => books(data));
}

fetchAllBook();

function books(array) {
    const bookHtml = array.map(function (book) {
        return `<li onclick="fetchingBooks(${book.id})">${book.title}</li>`;
    });
    const bookCard = array.map(function (book) {
        return `
        <article class="book">
            <img onclick='displayBookDetail(${book.id})' src="${book.image}" id="${book.id}" alt="Book Cover">
        </article>`;
    });
    bookList.innerHTML = bookCard.join(' ');
}

// Display book details
function displayBookDetail(id) {
    fetch(`${url}/${id}`)
        .then(response => response.json())
        .then(data => {
            details.classList.add('show-detail');
            Title.innerText = 'Title: ' + data.title;
            Price.innerText = 'Ksh: ' + data.price;
            describy.innerText = 'Description: ' + data.description;
            Author.innerText = 'Author: ' + data.author;
        });
}

// Show and hide forms
sellBtn.addEventListener('click', function () {
    sellForm.classList.add("show-form");
});

hireBtn.addEventListener('click', function () {
    hireForm.classList.add('show-form');
});

// Hire form submission
hireForm.addEventListener('submit', function (e) {
    e.preventDefault();
    hireForm.classList.remove('show-form');
    const processingMessage = document.getElementById('request-processing-message');
    processingMessage.style.display = 'block';

    setTimeout(function () {
        processingMessage.style.display = 'none';
        alert('Your request has been processed. We will contact you shortly.');
        hireForm.reset();
    }, 3000);
});

// Sell form submission
sellForm.addEventListener('submit', function (e) {
    e.preventDefault();
    sellForm.classList.remove('show-form');
    const title = document.getElementById('title').value;
    const describe = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('book-upload').value;
    const author = document.getElementById('author').value;

    const book = {
        "title": title,
        "description": describe,
        "price": price,
        "image": image,
        "author": author
    };
    postBooks(book);
});

// Confirm book purchase
function confirmPurchase() {
    const confirmation = window.confirm('Do you want to buy this book?');

    if (confirmation) {
        const paymentOption = prompt('Select a payment option:\n1. VISA - CARD\n2. M-PESA');

        if (paymentOption) {
            if (paymentOption === '1') {
                alert('You have selected VISA - CARD. Redirecting to Visa payment page...');
            } else if (paymentOption === '2') {
                alert('You have selected M-PESA. Please make the payment using M-Pesa.');
            } else {
                alert('Invalid payment option. Please select either 1 for VISA - CARD or 2 for M-PESA.');
            }
        } else {
            alert('Purchase canceled.');
        }
    }
}

// Event delegation for buy buttons (in case elements are dynamically added)
document.addEventListener('click', function (event) {
    if (event.target.matches('.buy-button')) {
        confirmPurchase();
    }
});
