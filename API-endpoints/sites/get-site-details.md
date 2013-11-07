## Get Site Details

Gets the details of a site.

### Request

* **Method:** GET
* **Server:** https://mysite.worldsecuresystems.com/ (the secure site URI)
  * Note: For Open Admin applications, always use relative request URLs
* **Path:** /api/v2/admin/sites/[siteId]
	* Alternatively, use 'current' instead of siteId
* **Auth Header:** Site token required

### Response

site object with the following properties:

* `id` - *(integer)*
* `name` - *(string)*
* `links`
	* rel "self" - this link was designed to be used only for retrieving detailed information about the site, and should not be used to manually build other links from it. This is because, as the BC system is designed right now, the site detailed info available at "self" link is stored only on Master DC, and therefore you’ll always get a link to http://api-apac.worldsecuresystems.com in the self link for all sites in BC. This may change in the future though, so do not build any logic around the fact that self always pints to master, or http://api-apac.worldsecuresystems.com
	* rel "photogalleries" - this link provides the URL where photogalleries-specific operations should be made, for the current site
	* rel "siteLogin" - this link provides the URL where site authentication should be made, for the current site
	* rel "create" - link to be used in case a new Site entity needs to be created
	* rel "storage" - this link provides the URL where storage-specific operations should be made (file upload, remove files, etc), for the current site
	* rel "siteUsers" - this link provides the URL where user-specific operations should be made; this is only used to manage users for the current site
* `siteLinks`
	* rel "systemUrl" - denotes the system url of this site, like http://mysite.businesscatalyst.com
	* rel "secureUrl" - denotes the secure url of this site, like https://mysite.worldsecuresystems.com
* `dataCenterId` - *(integer)*
* `daysToExpiry` - *(integer)*
* `displayExpiryWarning` - *(boolean)*
* `pathWithTags` - *(string)*
* `pathWithoutTags` - *(string)*
* `siteStatus` - *(integer)*
* `siteStatusDescription` - *(string)*
* `canExtendExpiryDate` - *(boolean)*
* `readyToGoLive` - *(boolean)*
* `isPartnerSite` - *(boolean)*
* `useAdvancedModuleDataEdit` - Flag used to turn off any client (Dreamweaver) functionality to pass current selection as query param to /Utilities/EditModuleData.aspx. If set to false, client should send only module token (i.e. module_product) without any other parameters.

#### Available Site Status codes ####


| Status          | Code (hexa)   | Code (decimal) |
| -------------   |:-------------:| --------------:|
| Unknown         | 0x00		  | 0              |
| TrialInProgress | 0x01		  | 1              |
| TrialExpired	  | 0x02		  | 2              |
| GracePeriod     | 0x04		  | 4              |
| Deleted         | 0x08		  | 8              |
| Disabled        | 0x10		  | 16             |
| Paid			  | 0x20		  | 32             |
| Free			  | 0x40		  | 64             |

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET /api/v2/admin/sites/42314 HTTPS/1.1
Content-Type: application/json
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
 
 
{
"id":42314,
"name":"bcpremiumpartner",
"links":[{"rel":"self","uri":"https:\/\/api.worldsecuresystems.com\/api\/v2\/admin\/sites\/42314"}, ...],
"dataCenterId":1,
"daysToExpiry":2918070,
"displayExpiryWarning":false,
"readyToGoLive":false,
"pathWithTags":["\/Layouts\/"],
"pathWithoutTags":["\/Layouts\/SystemMessages\/"],
"siteStatus":1,
"siteStatusDescription":"TrialInProgress",
"canExtendExpiryDate":false
}
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `400` - bad request
	* `100002` sub error code - the site id is not found. It either doesn't exist in the system, or the current user doesn't belong it that site.
	* `109001` sub error code - not enough privileges (user is not a partner/partner of the site when he attempts to set ReadyToGoLive)
	* `103001` sub error code - cannot extend trial site validity
	* `103004` sub error code - invalid extension period
* `401` - when authentication token is incorrect or missing
* `500` - Internal server error
