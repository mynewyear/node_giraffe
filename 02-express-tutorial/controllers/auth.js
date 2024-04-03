const logOn = (req, res) => {
    const { name } = req.body;

    if (name) {
        res.cookie("name", name);
        res.status(201).json({ success: true, message: `Hello ${name}` });
    } else {
        res.status(400).json({ success: false, message: "Provide a name" });
    }
};

const logOff = (req, res) => {
    res.clearCookie("name");
    res.status(200).json({ success: true, message: "You were logged out" });
};

const test = (req, res) => {
    res.status(200).json({ success: true, message: `Welcome ${req.user}` });
};

module.exports = {
    logOn,
    logOff,
    test,
};