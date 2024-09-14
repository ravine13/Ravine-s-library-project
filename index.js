const url = "http://localhost:3000/Books";
const sellForm = document.getElementById('sell-form');
const hireForm = document.getElementById('hire-form');
const vitabu = document.getElementById('book-bar');
const Title = document.getElementById('title1');
const Price = document.getElementById('price1');
const describy = document.getElementById('description');
const Author = document.getElementById('author1');
const images = document.querySelectorAll('.book-image');
const details = document.getElementById('detail')
const bookList = document.querySelector('.book-list')
const close = document.getElementById("close-book-details")
const picture = document.getElementById('image')

// Close book details
close.addEventListener('click', function () {
    details.classList.remove('show-detail')
})

// Fetching books
function fetchingBooks(id = 1) {
    fetch(`${url}/${id}`)
        .then(response => response.json())
        .then(data => {
            Title.innerText = 'Title:' + " " + data.title;
            Price.innerText = 'Ksh:' + " " + data.price;
            describy.innerText = 'Description:' + " " + data.description;
            Author.innerText = 'Author:' + " " + data.author
            picture.setAttribute("src", data.image);
        });
}

// Posting new books
function postBooks(obj) {
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
    });
}

// Fetching all books
function fetchAllBook() {
    fetch(url)
        .then(res => res.json())
        .then(data => books(data));
}

fetchAllBook();

function books(array) {
    const bookCard = array.map(function (book) {
        return ` 
        <article class="book">
        <img onclick='displayBookDetail(${book.id})' src="${book.image}" id="${book.id}" alt="Book Cover">
        </article>`
    })
    bookList.innerHTML = bookCard.join(' ');
}

// Display book details
function displayBookDetail(id) {
    fetch(`${url}/${id}`)
        .then(response => response.json())
        .then(data => {
            details.classList.add('show-detail')
            Title.innerText = 'Title:' + " " + data.title;
            Price.innerText = 'Ksh:' + " " + data.price;
            describy.innerText = 'Description:' + " " + data.description;
            Author.innerText = 'Author:' + " " + data.author
        });
}

// Event delegation for Buy button
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('buy-button')) {
        confirmPurchase();
    }
});

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

// Event delegation for Sell button
document.addEventListener('click', function (event) {
    if (event.target.id === 'sell-btn') {
        sellForm.classList.add("show-form");
    }
});

// Sell form submit event
sellForm.addEventListener('submit', function (e) {
    e.preventDefault();

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
    sellForm.classList.remove("show-form");
});

// Hire form submit event
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
