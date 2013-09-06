## Getting Started with Business Catalyst's APIs

Business Catalyst offers a wide range of APIs which allow developers to easily extend the core functionality of the platform, create entirely new applications on top of our infrastructure, and integrate with external third-party systems.

### Supported APIs

Business Catalyst currently support two protocols: the older eCommerce and CRM APIs utilize the [SOAP](http://en.wikipedia.org/wiki/SOAP) protocol, while all new APIs are [RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer) over HTTP.

For a complete reference of suupported APIs, refer to [docs.businesscatalyst.com/reference/index.html](docs.businesscatalyst.com/reference/index.html)

### Interacting with APIs

As a developer, you're able to interact with our APIs as you wish - be it through a simple HTTP console, client-side JavaScript, or a server-side application you've written in your preferred language. 

For this guide, we'll be using our open-source [bcapi.js](https://github.com/adobebc/bcapi.js) library and the popular [jQuery](http://jquery.com/) JavaScript framework to interact with Business Catalyst's REST APIs via client-side AJAX requests. 

### Making your first API request
