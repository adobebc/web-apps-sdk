var express = require("express"),
    fs = require('fs'),
    https = require('https');
var app = express();

var oauthConfig = require("./public/js/oauth_config");
oauthConfig.clientSecret = "tB4dFTIoa0r0a8wdi7KFTQ==";

app.set("view engine", "jade");

app.use("/public", express.static("public"));

app.get("/", function(req, res) {
    res.render('index', { title: 'Server to server sample'});
});

var server = app.listen(8080, function() {
    console.log('bc-external-service started ...');
    console.log("Using OAuthConfig: ");
    console.log(oauthConfig);
});

https.createServer({
  key: fs.readFileSync("certificates/key.pem"),
  cert: fs.readFileSync("certificates/cert.pem")
}, app).listen(443);

exports.module = app;