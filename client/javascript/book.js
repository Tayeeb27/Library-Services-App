const createBookElement = (data) => {
  const book = document.createElement('div');
  book.className = 'book';
  book.id = 'book';
  const title = document.createElement('h2');
  title.textContent = data['title'];
  title.id = 'bookTitle';
  book.appendChild(title);
  const author = document.createElement('p');
  author.textContent = data['author'];
  author.id = 'bookAuthor';
  book.appendChild(author);
  const description = document.createElement('p');
  description.textContent = data['description'];
  description.id = 'bookDescription'
  book.appendChild(description);
  const category = document.createElement('p');
  category.textContent = data['category'];
  category.id = 'bookCategory'
  book.appendChild(category);
  const rating = document.createElement('p');
  rating.textContent = data['rating'];
  rating.id = 'bookRating'
  book.appendChild(rating);
  const releaseYear = document.createElement('p');
  releaseYear.textContent = data['releaseYear'];
  releaseYear.id = 'bookReleaseYear'
  book.appendChild(releaseYear);
  const img = document.createElement('img');
  img.src = data['image_url']
  img.id = 'bookImg'
  book.appendChild(img);
  const reserveBtn = document.createElement('button');
  reserveBtn.textContent = 'Reserve'
  reserveBtn.id = 'reserveBtn'
  book.appendChild(reserveBtn);
  reserveBtn.addEventListener('click', () => {

  });
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

const category = document.querySelectorAll('.nav-link');
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