## Get file info

Get information on a file.

### Request

* **Method:** GET
* **Server:**  https://[app key here]-[site_ID here]-apps.worldsecuresystems.com. Take a look at the [OAuth in Business Catalyst](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html) document for more info on how this URL is formed.
  * Note: When building apps always use relative request URLs. Do not use the "full" URL above because you might have problems running your app on a different site as the site_ID parameter will be different.
* **Path:** /api/v2/admin/sites/[siteId]/storage/[filePath]?meta
* **Authorization header:** This should contain the authorization token. Here is how to [obtain the token](http://developers.businesscatalyst.com/developer-documentation/oauth-in-bc.html).
* **Required Permissions:** Can use SFTP & File Manager

### Response

Returns a storage entity object that contains the following properties:

* `type` : "file" *(string)*
* `name` : name of the file *(string)*
* `size` : size of the file *(integer)*
* `lastModified`: last modified date, can be null *(date)*
* `links` : an array of link objects *(array)*
* `rel -storage` : URL for the API endpoint to perform other operations on the file *(string)*

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET /api/v2/admin/sites/current/storage/images/cat.jpg?meta HTTPS/1.1
Accept: application/json
Authorization: c50f6e6be0d1481ca0d8eb0c63642fdd171c17846af04cdd95676a0888141f73
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/json
 
{
    "type": "file",
    "name": "cat.jpg",
    "size": 1024,
    "lastModified": "Mon, 26 Jul 2010 12:45:26 GMT",
    "links": [
        {
            "rel": "storage",
            "uri": "/api/v2/admin/sites/current/storage/images/cat.jpg"
        }
    ]
}
~~~

### Sample code

Below is some sample code using the bcapi.js SDK. For more information, see [Interacting with APIs using the bcapi.js SDK](http://adobebc.github.io/bcapi.js/)

**Get file metadata**

~~~
var f = BCAPI.Models.FileSystem.Root.file('hello_world.txt');
f.fetch().done(function() {
    console.log('File name is: ', f.get('name'));
    console.log('Last update date is: ', f.get('lastModified'));
});
~~~

***

**Get folder metadata**

You use `fetch` to obtain the folder's details, including the files & folders that the folder contains:

~~~
var folder = new BCAPI.Models.FileSystem.Folder('/my/existing/folder');
folder.fetch().done(function() {
    console.log('Folder last update date is: ' + folder.get('lastModified'));
    console.log('Printing the folder contents: ');
    var contents = folder.get('contents');
    for (var i = 0; i < contents.length; i++) {
        var entity = contents[i];
        var isFile = entity instanceof BCAPI.Models.FileSystem.File;
        // also works: var isFile = entity.get('type') === 'file';
        if (isFile) {
            console.log('File ' + file.get('name') + ' updated at ' + file.get('lastModified'));
        } else {
            console.log('Folder ' + folder.get('name'));
        }
    }
});
~~~

### Error Codes

This method will return the following error codes:

* `200` - OK
* `400` - Bad request:
  * `104000` - Generic FileAPI error
	* `104001` - File not found
	* `104002` - Not a file
	* `104003` - Not enough privileges
	* `104004` - Invalid login multiple sites
	* `104009`- Path not found
	* `104014` - Name required
	* `104023` - Unauthorized access
	* `104028` - File or folder name too long
* `401`- when authentication token is incorrect
* `404` - the folder does not exist
