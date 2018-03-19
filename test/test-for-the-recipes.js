const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Recipes', function () {

  before(function() {
  return runServer(); //function is imported from server.js
  });

  after(function() {
    return closeServer(); //function is imported from server.js
  });

  it('should list recipes items on GET', function() {
    return chai.request(app)
    .get('/recipes')
    .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');

        res.body.forEach(function(item) {
          expect(item).to.be.a('object');
          expect(item).to.include.keys('name', 'id', 'ingredients');
        });
      });
    });
// add item on POST requests

it('should add a recipe item on POST', function() {
  const newRecipe = {name: 'cake', ingredients:
   ['flour', 'sugar']};
  return chai.request(app)
    .post('/Recipes')
    .send(newRecipe)
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys('id', 'name', 'ingredients');
      res.body.name.should.equal(newRecipe.name);
      res.body.ingredients.should.be.a('array');
      res.body.ingredients.should.include.members(newRecipe.ingredients); //ask TJ to clarify this
    });
});

// updates a recipe on put

it('should update a recipe on PUT', function() {
  const updateData =
  { name: 'foo',
    ingredients: ['foo', 'fie']};
  return chai.request(app)
  .get('/recipes')
      .then(function(res) {
        updateData.id = res.body[0].id;

        return chai.request(app)
          .put(`/recipes/${updateData.id}`)
          .send(updateData)
      })
      .then(function(res) {
        expect(res).to.have.status(204);
      });
    });
// deletes recipes on DELETE
    it('should delete recipes on DELETE', function() {
   return chai.request(app)
     // first have to get recipes so have `id` for one we want
     // to delete. Note that once we're working with databases later
     // in this course, we'll be able get the `id` of an existing instance
     // directly from the database, which will allow us to isolate the DELETE
     // logic under test from our GET interface
     .get('/recipes')
     .then(function(res) {
       return chai.request(app)
         .delete(`/recipes/${res.body[0].id}`)
     })
     .then(function(res) {
          expect(res).to.have.status(204);
      });



});
