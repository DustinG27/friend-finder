const friendsData = require("../data/friends");

module.exports = function (app) {
  // GET route: grabs friends data and displays them in json
  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  // POST route: accepts new survey results and logic
  app.post("/api/friends", function (req, res) {
    var newFriend = req.body;
    var newFriendScore = req.body.scores;

    var lastDiff = 41;
    var friendNum = 0;

    // this loop goes over the entire friends array
    for (var i = 0; i < friendsData.length; i++) {
      var totalDiff = 0;

      // this for loop is looking at the actual int in each object
      for (var j = 0; i < newFriendScore.length; i++) {
        if (newFriendScore[j] > friendsData[i].scores[j]) {
          var diffScore = newFriendScore[j] - friendsData[i].scores[j];
        } else if (newFriendScore[j] < friendsData[i].scores[j]) {
          var diffScore = friendsData[i].scores[j] - newFriendScore[j];
        }
        totalDiff += diffScore;
      }
      if (totalDiff < lastDiff) {
        lastDiff = totalDiff;
        friendNum = i;
      }
    }

    console.log("Name: " + friendsData[friendNum].name);
    console.log("Photo: " + friendsData[friendNum].photo);
    console.log("Total Diff: " + lastDiff);

    // push new friend data to new friend
    friendsData.push(newFriend);

    // sends the data back to be used client side
    res.send(friendsData[friendNum]);
  });
};
