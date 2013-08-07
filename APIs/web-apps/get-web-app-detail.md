## Get Web App Detail

Get the details for a specific Web App.

### Request

* **Method:** GET
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com
  * Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/current/webapps/[NAME]
	* Alternatively use siteID instead of 'current'
* **Auth Header:** Site token required
* **Required Permissions:** Webapp View

#### Parameters

Use the name of the webapp as part of the URL (see **Path**)

### Response

A webapp object with the following properties:

* `id` - the id of the webapp in the current site *(integer)*
* `name` - the name of the webapp *(string)*
* `slug` -  the SEO friendly slug generated for the webapp *(string)*
* `allowFileUpload` - permits or denies file uploads to take place when saving a webapp item *(boolean)*
* `createBy` -  the ID of the user that created the webapp. Details can be retrieved using the Admin Users API *(integer)*
* `createDate` - the date when the web app was created; uses the format mm/dd/yyyy *(string)*
* `lastUpdateBy` - the ID of the user that created the webapp. Details can be retrieved using the Admin Users API *(integer)*
* `lastUpdateDate` - the date when the web app item was created; uses the format mm/dd/yyyy *(string)*
* `disableDetailPages` - if True the Web App items detail page will not be accessible. The detail page will also be excluded from the site search feature built into this system as well as from the sitemap.xml file submitted to the major search engines such as Google, Yahoo and Live. *(boolean)*
* `locationEnabled` - use location for items *(boolean)*
* `anyoneCanEdit` - allow anyone to edit the items, not only the owner *(boolean)*
* `customerCanAdd` - users can add items in front-end *(boolean)*
* `customerCanEdit` - users can edit their own items *(boolean)*
* `customerCanDelete` - users can delete their own items *(boolean)*
* `requiresPayment` - users must pay to view this item *(boolean)*
* `requiresApproval` - items must be approved prior to becoming visible in the frontend *(boolean)*
* `roleId` -  the id of the role assigned to the webapp *(integer)*
* `templateId` -  the id of the template for the webapp *(integer)*
* `validDays` -  how many days will the item remain visible. Default value is -1, which means never expire *(integer)*
* `uploadFolder` - path to the folder where files associated with items get uploaded to *(string)*
* `systemFields` -  the id of the role assigned to the webapp *(array)*
	* `name` - name of the webapp item *(string)*
	* `description` - the content in the webapp item *(string)*
	* `weight` - the weight of the item; determines order of display *(integer)*
	* `releaseDate` - the release date of the web app item; uses the format mm/dd/yyyy *(string)*
	* `expiryDate` - the date when the web app item will expire; uses the format mm/dd/yyyy *(string)*
	* `createDate` - the date when the web app item was created; uses the format mm/dd/yyyy *(string)*
	* `lastUpdateDate` - the date when the webapp item was last updated; uses the format mm/dd/yyyy *(string)*
	* `enabled` - indicates whether this web app item is enabled or disabled *(boolean)*
	* `roleId` - id of the role assigned; inherits from the webapp *(integer)*
	* `createBy` - id of the user that created the webapp item *(integer)*
	* `submittedBy` -  id of the user that submitted the webapp item (can be different, but the default is to equal the createBy) *(integer)*
	* `address` - optional, only when enableLocation is True, stores the address associated with the item *(string)*
	* `city` - optional, only when enableLocation is True, stores the city associated with the item *(string)*
	* `state` - optional, only when enableLocation is True, stores the state associated with the item *(string)*
	* `zipcode` - optional, only when enableLocation is True, stores the zipcode associated with the item; client-side validation for the zipcode format is recommended *(string)*
	* `country` - optional, only when enableLocation is True, stores the country associated with the item *(string)*
* `fields` - a collection of all custom fields associated with the webapp. Added to the webapp object as shorthand for following the rel='fields' link mentioned below *(array)*
* `links` - a collection of uris are provided for discoverability. Each object contains links to: *(array)*
	* `self` - a quick way of getting to the webapp detail page
	* `items`- points to the sub-api that lists all webapp items for a webapp
	* `fields`- points to the api that allows management of the custom fields
	* `previewUrl` - link to see the webapp in the site front-end. Composed from the site default domain and the slug
	* `countries` - link to get the list of countries allowed for location, if location is enabled for the webapp



### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET /api/v2/admin/sites/-2/webapps/testcustomfields HTTPS/1.1
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
  "links":
    [
      {
        "rel":"self",
        "uri":"https://api-[dub|nj|syd].worldsecuresystems.com/api/v2/admin/sites/-2/webapps/testcustomfields"
      },
      {
        "rel":"items",
        "uri":"https://api-[dub|nj|syd].worldsecuresystems.com/api/v2/admin/sites/-2/webapps/testcustomfields/items"
      },
      {
        "rel":"fields",
        "uri":"https://api-[dub|nj|syd].worldsecuresystems.com/api/v2/admin/sites/-2/webapps/testcustomfields/fields"
      },
      {
        "rel":"previewUrl",
        "uri":"http://defaultsiteurl.com/testcustomfields"
      },
      {
        "rel":"countries",
        "uri":"https://api-[dub|nj|syd].worldsecuresystems.com/api/v2/admin/sites/-2/webapps/testcustomfields/countries"
      }
    ],
  "id":5564,
  "name":"testcustomfields",
  "slug":"testcustomfields",
  "allowFileUpload":false,
  "createBy":167,
  "createDate":"31/01/2012",
  "lastUpdateBy":167,
  "lastUpdateDate":"31/01/2012",
  "disableDetailPages":false,
  "locationEnabled":false,
  "anyoneCanEdit":false,
  "customerCanAdd":false,
  "customerCanDelete":false,
  "customerCanEdit":false,
  "requiresPayment":false,
  "requiresApproval":true,
  "roleId":0,
  "templateId":-1,
  "validDays":0,
  "uploadFolder":null,
  "fields":
    [
      {
        "name":"asdads",
        "type":"DropDown_List",
        "id":130930,
        "order":1,
        "required":false,
        "listItems":
              [
                "test",
                "item2",
                "item3"
              ],
         "dataSourceId": null
          }
      }
    ],
  "systemFields":
    [
      {
        "name":"name",
        "type":"String",
        "required":true
      },
      {
        "name":"weight",
        "type":"Number",
        "required":false
      },
      {
        "name":"description",
        "type":"String",
        "required":false
      },
      {
        "name":"releaseDate",
        "type":"DateTime",
        "required":false
      },
      {
        "name":"expiryDate",
        "type":"DateTime",
        "required":false
      },
      {
        "name":"createDate",
        "type":"DateTime",
        "required":false
      },
      {
        "name":"lastUpdateDate",
        "type":"DateTime",
        "required":false
      },
      {
        "name":"enabled",
        "type":"Boolean",
        "required":false
      },
      {
        "name":"urlSuffix",
        "type":"String",
        "required":false
      },
      {
        "name":"roleId",
        "type":"Number",
        "required":false
      },
      {
        "name":"createBy",
        "type":"Number",
        "required":false
      },
      {
        "name":"submittedBy",
        "type":"Number",
        "required":false
      },
      {
        "name":"address",
        "type":"String",
        "required":false
      },
      {
        "name":"city",
        "type":"String",
        "required":false
      },
      {
        "name":"state",
        "type":"String",
        "required":false
      },
      {
        "name":"zipCode",
        "type":"String",
        "required":false
      },
      {
        "name":"country",
        "type":"String",
        "required":false
      }
    ]
  }
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `401` - unauthorized - when the Authorization header is not present, or contains an invalid site token
	* `101000` - sub-error code
* `403` - forbidden : this is returned when the user trying to access the API does not have the proper permissions
* `404` - if trying to access a webapp that does not exist
