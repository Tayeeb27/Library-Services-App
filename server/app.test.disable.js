const request = require('supertest');
const app = require('./app');

describe('Books', () => {
    it('GET /books should return status code 200', async () => {
        const response = await request(app).get('/books');
        expect(response.statusCode).toBe(200);

    })
    it('GET /books should contain an array of books', async () => {});
    it('GET /books/title should return a book by title', async () => {});
    it('GET /books/category should return a  book by category', async () => {});
    it('GET /books/category should return 404 if not found', async () => {});
    it('GET /books/user_id should return a book object', async () => {});    
})