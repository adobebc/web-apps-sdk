## Get Web App Custom Fields List

Returns a list of fields in ascending order.

**Note:** This operation does not support: pagination, filtering, or sorting parameters.  

### Request

* **Method:** GET
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/current/webapps/{webappName}/fields
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
* `dataSourceId` - for DataSource fields should be a valid webapp id *(integer)*
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
   "totalItems": 3,
   "skip": 0,
   "limit": 100,
   "links": [
      {
        "rel":"self",
        "uri":"https:\/\/bc-local.worldsecuresystems.com\/api\/v2\/admin\/sites\/325435\/webapps\/Cars\/fields"
      }
   ],
   "items": [{
      "links": [
         {
           "rel":"self",
           "uri":"https:\/\/bc-local.worldsecuresystems.com\/api\/v2\/admin\/sites\/325435\/webapps\/Cars\/fields\/418191"
         }
      ],
      "id"      : "418191",
      "name"    : "Part code",
      "type"    : "DataSource",
      "listItems": null,
      "dataSourceId": 324232,
      "required": false,
      "order"   : 1
   },{
      "links": [
         {
           "rel":"self",
           "uri":"https:\/\/bc-local.worldsecuresystems.com\/api\/v2\/admin\/sites\/325435\/webapps\/Cars\/fields\/418193"
         }
      ],
      "id"      : "418193",
      "name"    : "Part type",
      "type"    : "CheckBox_List",
      "listItems": ["Engine", "Body", "Electronics"],
      "dataSourceId": null,
      "required": false,
      "order"   : 2
   },{
      "links": [
         {
           "rel":"self",
           "uri":"https:\/\/bc-local.worldsecuresystems.com\/api\/v2\/admin\/sites\/325435\/webapps\/Cars\/fields\/418192"
         }
      ],
      "id"      : "418192",
      "name"    : "Photo",
      "type"    : "Picture",
      "listItems": null,
      "dataSourceId": null,
      "required": true,
      "order"  : 3
   }]
}
~~~
HTTP/1.1 201 OK
Location: https://api-[dub|nj|syd].worldsecuresystems.com/api/v2/admin/sites/-2/webapps/FirstWebAppFromApi
Content-Type: application/json; charset=utf-8
Content-Length: 0


### Notes 

* Creating a Web App does not allow passing in the custom fields. To add custom fields, use the Custom Fields API endpoint. Creating a Web App will create (or preserve) the default layouts (list, alternate, detail, edit)
* if passing a value for the uploadFolder parameter that does not exist on the file system, the system will attempt to create the folder, and its entire path. It reuses the mechanism used in the FileSystem APIs to create a folder, so the same exceptions get thrown. [(see Storage Api Spec)](#)
* Only the webapp Name parameter is mandatory. The rest have defaults, as follows:
	* templateId - -1
	* uploadFolder - -1
	* requiresApproval - true
	* allowFileUpload - false
	* customerCanAdd, customerCanDelete, customerCanEdit, anyoneCanEdit - false
	* requiresPayment - false
	* validDays - -1 (never expire)
	* roleId - 0
	* hasAddress - false
	* disableDetailPages - false
	* locationEnabled - false
* The webapp name must not be empty and can only contain valid characters, that can be later used on the file system and the API uris. The invalid characters are: / ? # % & * + \ | : ; . “ > <
If you pass in values for itemSystemFields and / or itemFields they will be ignored.

### Error Codes

This method will return the following error codes:

* `201/Created` - Web App successfully created
* `400/Bad request` - Invalid request. Sub-codes are:
	* `190000` - Generic error
	* `190002` - Invalid slug
	* `190003` - Slug URL too long
	* `190004` - slug already exists
	* `190005` - webapp with same name already exists
	* `190009` - invalid webapp name; see notes section below for list of invalid characters
	* `190010` - invalid template id
* `401` - unauthorized - when the Authorization header is not present, or contains an invalid site token
	* `101000` - sub-error code
* `403` - Forbidden : this is returned when the user trying to access the API does not have the proper permissions
* `404` - Not Found
	* `190001` - Not Found
