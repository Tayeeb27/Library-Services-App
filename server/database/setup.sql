-- Drop and create the "books" table

DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS community_posts;
DROP TABLE IF EXISTS book_posts;


CREATE TABLE books (
    book_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(500) NOT NULL,
    author VARCHAR(500) NOT NULL,
    description VARCHAR(500) NOT NULL,
    category VARCHAR(50) NOT NULL,
    rating DECIMAL(3, 1) NOT NULL,
    release_year DATE NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    PRIMARY KEY (book_id)
);

-- Insert data into the "books" table
INSERT INTO books (title, author, description, category, rating, release_year, image_url)
VALUES 
('Little Women', 'Louisa May Alcott', 'Grown-up Meg, tomboyish Jo, timid Beth, and precocious Amy. The four March sisters could not be more different. But with their father away at war, and their mother working to support the family, they have to rely on one another.', 'Novel', 4.8, '1868-01-01', 'https://m.media-amazon.com/images/I/91ORJa-xI9L._SY466_.jpg'),
('Speak Up', 'Nathan Byron', 'Join the loveable Rocket as she organizes a peaceful protest to save her local library!', 'Fiction', 4.5, '2023-05-01', 'https://m.media-amazon.com/images/I/51XUd9lyjwL._SX342_SY445_.jpg'),
('When in Rome', 'Sarah Adams', 'When in Rome: The deliciously charming rom-com from the author of the TikTok sensation, THE CHEAT SHEET!', 'Fiction', 4.0, '2022-09-20', 'https://m.media-amazon.com/images/I/41esrpLG2BL._SY445_SX342_.jpg'),
('Harry Potter', 'J. K. Rowling', 'The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry', 'Fantasy', 4.8, '1997-06-25', 'https://m.media-amazon.com/images/I/51zZ3SAulVL._SY445_SX342_.jpg'),
('The Idiot', 'Fyodor Dostoevsky', '“The Idiot” tells the story of a young prince called Lev Nikolayevich Myshkin whose simple goodness is wrongly confused with a lack of intelligence by all he encounters.', 'Foreign', 4.5, '1868-01-01', 'https://m.media-amazon.com/images/I/71ODBY2ChvL._SY466_.jpg'),
('Doll House', 'John Hunt', 'A Doll house Horror Story', 'Horror', 4.4, '2017-01-25', 'https://m.media-amazon.com/images/I/81HRGUehn1L._SY385_.jpg');

-- Drop and create the "users" table
CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(500) NOT NULL,
    email VARCHAR(500) NOT NULL,
    password VARCHAR(500) NOT NULL,
    access_lvl INT DEFAULT 0,
    PRIMARY KEY (user_id)
);

-- Insert data into the "users" table
INSERT INTO users (name, email, password)
VALUES
('john doe', 'johndoe@example.com', 'password213'),
('jane smith', 'janesmith@example.com', 'qwerty123'),
('william allen', 'william123@example.com', 'pass1234'),
('sarah conner', 'saraht2@example.com', 'judgementday');

-- Drop and create the "orders" table
CREATE TABLE orders (
    order_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    collection_date DATE NOT NULL,
    order_reference VARCHAR(500),
    PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

-- Insert data into the "orders" table
INSERT INTO orders (user_id, book_id, collection_date, order_reference)
VALUES
(1, 4, '2023-09-05', '1234'),
(2, 3, '2023-10-05', '1212'),
(3, 5, '2023-01-01', '4321'),
(4, 2, '2023-10-08', '2109');

-- Create the "token" table
CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE community_posts (
    community_post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    time TIME DEFAULT CURRENT_TIME,
    PRIMARY KEY (community_post_id)
);
INSERT INTO community_posts (title, content) VALUES
    ('Community Post 1', 'This is the content of the first community post.'),
    ('Community Post 2', 'The second community post has some content.'),
    ('Community Post 3', 'Content for the third community post.');
CREATE TABLE book_posts (
    book_post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    time TIME DEFAULT CURRENT_TIME,
    PRIMARY KEY (book_post_id)
);
INSERT INTO book_posts (title, content) VALUES
    ('Book Post 1', 'This is the content of the first book post.'),
    ('Book Post 2', 'The second book post has some content.'),
    ('Book Post 3', 'Content for the third book post.');