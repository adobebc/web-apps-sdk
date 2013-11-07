## Get Web App Item Details

Get the details of a Web App item.

### Request

* **Method:** GET
* **Server:** https://mysite.worldsecuresystems.com/ (the secure site URI)
  * Note: For Open Admin applications, always use relative request URLs
* **Path:** /api/v2/admin/sites/[siteId]/webapps/[webAppName]/items/[webAppItemId]
  * Alternatively, use "current" instead of [siteId]
* **Auth Header:** Site token required
* **Required Permissions:** View Web App Items

### Response

Returns a WebAppItem object with the following properties:

* `links` - contains a collection of links:
	* `previewUrl` - the frontend URL where the web app item can be viewed. It uses the site's default domain
	* `categories` - the API URL that will return all the category ids associated with this item
* `id` - the id of the web app item *(integer)*
* `name` - the name of the web app item *(string)*
* `weight` - the weight of the web app item (the order in which they will appear in frontend) *(integer)*
* `releaseDate` - the release date of the web app item; uses the format mm/dd/yyyy *(string)*
* `expiryDate` - the date when the web app item will expire; uses the format mm/dd/yyyy *(string)*
* `createDate` - the date when the web app item was created; uses the format mm/dd/yyyy *(string)*
* `lastUpdateDate` - the date when the webapp item was last updated; uses the format mm/dd/yyyy *(string)*
* `enabled` - a boolean indicating whether this web app item is enabled or disabled *(boolean)*
* `slug` - the suffix that will be used to build its frontend URL. This is appended to the URL of the webapp. *(string)*
* `description` - the description or content of the webapp item *(string)*
* `roleId` - the id of the role assigned to this web app item, if any *(integer)*
* `createdBy` - the id of the user that created this webapp item *(integer)*
* `submittedBy` - the id of the CRM user that created this webapp item, if it has been created from the frontend *(integer)*
* `address` - the address of this webapp item if any *(string)*
* `city` - the city of this webapp item if any *(string)*
* `state` - the state of this webapp item if any *(string)*
* `zipCode` - the zip code of this webapp item if any *(string)*
* `country` - the country of this webapp item if any. It should be the 2 letter country code returned by the Countries API (https://zerowing.corp.adobe.com/display/BusinessCatalyst/System+API+reference#SystemAPIreference-GetCountriesList)
* `fields` - an object storing the webapp item's custom fields. This field is represented in 2 ways:
	* in json, each custom field is a property of this object
	* in xml, it is an array of objects having the following properties:
		* `name` - the name of the custom field *(string)*
		* `value` - the value of the custom field. It can be any of the supported types: number, string, boolean *(object)*


### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET /api/v2/admin/sites/123/webapps/TestWebapp1/items/1073039
Authorization: 3e8d891d91eb433e9c800cebe3b132a4e64ac661c5ed4dd8bdecae0487e4ad7c
Accept: application/json
~~~

**Response:**

~~~
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: {length}
 
 
{
  "links": [
    {
      "rel": "previewUrl",
      "uri": "http://www.test1.com/testwebapp1/item1"
    },
    {
      "rel": "categories",
      "uri": "https://localbc.worldsecuresystems.com/api/v2/admin/sites/38584/webapps/TestWebapp1/items/1073039/categories"
    }
  ],
  "id": 1073039,
  "name": "Item1",
  "weight": null,
  "releaseDate": "2013-06-30",
  "expiryDate": "9999-01-01",
  "createDate": "2013-06-30",
  "lastUpdateDate": "2013-06-30",
  "enabled": true,
  "slug": "item1",
  "description": "<p>item1 description<\/p>\u000d\u000a",
  "roleId": null,
  "createBy": 54273,
  "submitedBy": -1,
  "address": "item1_address",
  "city": "item1_city",
  "state": "item1_state",
  "zipCode": "000001",
  "country": "US",
  "fields": {
    "field_string_required": "item1_field1_value",
    "field2_string_optional": "item1_field2_value",
    "field3_number": 1,
    "field4_dateTime": "7/3/2013",
    "field5_list": "item2"
  }
}
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `401` - unauthorized - when the authentication token is incorrect
* `403` - forbidden - when the user does not have the proper permissions
* `404` - not found
	* `190001` - The web app could not be found (the webAppName param from the URL does not match)
	* `200001` - The webapp item was not found (the webAppName and webAppItemId from the URL do not match)
* `400` - bad request; sub-error codes:
	* `200000` - An unspecified error has occured
