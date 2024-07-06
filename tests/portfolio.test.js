const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const Transaction = require('../src/models/Transaction');
const jwt = require('jsonwebtoken');

describe('Portfolio Routes', () => {
  let token;
  let userId;

  beforeEach(async () => {
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123',
    });
    userId = user._id;
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    // Create some test transactions
    await Transaction.create([
      {
        type: 'buy',
        amount: 1,
        asset: 'BTC',
        price: 30000,
        user: userId,
      },
      {
        type: 'buy',
        amount: 2,
        asset: 'ETH',
        price: 2000,
        user: userId,
      },
    ]);
  });

  it('should get portfolio', async () => {
    const res = await request(app)
      .get('/api/v1/portfolio')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('portfolio');
    expect(res.body.data).toHaveProperty('totalValue');
  });

  it('should get portfolio history', async () => {
    const res = await request(app)
      .get('/api/v1/portfolio/history')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.length).toEqual(2);
  });
});