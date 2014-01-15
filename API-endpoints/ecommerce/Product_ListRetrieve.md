## Product_ListRetrieve

Retrieve a list of products for a given catalog (or all products if CatalogId = -1).

### Request

* **Method:** SOAP
* **Server:** worldsecuresystems.com
* **Path:** /catalystwebservice/catalystcrmwebservice.asmx
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).

#### Parameters

* `siteId` - ID of the site *(integer)*
* `username` - email address of user account, leave empty if using site token *(string)*
* `password` - password of user account, or site authentication token for specified site *(string)*
* `CatalogId` - *(string)*	

To use a site token instead of username/password, send an empty `username` field and the site token as the `password`. See example below.

### Response

A Product_ListRetrieveResponse object with the following properties:

* `Product_ListRetrieveResult` - *(object)* 
	* `Products` - *(object)*  
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
    <Product_ListRetrieve xmlns="http://tempuri.org/CatalystDeveloperService/CatalystEcommerceWebservice">
      <Username>string</Username>
      <Password>string</Password>
      <SiteId>int</SiteId>
      <CatalogId>int</CatalogId>
    </Product_ListRetrieve>
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
    <Product_ListRetrieveResponse xmlns="http://tempuri.org/CatalystDeveloperService/CatalystEcommerceWebservice">
      <Product_ListRetrieveResult>
        <Products>
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
            <ProductVariation xsi:nil="true" />
            <ProductVariation xsi:nil="true" />
          </variations>
        </Products>
        <Products>
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
            <ProductVariation xsi:nil="true" />
            <ProductVariation xsi:nil="true" />
          </variations>
        </Products>
      </Product_ListRetrieveResult>
    </Product_ListRetrieveResponse>
  </soap12:Body>
</soap12:Envelope>
~~~
