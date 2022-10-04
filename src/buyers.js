const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

let users = [
    
]

// all routes here are starting with /buyers, for whitelisting purposes.
router.get('/', (req,res) => {
    res.send(users)
});

router.post('/', (req,res) => {
    const user = req.body;

    users.push(user)

    res.send(user)
});

router.get('/:hwid', (req, res) => {
    const { hwid } = req.params;

    const foundUser = users.find((user) => user.hardwareId == hwid);

    res.send(foundUser);
});

router.delete('/:hwid', (req,res) => {
    const { hwid } = req.params;

    users = users.filter((user) => user.hardwareId != hwid);


    res.send(`User with the hwid ${hwid} blacklisted.`)
});

app.use(`/.netlify/functions/buyers`, router);

module.exports = app;
module.exports.handler = serverless(app);
