## Get Web App Custom Field List

Returns a list of fields in ascending order.

**Note:** This operation does not support: pagination, filtering, or sorting parameters.  

### Request

* **Method:** GET
* **Server:** https://mysite.worldsecuresystems.com/ (the secure site URI)
  * Note: For Open Admin applications, always use relative request URLs
* **Path:** /api/v2/admin/sites/current/webapps/[webappName]/fields
* **Auth Header:** Site token required
* **Required Permissions:** View Web Apps

### Response

Returns a list of objects with the following properties:

* `id` - *(integer)*
* `name` - the name of the field *(string)*
* `type` -  string Possible values:
  * String 
	* Number
	* Boolean
	* DateTime
	* DropDown_List
	* CheckBox_List
	* Radio_List
	* Image
	* String_MultiLine
	* ListBox_List
	* String_Hyperlink
	* DataSource
* `required` - true if the field is required *(boolean)*
* `order` - unique, the position of the field when listed starting with 1 *(integer)*
* `dataSource` - for DataSource fields should be a valid webapp name *(string)*
* `listItems` - used only when type is {nl:DropDown_List, CheckBox_List, Radio_List, ListBox_List fields *(array)*

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET /api/v2/admin/sites/12345/webapps/Cars/fields HTTPS/1.1
Authorization: 7e04176165cd4df7b628cc8ad022a8becf3bb84de44d480aadfae75e4fa07b56
Content-Type: application/json
~~~

**Response:**

~~~
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: length
 
{
   "totalItemsCount": 3,
   "skip": 0,
   "limit": 100,
   "links": [
      {
        "rel":"self",
        "uri":"https:\/\/bc-local.worldsecuresystems.com\/api\/v2\/admin\/sites\/325435\/webapps\/Cars\/fields?limit=100&skip=0"
      }
   ],
   "items": [{
      "links": [
         {
           "rel":"self",
           "uri":"https:\/\/bc-local.worldsecuresystems.com\/api\/v2\/admin\/sites\/325435\/webapps\/Cars\/fields\/418191"
         }
      ],
      "id"      : 1,
      "name"    : "Part code",
      "type"    : "DataSource",
      "listItems": null,
      "dataSource": 324232,
      "required": false,
      "order"   : 1
   },{
      "links": [
         {
           "rel":"self",
           "uri":"https:\/\/bc-local.worldsecuresystems.com\/api\/v2\/admin\/sites\/325435\/webapps\/Cars\/fields\/418193"
         }
      ],
      "id"      : 2,
      "name"    : "Part type",
      "type"    : "CheckBox_List",
      "listItems": ["Engine", "Body", "Electronics"],
      "dataSource": null,
      "required": false,
      "order"   : 2
   },{
      "links": [
         {
           "rel":"self",
           "uri":"https:\/\/bc-local.worldsecuresystems.com\/api\/v2\/admin\/sites\/325435\/webapps\/Cars\/fields\/418192"
         }
      ],
      "id"      : 3,
      "name"    : "Photo",
      "type"    : "Picture",
      "listItems": null,
      "dataSource": null,
      "required": true,
      "order"  : 3
   }]
}
~~~

### Sample code

Below is some sample code using the bcapi.js SDK. For more information, see [Interacting with APIs using the bcapi.js SDK](http://docs.businesscatalyst.com/content/developer-guides/apis/javascript-sdk.html)

~~~
var fieldsCollection = new BCAPI.Models.WebApp.CustomFieldCollection("Sample webapp");
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `400` - bad request; sub-error codes:
	* `210000` - An unspecified error has occured
* `401` - unauthorized - when the authentication token is incorrect
	* `101000` sub-error code
* `403` - forbidden - when the user does not have View WebApps Permission
* `404` - not found
	* `190001` - The web app could not be found (the webAppName param from the URL does not match)
