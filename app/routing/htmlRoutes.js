let path = require("path");

module.exports = function (app) {
  // routes

  // get route to '/survey' which will display survey
  app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../app/public/survey.html"));
  });

  // default get route, catch-all that leads to home.html
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../app/public/home.html"));
  });

  // default get route, catch-all that leads to home.html
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../app/public/home.html"));
  });
};
