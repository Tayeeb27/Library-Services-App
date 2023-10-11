const request = require('supertest');
const app = require('../app');

// Books test 
describe('Books', () => {
    it('GET /books should return status code 200', async () => {
        const res = await request(app).get('/books');
        expect(res.status).toBe(200);
    });
    
    it('GET /books --> array containing books objects', async () => {
        const res = await request(app).get('/books');
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toHaveProperty('title');
    });

    it('should return a specific book by title', async () => {
        const title = 'example title';
        const res = await request(app).get(`/books/title/${title}`);
        expect(res.body).toHaveProperty('title', title);
    });

    it('GET /books/title --> 404 if not found', async () => {
        const title = 'nonexistent title';
        const res = await request(app).get(`/books/title/${title}`);
        expect(res.status).toBe(404);
    });

    it('GET /books/category --> specific book by category', async () => {
        const category = 'example category';
        const res = await request(app).get(`/books/category/${category}`);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toHaveProperty('category', category);
    });

    it('GET /books/category --> 404 if not found', async () => {
        const category = 'nonexistent category';
        const res = await request(app).get(`/books/category/${category}`);
        expect(res.status).toBe(404);
    });
});
