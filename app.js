const express = require("express");
const app = express();
const https = require("https");


app.get("/",function(req,res){
    
    const url = "https://history.openweathermap.org/data/2.5/history/city?id=2885679&type=hour&appid=c71a26362a3994c2abf7b6e681943d72"
    https.get(url,function(response){
        console.log(response);
    });

    res.send("Server is running");
});

app.listen(1000,function(){
    console.log("Server is running on 1000");
});