## List Web Apps

Get the list of web apps for the current site sorted by create date.

**Note:** This operation does not support: pagination, filtering, or sorting parameters.  

### Request

* **Method:** GET
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/current/webapps 
  * Alternatively use siteID instead of 'current'
* **Auth Header:** Site token required
* **Required Permissions:** Webapp View

### Response

An array of all webapps; each object has the following properties:



* `id` - the id of the webapp in the current site *(integer)*
* `name` - the name of the webapp *(string)*
* `slug` -  the SEO friendly slug generated for the webapp *(string)*
* `links` - a collection of uris are provided for discoverability. Each object contains links to: *(array)*
	* `self` - a quick way of getting to the webapp detail page (GetWebappDetails API url)
	* `items` - points to the sub-api that lists all webapp items for a webapp
	* `fields` - points to the api that allows management of the custom fields
	* `previewUrl` - link to see the webapp in the site front-end. Composed from the site default domain and the slug
	* `countries` - if location is enabled for the webapp, a link to get the list of countries allowed for location.


### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET /api/v2/admin/sites/-2/webapps HTTPS/1.1
Authorization: 14f87f21c5ea4830a06a6314a8aad82b45bc61dc08f24a0fb55599cea83ca811
Connection: keep-alive
Content-Type: application/json
~~~

**Response:**
~~~

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Encoding: gzip
Content-Length: length
 
{
  "links": [
      {
        "rel":"self",
        "uri":"https://mysite.worldsecuresystems.com/api\/v2\/admin\/sites\/-2\/webapps"
      }
  ],
  "items": [
    {
      "links": [
        {
          "rel":"self",
          "uri":"https://api-[dub|nj|syd].worldsecuresystems.com/api/v2/admin/sites/-2/webapps/BC%20Friends"
        },
        {
          "rel":"items",
          "uri":"https://api-[dub|nj|syd].worldsecuresystems.com/api/v2/admin/sites/-2/webapps/BC%20Friends/items"
        },
        {
          "rel":"fields",
          "uri":"https://api-[dub|nj|syd].worldsecuresystems.com/api/v2/admin/sites/-2/webapps/BC%20Friends/fields"
        },
        {
          "rel":"previewUrl",
          "uri":"http://defaultsiteurl.com/bc-friends"
        },
        {
          "rel":"countries",
          "uri":"https://api-[dub|nj|syd].worldsecuresystems.com/api/v2/admin/sites/-2/webapps/BC%20Friends/countries"
        }
 
      ],
 
      "id":346,
      "name":"BC Friends",
      "slug":"bc-friends"
    },
    {
      "links": [
        {
          "rel":"self",
          "uri":"https://api-[dub|nj|syd].worldsecuresystems.com/api/v2/admin/sites/-2/webapps/BC%20Help"
        },
        {
          "rel":"countries",
          "uri":"https://api-[dub|nj|syd].worldsecuresystems.com/api/v2/admin/sites/-2/webapps/BC%20Friends/countries"
        }
      ],
 
      "id":356,
      "name":"BC Help",
      "slug":"bc-help"
    }
  ],
  "totalItems":19,
  "skip":0,
  "limit":0
}
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `401` - unauthorized - when the Authorization header is not present, or contains an invalid site token
	* `101000` - sub-error code
* `403` - forbidden : this is returned when the user trying to access the API does not have the proper permissions
