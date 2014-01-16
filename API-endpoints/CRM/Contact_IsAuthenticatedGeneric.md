## Contact_IsAuthenticatedGeneric

Checks to see if a Contact can login based on username/password.

### Request

* **Method:** SOAP
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.  
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).

#### Parameters

* `siteId` - ID of the site *(integer)*
* `customerUsername` - *(string)*
* `customerPassword` - *(string)*

### Response

A Contact_IsAuthenticatedGenericResponse object with the following properties:

* `Contact_IsAuthenticatedGenericResult` - *(boolean)* 

### Examples

Accepts and returns XML as Content-Type. 

The following is a sample SOAP 1.2 request and response. The placeholders shown need to be replaced with actual values.

**Request:**
~~~
POST /catalystwebservice/catalystcrmwebservice.asmx HTTP/1.1
Host: worldsecuresystems.com
Content-Type: application/soap+xml; charset=utf-8
Content-Length: length

<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <Contact_IsAuthenticatedGeneric xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <siteId>int</siteId>
      <customerUsername>string</customerUsername>
      <customerPassword>string</customerPassword>
    </Contact_IsAuthenticatedGeneric>
  </soap12:Body>
</soap12:Envelope>
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/soap+xml; charset=utf-8
Content-Length: length

<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <Contact_IsAuthenticatedGenericResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <Contact_IsAuthenticatedGenericResult>boolean</Contact_IsAuthenticatedGenericResult>
    </Contact_IsAuthenticatedGenericResponse>
  </soap12:Body>
</soap12:Envelope>
~~~
