const path = require("path");

const router = require("express").Router();


router.get("/", (req, res) => {
    res.send("Hello World!!");
});

router.get("/try", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./index.html"));
})

router.get("/dailyroutine.png", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./img/dailyroutine.png"));
})

router.get("/edu-coins.png", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./img/edu-coins.png"));
});

router.get("/terminal.png", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./img/terminal.png"));
});

router.get("/timeconstraint.png", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./img/timeconstraint.png"));
});

router.get("/Timer.png", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./img/Timer.png"));
});

router.get("/To-do.png", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./img/To-do.png"));
});

module.exports = router;