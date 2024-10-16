import request from 'supertest';

import app from '../../app';

import client from '../../config/client';

beforeAll(async () => {
  try {
    const todos = client.todo.findMany();
    (await todos).forEach(async todo => await client.todo.delete({where: {id: todo.id}}));
  } catch (error) {}
});

describe('GET /api/v1/todos', () => {
  it('responds with an array of todos', async () =>
    request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
      }),
  );
});

let id = 0;

describe('POST /api/v1/todos', () => {
  it('responds with error if enpty content', async () =>
    request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        content: '',
      })
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }),
  );

  it('responds with error if enpty content', async () =>
    request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        content: 'learn express typescript',
        done: false
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        id = response.body.id;
        expect(response.body).toHaveProperty('done');
        expect(response.body).toHaveProperty('content');
      }),
  );
});


describe('GET /api/v1/todos/:id', () => {
  it('responds with an todo', async () =>
    request(app)
      .get(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('done');
        expect(response.body).toHaveProperty('content');
      }),
  );
});