import supertest from 'supertest';
import faker from 'faker';

import '../../src/setup';
import app from '../../src/app';

const request = supertest(app);

describe('POST /signup', () => {
  const validBody = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    address: faker.address.streetAddress(),
    phone: faker.phone.phoneNumber('###########'),
  };

  it('Should return status 400 when sending invalid body', async () => {
    const result = await request.post('/signup');

    expect(result.status).toEqual(400);
  });

  it('Should return status 201 when successfully creating an user', async () => {
    const result = await request.post('/signup').send(validBody);

    expect(result.status).toEqual(201);
  });

  it('Should return status 403 when the same email is used again', async () => {
    const result = await request.post('/signup').send(validBody);

    expect(result.status).toEqual(403);
  });
});
