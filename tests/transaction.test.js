const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const jwt = require('jsonwebtoken');

describe('Transaction Routes', () => {
  let token;

  beforeEach(async () => {
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123',
    });
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  });

  it('should create a new transaction', async () => {
    const res = await request(app)
      .post('/api/v1/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'buy',
        amount: 1,
        asset: 'BTC',
        price: 30000,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data.type).toEqual('buy');
  });
});