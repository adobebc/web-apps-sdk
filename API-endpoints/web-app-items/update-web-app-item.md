## Update Web App Item

Update a web app item. The update can be full (sending all properties), or partial (sending just the ones that need updating). Sending a property with a null value or not sending it at all has the same effect: it will not be changed.

### Request

* **Method:** PUT
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.
  * Note: When building apps always use relative request URLs. Do not use the "full" URL above because you might have problems running your app on a different site as the site_ID parameter will be different.
* **Path:** /api/v2/admin/sites/[siteId]/webapps/[webAppName]/items/[webAppItemId]
  * Alternatively, use "current" instead of [siteId]
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).
* **Required Permissions:** Edit Web App Items

#### Parameters ####

Body - A WebAppItem object containg the following properties: 

* `name` - the name of the web app item *(string)*
* `weight` - the weight of the web app item (the order in which they will appear in frontend) *(integer)*
* `releaseDate` - the release date of the web app item; uses the format mm/dd/yyyy *(string)*
* `expiryDate` - the date when the web app item will expire; uses the format mm/dd/yyyy *(string)*
* `enabled` - a boolean indicating whether this web app item is enabled or disabled *(boolean)*
* `slug` - the suffix that will be used to build its frontend URL. This is appended to the URL of the webapp. *(string)*
* `description` - the description or content of the webapp item *(string)*
* `roleId` - the id of the role assigned to this web app item, if any *(integer)*
* `address` - the address of this webapp item if any *(string)*
* `city` - the city of this webapp item if any *(string)*
* `state` - the state of this webapp item if any *(string)*
* `zipCode` - the zip code of this webapp item if any *(string)*
* `country` - the country of this webapp item if any. It should be the 2 letter country code returned by the Countries API (https://zerowing.corp.adobe.com/display/BusinessCatalyst/System+API+reference#SystemAPIreference-GetCountriesList) *(string)*
* `fields` - an object storing the webapp item's custom fields. This field is represented in 2 ways:
	* in json, each custom field is a property of this object
	* in xml, it is an array of objects having the following properties:
		* `name` - the name of the custom field
		* `value` - the value of the custom field. It can be any of the supported types: number, string, boolean

### Response

Returns empty body with a header response code.

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
PUT /api/v2/admin/sites/current/webapps/TestWebapp1/items/123
Authorization: 3e8d891d91eb433e9c800cebe3b132a4e64ac661c5ed4dd8bdecae0487e4ad7c
Content-Type: application/json
Accept: application/json
 
{
  "name": "Item7",
  "weight": 7,
  "releaseDate": "2013-01-30",
  "expiryDate": "9999-01-01",
  "enabled": true,
  "slug": "item7",
  "description": "<p>item7 description<\/p>",
  "roleId": null,
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
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
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
	* `200002` - The slug is invalid
	* `200003` - Using this slug will make the entire frontend URL larger than the maximum allowed length
	* `200004` - The slug is already used
	* `200005` - The name provided is invalid (empty or null)
	* `200006` - A custom field failed validation
	* `200008` - There is a problem with the address. Either the webapp does not allow storing addresses, or one of the address fields is empty
