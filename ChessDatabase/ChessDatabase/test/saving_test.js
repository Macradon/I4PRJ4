const assert = require('assert');
const Players = require('../models/players');

// Describe our tests
describe('Saving records', function(){

  // Create tests
  it('Saves a record to the database', function(done){

    const char = new Players({
      name: 'Mario',
      lastname: 'Jumpman',
      email: 'MushroomKingdomHero420@Nintendo.Com',
      pass: 'BowserSucks'
    });

    char.save().then(function(){
      assert(!char.isNew);
      done();
    });

  });

});
