const url = "http://localhost:3000/Books";
const buyButton = document.querySelectorAll('.buy-button');
const sellForm = document.getElementById('sell-form');
const hireForm = document.getElementById('hire-form');
const vitabu = document.getElementById('book-bar');
const sellBtn = document.getElementById('sell-btn')
const hireBtn = document.getElementById('hire-btn')
const Title = document.getElementById('title1');
const Price = document.getElementById('price1');
const describy = document.getElementById('description');
const Author = document.getElementById('author1');
const images = document.querySelectorAll('.book-image');
const details = document.getElementById('detail')
const bookList = document.querySelector('.book-list')
const close = document.getElementById("close-book-details")
const book1 = document.getElementById('book-1')
const picture = document.getElementById('image')


close.addEventListener('click',function(){
    details.classList.remove('show-detail')
})



function fetchingBooks(id = 1) {
    fetch(`${url}/${id}`)
        .then(response => response.json())
        .then(data => {
            Title.innerText ='Title:'+" "+data.title;
            Price.innerText ='Ksh:'+" "+ data.price;
            describy.innerText ='Description:'+" "+ data.description;
            Author.innerText ='Author:'+" "+ data.author
            picture.setAttribute("src", data.image);
        });
}

function postBooks(obj) {
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
    });
}
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click',function(){
})

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
    const bookCard = array.map(function(book){
        
        return ` 
        <article class="book">
        <img onclick='displayBookDetail(${book.id})'src="${book.image}" id="${book.id}" alt="Book Cover">
    </article>`
    
    })
    // vitabu.innerHTML = bookHtml.join(' ');
    bookList.innerHTML= bookCard.join(' ');
}
 function displayBookDetail(id){
    fetch(`${url}/${id}`)
    .then(response => response.json())
    .then(data => {
        details.classList.add('show-detail')
        Title.innerText ='Title:'+" "+data.title;
        Price.innerText ='Ksh:'+" "+ data.price;
        describy.innerText ='Description:'+" "+ data.description;
        Author.innerText ='Author:'+" "+ data.author
    });
 }
sellBtn.addEventListener('click',function(){
    sellForm.classList.add("show-form")
})

hireBtn.addEventListener('click',function(){
    hireForm.classList.add('show-form')
})
hireForm.addEventListener('submit',function(){
    hireForm.classList.remove('show-form')
})

sellForm.addEventListener('submit',function(){
    sellForm.classList.remove('show-form')
    const title = document.getElementById('title').value
    const describe = document.getElementById('description').value
    const Price = document.getElementById('price').value
    
    const books = {
        "title": title,
        "description":describe,
        "price":Price,
    }
    postBooks(books)
})
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

buyButton.forEach((button) => {
    button.addEventListener('click', confirmPurchase);
});



