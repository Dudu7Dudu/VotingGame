const express = require ('express');
const connectDB = require ("./config/database");
const app = express();
const Joke =require("./models/joke");



app.use(express.json());


// Get joke by ID
// app.get("/api/joke/:id", async (req, res) =>{
//     const jokeID = req.body.ID;
    
//     try{
//         const joke = await Joke.find({id: jokeID});
//         if (joke.length == 0) {
//             res.status(404).send("joke not found");
//         }else{
//         res.send(joke);
//         }
//     }catch(err){
//         res.status(400).send("something went wrong");
//     }
// })

app.get("/api/joke", async (req, res) =>{
    
    try{
        const sample = await Joke.aggregate().sample(1);
        res.send(sample);
    }catch(err){
        console.log("couldn't find the joke");
    }
})

app.post("/api/joke/:id", async (req, res) =>{
    const jokeId = req.params.id;
    try {
        const joke = await Joke.findById(jokeId);
        const emojiToUpdate = req.body.label;
        if(joke.availableVotes.includes(emojiToUpdate)) {
            let hasKey = false;
            joke.votes.map(vote => {
                if(vote.label === emojiToUpdate){
                    hasKey = true;
                    return {value: vote.value++, label: vote.label}
                }
            })
            if(!hasKey){
                joke.votes.push({label: emojiToUpdate, value: 1})
            }
                
            }
            
        
        await joke.save(joke)


        res.send(joke);
    }catch (err) {
        res.status(400).send("error saving the joke vote: " + err.message);
    }
})

app.patch("/api/joke/:id", async (req, res) =>{
    const jokeId = req.params.id;
    const newQuestion = req.body.question;
    const newAnswer = req.body.answer;
    try {
        const updatedJoke = await Joke.findOneAndUpdate(
            {id: jokeId}, 
            {question: newQuestion, answer: newAnswer}, 
            {new: true}
        );
        res.send(updatedJoke);
    }catch (err) {
        res.status(400).send("error changing the joke: " + err.message);
    }
})

app.delete("/api/joke/:id", async (req, res) =>{
    const jokeId = req.params.id;
    try {
        await Joke.findByIdAndDelete(jokeId);
        res.send("joke deleted");
    }catch (err) {
        res.status(400).send("error changing the joke: " + err.message);
    }
})



app.post("/api/newjoke", async (req, res) =>{
    const joke = new Joke (req.body);
    try {
        await joke.save();
    res.send("vote altered successfully");
    }catch (err) {
        res.status(400).send("error Changing the joke:" + err.message);
    }
    console.log(req.body);
})

connectDB().then(() =>{
    console.log("database connection established...");
    app.listen(3000, () => {
        console.log ("listening");
    });
})
.catch((err) => {
    console.error("Database cannot connect !!");
});

/*
app.get("/api/joke", (req, res) =>{
    res.send ("get joke")
})

app.get("/api/joke/:id", (req, res) =>{
    res.send("get joke");
})



app.delete("/api/joke/:id", (req, res) =>{
    res.send ("deleted user !");
})
app.patch("/api/joke/:id", (req, res) =>{
    res.send("update contents of the joke");
})

app.use("/test",(req, res) => {
    res.send("hello !");
});
*/