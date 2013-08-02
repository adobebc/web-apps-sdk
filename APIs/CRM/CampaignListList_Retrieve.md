## CampaignListList_Retrieve

Retrieves a list of Campaign Lists for a site.

### Request

* **Method:** SOAP
* **Server:** worldsecuresystems.com
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Auth:** Username/password or a site token can be used (example below uses site token)

#### Parameters

* `siteId` - ID of the site *(integer)*
* `username` - email address of user account, leave empty if using site token *(string)*
* `password` - password of user account, or site authentication token for specified site *(string)*

To use a site token instead of username/password, send an empty `username` field and the site token as the `password`. See example below. 


### Response

A CampaignListList_RetrieveResponse object with the following properties:

* `CampaignListList_RetrieveResult` *(object)*
    * `CampaignList` *(object)*
        * `campaignListID` - ID of campaign list *(integer)*
        * `campaignListName` - name of campaign list *(string)*
        * `campaignListUnsubscribe`

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
    <CampaignListList_Retrieve xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <username>string</username>
      <password>string</password>
      <siteId>int</siteId>
    </CampaignListList_Retrieve>
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
    <CampaignListList_RetrieveResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <CampaignListList_RetrieveResult>
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
      </CampaignListList_RetrieveResult>
    </CampaignListList_RetrieveResponse>
  </soap12:Body>
</soap12:Envelope>
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `401` - unauthorized - when the Authorization header is not present, or contains an invalid site token
  * `101000` - sub-error code
* `403` - forbidden : this is returned when the user trying to access the API does not have the proper permissions
