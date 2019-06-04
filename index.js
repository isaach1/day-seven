const express = require("express");

const app = express();

const constants = require("./constants");
// console.log(constants);

const ValidationService = require("./validation-service");
const valServ = new ValidationService();
console.log(valServ);
console.log(ValidationService);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var users = new Array();

app.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({message : "Need a userId"});
    }

    for (var i = 0; i < users.length; i++) {
        const currUser = users[i];
        if (currUser.id == userId) {
            return res.status(200).json(currUser);
        }
    }

    // console.log(userId);
    // return res.json({userId: userId});
    return res.json({message: "User not found with that id"});
});

app.post("/api/users", (req, res) => {
    const user = req.body;
    const bodyFirstname = user.firstname;
    const bodyLastname = user.lastname;
    const bodyEmail = user.email;
    const bodyPassword = user.password;

    if (!bodyEmail) {
        return res.status(400).json({message: "Invalid request"});
    }

    var newUser = {
        id: users.length + 1,
        firstname: bodyFirstname,
        lastname: bodyLastname,
        email: bodyEmail,
        password: bodyPassword
    };

    var already_in = false;
    users.forEach(existingUser => {
        if (bodyEmail === existingUser.email) {
            already_in = true;
            // throw new error("Email is already used");
        }
    });
    if (already_in == false) {
        users.push(newUser);
        res.json(newUser);
    } else {
        return res.status(400).json({ message: "User exists with that email"});
    }
});

app.post("/api/auth", (req, res) => {
    res.send("POST Auth api");
});

const PropertyRouter = express.Router();
PropertyRouter.post("/api/properties", (req, res) => {
    res.send("POST Properties api");
});
app.use("/parent", PropertyRouter);
// POST /parent/api/properties

app.listen(3000, () => {
    console.log("Server is running");
});

// const callback = () => {
//     console.log("Server is running");
// };
// app.listen(3000, callback);

// const app2 = express();
// app2.listen(3001, () => console.log("Second server"));