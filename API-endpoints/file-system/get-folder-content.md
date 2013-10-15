## Get folder content

Get the contents of a folder.

### Request

* **Method:** GET
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com/
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/[siteId]/storage/[folderPath]?meta
* **Auth Header:** Site token required
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
GET https://api.worldsecuresystems.com/api/v2/admin/sites/123/storage/images/?meta HTTPS/1.1
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
            "uri": "https://api.worldsecuresystems.com/api/v2/admin/sites/123/storage/images/"
        }
    ],
    "contents": [
        {
            "type": "folder",
            "name": "animals",
            "links": [
                {
                    "rel": "storage",
                    "uri": "https://api.worldsecuresystems.com/api/v2/admin/sites/123/storage/images/animals/"
                }
            ]
        },
        {
            "type": "file",
            "name": "cat.jpg",
            "links": [
                {
                    "rel": "storage",
                    "uri": "https://api.worldsecuresystems.com/api/v2/admin/sites/123/storage/images/cat.jpg"
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
