import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from './app.js';
import { openDatabase } from './db/database.js';

let app: ReturnType<typeof createApp>;
beforeEach(() => {
  app = createApp(openDatabase(':memory:'));
});

describe('feedback API', () => {
  it('creates feedback and lists it newest first', async () => {
    await request(app).post('/api/feedback').send({ message: 'First', rating: 4 }).expect(201);
    const created = await request(app)
      .post('/api/feedback')
      .send({ message: 'Second', rating: 5 })
      .expect(201);
    expect(created.body).toMatchObject({ message: 'Second', rating: 5 });

    const list = await request(app).get('/api/feedback').expect(200);
    expect(list.body.map((f: { message: string }) => f.message)).toEqual(['Second', 'First']);
  });

  it('rejects invalid input with the shared error shape', async () => {
    const res = await request(app).post('/api/feedback').send({ message: '  ', rating: 9 }).expect(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });
});
