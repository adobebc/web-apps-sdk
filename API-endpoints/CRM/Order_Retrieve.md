## Order_Retrieve

Retrieves details for an Order including details, products and payments. Use EntityID to retrieve owner Contact/Company information for order.

### Request

* **Method:** SOAP
* **Server:** worldsecuresystems.com
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).

#### Parameters

* `siteId` - ID of the site *(integer)*
* `username` - email address of user account, leave empty if using site token *(string)*
* `password` - password of user account, or site authentication token for specified site *(string)*
* `orderId` - *(integer)*

To use a site token instead of username/password, send an empty `username` field and the site token as the `password`. See example below.

### Response

A Order_RetrieveResponse object with the following properties:

* `Order_RetrieveResult` - *(object)*
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
		* `products` - *(object)*
			* `Product` - *(object)*
				* `productId` - *(integer)*
				* `productCode` - *(string)*
				* `productDescription` - *(string)*
				* `units` - *(integer)*
				* `unitPrice` - *(double)*
				* `unitTaxRate` - *(double)*
				* `totalProductPrice` - *(double)*
				* `productName` - *(string)*
				* `variationId` - *(integer)*	
		* `payments` - *(object)*	
			* `Payment` - *(object)*
				* `paymentMethodTypeID` - *(integer)*
				* `amount` - *(double)*
				* `paymentStatusID` - *(integer)*
				* `transactionNumber` - *(string)*
				* `transactionAuthCode` - *(string)*
				* `Description` - *(string)*
				* `paymentDate` - *(dateTime)*
		* `addresses` - *(object)*
			* `Address` - *(object)*
				* `addressTypeID` - *(integer)*
				* `addressLine1` - *(string)*
				* `addressLine2` - *(string)*
				* `city` - *(string)*
				* `zipcode` - *(string)*
				* `state` - *(string)*
				* `countryCode` - *(string)*
		* `crmForms` - *(object)*
			* `CrmForms` - *(object)*
				* `formId` - *(integer)*
				* `formName` - *(string)*
				* `crmFormFields` - *(array)*	

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
    <Order_Retrieve xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <username>string</username>
      <password>string</password>
      <siteId>int</siteId>
      <orderId>int</orderId>
    </Order_Retrieve>
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
    <Order_RetrieveResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystCRMWebservice">
      <Order_RetrieveResult>
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
          <Product>
            <productId>int</productId>
            <productCode>string</productCode>
            <productDescription>string</productDescription>
            <units>int</units>
            <unitPrice>double</unitPrice>
            <unitTaxRate>double</unitTaxRate>
            <totalProductPrice>double</totalProductPrice>
            <productName>string</productName>
            <variationId>int</variationId>
          </Product>
          <Product>
            <productId>int</productId>
            <productCode>string</productCode>
            <productDescription>string</productDescription>
            <units>int</units>
            <unitPrice>double</unitPrice>
            <unitTaxRate>double</unitTaxRate>
            <totalProductPrice>double</totalProductPrice>
            <productName>string</productName>
            <variationId>int</variationId>
          </Product>
        </products>
        <payments>
          <Payment>
            <paymentMethodTypeID>int</paymentMethodTypeID>
            <amount>double</amount>
            <paymentStatusID>int</paymentStatusID>
            <transactionNumber>string</transactionNumber>
            <transactionAuthCode>string</transactionAuthCode>
            <Description>string</Description>
            <paymentDate>dateTime</paymentDate>
          </Payment>
          <Payment>
            <paymentMethodTypeID>int</paymentMethodTypeID>
            <amount>double</amount>
            <paymentStatusID>int</paymentStatusID>
            <transactionNumber>string</transactionNumber>
            <transactionAuthCode>string</transactionAuthCode>
            <Description>string</Description>
            <paymentDate>dateTime</paymentDate>
          </Payment>
        </payments>
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
      </Order_RetrieveResult>
    </Order_RetrieveResponse>
  </soap12:Body>
</soap12:Envelope>
~~~
