const mongoose = require('mongoose');

// Define the vote schema
const voteSchema = new mongoose.Schema({
    value: { type: Number, required: true },
    label: { type: String, required: true, enum: ["😊", "🤣", "❤️"], }
  });

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
    votes: [voteSchema],
    availableVotes: ["😊", "🤣", "❤️"]
});

const Joke = mongoose.model("Joke", jokeSchema);

module.exports = Joke;