# bc-googleprofile-demo

This application provides a skeleton for integrating google apis into Business Catalyst using Open Platform applications.

## Getting the app

In order to deploy the application on one of your sites you must:

* Copy _System folder on your site.
* Copy oauth folder on your site.
* Goto admin console and launch **Google Profile Demo** app.

## Configure Google client id

In order to integrate google apis in Business Catalyst you need to register a new application into [Google Developer Console](https://console.developers.google.com/)

* Create a new project.
* Once you create a new project, create a new set of credentials.
* Make sure you correctly configure redirect uris. For instance if I want to install the app on http://raducosnita-max2014.businesscatalyst.com I must list redirect uri http://raducosnita-max2014.businesscatalyst.com/oauth/callback.html.
* Once the credentials are created you need to copy client id from google developer console and paste it into app file: `_System/apps/bc-googleprofile-demo/index.html` at line GoogleOAuthApp.prototype._CLIENT_ID = "place your client id in here".
* Replace _System/apps/bc-googleprofile-demo/index.html line GoogleOAuthApp.prototype._REDIRECT_URI = "http://<place your site url in here>/oauth/callback.html"; with your actual redirect uri. (e.g `http://raducosnita-max2014.businesscatalyst.com/oauth/callback.html`).

## Requirements
+   User needs to have FTP and Administer system permissions
+   JavaScript must be enabled

## License & Support
+   This is a sample application provided by Adobe® Business Catalyst under MIT license without any warranty or support
