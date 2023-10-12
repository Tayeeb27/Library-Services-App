const booksController = require("../../../controller/books")
const Books = require('../../../models/Books')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

describe('books controller', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    it('is defined', () => {
        expect(booksController).toBeDefined()
    });


    it('should return books with a status code 200', async () => {
        const testBooks = ['b1', 'b2']
        jest.spyOn(Books, 'getAll')
        .mockResolvedValue(testBooks)
    })

    it('sends an error upon fail', async () => {
        jest.spyOn(Books, 'getAll')
          .mockRejectedValue(new Error('Something happened to your db'))
          await booksController.index(null, mockRes)
          expect(Books.getAll).toHaveBeenCalledTimes(1)
          expect(mockStatus).toHaveBeenCalledWith(500)
          expect(mockJson).toHaveBeenCalledWith({ error: 'Something happened to your db' })
        })
  

        test("it returns a book with a book id and 200 status code", async () => {
            let testBook = {
                    book_id: 2,
                    title: "Speak Up",
                    author: "Nathan Byron",
                    description: "Join the loveable Rocket as she organizes a peaceful protest to save her local library!",
                    category: "Fiction",
                    rating: "4.5",
                    release_year: "2023-04-30",
                    image_url: "https://m.media-amazon.com/images/I/51XUd9lyjwL._SX342_SY445_.jpg"
                  };
            jest.spyOn(Books, "getOneByID").mockResolvedValue(new Books(testBook));
            const mockReq = { params: { book_id: 2 } };
            await booksController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Books(testBook));
          });

          test("it returns a book with a book title and 200 status code", async () => {
            let testBook = {
                    book_id: 2,
                    title: "Speak Up",
                    author: "Nathan Byron",
                    description: "Join the loveable Rocket as she organizes a peaceful protest to save her local library!",
                    category: "Fiction",
                    rating: "4.5",
                    release_year: "2023-04-30",
                    image_url: "https://m.media-amazon.com/images/I/51XUd9lyjwL._SX342_SY445_.jpg"
                  };
            jest.spyOn(Books, "getOneByBookName").mockResolvedValue(new Books(testBook));
            const mockReq = { params: { title: "Speak Up" } };
            await booksController.bookName(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Books(testBook));
          });
    
          test("it returns a book with a book category and 200 status code", async () => {
            let testBook = {
                    book_id: 2,
                    title: "Speak Up",
                    author: "Nathan Byron",
                    description: "Join the loveable Rocket as she organizes a peaceful protest to save her local library!",
                    category: "Fiction",
                    rating: "4.5",
                    release_year: "2023-04-30",
                    image_url: "https://m.media-amazon.com/images/I/51XUd9lyjwL._SX342_SY445_.jpg"
                  };
            jest.spyOn(Books, "getBookByCategory").mockResolvedValue(new Books(testBook));
            const mockReq = { params: { category: "Fiction" } };
            await booksController.bookCategory(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Books(testBook));
          });
// end of describe block
})

