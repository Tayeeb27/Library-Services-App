const Books = require('../../../models/Books')
const db = require('../../../database/connect')

describe('Books model', () => {
    beforeEach(() => jest.clearAllMocks())
  
    afterAll(() => jest.resetAllMocks())
  
    it('is defined', () => {
      expect(Books).toBeDefined()
    })

      it('resolves with books', async () => {
        // Mock the db.query function to return a sample response with rows
        jest.spyOn(db, 'query').mockResolvedValueOnce({
          rows: [{  
          book_id: 2,
          author: "Nathan Byron",
          description: "Join the loveable Rocket as she organizes a peaceful protest to save her local library!",
          category: "Fiction",
          rating: "4.5",
          image_url: "https://m.media-amazon.com/images/I/51XUd9lyjwL._SX342_SY445_.jpg", 
          release_year: "2023-04-30T23:00:00.000Z",
          title: "Speak Up"
        
        }],
        });
    
        const books = await Books.getAll();
        
        // Make assertions on the result
        expect(books).toHaveLength(1);
        expect(books[0]).toHaveProperty('book_id');
      });


      it('should return a book when searched by book name', async () => {
        // Mock the db.query function to return a sample response with a single row
        jest.spyOn(db, 'query').mockResolvedValueOnce({
          rows: [{ title: 'Sample Book' }],
        });
    
        const book = await Books.getOneByBookName('Sample Book');
    
        // Assert that the function returns the expected book
        expect(book).toBeDefined();
        expect(book.title).toBe('Sample Book');
      });
    
      it('should throw an error when no book is found with that name', async () => {
        // Mock the db.query function to return an empty response (no matching rows)
        jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });
    
        // Use async/await with try-catch to catch the error
        try {
          await Books.getOneByBookName('Non-Existent Book');
          // If no error is thrown, fail the test
          fail('Expected an error to be thrown');
        } catch (error) {
          // Assert that the error message matches your expectation
          expect(error.message).toBe('unable to find that book');
        }
      })
    

    // get book by id
    it('should return a book when searched by ID', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [{ book_id: 1, title: 'Sample Book' }],
      });
      const book = await Books.getOneByID(1);
      expect(book).toBeDefined();
      expect(book.book_id).toBe(1);
      expect(book.title).toBe('Sample Book');
    });
  
  
      
  
    it('should throw an error when no book is found with that ID', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });
      // Use async/await with try-catch to catch the error
      try {
        await Books.getOneByID(2); // Assuming book ID 2 does not exist
        // If no error is thrown, fail the test
        fail('Expected an error to be thrown');
      } catch (error) {
        // Assert that the error message matches your expectation
        expect(error.message).toBe('unable to find that book');
      }
    })

    // get book by category
    it('should return books when found', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          { book_id: 1, title: 'Book 1', category: 'Fiction' },
          { book_id: 2, title: 'Book 2', category: 'Fiction' },
        ],
      });
  
      const books = await Books.getBookByCategory('Fiction');
      expect(books).toBeDefined();
      expect(books).toBeInstanceOf(Array);
      expect(books.length).toBe(2);
      expect(books[0]).toHaveProperty('book_id', 1);
      expect(books[1]).toHaveProperty('book_id', 2);
    });


  // test for category error
    it('should throw an error when no books are found', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });
      try {
        await Books.getBookByCategory('Non-Existent Category');
        // If no error is thrown, fail the test
        fail('Expected an error to be thrown');
      } catch (error) {
        // Assert that the error message matches your expectation
        expect(error.message).toBe('No Books available');
      }
    });
  
})
  
    
