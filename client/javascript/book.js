const createBookElement = (data) => {
    const book = document.createElement('div');
    book.className = 'book';
    const title = document.createElement('h2');
    title.textContent = data['title'];
    const author = document.createElement('p');
    author.textContent = data['author'];
    const description = document.createElement('p');
    description.textContent = data['description'];
    const category = document.createElement('p');
    category.textContent = data['category'];
    const rating = document.createElement('p');
    rating.textContent = data['rating'];
    const releaseYear = document.createElement('p');
    releaseYear.textContent = data['releaseYear'];
    const img = document.createElement('img');
    img.src = data['image_url']

    const reserveBtn = document.createElement('button');
    reserveBtn.textContent = 'Reserve'
    reserveBtn.addEventListener('click', () =>{

    });
}
async function loadBooks () {
    try {
      const response = await fetch("http://localhost:3000/book");
      const books = await response.json();
      if (response.status == 200) {
        const container = document.getElementById("books");
  
        books.forEach(b => {
          const elem = createPostElement(b);
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
              const container = document.getElementById("books");
              container.innerHTML = "";
              category.textContent = "";
              books.forEach(b => {
                const elem = createPostElement(b);
                container.appendChild(elem);
              });
            } else {
            }
          } catch (error) {
            console.log(error);
          }
    });
});

const searchBtn = document.querySelector('#searchbookbtn');
searchBtn.addEventListener('click', async(e)=>{
  const searchTitle = document.querySelector('#searchbooktext');
  const searchTitleEncoded = encodeURIComponent(searchTitle.value)
  console.log(searchTitleEncoded)
  try {
  const response = await fetch(`http://localhost:3000/books/title/${searchTitleEncoded}`);
    const posts = await response.json();
    if (response.status == 200) {
      const container = document.getElementById("posts");
      container.innerHTML = "";
      category.textContent = "";
      posts.forEach(p => {
        const elem = createPostElement(p);
        container.appendChild(elem);
      });
    } else {
    }
  } catch (error) {
    console.log(error);
  }
})