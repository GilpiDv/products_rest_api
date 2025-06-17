import request from "supertest";
import server from "../../server";

// Create a new Product
describe('POST /api/products', () => {
    test('Display validation errors', async () => {
        // Simulate empty send to the create method
        const response = await request(server).post('/api/products').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)
    })

    test('Validate that product price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Item Test',
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors.some((err: any) => err.msg === 'Invalid price')).toBe(true);
    })

    test('Validate that product price is numeric', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Item with string price',
            price: 'price'
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)
        expect(response.body.errors.some((err: any) => err.msg === 'Price must be a number')).toBe(true);
        expect(response.body.errors.some((err: any) => err.msg === 'Invalid price')).toBe(true);
    })

    test('Create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Laptop Testing 2",
            price: 489
        })

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')
    })
})

// Query Products
describe('GET /api/products', () => {
    test('Check if api/products url exists', async () => {
        const response = await request(server).get('/api/products');
        
        expect(response.status).not.toBe(404)
    })

    test('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products');

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
    })
})