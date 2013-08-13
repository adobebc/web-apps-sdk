## Contact_CampaignListListUpdateInsert

Updates Contact subscription to one or more Campaign Lists.

### Request

* **Method:** SOAP
* **Server:** worldsecuresystems.com
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Auth:** Username/password or a site token can be used (example below uses site token)

#### Parameters

* `siteId` - ID of the site *(integer)*
* `username` - email address of user account, leave empty if using site token *(string)*
* `password` - password of user account, or site authentication token for specified site *(string)*
* `emailaddress` - *(string)*
* `campaignlistList` - *(object)* 
	* `campaignListID` - *(integer)*
	* `campaignListName` - *(string)*
	* `campaignListUnsubscribe` - *(boolean)*
* `forceOptIn` - *(boolean)*

To use a site token instead of username/password, send an empty `username` field and the site token as the `password`. See example below.

### Response

An empty Contact_CampaignListListUpdateInsertResponse object with a header response code

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
    <Contact_CampaignListListUpdateInsert xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <username>string</username>
      <password>string</password>
      <siteId>int</siteId>
      <emailaddress>string</emailaddress>
      <campaignlistList>
        <CampaignList>
          <campaignListID>int</campaignListID>
          <campaignListName>string</campaignListName>
          <campaignListUnsubscribe>boolean</campaignListUnsubscribe>
        </CampaignList>
        <CampaignList>
          <campaignListID>int</campaignListID>
          <campaignListName>string</campaignListName>
          <campaignListUnsubscribe>boolean</campaignListUnsubscribe>
        </CampaignList>
      </campaignlistList>
      <forceOptIn>boolean</forceOptIn>
    </Contact_CampaignListListUpdateInsert>
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
    <Contact_CampaignListListUpdateInsertResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice" />
  </soap12:Body>
</soap12:Envelope>
~~~
