## OrderList_RetrieveByContact

Retrieves all orders for a specified contact.

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

A OrderList_RetrieveByContactResponse object with the following properties:

* `OrderList_RetrieveByContactResult` - *(object)*
	* `OrderDetails` - *(object)*
		* `entityId` - *(integer)*
		* `orderId` - *(integer)*
		* `orderName` - *(string)*
		* `workflowId` - *(integer)*
		* `statusTypeId` - *(integer)*
		* `countryCode` - *(string)*
		* `orderType` - *(integer)*
		* `invoiceNumber` - *(integer)*
		* `invoiceDate` - *(dateTime)*
		* `userID_AssignedTo` - *(integer)*
		* `shippingAmount` - *(double)*
		* `shippingTaxRate` - *(double)*
		* `shippingAttention` - *(string)*
		* `shippingInstructions` - *(string)*
		* `shippingOptionId` - *(integer)*
		* `discountCodeId` - *(integer)*
		* `discountRate` - *(double)*
		* `totalOrderAmount` - *(double)*
		* `directDebitTypeId` - *(integer)*
		* `directDebitDays` - *(integer)*
		* `isRecur` - *(boolean)*
		* `nextInvoiceDate` - *(dateTime)*
		* `endRecurDate` - *(dateTime)*
		* `cycleTypeID` - *(integer)*
		* `createDate` - *(dateTime)*	
		* `lastUpdateDate` - *(dateTime)*	
		* `deleted` - *(boolean)*	
		* `products` - *(array)*	
		* `payments` - *(array)*	
		* `addresses` - *(array)*	
		* `crmForms` - *(array)*	

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
    <OrderList_RetrieveByContact xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <username>string</username>
      <password>string</password>
      <siteId>int</siteId>
      <entityId>int</entityId>
    </OrderList_RetrieveByContact>
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
    <OrderList_RetrieveByContactResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <OrderList_RetrieveByContactResult>
        <OrderDetails>
          <entityId>int</entityId>
          <orderId>int</orderId>
          <orderName>string</orderName>
          <workflowId>int</workflowId>
          <statusTypeId>int</statusTypeId>
          <countryCode>string</countryCode>
          <orderType>int</orderType>
          <invoiceNumber>int</invoiceNumber>
          <invoiceDate>dateTime</invoiceDate>
          <userID_AssignedTo>int</userID_AssignedTo>
          <shippingAmount>double</shippingAmount>
          <shippingTaxRate>double</shippingTaxRate>
          <shippingAttention>string</shippingAttention>
          <shippingInstructions>string</shippingInstructions>
          <shippingOptionId>int</shippingOptionId>
          <discountCodeId>int</discountCodeId>
          <discountRate>double</discountRate>
          <totalOrderAmount>double</totalOrderAmount>
          <directDebitTypeId>int</directDebitTypeId>
          <directDebitDays>int</directDebitDays>
          <isRecur>boolean</isRecur>
          <nextInvoiceDate>dateTime</nextInvoiceDate>
          <endRecurDate>dateTime</endRecurDate>
          <cycleTypeID>int</cycleTypeID>
          <createDate>dateTime</createDate>
          <lastUpdateDate>dateTime</lastUpdateDate>
          <deleted>boolean</deleted>
          <products>
            <Product xsi:nil="true" />
            <Product xsi:nil="true" />
          </products>
          <payments>
            <Payment xsi:nil="true" />
            <Payment xsi:nil="true" />
          </payments>
          <addresses>
            <Address xsi:nil="true" />
            <Address xsi:nil="true" />
          </addresses>
          <crmForms>
            <CrmForms xsi:nil="true" />
            <CrmForms xsi:nil="true" />
          </crmForms>
        </OrderDetails>
        <OrderDetails>
          <entityId>int</entityId>
          <orderId>int</orderId>
          <orderName>string</orderName>
          <workflowId>int</workflowId>
          <statusTypeId>int</statusTypeId>
          <countryCode>string</countryCode>
          <orderType>int</orderType>
          <invoiceNumber>int</invoiceNumber>
          <invoiceDate>dateTime</invoiceDate>
          <userID_AssignedTo>int</userID_AssignedTo>
          <shippingAmount>double</shippingAmount>
          <shippingTaxRate>double</shippingTaxRate>
          <shippingAttention>string</shippingAttention>
          <shippingInstructions>string</shippingInstructions>
          <shippingOptionId>int</shippingOptionId>
          <discountCodeId>int</discountCodeId>
          <discountRate>double</discountRate>
          <totalOrderAmount>double</totalOrderAmount>
          <directDebitTypeId>int</directDebitTypeId>
          <directDebitDays>int</directDebitDays>
          <isRecur>boolean</isRecur>
          <nextInvoiceDate>dateTime</nextInvoiceDate>
          <endRecurDate>dateTime</endRecurDate>
          <cycleTypeID>int</cycleTypeID>
          <createDate>dateTime</createDate>
          <lastUpdateDate>dateTime</lastUpdateDate>
          <deleted>boolean</deleted>
          <products>
            <Product xsi:nil="true" />
            <Product xsi:nil="true" />
          </products>
          <payments>
            <Payment xsi:nil="true" />
            <Payment xsi:nil="true" />
          </payments>
          <addresses>
            <Address xsi:nil="true" />
            <Address xsi:nil="true" />
          </addresses>
          <crmForms>
            <CrmForms xsi:nil="true" />
            <CrmForms xsi:nil="true" />
          </crmForms>
        </OrderDetails>
      </OrderList_RetrieveByContactResult>
    </OrderList_RetrieveByContactResponse>
  </soap12:Body>
</soap12:Envelope>
~~~
