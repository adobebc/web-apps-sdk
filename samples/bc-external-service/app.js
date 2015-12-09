/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"), 
* to deal in the Software without restriction, including without limitation 
* the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the 
* Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
* DEALINGS IN THE SOFTWARE.
* 
*/

var express = require("express"),
    fs = require("fs"),
    https = require("https"),
    oauth = require("./public/js/oauth"),
    CryptoJS = require("crypto-js");
    
var app = express();

var oauthConfig = require("./public/js/oauth_config");

oauthConfig.clientSecret = "/WTcJ26xYt2Xgp51039CwQ==";

app.set("view engine", "jade");

app.use("/public", express.static("public"));

app.get("/", function(req, res) {
    res.render("index", { title: "Server to server sample"});
});

app.get("/oauth/cb", function(req, res) {
    
    console.log("----------------New Request----------------");
    console.log(req);   
    
    
    if (req.query.state == _local_state) {       
        oauth.handleAuthorizationCode(req, function(securityCtx) {
        securityCtx.appIndexPage = oauthConfig.appIndexPage;       
        
        console.log(securityCtx);       
        res.render("cb-output", securityCtx);                       
        });       
    } else {                        
        console.log("----------------This is a fake request----------------");
        res.sendStatus(500);
    }

});

app.post("/oauth/cb", function(req, res) {
    
    console.log("----------------New Request----------------");
    console.log(req);   
    
    var request_hmac = getHmacSignature(oauthConfig.clientSecret,
    _appBaseUri,
    "oauth/cb", 
    req.query
    );
    
    if (req.query.state == request_hmac) {           
        console.log("----------------Request is from BC----------------");      
        res.sendStatus(204);      
    } else {                        
        console.log("----------------This is a fake request----------------");
        res.sendStatus(500);
    }

});

function getHmacSignature(secret,
    url,
    redirect_uri,
    uri_params) {
    
    var arr_params = [];

    for (var key in uri_params) {
        if (uri_params.hasOwnProperty(key) && key != 'state') {
          arr_params.push([key, uri_params[key]]);  
        }
    }
    
    arr_params.sort(function(a, b) {
        var first = a[0];
        var second = b[0];
        return first < second ? - 1 : (first > second ? 1 : 0);
    });
    
    arr_params.forEach(function(elem, idx, this_array) {
        var key = this_array[idx][0];
        var value = this_array[idx][1]; 
        
        this_array[idx] = key + "=" + encodeURIComponent(value);            
    });
        
    var signature = url +":443/" + redirect_uri + "?";

    signature += arr_params.join('&');
    signature = signature.toLowerCase();
    
    var space = '%20';
    var re = new RegExp(space, 'g');

    signature = signature.replace(re, '+'); 
    
    var hmac = CryptoJS.HmacSHA256(signature, CryptoJS.enc.Base64.parse(secret));
    signature = CryptoJS.enc.Base64.stringify(hmac);    
    
    return signature;
}


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