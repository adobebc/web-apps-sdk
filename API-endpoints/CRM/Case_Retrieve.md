## Case_Retrieve

Retrieves details for a Case including details, threads and files. Use EntityID to retrieve owner Contact/Company information for case.

### Request

* **Method:** SOAP
* **Server:** worldsecuresystems.com
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Auth:** Username/password or a site token can be used (example below uses site token)

#### Parameters

* `siteId` - ID of the site *(integer)*
* `username` - email address of user account, leave empty if using site token *(string)*
* `password` - password of user account, or site authentication token for specified site *(string)*
* `caseId` - *(integer)*

To use a site token instead of username/password, send an empty `username` field and the site token as the `password`. See example below.

### Response

A Case_RetrieveResponse object with the following properties:

* `Case_RetrieveResult` - *(object)*
  * `entityId` - *(integer)*
	* `caseId` - *(integer)*
    * `assignedTo` - *(integer)*
    * `caseSubject` - *(string)*
    * `createDate` - *(dateTime)*
    * `lastUpdateDate` - *(dateTime)*
    * `messageThreads`- *(object)*
    	* `message` - *(string)*
    	* `createDate` - *(dateTime)*
    	* `objectId` - *(integer)*
    	* `objectType` - *(integer)*
    	* `isInternal` - *(boolean)*
    	* `entityId` - *(integer)*
    * `crmForms` - *(object)*
    	* `formId` - *(integer)*
    	* `formName` - *(string)*
    	* `crmFormFields`
    * `fileList` - *(object)*
    	* `Files` - *(object)*
    		* `fileId` - *(integer)*
    		* `fileName` - *(string)*
    		* `fileSize` - *(long)*    
 

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
    <Case_Retrieve xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <username>string</username>
      <password>string</password>
      <siteId>int</siteId>
      <caseId>int</caseId>
    </Case_Retrieve>
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
    <Case_RetrieveResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <Case_RetrieveResult>
        <entityId>int</entityId>
        <caseId>int</caseId>
        <assignedTo>int</assignedTo>
        <caseSubject>string</caseSubject>
        <createDate>dateTime</createDate>
        <lastUpdateDate>dateTime</lastUpdateDate>
        <messageThreads>
          <MessageThreads>
            <message>string</message>
            <createDate>dateTime</createDate>
            <objectId>int</objectId>
            <objectType>int</objectType>
            <isInternal>boolean</isInternal>
            <entityId>int</entityId>
          </MessageThreads>
          <MessageThreads>
            <message>string</message>
            <createDate>dateTime</createDate>
            <objectId>int</objectId>
            <objectType>int</objectType>
            <isInternal>boolean</isInternal>
            <entityId>int</entityId>
          </MessageThreads>
        </messageThreads>
        <crmForms>
          <CrmForms>
            <formId>int</formId>
            <formName>string</formName>
            <crmFormFields xsi:nil="true" />
          </CrmForms>
          <CrmForms>
            <formId>int</formId>
            <formName>string</formName>
            <crmFormFields xsi:nil="true" />
          </CrmForms>
        </crmForms>
        <fileList>
          <Files>
            <fileId>int</fileId>
            <fileName>string</fileName>
            <fileSize>long</fileSize>
          </Files>
          <Files>
            <fileId>int</fileId>
            <fileName>string</fileName>
            <fileSize>long</fileSize>
          </Files>
        </fileList>
      </Case_RetrieveResult>
    </Case_RetrieveResponse>
  </soap12:Body>
</soap12:Envelope>
~~~
