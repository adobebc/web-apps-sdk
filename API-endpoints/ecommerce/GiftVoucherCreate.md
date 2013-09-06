## GiftVoucherCreate

Creates a new gift voucher. **Note:** This method is not officially supported.

### Request

* **Method:** SOAP
* **Server:** worldsecuresystems.com
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Auth:** Username/password or a site token can be used (example below uses site token)

#### Parameters

* `siteId` - ID of the site *(integer)*
* `username` - email address of user account, leave empty if using site token *(string)*
* `password` - password of user account, or site authentication token for specified site *(string)*
* `Code` - *(string)*	
* `CountryCode` - *(string)*	
* `Message` - *(string)*	
* `RecipientName` - *(string)*	
* `ReceipientEmail` - *(string)*	
* `Value` - *(decimal)*	

To use a site token instead of username/password, send an empty `username` field and the site token as the `password`. See example below.

### Response

A GiftVoucherCreateResponse object with the following properties:

* `GiftVoucherCreateResult` - *(integer)* 

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
    <GiftVoucherCreate xmlns="http://tempuri.org/CatalystDeveloperService/CatalystEcommerceWebservice">
      <Username>string</Username>
      <Password>string</Password>
      <siteId>int</siteId>
      <Code>string</Code>
      <CountryCode>string</CountryCode>
      <Message>string</Message>
      <RecipientName>string</RecipientName>
      <ReceipientEmail>string</ReceipientEmail>
      <Value>decimal</Value>
    </GiftVoucherCreate>
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
    <GiftVoucherCreateResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystEcommerceWebservice">
      <GiftVoucherCreateResult>int</GiftVoucherCreateResult>
    </GiftVoucherCreateResponse>
  </soap12:Body>
</soap12:Envelope>
~~~
