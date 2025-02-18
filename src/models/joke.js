const mongoose = require('mongoose');

const jokeSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
    votes: {
        type: String,
    },
    availableVotes: {
        type: String,
    }
});

const Joke = mongoose.model("Joke", jokeSchema);

module.exports = Joke;