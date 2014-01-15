## Contact_SecureZoneListUpdateInsert

Updates Contact subscription to one or more Secure Zones.

### Request

* **Method:** SOAP
* **Server:** worldsecuresystems.com
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).

#### Parameters

* `siteId` - ID of the site *(integer)*
* `username` - email address of user account, leave empty if using site token *(string)*
* `password` - password of user account, or site authentication token for specified site *(string)*
* `emailaddress` - *(integer)*
* `securezoneList` - *(object)*
	* `SecureZone` - *(object)*
		* `secureZoneID` - *(integer)*
		* `secureZoneName` - *(string)*
		* `secureZoneExpiryDate` - *(string)*
		* `secureZoneUnsubscribe` - *(boolean)*

To use a site token instead of username/password, send an empty `username` field and the site token as the `password`. See example below.

### Response

An empty SecureZoneListUpdateInsertResponse object with a header response code.

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
    <Contact_SecureZoneListUpdateInsert xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <username>string</username>
      <password>string</password>
      <siteId>int</siteId>
      <emailaddress>string</emailaddress>
      <securezoneList>
        <SecureZone>
          <secureZoneID>int</secureZoneID>
          <secureZoneName>string</secureZoneName>
          <secureZoneExpiryDate>string</secureZoneExpiryDate>
          <secureZoneUnsubscribe>boolean</secureZoneUnsubscribe>
        </SecureZone>
        <SecureZone>
          <secureZoneID>int</secureZoneID>
          <secureZoneName>string</secureZoneName>
          <secureZoneExpiryDate>string</secureZoneExpiryDate>
          <secureZoneUnsubscribe>boolean</secureZoneUnsubscribe>
        </SecureZone>
      </securezoneList>
    </Contact_SecureZoneListUpdateInsert>
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
    <Contact_SecureZoneListUpdateInsertResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice" />
  </soap12:Body>
</soap12:Envelope>
~~~
