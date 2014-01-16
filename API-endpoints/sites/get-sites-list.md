## Get Sites List

Gets the list of site for the currently logged in user.

### Request

* **Method:** GET
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.
  * Note: When building apps always use relative request URLs. Do not use the "full" URL above because you might have problems running your app on a different site as the site_ID parameter will be different.
* **Path:** /api/v2/admin/sites
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).

#### Parameters ####

* Query:
	* `status` (optional) - indicates the combination of statuses that will be retrieved. It defaults to 101 (Paid, Free, TrialInProgress and GracePeriod). Note: The Delete and Disabled statuses are ignored
	* `id` (optional) - filter the list, showing only the summary specified by the id

### Response

SiteList object with the following properties:

* `Items` - an array of SiteSummary objects which have the following properties:
	* `Id` 
	* `Name`
	* `Links`
	* `SiteLinks`
	* `useAdvancedModuleDataEdit`
	* `siteStatus`
	* `billingMethodTypeId`
	* `createDate`

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
GET /api/v2/admin/sites HTTPS/1.1
Content-Type: application/json
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
 
 
{
"currentPage":1,
"items":
[
{
"id":42314,
"links":[{"rel":"self","uri":"https:\/\/api.localsecuresyd.worldsecuresystems.com\/api\/v2\/admin\/sites\/42314"},
{"rel":"photogalleries","uri":"https:\/\/api.localsecuresyd.worldsecuresystems.com\/api\/v2\/admin\/sites\/42314\/photogalleries"},
{"rel":"redirectRules","uri":"https:\/\/api.localsecuresyd.worldsecuresystems.com\/api\/v2\/admin\/sites\/42314\/redirect/rules"},
{"rel":"redirectSettings","uri":"https:\/\/api.localsecuresyd.worldsecuresystems.com\/api\/v2\/admin\/sites\/42314\/redirect/settings"}],
"name":"bcpremiumpartner"
},
{"id": ...,
"links": ...,
"name": ...
}
],
"itemsPerPageCount":100,
"links":[{"Rel":"previous","uri":null},{"rel":"next","uri":null}],
"totalItemsCount":12
}
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `401` - when authentication token is incorrect or missing
