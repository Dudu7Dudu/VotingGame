const mongoose = require('mongoose');

const connectDB = async  () => {
    await mongoose.connect(
        "mongodb+srv://admin:easypasswordAdmin@cluster0.mv08g.mongodb.net/VotingGame"
    );
};

module.exports = connectDB;