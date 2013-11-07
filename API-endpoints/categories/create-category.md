## Create category

Creates a new category.

**Note:** A category at the root level is "Level 0". A child of a "Level 0" category is "Level 1". A child of a "Level 1" category is "Level 2", which is the maximum allowed.

### Request

* **Method:** POST
* **Server:** https://mysite.worldsecuresystems.com/ (the secure site URI)
  * Note: For Open Admin applications, always use relative request URLs
* **Path:** /api/v2/admin/sites/[siteID]/categories
	* Alternatively use "current" in place of siteId for current login token's site
* **Auth Header:** Site token required
* **Required Permissions:** Add Category (3101)

#### Parameters ####

A Category object with the following properties:

* `name` - the name of the category you wish to create *(string)*
* `parent` - the ID of the parent category. If not specified, the category will be created at the root level *(integer, optional)*
* `publicAccess` - whether or not the category is visible to front-end users. If not specified, defaults to true. *(boolean)*

### Response

Returns an empty body and a location header containing the URI to retrieve category details.

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
POST https://mysite.worldsecuresystems.com/api/v2/admin/sites/12345/categories
Authorization: 7e04176165cd4df7b628cc8ad022a8becf3bb84de44d480aadfae75e4fa07b56
Content-Type: application/json
Content-Length: 20
 
{"name": "My category"}
~~~

**Response:**
~~~
HTTP/1.1 201 OK
Location: https://api-[dub|nj|syd].worldsecuresystems.com/api/v2/admin/sites/12345/categories/232323
Content-Type: application/json; charset=utf-8
Content-Length: length
~~~

---

**Request:**
~~~
POST https://mysite.worldsecuresystems.com/api/v2/admin/sites/12345/categories
Authorization: 7e04176165cd4df7b628cc8ad022a8becf3bb84de44d480aadfae75e4fa07b56"
Content-Type: application/json
Content-Length: 120
 
{
  "name": "My category",
  "parent": "2222",
  "publicAccess" : false
}
~~~

**Response:** 
~~~
HTTP/1.1 201 OK
Location: https://api-[dub|nj|syd].worldsecuresystems.com/api/v2/admin/sites/12345/categories/232323
Content-Type: application/json; charset=utf-8
Content-Length: length
~~~

### Sample code

Below is some sample code using the bcapi.js SDK. For more information, see [Interacting with APIs using the bcapi.js SDK](http://docs.businesscatalyst.com/content/developer-guides/apis/javascript-sdk.html)

~~~
var category = new BCAPI.Models.Category({name: 'Test Category'});
To save:
category.save(options)
To get a category by id:
var category = new BCAPI.Models.Category({id: 1});
category.fetch(options)
~~~

**Note:** Update and delete methods are not supported.


### Error Codes

This method will return the following error codes:

* `201` - success
* `400` - bad request
	* `220000` - unknown error
	* `220002` - category with the given parent ID does not exist
	* `220003` - category name already exists under given parent ID
	* `220004` - category with given parent ID is Level 2
	* `220005` - category name is invalid (either null/empty or contains ",/ or \ characters)
* `401` - unauthorized - when the Authorization header is not present, or contains an invalid site token
	* `101000` - sub-error code
* `403` - forbidden - this is returned when the user trying to access the API does not have the proper permissions
