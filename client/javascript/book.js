const createBookElement = (data) => {
  const book = document.createElement('div');
  book.className = 'book';
  const titleContainer = document.createElement('div');
  // Title Container
  titleContainer.className = 'titleContainer';
  book.appendChild(titleContainer)
  const title = document.createElement('h2');
  title.textContent = data['title'];
  titleContainer.appendChild(title);
  // Information Container
  const infoContainer = document.createElement('div')
  infoContainer.className = 'infoContainer'
  book.appendChild(infoContainer)

  // Information
  const imgParagraph = document.createElement('p');
  const img = document.createElement('img');
  img.src = data['image_url'];
  imgParagraph.appendChild(img);
  infoContainer.appendChild(imgParagraph);
  const author = document.createElement('p');
  author.innerHTML = `<b>Author:</b> ${data['author']}`;
  imgParagraph.appendChild(author);
  const description = document.createElement('p');
  description.innerHTML = `<b>Description:</b> ${data['description']}`;
  imgParagraph.appendChild(description);
  const category = document.createElement('p');
  category.innerHTML = `<b>Category:</b> ${data['category']}`;
  imgParagraph.appendChild(category);
  const rating = document.createElement('p');
  rating.innerHTML = `<b>Rating:</b> ${data['rating']}`;
  imgParagraph.appendChild(rating);
  const releaseYear = document.createElement('p');
  year = data['release_year'].slice(0, 4)
  releaseYear.innerHTML = `<b>Release Year:</b> ${year}`;
  imgParagraph.appendChild(releaseYear);

  const reserveBtn = document.createElement('button');
  localStorage.setItem('book_id', data['book_id']);
  reserveBtn.textContent = 'Reserve'
  infoContainer.appendChild(reserveBtn);
  reserveBtn.addEventListener('click', () => {
    addToBasket(data["id"], data['title'], data['author']);
  });

  const hr = document.createElement('hr')
  book.appendChild(hr)

  return book;
}
async function loadBooks() {
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

const category = document.querySelectorAll('.dropNav');
let categoryName = null;
category.forEach(function (link) {
  link.addEventListener("click", async (e) => {
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
searchBtn.addEventListener('click', async (e) => {

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
let bookCount = 0;
const addToBasket = (id, title, author) => {
  const basket = document.querySelector('.basket');

  // Create a container for the selected book
  const selectedBook = document.createElement('div');
  selectedBook.className = 'selected-book';

  // Create elements to display the title and author
  const titleElement = document.createElement('p');
  titleElement.innerHTML = `<b>Title:</b> ${title}`;
  const authorElement = document.createElement('p');
  authorElement.innerHTML = `<b>Author:</b> ${author}`;

  // Append title and author elements to the selected book container
  selectedBook.appendChild(titleElement);
  selectedBook.appendChild(authorElement);
  if (bookCount >= 1) {
    return alert('You can only add 1 books to your reservations')
  }
  // Append the selected book container to the basket
  basket.appendChild(selectedBook);

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove'
  basket.appendChild(removeBtn);

  removeBtn.addEventListener('click', () => {
    basket.removeChild(selectedBook);
    basket.removeChild(removeBtn);
    bookCount--
  });

  bookCount++
  basket.value = id;
}

document.getElementById("orderBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const dateD = document.getElementById('datePicker')
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
      user_id: localStorage.getItem('user_id'),
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
