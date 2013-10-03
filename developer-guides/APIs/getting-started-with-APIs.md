## Getting Started with Business Catalyst's APIs

Business Catalyst offers a wide range of APIs which allow developers to easily extend the core functionality of the platform, create entirely new applications on top of our infrastructure, and integrate with external third-party systems.

### Supported APIs

Business Catalyst currently supports two protocols: the older eCommerce and CRM APIs utilize the [SOAP](http://en.wikipedia.org/wiki/SOAP) protocol, while all new APIs are [RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer) over HTTP.

For a complete reference of supported APIs, refer to [our API endpoint reference.](/content/api-endpoints/index.html)

### Interacting with APIs

As a developer, you're able to interact with our APIs as you wish - be it through a simple HTTP console, client-side JavaScript, or a server-side application you've written in your preferred language. 

For this getting started guide, we're going to be making all API requests once we're logged into the Admin Console using Chrome Developer Tools > Console. As most packaged apps will utilize Open Admin and run from within the Admin Console itself, this is a great way to start learning how to interact with the APIs.

### Before you get started

There are a few important things to watch out for when interacting with BC's APIs:

* All APIs should be accessed over the HTTPS protocol. For your server address, this means using either:
	* https://api-[dub|nj|syd].worldsecuresystems.com (based on the data center the site is hosted on)
	* https://mysite.worldsecuresystems.com (the sites secure/system URL - easier when using Open Admin)
* Many endpoints require you to specify the Site ID in the path of your request. You can alternatively use `current` if sending the request to the secure/system URL of your site
* Once you've generated a Generic or Site Authentication token, always send this as an "Authorization" header with your HTTP request, and don't accidentally send an "Authentication" header. 
* If you're generating tokens and running code on a server external to BC, we recommend that you always invalidate these tokens once you're finished interacting with the API. This helps avoid any security issues and can be easily achieved using the logout endpoints. See below for an example of this.   

### Example API requests

**NOTE:** For security reasons, make sure you're logged in securely over HTTPS to your Admin Console before running these examples. For example, login at https://mysite.worldsecuresystems.com/admin

To get started, login to the secure URL of your site (*eg. https://mysite.worldsecuresystems.com/admin*) and make sure you've landed on the Dashboard of the Admin Console. Inside the Admin Console, you have the benefit of jQuery and the jQuery Cookie plugin already being included for you to work with. 

Once you're logged in, hit F12 to open up Chrome Developer Tools and switch across to the "Console" tab.

#### 1. Get the Site Authentication token while logged in

As you'd expect, most API calls require an Authorization header to be passed through before allowing you to interact with the platform. For this, you'll need to grab the Site Authentication token for your current session. Luckily, as we're logged in it's a simple case of grabbing the siteAuthToken cookie that BC has set for us already. 

Paste the following code into the Console and hit enter to run:

~~~
// Set siteAuthToken from Admin Console cookie
var siteAuthToken = $.cookie('siteAuthToken');
~~~

We've just used already included jQuery and jQuery Cookie libraries to set a global "siteAuthToken" variable that we can use in subsequent API requests. 

If you type in `siteAuthToken` and hit enter, the Console will echo back the value of your current Site Authentication token. 

#### 2. Get a list of Web Apps that exist on the current site

Now that we've set the siteAuthToken variable, we can pass it through as an Authorization header to access the range APIs available. 

Let's grab a list of the Web Apps that exist on the website we're currently logged in to. Paste the following code into the Console and hit enter to run: 

~~~
// Perform the AJAX request (make sure you've set siteAuthToken)
var request = $.ajax({
  url: "/api/v2/admin/sites/current/webapps",
  type: "GET",
  headers : {"Authorization" : siteAuthToken}, 
  contentType: "application/json"
});
 
// Request successful, response is in "msg" variable
request.done(function(msg) {
  console.log("Request successful");
  console.log(msg);
});
 
// Request failed, you can add your own error handling
request.fail(function(jqXHR) {
  console.log("Request failed. Error code: " + jqXHR.status);
});
~~~

If the request is successful, you'll be returned a object containing the response data [documented here.](http://docs.businesscatalyst.com/content/api-endpoints/web-apps/list-web-apps.html)

Again we've used jQuery to send an AJAX request to the List Web Apps API endpoint and written some simple success/error handling to deal with the response. You'll notice we're able to use `current` in the place of specifiying the Site ID, as we're sending the request to our secure/system site URL. 

From the returned object, you could then use the Get Web App Item List method (sending the ID of the desired Web App) to request a list of all items that exist for a specific Web App. 

#### 3. Create a new Web App

We can also easily create an actual Web App using the API. This time we'll be using a POST request instead of a GET request, as we need to tell BC what we want our Web App to look like. 

~~~
// Perform the AJAX request (make sure you've set siteAuthToken)
var request = $.ajax({
  url: "/api/v2/admin/sites/current/webapps",
  type: "POST",
  headers : {"Authorization" : siteAuthToken}, 
  contentType: "application/json",
  data: '{"name": "MyWebApp"}'
});
 
// Request successful, response is in "msg" variable
request.done(function(msg) {
  console.log("Request successful");
  console.log(msg);
});
 
// Request failed, you can add your own error handling
request.fail(function(jqXHR) {
  console.log("Request failed. Error code: " + jqXHR.status);
});
~~~

You'll notice that this time we've specified the type as `POST` and sent some JSON data through to BC that defines our new Web App's properties. 

You can expand upon this JSON string to set a range of other Web App properties. [See the parameters here](/content/api-endpoints/web-apps/create-web-app.html) for a complete list of what's supported. 

#### 4. Add a new Web App item

Now that we have an empty Web App, let's add an item. Paste the following code in the Console and hit enter to run:

~~~
// Perform the AJAX request (make sure you've set siteAuthToken)
var request = $.ajax({
  url: "/api/v2/admin/sites/current/webapps/MyWebApp/items",
  type: "POST",
  headers : {"Authorization" : siteAuthToken}, 
  contentType: "application/json",
  data: '{ "name": "MyWebAppItem" }'
});
 
// Request successful, response is in "msg" variable
request.done(function(msg) {
  console.log("Request successful");
  console.log(msg);
});
 
// Request failed, you can add your own error handling
request.fail(function(jqXHR) {
  console.log("Request failed. Error code: " + jqXHR.status);
});
~~~

We're using the Create Web App Item API method and an AJAX POST request to send BC the details of our new Web App item. You'll need to replace "MyWebApp" with the slug of your actual Web App for this to work. 

Just like our previous example, we've defined the Web App Item name here using JSON data sent during the request. You can find a [full list of item parameters supported here.](/content/api-endpoints/web-app-items/create-web-app-item.html)

To update an existing Web App item, you use the `PUT` HTTP method instead of `POST`. [See the reference for more details.](/content/api-endpoints/web-app-items/update-web-app-item.html)

#### 5. Invalidating an Authentication token

Once you're done interacting with the APIs, we recommend you invalidate your generated Generic and Site Authentication tokens for security reasons. This is especially important for applications running on third-party servers. 

If you're using Open Admin, this will happen automatically when the users session expires or they click "Log out". To force a log out however, you can run the following code:

~~~
// Perform the AJAX request (make sure you've set siteAuthToken)
var request = $.ajax({
  url: "/api/v2/admin/sites/current/tokens",
  type: "DELETE",
  headers : {"Authorization" : siteAuthToken}, 
  contentType: "application/json",
});
 
// Request successful, response is in "msg" variable
request.done(function(msg) {
  console.log("Successfully logged out");
});
 
// Request failed, you can add your own error handling
request.fail(function(jqXHR) {
  console.log("Request failed. Error code: " + jqXHR.status);
});
~~~

If you refresh your browser tab after running the code above, you'll notice you've been logged out of the Admin Console as the token you were using has been invalidated. 
