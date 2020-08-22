const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  var jsondata = JSON.stringify(data);

  var options = {
    url: 'https://us17.api.mailchimp.com/3.0/lists/3a267c1d35',
    method: "POST",
    headers: {
      "Authorization": "mmo fd97bb9087f26bd7173880e1e2e08859-us17"
    },
    body: jsondata
  }

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }

  });

});


app.post("/failure", function(req, res) {
  res.redirect("/");
});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server is starting on port 3000");
});

//https://server.api.mailchimp.com/3.0/lists/

//apiKey
//fd97bb9087f26bd7173880e1e2e08859-us17

//listId
//ad4c8c1d3b
