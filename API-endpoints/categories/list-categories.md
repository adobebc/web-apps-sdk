## List Categories

Get a list of categories which exist on the current site in ascending order of their ids.

**Note:** This operation does not support: pagination, filtering, or sorting parameters.  

### Request

* **Method:** GET
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.
  * Note: When building apps always use relative request URLs. Do not use the "full" URL above because you might have problems running your app on a different site as the site_ID parameter will be different.
* **Path:** /api/v2/admin/sites/[siteID]/categories 
	* Alternatively use "current" in place of siteId for current login token's site
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).
* **Required Permissions:** View Category (3100)

### Response

A CategoryList object with the following properties:

* `links` - a collection of links *(array)*
	* `self` - the API URL that will return this result *(string)*
	* `previous` - the API URL that will return the previous page of results, if any *(string)*
	* `next` - the API URL that will return the next page of results, if any *(string)*
* `items` - an array of CategorySummary objects with the following properties *(array)* 
	* `links` - a collection of links *(array)*
		* `self` - the API URL that will return full details for this category *(string)*
	* `id` - the ID of the category for the current site *(integer)* 
	* `name` - the name of the category *(string)*
	* `parentId` - the ID of the parent category, if this is a sub-category. Returns -1 if a root-level category *(integer)*
	* `publicAccess` - whether or not the category is visible to front-end users *(boolean)*


### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET https://mysite.worldsecuresystems.com/api/v2/admin/sites/current/categories
Authorization: 7e04176165cd4df7b628cc8ad022a8becf3bb84de44d480aadfae75e4fa07b56
Content-Type: application/json
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
      "uri": "https://localbc.worldsecuresystems.com/api/v2/admin/sites/current/categories?skip=4&limit=4"
    },
    {
      "rel": "previous",
      "uri": "https://localbc.worldsecuresystems.com/api/v2/admin/sites/current/categories?skip=0&limit=4"
    },
    {
      "rel": "next",
      "uri": "https://localbc.worldsecuresystems.com/api/v2/admin/sites/current/categories?skip=8&limit=4"
    }
  ],
   "items": [
   {
       "links": [
        {
          "rel": "self",
          "uri": "https://localbc.worldsecuresystems.com/api/v2/admin/sites/current/categories/123457"
        }],
      "id"      : "123457",
      "name"    : "Parent category",
      "parentId"  : -1,
      "publicAccess" : true
   },
   {
       "links": [
        {
          "rel": "self",
          "uri": "https://localbc.worldsecuresystems.com/api/v2/admin/sites/current/categories/418191"
        }],
      "id"      : "418191",
      "name"    : "Child category",
      "parentId"  : 123457,
      "publicAccess" : false
   },
   {
       "links": [
        {
          "rel": "self",
          "uri": "https://localbc.worldsecuresystems.com/api/v2/admin/sites/current/categories/123453"
        }],
      "id"      : "123453",
      "name"    : "Something else",
      "parentId"  : -1,
      "publicAccess" : true
   },
   {
       "links": [
        {
          "rel": "self",
          "uri": "https://localbc.worldsecuresystems.com/api/v2/admin/sites/current/categories/123459"
        }],
      "id"      : "123459",
      "name"    : "The last one",
      "parentId"  : -1
      "publicAccess" : true
   }],
  "totalItemsCount": 11,
  "skip": 4,
  "limit": 4
}
~~~

### Sample code

Below is some sample code using the bcapi.js SDK. For more information, see [Interacting with APIs using the bcapi.js SDK](http://adobebc.github.io/bcapi.js/)

~~~
var categories = new BCAPI.Models.CategoryCollection();
categories.fetch({
    success: onSuccessHandler,
    error: onErrorHandler
})
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `400` - bad request
	* `220000` - unknown error
* `401` - unauthorized - when the Authorization header is not present, or contains an invalid site token
	* `101000` - sub-error code
* `403` - forbidden - this is returned when the user trying to access the API does not have the proper permissions
