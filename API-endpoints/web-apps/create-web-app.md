## Create Web App

Create a new Web App

### Request

* **Method:** POST
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/current/webapps 
  * Alternatively use siteID instead of 'current'
* **Auth Header:** Site token required
* **Required Permissions:** Create Web Apps

#### Parameters ####

* `name` - required *(string)*
* `allowFileUpload` - . Defaults to false *(boolean, optional)*
* `uploadFolder` - required only if allowFileUpload is True. Must be a valid absolute path in the site, created in advance *(string)*
* `disableDetailPages`- *(boolean, optional)*
* `locationEnabled` - *(boolean, optional)*
* `anyoneCanEdit` - *(boolean, optional)*
* `customerCanAdd` - *(boolean, optional)*
* `customerCanEdit` - *(boolean, optional)*
* `customerCanDelete` - *(boolean, optional)*
* `requiresPayment` - *(boolean, optional)*
* `requiresApproval` - *(boolean, optional)*
* `roleId` - optional, defaults to -1 *(integer)*
* `templateId` - optional, defaults to -1 *(integer)*
* `validDays` - optional, defaults to -1 (never expire) *(integer)*

### Response

Returns an empty body and a location header containing the URI to retrieve category details.

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
POST /api/v2/admin/sites/current/webapps HTTPS/1.1
Content-Length: 57
Connection: keep-alive
Content-Type: application/json
 
{"name": "FirstWebAppFromApi"}

~~~

**Response:**
~~~
HTTP/1.1 201 OK
Location: https://api-[dub|nj|syd].worldsecuresystems.com/api/v2/admin/sites/-2/webapps/FirstWebAppFromApi
Content-Type: application/json; charset=utf-8
Content-Length: 0
~~~

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
