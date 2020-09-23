const app = require("express")();
const bodyParser = require("body-parser");
const expressFileUpload = require("express-fileupload");

const fs = require("fs");
const path = require("path");
const { runInNewContext } = require("vm");

// middleware, every request passes through these two
app.use(bodyParser.urlencoded({extended: false})); // explained in bodyParser documentation
app.use(expressFileUpload());

var cache = {};

// console log all the request
app.use("/", (req, res, next) => {
    console.log(req);
    next();
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html") // you need a full path
});

app.post("/data/:name", (req, res) => {
    cache[req.params.name] = req.body.data;
    res.send(cache)
})

app.listen(3000, () => {
    console.log("App listening to Port 3000.")
})