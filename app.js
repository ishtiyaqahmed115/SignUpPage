const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.get("/", function(req , res){
   
    res.sendFile(__dirname+"/signup.html")
})
app.post("/", function(req, res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.emailAddress;

    const data = {
        members : [
            {
            "email_address" : email,
            "status" : "subscribed",
            "merge_fields" : {
                "FNAME" : firstName,
                "LNAME" : lastName,
            }

        }   
        ]
    };

    var jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/983d73fc01";
    var options = {
        method : "POST",
        auth : "ishtiyaqahmed115:39c277d38c0b0fe4fbde2f5691836161-us17",
    };
    var jsonDataReceived;
    const request = https.request(url, options , function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+ "/success.html");
        }else{
            res.sendFile(__dirname+ "/failure.html");
        }
        response.on("data" , function(data){
            jsonDataReceived = JSON.parse(data);
            console.log(JSON.parse(data));
        })

        // response.end(function(err, response) {
        //     if (response.status < 300 || (response.status === 400 )) {
        //       res.send('Signed Up!');
        //     } else {
        //       res.send('Sign Up Failed :(');
        //     }
        // });
    })
    request.write(jsonData);
    request.end();
    // res.send("<p>"+ jsonDataReceived+"</p>");
});

app.post("/failure", function(req, res){
    res.redirect("/");
});
app.listen(port , function(){
    console.log("App listening on port "+port);
})

//MailChimp API key
//39c277d38c0b0fe4fbde2f5691836161-us17

//Get *id
//983d73fc01