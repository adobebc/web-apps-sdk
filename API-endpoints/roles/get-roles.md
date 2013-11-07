## Get Roles

Gets a list of roles available on a specified site.

### Request

* **Method:** GET
* **Server:** https://mysite.worldsecuresystems.com/ (the secure site URI)
  * Note: For Open Admin applications, always use relative request URLs
* **Path:** /api/v2/admin/sites/[siteId]/roles
 * Alternatively, use 'current' instead of siteId
* **Auth Header:** Site token required
* **Required Permissions:** Administer System

### Response

Returns a list of site role objects, with the below fields:

* `id` - the role id in the database *(integer)*
* `name` - the user friendly name, to be used as label *(string)*

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET /api/v2/admin/sites/42309/roles HTTPS/1.1
Connection: keep-alive
Content-Type: application/json
Authorization: {site_authorization_token}
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: length
 
{
    "CurrentPage":1,
    "Items":[
        "Role":
        {
            "Id": 10000,
            "Name": "Admin"
        },
        "Role":
        {
            "Id": 10013,
            "Name": "Users"
        }
    ],
    "ItemsPerPageCount":100,
    "Links":[
        {
            "Rel":"previous",
            "Uri":null
        },
        {
            "Rel":"next",
            "Uri":null
        }
    ],
    "TotalItemsCount":2
}
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `401` - when authentication token is incorrect
* `403` - when the user attempting the call does not have the proper permissions
