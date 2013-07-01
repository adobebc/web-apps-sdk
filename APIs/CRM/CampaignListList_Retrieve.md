## CampaignListList_Retrieve

Retrieves a list of Campaign Lists for a site.

### Samples

The following is a sample SOAP 1.2 request and response. The placeholders shown need to be replaced with actual values.

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
