// Dependencies
// =============================================================
var express = require("express");
// body parser makes it easier to read
var bodyParser = require("body-parser");
// joins paths together
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var characters = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  },
  {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Master",
    age: 55,
    forcePoints: 1350
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});


// ? means optional
// apit characters is a route. it will send a matching character if it finds one. if not it will send back false
// Search for Specific Character (or all characters) - provides JSON
// of left blank will go to all characters
app.get("/api/:characters?", function(req, res) {
  var chosen = req.params.characters;

  // if character is choosen we console log it 
  if (chosen) {
    console.log(chosen);
// your character === character with the route name, it will return that specific character
//this loop will make line 61 work
    for (var i = 0; i < characters.length; i++) {
      if (chosen === characters[i].routeName) {
        return res.json(characters[i]);
      }
    }
    // if false as in there is no character that matches, then return line 77;  all characters
    return res.json(false);
  }
  return res.json(characters);
});

// Create New Characters - takes in JSON input

app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  // 
  var newcharacter = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);
  // pushing into newCharcter array
  // pushing the newCharcater into characters array
  characters.push(newcharacter);

  // sends response back and closes the connection
  res.json(newcharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
