const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended : true}));


app.get("/",function (req,res){
  res.sendFile (__dirname + "/index.html");
});


app.post ("/",function (req,res){
  var city = req.body.block1;
  var units = req.body.units;
  switch (units){
    case "Kelvin":
      var url = "https://api.openweathermap.org/data/2.5/weather?appid=1b045a198cbedd2f0b1abae5a45230ed&q="+city;
      break;
    case "Celcius":
      var url = "https://api.openweathermap.org/data/2.5/weather?appid=1b045a198cbedd2f0b1abae5a45230ed&q="+city+"&units=metric";
      break;
    case "fahrenheit":
      var url = "https://api.openweathermap.org/data/2.5/weather?appid=1b045a198cbedd2f0b1abae5a45230ed&q="+city+"&units=imperial";
      break;
    default:
      var url = "https://api.openweathermap.org/data/2.5/weather?appid=1b045a198cbedd2f0b1abae5a45230ed&q="+city+"&units=metric";
  }
  https.get(url,function (response){
    console.log(response.statusCode);
    response.on("data",function (data){
      var weatherData = JSON.parse(data);
      var temp = weatherData.main.temp;
      var weatherDescription = weatherData.weather[0].description;
      var icon = weatherData.weather[0].icon;

      res.write("<h1>The temperature in "+city+" is "+temp+" degrees "+units+"</h1>");
      res.write("<p>The weather is currently "+weatherDescription+"</p>");
      res.write("<img src = https://openweathermap.org/img/w/"+icon+".png>");


      res.send();
    });
  });

});


app.listen(3000,function (){
  console.log("Server is listening on port: 3000");
});
