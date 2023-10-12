const openTab = (tabName) => {
  const tabs = document.querySelectorAll(".tab-content");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }
  document.getElementById(tabName + '-content').style.display = "block";
}
const createElement = (data) => {
  const book = document.createElement('div');
  book.className = 'book';

  const title = document.createElement('h2');
  title.textContent = data["title"];
  book.appendChild(title);

  const content = document.createElement('p');
  content.innerHTML = `<b>Post:</b> ${data['content']}`;
  book.appendChild(content);

  const dateC = document.createElement('div');
  dateC.className = 'dateContainer'
  book.appendChild(dateC)
  const dateP = document.createElement('p');
  const sqlDate = data["date"];
  const date = new Date(sqlDate);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  dateP.innerHTML = `<b>Posted:</b> ${formattedDate}`;
  dateC.appendChild(dateP);

  const timeP = document.createElement("p");
  const sqlTime = data["time"];
  const [hours, minutes, seconds] = sqlTime.split(":");
  const hoursPlus1 = parseInt(hours, 10) + 1
  // Format the time in your desired way
  const formattedTime = `${hoursPlus1}:${minutes}`
  timeP.innerHTML = `at ${formattedTime}`;
  dateC.appendChild(timeP);


  return book;
}
async function loadBookPosts() {
  try {
    const response = await fetch("http://localhost:3000/book_posts");
    const books = await response.json();
    if (response.status == 200) {
      const container = document.getElementById("book-posts");

      books.forEach(b => {
        const elem = createElement(b);
        container.appendChild(elem);
      });
    } else {
      //window.location.assign("./index.html");
    }
  } catch (error) {
    console.log(error);
  }
}
loadBookPosts()

async function loadCommunityPosts() {
  try {
    const response = await fetch("http://localhost:3000/community_posts"); // Fetch community posts
    const communityPosts = await response.json();
    if (response.status == 200) {
      const container = document.getElementById("community-posts"); // Use the correct container

      communityPosts.forEach(communityPost => {
        const elem = createElement(communityPost);
        container.appendChild(elem);
      });
    } else {
      // Handle the error appropriately, such as showing an error message.
    }
  } catch (error) {
    console.log(error);
  }
}

loadCommunityPosts(); // Call the function to load community posts
document.getElementById("BPForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.querySelector('#titleB')
  const content = document.querySelector('#contentB')

  const form = { title: title.value, content: content.value };
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  }

  const result = await fetch("http://localhost:3000/book_posts", options);

  if (result.status == 201) {
    alert("Entry Entered successfully")
    window.location.reload();
    BPForm.reset()
  }
})
document.getElementById("CPForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.querySelector('#titleC')
  const content = document.querySelector('#contentC')

  const form = { title: title.value, content: content.value };
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  }

  const result = await fetch("http://localhost:3000/community_posts", options);

  if (result.status == 201) {
    alert("Entry Entered successfully")
    window.location.reload();
    CPForm.reset()
  }
})