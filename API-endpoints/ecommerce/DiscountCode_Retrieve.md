## DiscountCode_Retrieve

Retrieves details of a discount code.

### Request

* **Method:** SOAP
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.  
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).

#### Parameters

* `siteId` - ID of the site *(integer)*
* `username` - email address of user account, leave empty if using site token *(string)*
* `password` - password of user account, or site authentication token for specified site *(string)*
* `discountcodeId` - *(integer)*	

To use a site token instead of username/password, send an empty `username` field and the site token as the `password`. See example below.

### Response

A DiscountCode_RetrieveResponse object with the following properties:

* `DiscountCode_RetrieveResult` - *(object)* 
		* `discountcodeId` - *(integer)*	
		* `discountcode` - *(string)*	
		* `description` - *(string)*	
		* `discountPercentage` - *(double)*	
		* `releaseDate` - *(string)*	
		* `expiryDate` - *(string)*	
		* `enabled` - *(boolean)*	

### Examples

Accepts and returns XML as Content-Type. 

The following is a sample SOAP 1.2 request and response. The placeholders shown need to be replaced with actual values.

**Request:**
~~~
POST /catalystwebservice/catalystecommercewebservice.asmx HTTP/1.1
Host: www.businesscatalyst.com.au
Content-Type: application/soap+xml; charset=utf-8
Content-Length: length

<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <DiscountCode_Retrieve xmlns="http://tempuri.org/CatalystDeveloperService/CatalystEcommerceWebservice">
      <username>string</username>
      <password>string</password>
      <siteId>int</siteId>
      <discountcodeId>int</discountcodeId>
    </DiscountCode_Retrieve>
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
    <DiscountCode_RetrieveResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystEcommerceWebservice">
      <DiscountCode_RetrieveResult>
        <discountcodeId>int</discountcodeId>
        <discountcode>string</discountcode>
        <description>string</description>
        <discountPercentage>double</discountPercentage>
        <releaseDate>string</releaseDate>
        <expiryDate>string</expiryDate>
        <enabled>boolean</enabled>
      </DiscountCode_RetrieveResult>
    </DiscountCode_RetrieveResponse>
  </soap12:Body>
</soap12:Envelope>
~~~
