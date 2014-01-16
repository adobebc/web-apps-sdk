## Contact_DeleteByEntityID

Deletes a Contact record based on customer's internal EntityID/CRMID.

### Request

* **Method:** SOAP
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.  
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).

#### Parameters

* `siteId` - ID of the site *(integer)*
* `username` - email address of user account, leave empty if using site token *(string)*
* `password` - password of user account, or site authentication token for specified site *(string)*
* `entityId` - *(integer)*

To use a site token instead of username/password, send an empty `username` field and the site token as the `password`. See example below.

### Response

A Contact_DeleteByEntityIDResponse object with the following properties:

* `Contact_DeleteByEntityIDResult` - *(boolean)* 

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
    <Contact_DeleteByEntityID xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <username>string</username>
      <password>string</password>
      <siteId>int</siteId>
      <entityId>int</entityId>
    </Contact_DeleteByEntityID>
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
    <Contact_DeleteByEntityIDResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <Contact_DeleteByEntityIDResult>boolean</Contact_DeleteByEntityIDResult>
    </Contact_DeleteByEntityIDResponse>
  </soap12:Body>
</soap12:Envelope>
~~~
