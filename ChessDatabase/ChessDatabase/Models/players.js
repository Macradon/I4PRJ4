const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model

const PlayerSchema = new Schema({
    name: String,
    lastname: String,
    email: String, 
    pass: String,
});

const HighscoreSchema = new Schema({

    player: PlayerSchema.name, 
    moves: Number,
    time: Number, 
    games: Number, 
    win: Number, 
    loss: Number,

});

const Players = mongoose.model('players', PlayerSchema);

module.exports = Players;
