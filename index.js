const express = require("express");
const fs = require("fs");
const Port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
// app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
var dir = path.join(__dirname, 'public');
console.log(dir);
app.use(express.static(dir));
// MONGODB Connection
const db = require("./models");
require('dotenv').config();
const Role = db.role;
// `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}` connection string or url
db.mongoose
    .connect(
        "mongodb+srv://Rahul:VetsBook@cluster0.e9nzi.mongodb.net/VetsBook?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}
//routes
require("./routes/auth.routes")(app);
app.get("/", (req, res) => {
    res.json({ message: "Welcome to VetsBook's application." });
});
//Server
app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
});