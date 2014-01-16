## Get folder content

Get the contents of a folder.

### Request

* **Method:** GET
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.
  * Note: When building apps always use relative request URLs. Do not use the "full" URL above because you might have problems running your app on a different site as the site_ID parameter will be different.
* **Path:** /api/v2/admin/sites/[siteId]/storage/[folderPath]?meta
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).
* **Required Permissions:** Can use SFTP & File Manager

### Response

Returns a storage entity object that contains the following properties:

* `type` : "folder" *(string)*
* `name` : name of the folder *(string)*
* `size` : will be 0 *(integer)*
* `lastModified`: can be null *(date)*
* `links` : an array of link objects *(array)*
* `rel -storage` : URL for the API endpoint to perform other operations on the file *(string)*
* `contents`: an array of storageEntitySummary objects with the following properties:
  * `type` : either "file" or "folder" *(string)*
	* `name` : file or folder name *(string)*
	* `links` : an array of link objects *(array)*
	* `rel -storage` : URL for the API endpoint to perform other operations on the file *(string)*

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET /api/v2/admin/sites/current/storage/images/?meta HTTPS/1.1
Accept: application/json
Authorization: c50f6e6be0d1481ca0d8eb0c63642fdd171c17846af04cdd95676a0888141f73
~~~

**Response:**
~~~
HTTP/1.1 200 OK
 
{
    "type": "folder",
    "name": "images",
    "size": 0,
    "lastModified": null,
    "links": [
        {
            "rel": "storage",
            "uri": "/api/v2/admin/sites/current/storage/images/"
        }
    ],
    "contents": [
        {
            "type": "folder",
            "name": "animals",
            "links": [
                {
                    "rel": "storage",
                    "uri": "/api/v2/admin/sites/current/storage/images/animals/"
                }
            ]
        },
        {
            "type": "file",
            "name": "cat.jpg",
            "links": [
                {
                    "rel": "storage",
                    "uri": "/api/v2/admin/sites/current/storage/images/cat.jpg"
                }
            ]
        }
    ]
}
~~~

### Error Codes

This method will return the following error codes:

* `200` - OK
* `400` - Bad request:
	* `104000` - Generic FileAPI error
	* `104002` - Operation is applicable to files, not folders
	* `104003` - Not enough privileges
	* `104004` - Invalid login multiple sites
	* `104009`- Path not found
	* `104014` - Name required
	* `104019` - Can't find folder
	* `104023` - Unauthorized access
	* `104028` - File or folder name too long
* `401`- when authentication token is incorrect
* `404` - the folder does not exist
