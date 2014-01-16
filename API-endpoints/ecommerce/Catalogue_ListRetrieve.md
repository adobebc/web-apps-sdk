## Catalogue_ListRetrieve

Retrieve the details of a given catalogue.

### Request

* **Method:** SOAP
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.  
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).

#### Parameters

* `siteId` - ID of the site *(integer)*
* `username` - email address of user account, leave empty if using site token *(string)*
* `password` - password of user account, or site authentication token for specified site *(string)*
* `ParentCatalogueId` - *(integer)*	

To use a site token instead of username/password, send an empty `username` field and the site token as the `password`. See example below.

### Response

A Catalogue_ListRetrieveResponse object with the following properties:

* `Catalogue_ListRetrieveResult` - *(object)*
	* `Catalogue` - *(object)*	 
		* `Url` - *(string)*	
		* `Slug` - *(string)*	

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
    <Catalogue_ListRetrieve xmlns="http://tempuri.org/CatalystDeveloperService/CatalystEcommerceWebservice">
      <Username>string</Username>
      <Password>string</Password>
      <SiteId>int</SiteId>
      <ParentCatalogueId>int</ParentCatalogueId>
    </Catalogue_ListRetrieve>
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
    <Catalogue_ListRetrieveResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystEcommerceWebservice">
      <Catalogue_ListRetrieveResult>
        <Catalogue>
          <Url>string</Url>
          <Slug>string</Slug>
        </Catalogue>
        <Catalogue>
          <Url>string</Url>
          <Slug>string</Slug>
        </Catalogue>
      </Catalogue_ListRetrieveResult>
    </Catalogue_ListRetrieveResponse>
  </soap12:Body>
</soap12:Envelope>
~~~
