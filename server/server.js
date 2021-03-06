const plantRoutes = require("./routes/plantRoutes");
const searchRoutes = require("./routes/searchRoutes")
const path = require("path");
const express = require("express");
const app = express();

// Add mongo here
const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://harlanevans:Daftpunk1!@cluster0.pqogi.mongodb.net/all_plants?retryWrites=true&w=majority"
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// require routes
// parses any req to be received
// req.body = undefined here
app.use(express.json())
// req.body = defined here

// SAME WITH IS... DO I NEED?
app.use(express.static("client"));

// BUILD FILES FROM WEBPACK
app.use("/build", express.static(path.join(__dirname, "../build")));

// search route
app.use("/api", searchRoutes);

// PLANTS ROUTE
app.use("/plants", plantRoutes);

// root
app.get("/", (req, res) => {   
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

// function getPlants() {

// }

// getPlants()
app.use('*', (req,res) => {
    res.status(404).send('Not Found');
});

// GLOBAL CATCH
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send('Internal Server Error')
})

// server port
app.listen(3000, () => {console.log(`Listening on Port 3000 and sort of 8080?`)});


module.exports = app;