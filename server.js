// NPMs
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring our Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
mongoose.Promise = Promise;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));

var dbconnectstring =
    process.env.MONGODB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/newsonescraper';

mongoose.connect(dbconnectstring, {
    useMongoClient: true
});

var db = mongoose.connection;

// HEROKU DEPLOYMENT: mongodb://heroku_4qtsh0tk:753riph12pdde4nlk2iobjdgct@ds115583.mlab.com:15583/heroku_4qtsh0tk

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connected.");

    mongoose.connection.db.listCollections().toArray(function(err, names) {
        if (err) {
            console.log(err);
        } else {
            console.log(names);
        }
    });
});

app.get("/scrape", function(req, res) {
    request("https://newsone.com/category/nation/", function(error, response, html) {
        var $ = cheerio.load(html);
        $(".post-meta").each(function(i, element) {

            var result = {};

            result.title = $(element).find(".post-meta__title").text().trim();
            //console.log(result.title);
            result.link = $(element).find(".post-meta__lead").text().trim();
            console.log(result.link);

            var entry = new Article(result);

            entry.save(function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(doc);
                }
            });
        });
    });
    res.send("Scrape Complete");
    res.redirect("/");
});

app.get("/article", function(req, res) {
    Article.find({})
        .populate("note")
        .exec(function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                res.json(doc);
            }
        });
});

// Grab an article by it's ObjectId
app.get("/article/:id", function(req, res) {
    Article.findOne({
            "_id": req.params.id
        })
        .populate("note")
        .exec(function(error, doc) {
            if (error) {
                console.log(error);
            } else {
                res.json(doc);
            }
        });
});

app.post("/article/:id", function(req, res) {
    var newNote = new Note(req.body);

    newNote.save(function(error, doc) {
        if (error) {
            console.log(error);
        } else {
            Article.findOneAndUpdate({
                    "_id": req.params.id
                }, {
                    "note": doc._id
                })
                .exec(function(err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(doc);
                    }
                });
        }
    });
});

app.listen(3000, function() {
    console.log("App running on port 3000!");
});