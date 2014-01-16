## Create Web App Item

Create a web app item.

### Request

* **Method:** POST
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.
  * Note: When building apps always use relative request URLs. Do not use the "full" URL above because you might have problems running your app on a different site as the site_ID parameter will be different.
* **Path:** /api/v2/admin/sites/[siteId]/webapps/[webAppName]/items
  * Alternatively, use "current" instead of [siteId]
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).
* **Required Permissions:** Add Web App Items

#### Parameters

A WebAppItem object containg the following properties: 

* `name`- the name of the web app item, required *(string)*
* `weight` - the weight of the web app item (the order in which they will appear in frontend). Default: null *(integer)*
* `releaseDate` - the release date of the web app item; uses the format mm/dd/yyyy. Default: current date *(string)*
* `expiryDate` - the date when the web app item will expire; uses the format mm/dd/yyyy. Default: "9999-01-01" *(string)*
* `enabled` - a boolean indicating whether this web app item is enabled or disabled. Default: true *(boolean)*
* `slug` - the suffix that will be used to build its frontend URL. This is appended to the URL of the webapp. The URL is based on the name of the Web App, and made unique by appending "-1", "-2", etc. *(string)*
* `description` - the description or content of the webapp item. *(string)*
* `roleId` - the id of the role assigned to this web app item, if any. Default: -1 *(integer)*
* `submittedBy` - the id of the user that created this webapp item, if any. Default: -1 *(integer)*
* `templateId` - the id of the site template assigned for this webapp item. Default: the id of the template set on the webapp. It has 2 special values: *(integer)*
  * `-1` - no template
	* `0` - use the template marked as default
* `address` - the address of this webapp item if any *(string)*
* `city` - the city of this webapp item if any *(string)*
* `state` - the state of this webapp item if any *(string)*
* `zipCode` - the zip code of this webapp item if any *(string)*
* `country` - the country of this webapp item if any. It should be the 2 letter country code returned by the Countries API (https://zerowing.corp.adobe.com/display/BusinessCatalyst/System+API+reference#SystemAPIreference-GetCountriesList). Required if the Web App has `hasAddress` set to true or null otherwise
 *(string)*
* `fields` - an object storing the webapp item's custom fields. This field is represented in 2 ways:
	* in json, each custom field is a property of this object
	* in xml, it is an array of objects having the following properties:
		* `name` - the name of the custom field *(string)*
		* `value` - the value of the custom field. It can be any of the supported types: number, string, boolean *(object)*

### Response

Returns the URI of the newly created webapp item in the Location HTTP header.

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
POST /api/v2/admin/sites/current/webapps/TestWebapp1/items
Authorization: 3e8d891d91eb433e9c800cebe3b132a4e64ac661c5ed4dd8bdecae0487e4ad7c
Content-Type: application/json
Accept: application/json
 
{
  "name": "Item7",
  "weight": 7,
  "releaseDate": "9999-01-01",
  "expiryDate": "9999-01-01",
  "enabled": true,
  "slug": "item7",
  "description": "<p>item7 description<\/p>",
  "roleId": null,
  "submittedBy": -1,
  "templateId": 123,
 
  "address": "item7_address",
  "city": "item7_city",
  "state": "item7_state",
  "zipCode": "000007",
  "country": "US",
  "fields": {
      "field_string_required": "item7_field1_value",
      "field2_string_optional": "item7_field2_value",
      "field3_number": 7,
      "field4_dateTime": "2012-01-20",
      "field5_list": "item1"
  }
}
~~~
**Response:**

~~~
HTTP/1.1 201 OK
Content-Type: application/json; charset=utf-8
Location: https://api.localsecuresyd.worldsecuresystems.com/api/v2/admin/sites/current/webapps/TestWebapp1/items/123
~~~

### Error Codes

This method will return the following error codes:

* `201` - success
* `401` - unauthorized - when the authentication token is incorrect
* `403` - forbidden - when the user does not have the proper permissions
* `404` - not found
	* `190001` - The web app could not be found (the webAppName param from the URL does not match)
* `400` - bad request; sub-error codes:
	* `200000` - An unspecified error has occured
	* `200002` - The slug is invalid
	* `200003` - Using this slug will make the entire frontend URL larger than the maximum allowed length
	* `200004` - The slug is already used
	* `200005` - The name provided is invalid (empty or null)
	* `200006` - A custom field failed validation
	* `200008` - There is a problem with the address. The related webapp has "location
