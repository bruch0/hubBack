import supertest from 'supertest';
import faker from 'faker';

import '../../src/setup';
import app from '../../src/app';
import clearDatabase from '../utils/clearDatabase';
import createUser from '../utils/createUser';

const sut = supertest(app);

describe('POST /signup', () => {
  const validBody = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    address: faker.address.streetAddress(),
    phone: faker.phone.phoneNumber('###########'),
  };

  it('Should return status 400 when sending invalid body', async () => {
    const result = await sut.post('/signup');

    expect(result.status).toEqual(400);
  });

  it('Should return status 201 when successfully creating an user', async () => {
    const result = await sut.post('/signup').send(validBody);

    expect(result.status).toEqual(201);
  });

  it('Should return status 403 when the same email is used again', async () => {
    const result = await sut.post('/signup').send(validBody);

    expect(result.status).toEqual(403);
  });
});

describe('POST /signin', () => {
  const validBody = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  it('Should return status 400 when sendind invalid body', async () => {
    const result = await sut.post('/signin');

    expect(result.status).toEqual(400);
  });

  it('Should return status 404 when logging with an inexistent account', async () => {
    await clearDatabase();
    const result = await sut.post('/signin').send(validBody);

    expect(result.status).toEqual(404);
  });

  it('Should return status 401 when sent password is wrong', async () => {
    const user = await createUser();
    const result = await sut.post('/signin').send({ email: user.email, password: faker.internet.password() });

    expect(result.status).toEqual(401);
  });

  it('Should return status 200 and a token when successfully logging in', async () => {
    const user = await createUser();
    const result = await sut.post('/signin').send({ email: user.email, password: user.password });

    expect(result.status).toEqual(200);
    expect(result.body.sessionToken).toBeDefined();
  });
});
