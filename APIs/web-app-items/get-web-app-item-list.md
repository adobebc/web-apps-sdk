## Get Web App Item List

Gets a list of Web App items, as per the specified filters. 

### Request

* **Method:** GET
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/[siteID]/webapps/[webAppName]/items
	* Alternatively use "current" in place of siteId for current login token's site
* **Auth Header:** Site token required
* **Required Permissions:** View Web App

A query string (eg. ?order=ascending) with the following properties:

* `order` - allows sorting bit a single system field, either "ascending" or "descending" *(string, optional)*
* `where` - filter by a single system field *(string, optional)*
* `skip` - how many items to skip from the returned result. *(integer, optional)*
* `limit` - how many items to return *(integer, optional)*

### Response

A WebAppItemList object with the following properties:

* `links` - contains a collection of links *(array)*
	* `self` - the API URL that returned this result
	* `previous` - the API URL that will return the previous page of results, if any
	* `next` - the API URL that will return the next page of results, if any
* `items` - an array of WebAppItemSummary objects with the following properties *(array)*
	* `links` - contains a collection of links *(array)*
		* `self` - the API URL that will return the full details of this Web App item *(string)*
		* `previewURL` - the front-end URL where the Web App item can be viewed. Uses the sites default domain *(string)*
	* `id` - the ID of the Web App item *(integer)*
	* `name` - the name of the Web App item *(string)*
	* `releaseDate` - the release date of the Web App item, in the format mm/dd/yyyy *(string)*
	* `expiryDate` - the date the Web App will expire, in the format mm/dd/yyyy *(string)*
	* `createDate` - the date the Web App was created, in the format mm/dd/yyyy *(string)*
	* `lastUpdateDate` - the date the Web App item was last updated, in the format mm/dd/yyyy *(string)*
	* `enabled` - whether the Web App item is enabled or disabled *(boolean)*
* `totalitems` - the number of Web App items that match the specified filter *(integer)*
* `skip` - the number of Web App items skipped in this response *(integer)*
* `limit` - the number of Web App items returned in this response *(integer)*

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET /api/v2/admin/sites/123/webapps/TestWebapp1/items?skip=2&limit=2 HTTPS/1.1
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
      "rel": "self",
      "uri": "https://mysite.worldsecuresystems.com/api/v2/admin/sites/38584/webapps/TestWebapp1/items?skip=2&limit=2"
    },
    {
      "rel": "previous",
      "uri": "https://mysite.worldsecuresystems.com/api/v2/admin/sites/38584/webapps/TestWebapp1/items?skip=0&limit=2"
    },
    {
      "rel": "next",
      "uri": "https://mysite.worldsecuresystems.com/api/v2/admin/sites/38584/webapps/TestWebapp1/items?skip=4&limit=2"
    }
  ],
  "items": [
    {
      "links": [
        {
          "rel": "self",
          "uri": "https://mysite.worldsecuresystems.com/api/v2/admin/sites/38584/webapps/TestWebapp1/items/1073041"
        },
        {
          "rel": "previewUrl",
          "uri": "http://www.test1.com/testwebapp1/item3"
        }
      ],
      "id": 1073041,
      "name": "item3",
      "weight": null,
      "releaseDate": "06/30/2013",
      "expiryDate": "01/01/9999",
      "createDate": "06/30/2013",
      "lastUpdateDate": "06/30/2013",
      "enabled": true
    },
    {
      "links": [
        {
          "rel": "self",
          "uri": "https://mysite.worldsecuresystems.com/api/v2/admin/sites/38584/webapps/TestWebapp1/items/1073042"
        },
        {
          "rel": "previewUrl",
          "uri": "http://www.test1.com/testwebapp1/item4"
        }
      ],
      "id": 1073042,
      "name": "item4",
      "weight": null,
      "releaseDate": "06/30/2013",
      "expiryDate": "01/01/9999",
      "createDate": "06/30/2013",
      "lastUpdateDate": "06/30/2013",
      "enabled": true
    },
  ],
  "totalItems": 7,
  "skip": 2,
  "limit": 2
}
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `400` - bad request
	* `190001` - the Web App could not be found (the webAppName parameter from the URL does not match any record)
	* `200000` - an unspecified error has occurred
	* `200007` - there is a problem with the query, eg. invalid format, invalid field name, invalid operator, etc. 
* `401` - unauthorized - when the Authorization header is not present, or contains an invalid site token
	* `101000` - sub-error code
* `403` - forbidden - this is returned when the user trying to access the API does not have the proper permissions
