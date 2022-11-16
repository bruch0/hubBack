import supertest from 'supertest';
import faker from 'faker';

import '../../src/setup';
import app from '../../src/app';
import clearDatabase from '../utils/clearDatabase';
import createToken from '../utils/createToken';
import createCompany from '../utils/createCompany';

const sut = supertest(app);

describe('GET /companies', () => {
  it('Should return status 401 when the bearer token is not sent', async () => {
    const result = await sut.get('/companies');

    expect(result.status).toEqual(401);
  });

  it('Should return status 401 when the Bearer token pattern is not used', async () => {
    const token = await createToken();

    const result = await sut.get('/companies').set('authorization', token);

    expect(result.status).toEqual(401);
  });

  it('Should return status 200 when the token passes the middleware', async () => {
    const token = await createToken();

    const result = await sut.get('/companies').set('authorization', `Bearer ${token}`);

    expect(result.status).toEqual(200);
  });
});

describe('GET /companies/:companyId', () => {
  it('Should return status 401 when the bearer token is not sent', async () => {
    const { id } = await createCompany();
    const result = await sut.get(`/companies/${id}`);

    expect(result.status).toEqual(401);
  });

  it('Should return status 401 when the Bearer token pattern is not used', async () => {
    const { id } = await createCompany();
    const token = await createToken();

    const result = await sut.get(`/companies/${id}`).set('authorization', token);

    expect(result.status).toEqual(401);
  });

  it('Should return status 200 when the token passes the middleware', async () => {
    const { id } = await createCompany();
    const token = await createToken();

    const result = await sut.get(`/companies/${id}`).set('authorization', `Bearer ${token}`);

    expect(result.status).toEqual(200);
  });

  it('Should return all the required properties', async () => {
    const { id, address, mainUserId, name, taxId } = await createCompany();
    const token = await createToken();

    const result = await sut.get(`/companies/${id}`).set('authorization', `Bearer ${token}`);

    expect(result.body).toMatchObject({ address, mainUserId, name, taxId, managers: [], places: [] });
  });
});

describe('POST /companies', () => {
  const validBody = {
    name: faker.name.findName(),
    taxId: faker.phone.phoneNumber('##############'),
    address: faker.address.streetAddress(),
  };

  it('Should return status 401 when the bearer token is not sent', async () => {
    const result = await sut.post('/companies/');

    expect(result.status).toEqual(401);
  });

  it('Should return status 401 when the Bearer token pattern is not used', async () => {
    const token = await createToken();

    const result = await sut.post('/companies/').set('authorization', token);

    expect(result.status).toEqual(401);
  });

  it('Should return status 400 when sending an invalid body', async () => {
    const token = await createToken();

    const result = await sut.post('/companies/').set('authorization', `Bearer ${token}`);

    expect(result.status).toEqual(400);
  });

  it('Should return status 201 when sending a valid body', async () => {
    const token = await createToken();

    const result = await sut.post('/companies/').set('authorization', `Bearer ${token}`).send(validBody);

    expect(result.status).toEqual(201);
  });
});

describe('PUT /companies', () => {
  it('Should return status 401 when the bearer token is not sent', async () => {
    const result = await sut.put('/companies/');

    expect(result.status).toEqual(401);
  });

  it('Should return status 401 when the Bearer token pattern is not used', async () => {
    const token = await createToken();

    const result = await sut.put('/companies/').set('authorization', token);

    expect(result.status).toEqual(401);
  });

  it('Should return status 400 when sending an invalid body', async () => {
    const token = await createToken();

    const result = await sut.put('/companies/').set('authorization', `Bearer ${token}`);

    expect(result.status).toEqual(400);
  });

  it('Should return status 200 when sending a valid body', async () => {
    await clearDatabase();
    const token = await createToken();
    const company = await createCompany();

    const result = await sut.put('/companies/').set('authorization', `Bearer ${token}`).send(company);

    expect(result.status).toEqual(200);
    expect(result.body).toMatchObject(company);
  });
});

describe('DELETE /companies', () => {
  it('Should return status 401 when the bearer token is not sent', async () => {
    const result = await sut.delete('/companies/');

    expect(result.status).toEqual(401);
  });

  it('Should return status 401 when the Bearer token pattern is not used', async () => {
    const token = await createToken();

    const result = await sut.delete('/companies/').set('authorization', token);

    expect(result.status).toEqual(401);
  });

  it('Should return status 400 when sending an invalid body', async () => {
    const token = await createToken();

    const result = await sut.delete('/companies/').set('authorization', `Bearer ${token}`);

    expect(result.status).toEqual(400);
  });

  it('Should return status 401 when sending a valid body, but requester is not the owner', async () => {
    await clearDatabase();
    const randomToken = await createToken();
    const company = await createCompany();

    const result = await sut.delete('/companies/').set('authorization', `Bearer ${randomToken}`).send(company);

    expect(result.status).toEqual(401);
  });

  it('Should return status 200 when sending a valid body and requester is the owner', async () => {
    await clearDatabase();
    const company = await createCompany();
    const token = await createToken(company.mainUserId);

    const result = await sut.delete('/companies/').set('authorization', `Bearer ${token}`).send(company);

    expect(result.status).toEqual(200);
  });
});
