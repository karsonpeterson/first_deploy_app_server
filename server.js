const express = require("express");
const cors = require("cors");

var port = 8080;
var server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({
    extended: false
}));

var data = require("./data.js");

server.get("/user", function(request, response) {
    var res = {
        user: data.user
    };
    response.json(res);
});

server.post("/user", function(request, response){
    if (request.body.user.name != "" && request.body.user.age){
        data.user.name = request.body.user.name;
        data.user.age = request.body.user.age;
        data.user.date = new Date();
        console.log(data.user);
        response.status(201);
        response.send();
    } else {
        response.status(400);
        response.send("Please send a name and an age for the new user.");
    }

});

server.get("/greeting", function(request, response){
    if (data.user.name != "" && data.user.age){
        var res = {
            greeting: `Welcome ${data.user.name}`
        };
        console.log(res);
        response.json(res);
    } else {
        var res = {
            greeting: "Welcome!"
        };
        response.json(res);
    }
});




server.listen(port, function(){
    console.log(`Listening on port ${port}`);
});