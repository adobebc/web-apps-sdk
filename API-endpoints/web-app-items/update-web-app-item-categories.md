## Update Web App Item Categories

Assigns a new list of categories to a webapp item

**Note:** Assigning a new list of categories to a Web App item will replace the existing categories.

### Request

* **Method:** PUT
* **Server:** https://mysite.worldsecuresystems.com/ (the secure site URI)
  * Note: For Open Admin applications, always use relative request URLs
* **Path:** /api/v2/admin/sites/[siteId]/webapps/[webappName]/items/[itemID]/categories
  * Alternatively, use "current" instead of [siteId]
* **Auth Header:** Site token required
* **Required Permissions:** Edit Web App Items

### Parameters

Use the ids of the categories as parameters for this method.

### Response

Returns empty body with a header response code.

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
PUT /api/v2/admin/sites/45345/webapps/Cars/items/564567/categories HTTPS/1.1
Content-Length: length
Connection: keep-alive
Content-Type: application/json
 
[45345,45346]
~~~

**Response:**

~~~
HTTP/1.1 200 OK
~~~

### Sample code

Below is some sample code using the bcapi.js SDK. For more information, see [Interacting with APIs using the bcapi.js SDK](http://docs.businesscatalyst.com/content/developer-guides/apis/javascript-sdk.html)

~~~
var itemCategories = new BCAPI.Models.WebApp.ItemCategory(WEBAPP_NAME, ITEM_ID);
itemCategories.set(items, [1,2,3,4]);
itemCategories.save({success: onSaveOK, error: onSaveFailed})
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `400` - bad request
  * `200000` - An unspecified error has occured
  * `200009` - Category id is invalid
* `401` - unauthorized - when the Authorization header is not present, or contains an invalid site token
* `403` - forbidden - when the user does not have Edit WebApp Item permission
* `404` - not found:
  * `190001` - The web app could not be found (the webAppName param from the URL does not match)
	* `200001` - The webapp item was not found (the webAppName and webAppItemId from the URL do not match)
