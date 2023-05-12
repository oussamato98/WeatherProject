const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});


app.post("/",function(req,res){

    const queryid = req.body.cityName;
    const apikey = "c71a26362a3994c2abf7b6e681943d72";
    const url = "https://history.openweathermap.org/data/2.5/history/city?id="+queryid+"&type=hour&appid="+apikey;
   
    https.get(url,function(response){

        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const icon = weatherData.list[0].weather[0].icon;
            const imgurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";


            console.log(weatherData.list[0].main.temp);
            console.log(weatherData.list[0].weather[0].description);


            res.write("<p>The temperature of "+weatherData.city_id+" is " + weatherData.list[0].main.temp+"</p>");
            res.write("<h1>The description is " + weatherData.list[0].weather[0].description+"</h1>");
            res.write("<img src="+imgurl+">");
            res.send();
            
        });
    });



    
    
});

app.listen(1000,function(){
    console.log("Server is running on 1000");
});