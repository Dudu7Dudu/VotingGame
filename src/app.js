const express = require ('express');
const connectDB = require ("./config/database");
const app = express();
const Joke =require("./models/joke");




app.post("/api/joke/:id", async (req, res) =>{
    const joke = new Joke ({
         
        id: "amputee",
        question: "What did they digital clock say to its mom?",
        answer: "Look mom, no hands.",
        permalink: "https://teehee.dev/api/joke/amputee",
        permalink_html: "https://teehee.dev/joke/amputee",
        votes : "❤️",
        availableVotes: "❤️"
        
    });
    try {
        await joke.save();
    res.send("vote altered successfully");
    }catch (err) {
        res.status(400).send("error saving the joke vote:" + err.message);
    }
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