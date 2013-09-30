## Create Web App Custom Field

Create a new Web App custom field.

### Request

* **Method:** POST
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/current/webapps/[webappName]/fields
* **Auth Header:** Site token required
* **Required Permissions:** Edit Web Apps

#### Parameters ####

Object:

* `id` - unique - field id, if left empty, will be auto-generated *(int)*
* `name` - unique, required - the name of the field (it must be unique amongst the custom & system fields) *(string)*
* `type` - required, one of the below: *(string)*
  * `String`
	* `Number`
	* `Boolean`
	* `DateTime`
	* `DropDown_List`
	* `CheckBox_List`
	* `Radio_List`
	* `Image`
	* `String_MultiLine`
	* `ListBox_List`
	* `String_Hyperlink`
	* `DataSource`
* `required` - true if the field is required (not required) *(boolean)*
* `order` - unique - the position of the field when listed starting with 1.

  If a field with the same order value already exists, its order value (and order value for any other fields "bellow") will be incremented by 1.

  If not specified, the field is added as the last one. *(integer)*
  
* `dataSource`: for DataSource fields should be a valid webapp name *(string)*
* `listItems` - used only by DropDown_List, CheckBox_List, Radio_List, ListBox_List fields *(array)*

### Response

The URI of the newly created custom field in the Location HTTP header.

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
POST /api/v2/admin/sites/12345/webapps/Cars/fields HTTPS/1.1
Authorization: 7e04176165cd4df7b628cc8ad022a8becf3bb84de44d480aadfae75e4fa07b56
Content-Length: 157
Connection: keep-alive
Content-Type: application/json
 
{
   "name"    : "Part code",
   "type"    : "DropDown_List",
   "listItems": ["First option", "Second one"],
   "required": false,
   "order"   : 3
}
~~~

**Response:**

~~~
HTTP/1.1 201 OK
Content-Type: application/json; charset=utf-8
Location: https://api.localsecuresyd.worldsecuresystems.com/api/v2/admin/sites/123/webapps/Cars/fields/123
~~~

### Sample code

Below is some sample code using the bcapi.js SDK. For more information, see [Interacting with APIs using the bcapi.js SDK](http://docs.businesscatalyst.com/content/developer-guides/APIs/javascript-SDK.html)

~~~
var customField = new BCAPI.Models.WebApp.CustomField("Test webapp", {
    "name": "Part code",
    "type": "DataSource",
    "listItems": null,
    "dataSource": "Part Codes",
    "required": false
});

customField.save({
    success: function(fieldModel) {
        // do something on success.
    }
});
~~~

### Error Codes

This method will return the following error codes:

* `201` - created
* `400` - bad request; sub-error codes:
	* `210000` - An unspecified error has occurred
	* `210002` - Invalid field id specified
	* `210003` - Invalid name (name is not syntactically correct or there is already a system or custom field with the same name)
	* `210004` - Invalid listItems
	* `210005` - Invalid dataSourceName
	* `210006` - Invalid order value (must be between 1 and max existing order value + 1)
	* `210007` - Invalid type
* `401` - unauthorized - when the authentication token is incorrect
	* `101000` - sub-error code
* `403` - forbidden - when the user does not have Edit WebApp Permission
* `404` - not found
	* `190001` - The web app could not be found (the webAppName param from the URL does not match)
	* `210001` - The custom field was not found (the fieldId from the URL do not match)

