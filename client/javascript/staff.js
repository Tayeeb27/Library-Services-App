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
    const date = new Date(data['release_year']);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    releaseYear.textContent = formattedDate;
    book.appendChild(releaseYear);
    const img = document.createElement('img');
    img.src = data['image_url']
    book.appendChild(img);
    localStorage.setItem('book_id', data['book_id']);
    const deleteBook = document.createElement("button"); 
    deleteBook.textContent = "Delete";
    book.appendChild(deleteBook);

    deleteBook.addEventListener("click", async (e) => {
  try {
    const options = {
        method: "DELETE"
    }
    const response = await fetch(`http://localhost:3000/books/${data['book_id']}`, options)
    // Handle the response as needed
    window.location.assign("./book.html");
  } catch (error) {
      console.log("Error", error);
  }
    
  })

    const editBook = document.createElement("button");
    editBook.textContent = "Edit";
    editBook.value = data["book_id"];
    book.appendChild(editBook);

    // Add a click event listener to the "Edit" button
    editBook.addEventListener("click", () => {
        // Display an edit form with the current post content
        displayEditForm(data);
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
  function displayEditForm(data) {
    // Assuming you have a form element with an ID "editForm" in your HTML
    const editForm = document.getElementById("editForm");
    const date = new Date(data['release_year']);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    console.log(formattedDate)
    // Populate the form with the current post data
    document.querySelector('#editTitle').value = data["title"];
    document.querySelector('#editAuthor').value = data["author"];
    document.querySelector('#editDescription').value = data["description"];
    document.querySelector('#editCategory').value = data["category"];
    document.querySelector('#editRating').value = data["rating"];
    document.querySelector('#editRelease_Year').value = formattedDate;
    document.querySelector('#editImage_url').value = data["image_url"];
  
    // Show the edit form
    if (editForm.style.display === "none") {
        editForm.style.display = "block";
    } else {
        editForm.style.display = "none";
    }editForm.style.display = "block";
  
    // Add a submit event listener to the edit form
    editForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const editedDescription = document.querySelector('#editDescription').value;
        const editedCategory = document.querySelector('#editCategory').value;
        const editedRating = document.querySelector('#editRating').value;
        const editedImage_url = document.querySelector('#editImage_url').value;
        
        // Send an HTTP request to update the post on the server
        const updatedData = {
            description: editedDescription,
            category: editedCategory,
            rating: editedRating,
            image_url: editedImage_url
        };
  
        const options = {
            method: "PATCH", // Use the appropriate HTTP method for updating
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        };
  
        try {
            const response = await fetch(`http://localhost:3000/books/${data["book_id"]}`, options);
            if (response.status == 200) {
                alert("Book updated successfully");
                editForm.style.display = "none";
                window.location.reload();
            } else {
                alert("Error updating book");
            }
        } catch (error) {
            console.log("Error", error);
        }
  
    });
  }
  document.getElementById("bookForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.querySelector('#title')
    const author = document.querySelector('#author')
    const description = document.querySelector('#description')
    const category = document.querySelector('#category')
    const rating = document.querySelector('#rating')
    
    const release_year = document.querySelector('#release_year')
    const date = new Date(release_year.value);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const image_url = document.querySelector('#image_url')
    const form = {title:title.value, author:author.value, description:description.value, category:category.value, rating:rating.value, release_year:formattedDate, image_url:image_url.value};
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    }
  
    const result = await fetch("http://localhost:3000/books", options);
  
    if (result.status == 200) {
        alert("Entry Entered successfully")
        window.location.reload();
        bookForm.reset()
    }
  })