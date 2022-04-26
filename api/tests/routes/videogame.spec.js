/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);



describe('Test de routes', () => {
  
  describe('GET /genres', () => {
    it('responds with 200', () => 
      agent.get('/genres').expect(200));
  });

  describe('POST /videogame', () => {
    it ('responds with 400 if not send name', () => 
      agent.post('/videogame')
        .send({description:'test de routes', released:'02/02/1998', platforms:'PC'})
        .then((res) => {
          expect(400)
        })
    );
    
    it ('responds with 200 if send name, description, platforms', () => 
    agent.post('/videogame')
      .send({description:'test de routes', released:'02/02/1998', platforms:'PC'})
      .then((res) => {
        expect(200)
      })
  );

    it ('responds with an object if send name, description, platforms', () => {
      agent.post('/videogame')
        .send({name:'test', description:'test de routes', platforms:'PC' })
        .then((res) => {
          expect(res.body).toEqual({name:'test', description:'test de routes', platforms:'PC'})
        })
    })
  });

})

