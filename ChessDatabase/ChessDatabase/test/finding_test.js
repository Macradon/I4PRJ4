const assert = require('assert');
const Players = require('../models/players');

// Describe our tests
describe('Finding records', function(){
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
  it('Finds a record from the database', function(done){
    MarioChar.findOne({name: 'Mario'}).then(function(result){
      assert(result.name === 'Mario');
      done();
    });
  });

  it('Finds a record by unique id', function(done){
    MarioChar.findOne({_id: char._id}).then(function(result){
      assert(result._id.toString() === char._id.toString());
      done();
    });
  });

});
