var friendsData = require("../data/friends")

module.exports = function(app) {
    // Routes ////

    // GET route to '/api/friends' which displays a JSON of all possible friends.
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    // POST route to /api/friends (This is used to handle incoming survey results and compatability logic)
    app.post("/api/friends", function(req, res) {

        var newfriend = req.body;	
        var newFriendScore = req.body.scores;

        var lastDiff = 41;
        var friendNum = 0;
       
        for (var i = 0; i < friendsData.length; i++) {

            var totalDiff = 0;

            for (var j = 0; j < newFriendScore.length; j++) {
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

        console.log("You're best matched gamer-friend is: " + friendsData[friendNum].name);
        console.log("This is a link to their photo: " + friendsData[friendNum].photo)
        console.log("The total difference is: " + lastDiff);

        // Push newfriend to the friends array.	
        friendsData.push(newfriend);

        // THIS SENDS DATA BACK SO THAT IT CAN BE USED CLIENT SIDE...
        res.send(friendsData[friendNum]);
        
    });
};