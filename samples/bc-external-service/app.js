var express = require("express"),
    fs = require("fs"),
    https = require("https"),
    oauth = require("./public/js/oauth");
var app = express();

var oauthConfig = require("./public/js/oauth_config");

oauthConfig.clientSecret = "cn/Zp1VFqp6v36PKvkkvrA==";

app.set("view engine", "jade");

app.use("/public", express.static("public"));

app.get("/", function(req, res) {
    res.render("index", { title: "Server to server sample"});
});

app.get("/oauth/cb", function(req, res) {
    oauth.handleAuthorizationCode(req, function(securityCtx) {
        securityCtx.appIndexPage = oauthConfig.appIndexPage;
        
        console.log(securityCtx);

        res.render("cb-output", securityCtx);
    });
});

app.use("/_System", express.static("public/_System"));

var server = app.listen(8080, function() {
    console.log("bc-external-service started ...");
    console.log("Using OAuthConfig: ");
    console.log(oauthConfig);
});

https.createServer({
  key: fs.readFileSync("certificates/key.pem"),
  cert: fs.readFileSync("certificates/cert.pem")
}, app).listen(443);
