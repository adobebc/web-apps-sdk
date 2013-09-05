## Contact_RetrieveByEntityID

Retrieves a Contact record based on customer's internal EntityID/CRMID.

### Request

* **Method:** SOAP
* **Server:** worldsecuresystems.com
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Auth:** Username/password or a site token can be used (example below uses site token)

#### Parameters

* `siteId` - ID of the site *(integer)*
* `username` - email address of user account, leave empty if using site token *(string)*
* `password` - password of user account, or site authentication token for specified site *(string)*
* `entityId` - *(integer)*

To use a site token instead of username/password, send an empty `username` field and the site token as the `password`. See example below.

### Response

A Contact_RetrieveByEntityIDResponse object with the following properties:

* `Contact_RetrieveByEntityIDResult` - *(object)*
	* `entityId` - *(integer)*
	* `externalId` - *(string)*
	* `emailAddress` - *(string)*
	* `contactTitle` - *(string)*
	* `deleted` - *(boolean)*
	* `fullName` - *(string)*
	* `firstName` - *(string)*
	* `lastName` - *(string)*
	* `username` - *(string)*
	* `password` - *(string)*
	* `dateOfBirth` - *(dateTime)*
	* `createDate` - *(dateTime)*
	* `lastUpdateDate` - *(dateTime)*
	* `customerType` - *(string)*
	* `industryType` - *(string)*
	* `leadSourceType` - *(string)*
	* `ratingType` - *(string)*
	* `relationships` - *(object)*
		* `entityId` - *(integer)*
		* `entityType` - *(integer)*
		* `name` - *(string)*
	* `addresses`
		* `Address` - *(object)*
			* `addressTypeID` - *(integer)*
			* `addressLine1` - *(string)*
			* `addressLine2` - *(string)*
			* `city` - *(string)*
			* `zipcode` - *(string)*
			* `state` - *(string)*
			* `countryCode` - *(string)*
	* `phoneNos`
		* `phoneNos` - *(object)*
			* `phoneNoTypeID` - *(integer)*
			* `phoneNo` - *(string)*   
	* `crmForms` - *(object)*
		* `formId` - *(integer)* 
		* `formName` - *(string)* 
		* `crmFormFields ` - *(array)*   
	* `MasterOptIn` - *(boolean)* 

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
    <Contact_RetrieveByEntityID xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <username>string</username>
      <password>string</password>
      <siteId>int</siteId>
      <entityId>int</entityId>
    </Contact_RetrieveByEntityID>
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
    <Contact_RetrieveByEntityIDResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <Contact_RetrieveByEntityIDResult>
        <entityId>int</entityId>
        <externalId>string</externalId>
        <emailAddress>string</emailAddress>
        <contactTitle>string</contactTitle>
        <deleted>boolean</deleted>
        <fullName>string</fullName>
        <firstName>string</firstName>
        <lastName>string</lastName>
        <username>string</username>
        <password>string</password>
        <dateOfBirth>dateTime</dateOfBirth>
        <createDate>dateTime</createDate>
        <lastUpdateDate>dateTime</lastUpdateDate>
        <customerType>string</customerType>
        <industryType>string</industryType>
        <leadSourceType>string</leadSourceType>
        <ratingType>string</ratingType>
        <relationships>
          <Relationship>
            <entityId>int</entityId>
            <entityType>int</entityType>
            <name>string</name>
          </Relationship>
          <Relationship>
            <entityId>int</entityId>
            <entityType>int</entityType>
            <name>string</name>
          </Relationship>
        </relationships>
        <addresses>
          <Address>
            <addressTypeID>int</addressTypeID>
            <addressLine1>string</addressLine1>
            <addressLine2>string</addressLine2>
            <city>string</city>
            <zipcode>string</zipcode>
            <state>string</state>
            <countryCode>string</countryCode>
          </Address>
          <Address>
            <addressTypeID>int</addressTypeID>
            <addressLine1>string</addressLine1>
            <addressLine2>string</addressLine2>
            <city>string</city>
            <zipcode>string</zipcode>
            <state>string</state>
            <countryCode>string</countryCode>
          </Address>
        </addresses>
        <phoneNos>
          <PhoneNo>
            <phoneNoTypeID>int</phoneNoTypeID>
            <phoneNo>string</phoneNo>
          </PhoneNo>
          <PhoneNo>
            <phoneNoTypeID>int</phoneNoTypeID>
            <phoneNo>string</phoneNo>
          </PhoneNo>
        </phoneNos>
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
        <MasterOptIn>boolean</MasterOptIn>
      </Contact_RetrieveByEntityIDResult>
    </Contact_RetrieveByEntityIDResponse>
  </soap12:Body>
</soap12:Envelope>
~~~
