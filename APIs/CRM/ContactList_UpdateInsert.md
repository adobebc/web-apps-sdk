## ContactList_UpdateInsert

Updates any number of Contact records. Uses ExternalID as unique key. If ExternalID is not present then email address is used as unique key.

### Request

* **Method:** SOAP
* **Server:** worldsecuresystems.com
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Auth:** Username/password or a site token can be used (example below uses site token)

#### Parameters

* `siteId` - ID of the site *(integer)*
* `username` - email address of user account, leave empty if using site token *(string)*
* `password` - password of user account, or site authentication token for specified site *(string)*
* `contactsList` - *(object)*
	* `ContactRecord` - *(object)*
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
		* `relationships` - *(array)*
		* `addresses` - *(array)*
		* `phoneNos` - *(array)* 
		* `crmForms` - *(array)* 
		* `MasterOptIn` - *(boolean)* 

To use a site token instead of username/password, send an empty `username` field and the site token as the `password`. See example below.

### Response

An empty ContactList_UpdateInsertResponse object with a header response code

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
    <ContactList_UpdateInsert xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <username>string</username>
      <password>string</password>
      <siteId>int</siteId>
      <contactsList>
        <ContactRecord>
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
            <Relationship xsi:nil="true" />
            <Relationship xsi:nil="true" />
          </relationships>
          <addresses>
            <Address xsi:nil="true" />
            <Address xsi:nil="true" />
          </addresses>
          <phoneNos>
            <PhoneNo xsi:nil="true" />
            <PhoneNo xsi:nil="true" />
          </phoneNos>
          <crmForms>
            <CrmForms xsi:nil="true" />
            <CrmForms xsi:nil="true" />
          </crmForms>
          <MasterOptIn>boolean</MasterOptIn>
        </ContactRecord>
        <ContactRecord>
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
            <Relationship xsi:nil="true" />
            <Relationship xsi:nil="true" />
          </relationships>
          <addresses>
            <Address xsi:nil="true" />
            <Address xsi:nil="true" />
          </addresses>
          <phoneNos>
            <PhoneNo xsi:nil="true" />
            <PhoneNo xsi:nil="true" />
          </phoneNos>
          <crmForms>
            <CrmForms xsi:nil="true" />
            <CrmForms xsi:nil="true" />
          </crmForms>
          <MasterOptIn>boolean</MasterOptIn>
        </ContactRecord>
      </contactsList>
    </ContactList_UpdateInsert>
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
    <ContactList_UpdateInsertResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice" />
  </soap12:Body>
</soap12:Envelope>
~~~
