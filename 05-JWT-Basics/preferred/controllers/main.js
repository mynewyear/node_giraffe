const jwt = require("jsonwebtoken");

const logon = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: "Provide name and password" });
    }

    //temporary - value must be unique
    const id = new Date().getDate();

    // try to keep payload small, better experience for user
    // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: "30h",
    });
    console.log(username, password);
    res.status(200).json({ msg: "User created", token });
};

const hello = async (req, res) => {
    res.status(200).json({ msg: `Hello, ${req.user.username}` });
};

module.exports = {
    logon,
    hello,
};