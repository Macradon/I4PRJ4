const assert = require('assert');
const Players = require('../models/players');

// Describe our tests
describe('Deleting records', function(){
  var char;
  // Add a character to the db before each tests
  beforeEach(function(done){
    char = new Players({
      name: 'Mario',
      lastname: 'Jumpman',
      email: 'MushroomKingdomHero420@Nintendo.Com',
      pass: 'BowserSucks'
    });
    char.save().then(function(){
      done();
    });
  });

  // Create tests
  it('Deletes a record from the database', function(done){
    MarioChar.findOneAndRemove({name: 'Mario'}).then(function(){
      MarioChar.findOne({name: 'Mario'}).then(function(result){
        assert(result === null);
        done();
      });
    });
  });

});
