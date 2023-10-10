const createBookElement = (data) => {
    const book = document.createElement('div');
    book.className = 'book';
    const title = document.createElement('h2');
    title.textContent = data['title'];
    book.appendChild(title);
    const author = document.createElement('p');
    author.textContent = data['author'];
    book.appendChild(author);
    const description = document.createElement('p');
    description.textContent = data['description'];
    book.appendChild(description);
    const category = document.createElement('p');
    category.textContent = data['category'];
    book.appendChild(category);
    const rating = document.createElement('p');
    rating.textContent = data['rating'];
    book.appendChild(rating);
    const releaseYear = document.createElement('p');
    releaseYear.textContent = data['releaseYear'];
    book.appendChild(releaseYear);
    const img = document.createElement('img');
    img.src = data['image_url']
    book.appendChild(img);
    const reserveBtn = document.createElement('button');
    localStorage.setItem('book_id', data['book_id']);
    reserveBtn.textContent = 'Reserve'
    book.appendChild(reserveBtn);
    reserveBtn.addEventListener('click', () =>{
      addToBasket(data["id"],data['title'], data['author']);
    });
    return book;
}
async function loadBooks () {
    try {
      const response = await fetch("http://localhost:3000/books");
      const books = await response.json();
      if (response.status == 200) {
        const container = document.getElementById("booksContainer");
  
        books.forEach(b => {
          const elem = createBookElement(b);
          container.appendChild(elem);
        });
      } else {
        //window.location.assign("./index.html");
      }
    } catch (error) {
      console.log(error);
    }
  }
  loadBooks()

  const category = document.querySelectorAll('.nav-link');
  let categoryName = null;
  category.forEach(function (link) {
    link.addEventListener("click", async(e) => {
        // Store the clicked link in the variable
        
        // You can perform other actions here based on the clicked link if needed
        console.log("Clicked link text: " + link.textContent);
        try {
          const response = await fetch(`http://localhost:3000/books/category/${link.textContent}`);
            const books = await response.json();
            if (response.status == 200) {
              const container = document.getElementById("booksContainer");
              container.innerHTML = "";
              category.textContent = "";
              books.forEach(b => {
                const elem = createBookElement(b);
                container.appendChild(elem);
              });
            } else {
            }
          } catch (error) {
            console.log(error);
          }
    });
});

const searchBtn = document.getElementById('searchbookbtn');
searchBtn.addEventListener('click', async(e)=>{
  
  const searchTitle = document.getElementById('searchbooktext');
  const searchTitleEncoded = encodeURIComponent(searchTitle.value)
  console.log(searchTitleEncoded)
  try {
  const response = await fetch(`http://localhost:3000/books/title/${searchTitleEncoded}`);
    const books = await response.json();
    if (response.status == 200) {
      const container = document.getElementById("booksContainer");
      container.innerHTML = "";
      category.textContent = "";
      searchTitle.value = "";
      const elem = createBookElement(books);
      container.appendChild(elem);
    } else {
    }
  } catch (error) {
    console.log(error);
  }
})
const addToBasket = (id,title, author) => {
  const basket = document.querySelector('.basket');
  
  // Create a container for the selected book
  const selectedBook = document.createElement('div');
  selectedBook.className = 'selected-book';
  
  // Create elements to display the title and author
  const titleElement = document.createElement('p');
  titleElement.textContent = `Title: ${title}`;
  const authorElement = document.createElement('p');
  authorElement.textContent = `Author: ${author}`;
  
  // Append title and author elements to the selected book container
  selectedBook.appendChild(titleElement);
  selectedBook.appendChild(authorElement);
  
  // Append the selected book container to the basket
  basket.appendChild(selectedBook);
  basket.value = id;
}

document.getElementById("orderBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const dateD =document.getElementById('datePicker')
  const order_reference = document.getElementById('orderRef')
  const date = new Date(dateD.value);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  console.log(formattedDate);
  const options = {
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          user_id:localStorage.getItem('user_id'),
          book_id: localStorage.getItem('book_id'),
          collection_date: formattedDate,
          order_reference: order_reference.value
      })
  }

  const response = await fetch("http://localhost:3000/orders/", options);
  const data = await response.json();

  if (response.status == 201) {
      alert("Order Completed!");
      window.location.assign("orders.html")
      localStorage.removeItem('book_id');
  } else {
      alert(data.error);
  }
})
