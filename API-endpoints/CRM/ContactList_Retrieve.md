## ContactList_Retrieve

Retrieves a list of new or modified Contacts based on a given date. Use to synchronize external database of Contacts with this database.

### Request

* **Method:** SOAP
* **Server:** worldsecuresystems.com
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Auth:** Username/password or a site token can be used (example below uses site token)

#### Parameters

* `siteId` - ID of the site *(integer)*
* `username` - email address of user account, leave empty if using site token *(string)*
* `password` - password of user account, or site authentication token for specified site *(string)*
* `lastUpdateDate` - *(dateTime)*
* `recordStart` - *(integer)*
* `moreRecords` - *(boolean)*

To use a site token instead of username/password, send an empty `username` field and the site token as the `password`. See example below.

### Response

A ContactList_RetrieveResponse object with the following properties:

* `ContactList_RetrieveResult` - *(object)*
  * `ContactRecord` - *(integer)*
	* `entityId` - *(integer)*
    * `externalId` - *(string)*
    * `emailAddress` - *(string)*
    * `contactTitle` - *(string)*
    * `deleted` - *(boolean)*
    * `fullName`- *(string)*
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
* `recordStart` - *(integer)* 
* `moreRecords` - *(boolean)* 
 

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
    <ContactList_Retrieve xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <username>string</username>
      <password>string</password>
      <siteId>int</siteId>
      <lastUpdateDate>dateTime</lastUpdateDate>
      <recordStart>int</recordStart>
      <moreRecords>boolean</moreRecords>
    </ContactList_Retrieve>
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
    <ContactList_RetrieveResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <ContactList_RetrieveResult>
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
      </ContactList_RetrieveResult>
      <recordStart>int</recordStart>
      <moreRecords>boolean</moreRecords>
    </ContactList_RetrieveResponse>
  </soap12:Body>
</soap12:Envelope>
~~~
