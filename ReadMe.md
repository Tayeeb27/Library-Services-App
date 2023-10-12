# Florin & Burkes County Library Services

## About our App

Welcome to the enchanting Florin & Burkes County library !

Here in the beautiful Florin & Burkes County, we have made sure that our residents have the marvelous opportunity to access the library online and always have a delightful array of books to choose from!

The library in Florin & Burkes County has faced decreased staffing levels and is facing closure, at the point in which more people would like to use the library's services. In order to tackle this, we decided to make a website that will take some of the load off of the library staff. Library users can now borrow books and return books using the website, without needing the staff to help. Library users can also search a book on the website to check if it is available or not, and when it is due to be returned(soon to be added), also taking load off of the staff.

As you may already know, books bring forth a myriad of splendid benefits, including:

- Knowledge and Learning: Books serve as splendid vessels of wisdom and knowledge, allowing us to explore a vast array of captivating information and acquire new insights.

- Mental Stimulation: When we immerse ourselves in the captivating world of books, our minds are invigorated and stimulated, enhancing our cognitive abilities and sharpening our intellectual prowess.

- Imagination and Creativity: The pages of books hold boundless realms of imagination, whisking us away to extraordinary worlds, bygone eras, and intriguing perspectives. They ignite the flames of creativity within us, encouraging us to paint vivid pictures in our minds.

- Emotional Development: Books possess the remarkable power to stir a multitude of emotions deep within our hearts. They make us giggle with glee, shed tears of both joy and sorrow, empathize with characters, and forge profound connections to their journeys.

- Relaxation and Stress Reduction: Amidst the hustle and bustle of life, books offer a splendid sanctuary for tranquility and peace. They serve as a balm for our souls, providing respite from the stresses of everyday life and granting us a serene escape.

- Language and Communication Skills: Within the pages of books lie the keys to unlocking the beauty of language. By immersing ourselves in well-crafted sentences, eloquent phrases, and diverse writing styles, we enhance our vocabulary, grammar, and overall communication skills.

- Expanded Perspectives: Books act as marvelous gateways to diverse cultures, varied perspectives, and captivating experiences. They invite us to embark on journeys of understanding, broadening our horizons and nurturing open-mindedness.

- Lifelong Companion: Books are extraordinary companions that accompany us throughout our lives, through the wondrous chapters of our personal journeys. They offer solace, camaraderie, and intellectual stimulation, remaining steadfast through the ever-changing tides of time.

By following these steps, you can make the most of our library's offerings and easily find the books that capture your interest.

Here at Florin & Burkes County Library, we celebrate the transformative power of books and invite you to embark on delightful literary adventures that will enrich your mind, touch your heart, and transport you to extraordinary realms. Happy reading!

## Installation & Usage

#### Github steps

- Fork the repo (top right of the page).
- Go to your forked repo, it will now say `<your-github-username>Library-Services_App`.
- Click the green "code" button and copy the **SSH** option if you have already setup git in your terminal, or the **HTTPS** option if not.

#### Terminal commands (GITBASH FOR WINDOW USERS OR TERMINAL FOR MAC USERS)

- Go to the directory you want to clone in.
- Run `git clone <SSH key or HTTPS key>`.
- Then, `cd Library-Services_App`.
- Check branch is master using `git branch` otherwise `git checkout master`.
- Run `ls` to check files & folders which should have a "server" folder, "client" folder and "README.md" file.
- To open VS code, `code .`.

#### How to install the libraries

- Change directory into the server by running `cd server`
- Install the dependancies by running `npm install`
- If this did not install the nodemon package, run `npm install -D nodemon`

#### How to connect the database

- Create a `.env` file within the server folder
- Login to [elephantsql](https://www.elephantsql.com)
- Create a new instance, you can name it "Library-Services"
- In the details tab of your new db, copy the db URL
- Within your `.env` file, add `DB_URL={your copied URL}`
- Make sure the `.env` is in the `.gitignore` file!
- cd into the api folder if you aren't already, and run `npm run setup-db`
- You should see "Set-up complete." in your terminal

#### How to run the server

- To the `.env` file, add `PORT=3000`
- cd into the api folder if you aren't already, and run `npm run dev`
- You should see "API listening on 3000" in your terminal

**Make sure to leave the server running in the terminal for the next stages too.**

#### How to access various routes in the backend

- Click the following link: [API](http://localhost:3000)
- You can check the routes:
  - /users
    params: users/id, users/register, user/login. 
  - /books 
     params: books/id, books/title, books/category.  
  - /orders
    params: orders/id.
  - /book_posts
    params: book_posts/id, book_posts/date.
  - /community_posts
    params: community_posts/id, community_posts/date.

#### How to open the website

- Check the extension "Live Server" is installed on VS code otherwise install it.
- Open the explorer section in VS code, then open the "client" folder.
- Right click "home.html" and click on "Open with Live Server". It will redirect you to your browser.

#### How to use

- From the home page you may log in or register.
- Additionally you can search for a book, or browse by genre using the genre dropdown menu.


## Technology used

- HTML
- CSS
- Javascript
- Express.js
- Figma
- Bcrypt encription
- Jest testing

## License

La Fosse Academy Jacquard

## Wins and challenges

Some functionality of borrowing a book was tricky to implement, such as updating the book with the users ID, which had to be gotten from the token. We got over these challenges by all coming up with different ideas to get around this.

At the start of the project, git usage was fine as there were no merge conflicts. However, as the project got more and more complicated, we experience more and more conflicts which we had to sit down and deal with.

## Bugs

There are no known bugs. However, some of the elements have not yet been implemented e.g. Previously read books.

## Future features

In the future we would add a previously read books column to the user database, which would allow us to display books that a user has read and returned. We would also implement a reviewing system in which people can review, and rate a book out of 5. We would also allow for admin accounts to be setup which can add or remove books to the library's content.