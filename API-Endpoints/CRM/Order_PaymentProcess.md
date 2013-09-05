## Order_PaymentProcess

Process a payment for an order via a payment gateway.

### Request

* **Method:** SOAP
* **Server:** worldsecuresystems.com
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Auth:** Username/password or a site token can be used (example below uses site token)

#### Parameters

* `siteId` - ID of the site *(integer)*
* `username` - email address of user account, leave empty if using site token *(string)*
* `password` - password of user account, or site authentication token for specified site *(string)*
* `orderId` - *(integer)*
* `emailInvoiceToCustomer` - *(boolean)*
* `creditCardInfo` - *(object)*
	* `CardNo` - *(string)*
	* `CardHolder` - *(string)*
	* `ExpiryMonth` - *(string)*
	* `ExpiryYear` - *(string)*
	* `CardType` - *(integer)*
	* `CardCCV` - *(string)*
	* `IssueMonth` - *(string)*
	* `IssueYear` - *(string)*
	* `IssueNumber` - *(string)*
	* `StoredCardToken` - *(string)*
* `transactionInfo` - *(object)*
	* `RequestParams` - *(object)*
	* `Description` - *(string)*
	* `PaymentReference` - *(string)*
	* `Amount` - *(double)*

To use a site token instead of username/password, send an empty `username` field and the site token as the `password`. See example below.

### Response

A Order_PaymentProcessResponse object with the following properties:

* `Order_PaymentProcessResult` - *(boolean)*

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
    <Order_PaymentProcess xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <username>string</username>
      <password>string</password>
      <siteId>int</siteId>
      <orderId>int</orderId>
      <emailInvoiceToCustomer>boolean</emailInvoiceToCustomer>
      <creditCardInfo>
        <CardNo>string</CardNo>
        <CardHolder>string</CardHolder>
        <ExpiryMonth>string</ExpiryMonth>
        <ExpiryYear>string</ExpiryYear>
        <CardType>int</CardType>
        <CardCCV>string</CardCCV>
        <IssueMonth>string</IssueMonth>
        <IssueYear>string</IssueYear>
        <IssueNumber>string</IssueNumber>
        <StoredCardToken>string</StoredCardToken>
      </creditCardInfo>
      <transactionInfo>
        <RequestParams>
          <KeyValuePairOfStringString />
          <KeyValuePairOfStringString />
        </RequestParams>
        <Description>string</Description>
        <PaymentReference>string</PaymentReference>
        <Amount>double</Amount>
      </transactionInfo>
    </Order_PaymentProcess>
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
    <Order_PaymentProcessResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <Order_PaymentProcessResult>boolean</Order_PaymentProcessResult>
    </Order_PaymentProcessResponse>
  </soap12:Body>
</soap12:Envelope>
~~~
