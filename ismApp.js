
/**
 * Module dependencies.
 */
"use strict";
var express = require("express"),
    path = require("path"),
    app = express();


app.set("port", process.env.PORT || 3002);
app.use(express.static(path.join(__dirname, "ismApp")));

// angular启动页
app.get("/", function (req, res) {
    res.sendfile("ismApp/index.html");
});

app.listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});
