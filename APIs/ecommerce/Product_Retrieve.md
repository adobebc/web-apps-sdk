## Product_Retrieve

Retrieve the details of a given product.

### Request

* **Method:** SOAP
* **Server:** worldsecuresystems.com
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Auth:** Username/password or a site token can be used (example below uses site token)

#### Parameters

* `siteId` - ID of the site *(integer)*
* `username` - email address of user account, leave empty if using site token *(string)*
* `password` - password of user account, or site authentication token for specified site *(string)*
* `productCode` - *(string)*	

To use a site token instead of username/password, send an empty `username` field and the site token as the `password`. See example below.

### Response

A Product_RetrieveResponse object with the following properties:

* `Product_RetrieveResult` - *(object)*  
	* `productId` - *(integer)* 
	* `productCode` - *(string)* 
	* `productName` - *(string)* 
	* `description` - *(string)* 
	* `smallImage` - *(string)* 
	* `largeImage` - *(string)* 
	* `cataloguesArray` - *(array)* 
	* `pricesSaleArray` - *(array)* 
	* `pricesRetailArray` - *(array)* 
	* `pricesWholesaleArray` - *(array)* 
	* `wholesaleTaxCodeArray` - *(array)* 
	* `taxCodeArray` - *(array)* 
	* `groupProducts` - *(array)* 
	* `groupProductsDescriptions` - *(array)* 
	* `supplierEntityId` - *(integer)* 
	* `supplierCommission` - *(double)* 
	* `weight` - *(integer)* 
	* `relatedProducts` - *(array)* 
	* `tags` - *(string)* 
	* `unitType` - *(string)* 
	* `minUnits` - *(integer)* 
	* `maxUnits` - *(integer)* 
	* `inStock` - *(integer)* 
	* `onOrder` - *(integer)* 
	* `reOrder` - *(integer)* 
	* `inventoryControl` - *(boolean)* 
	* `canPreOrder` - *(boolean)* 
	* `custom1` - *(string)* 
	* `custom2` - *(string)* 
	* `custom3` - *(string)* 
	* `custom4` - *(string)* 
	* `popletImages` - *(string)* 
	* `enabled` - *(boolean)* 
	* `deleted` - *(boolean)* 
	* `captureDetails` - *(boolean)* 
	* `downloadLimitCount` - *(integer)* 
	* `limitDownloadsToIP` - *(integer)* 
	* `isOnSale` - *(boolean)* 
	* `hideIfNoStock` - *(boolean)* 
	* `productAttributes` - *(string)* 
	* `isGiftVoucher` - *(boolean)* 
	* `enableDropShipping` - *(boolean)* 
	* `productWeight` - *(double)* 
	* `productWidth` - *(double)* 
	* `productHeight` - *(double)* 
	* `productDepth` - *(double)*
	* `excludeFromSearch` - *(boolean)*
	* `productTitle` - *(string)*
	* `cycletypeId` - *(integer)*
	* `cycletypeCount` - *(integer)*
	* `slug` - *(string)*
	* `hasVariations` - *(boolean)*
	* `variations` - *(array)*
		* `ProductVariation` - *(object)*
			* `id` - *(integer)*
			* `options` - *(string)*
			* `code` - *(string)*
			* `enabled` - *(boolean)*
			* `inStock` - *(integer)*
			* `onOrder` - *(integer)*

### Examples

Accepts and returns XML as Content-Type. 

The following is a sample SOAP 1.2 request and response. The placeholders shown need to be replaced with actual values.

**Request:**
~~~
POST /catalystwebservice/catalystecommercewebservice.asmx HTTP/1.1
Host: www.businesscatalyst.com.au
Content-Type: application/soap+xml; charset=utf-8
Content-Length: length

<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <Product_Retrieve xmlns="http://tempuri.org/CatalystDeveloperService/CatalystEcommerceWebservice">
      <username>string</username>
      <password>string</password>
      <siteId>int</siteId>
      <productCode>string</productCode>
    </Product_Retrieve>
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
    <Product_RetrieveResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystEcommerceWebservice">
      <Product_RetrieveResult>
        <productId>int</productId>
        <productCode>string</productCode>
        <productName>string</productName>
        <description>string</description>
        <smallImage>string</smallImage>
        <largeImage>string</largeImage>
        <cataloguesArray>
          <string>string</string>
          <string>string</string>
        </cataloguesArray>
        <pricesSaleArray>
          <string>string</string>
          <string>string</string>
        </pricesSaleArray>
        <pricesRetailArray>
          <string>string</string>
          <string>string</string>
        </pricesRetailArray>
        <pricesWholesaleArray>
          <string>string</string>
          <string>string</string>
        </pricesWholesaleArray>
        <wholesaleTaxCodeArray>
          <string>string</string>
          <string>string</string>
        </wholesaleTaxCodeArray>
        <taxCodeArray>
          <string>string</string>
          <string>string</string>
        </taxCodeArray>
        <groupProducts>
          <string>string</string>
          <string>string</string>
        </groupProducts>
        <groupProductsDescriptions>
          <string>string</string>
          <string>string</string>
        </groupProductsDescriptions>
        <supplierEntityId>int</supplierEntityId>
        <supplierCommission>double</supplierCommission>
        <weight>int</weight>
        <relatedProducts>
          <string>string</string>
          <string>string</string>
        </relatedProducts>
        <tags>string</tags>
        <unitType>string</unitType>
        <minUnits>int</minUnits>
        <maxUnits>int</maxUnits>
        <inStock>int</inStock>
        <onOrder>int</onOrder>
        <reOrder>int</reOrder>
        <inventoryControl>boolean</inventoryControl>
        <canPreOrder>boolean</canPreOrder>
        <custom1>string</custom1>
        <custom2>string</custom2>
        <custom3>string</custom3>
        <custom4>string</custom4>
        <popletImages>string</popletImages>
        <enabled>boolean</enabled>
        <deleted>boolean</deleted>
        <captureDetails>boolean</captureDetails>
        <downloadLimitCount>int</downloadLimitCount>
        <limitDownloadsToIP>int</limitDownloadsToIP>
        <isOnSale>boolean</isOnSale>
        <hideIfNoStock>boolean</hideIfNoStock>
        <productAttributes>string</productAttributes>
        <isGiftVoucher>boolean</isGiftVoucher>
        <enableDropShipping>boolean</enableDropShipping>
        <productWeight>double</productWeight>
        <productWidth>double</productWidth>
        <productHeight>double</productHeight>
        <productDepth>double</productDepth>
        <excludeFromSearch>boolean</excludeFromSearch>
        <productTitle>string</productTitle>
        <cycletypeId>int</cycletypeId>
        <cycletypeCount>int</cycletypeCount>
        <slug>string</slug>
        <hasVariations>boolean</hasVariations>
        <variations>
          <ProductVariation>
            <id>int</id>
            <options>string</options>
            <code>string</code>
            <enabled>boolean</enabled>
            <inStock>int</inStock>
            <onOrder>int</onOrder>
          </ProductVariation>
          <ProductVariation>
            <id>int</id>
            <options>string</options>
            <code>string</code>
            <enabled>boolean</enabled>
            <inStock>int</inStock>
            <onOrder>int</onOrder>
          </ProductVariation>
        </variations>
      </Product_RetrieveResult>
    </Product_RetrieveResponse>
  </soap12:Body>
</soap12:Envelope>
~~~
