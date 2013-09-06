## Get Web App Item List

Gets a list of Web App items, as per the specified filters. 

### Request

* **Method:** GET
* **Server:** https://api-[dub|nj|syd].worldsecuresystems.com
	* Alternatively, use secure site URI (eg. https://mysite.worldsecuresystems.com)
* **Path:** /api/v2/admin/sites/[siteID]/webapps/[webAppName]/items
	* Alternatively use "current" in place of siteId for current login token's site
* **Auth Header:** Site token required
* **Required Permissions:** View Web App

#### Filters

A query string (eg. ?order=ascending) with the following properties:

* `order` - allows sorting bit a single system field, either "ascending" or "descending" *(string, optional)* (see the [Ordering Syntax](#ordering-syntax) section)
* `where` - filter by a single system field *(string, optional)* (see the [Filtering syntax](#filtering-syntax) section)
* `skip` - how many items to skip from the returned result. *(integer, optional)*
* `limit` - how many items to return *(integer, optional)*

### Response

A WebAppItemList object with the following properties:

* `links` - contains a collection of links *(array)*
	* `self` - the API URL that returned this result
	* `previous` - the API URL that will return the previous page of results, if any
	* `next` - the API URL that will return the next page of results, if any
* `items` - an array of WebAppItemSummary objects with the following properties *(array)*
	* `links` - contains a collection of links *(array)*
		* `self` - the API URL that will return the full details of this Web App item *(string)*
	* `id` - the ID of the Web App item *(integer)*
	* `name` - the name of the Web App item *(string)*
	* `releaseDate` - the release date of the Web App item, in the format mm/dd/yyyy *(string)*
	* `expiryDate` - the date the Web App will expire, in the format mm/dd/yyyy *(string)*
	* `createDate` - the date the Web App was created, in the format mm/dd/yyyy *(string)*
	* `lastUpdateDate` - the date the Web App item was last updated, in the format mm/dd/yyyy *(string)*
	* `enabled` - whether the Web App item is enabled or disabled *(boolean)*
* `totalitems` - the number of Web App items that match the specified filter *(integer)*
* `skip` - the number of Web App items skipped in this response *(integer)*
* `limit` - the number of Web App items returned in this response *(integer)*

### Examples

Accepts and returns JSON as Content-Type.

#### JSON

**Request:**
~~~
GET /api/v2/admin/sites/123/webapps/TestWebapp1/items?skip=2&limit=2 HTTPS/1.1
Authorization: 3e8d891d91eb433e9c800cebe3b132a4e64ac661c5ed4dd8bdecae0487e4ad7c
Accept: application/json
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: {length}
 
{
  "links": [
    {
      "rel": "self",
      "uri": "https://mysite.worldsecuresystems.com/api/v2/admin/sites/38584/webapps/TestWebapp1/items?skip=2&limit=2"
    },
    {
      "rel": "previous",
      "uri": "https://mysite.worldsecuresystems.com/api/v2/admin/sites/38584/webapps/TestWebapp1/items?skip=0&limit=2"
    },
    {
      "rel": "next",
      "uri": "https://mysite.worldsecuresystems.com/api/v2/admin/sites/38584/webapps/TestWebapp1/items?skip=4&limit=2"
    }
  ],
  "items": [
    {
      "links": [
        {
          "rel": "self",
          "uri": "https://mysite.worldsecuresystems.com/api/v2/admin/sites/38584/webapps/TestWebapp1/items/1073041"
        }
      ],
      "id": 1073041,
      "name": "item3",
      "weight": null,
      "releaseDate": "2013-06-30",
      "expiryDate": "9999-01-01",
      "createDate": "2013-06-30",
      "lastUpdateDate": "2013-06-30",
      "enabled": true
    },
    {
      "links": [
        {
          "rel": "self",
          "uri": "https://mysite.worldsecuresystems.com/api/v2/admin/sites/38584/webapps/TestWebapp1/items/1073042"
        },
        {
          "rel": "previewUrl",
          "uri": "http://www.test1.com/testwebapp1/item4"
        }
      ],
      "id": 1073042,
      "name": "item4",
      "weight": null,
      "releaseDate": "2013-06-30",
      "expiryDate": "9999-01-01",
      "createDate": "2013-06-30",
      "lastUpdateDate": "2013-06-30",
      "enabled": true
    },
  ],
  "totalItemsCount": 7,
  "skip": 2,
  "limit": 2
}
~~~

### Error Codes

This method will return the following error codes:

* `200` - success
* `400` - bad request
	* `190001` - the Web App could not be found (the webAppName parameter from the URL does not match any record)
	* `200000` - an unspecified error has occurred
	* `200007` - there is a problem with the query, eg. invalid format, invalid field name, invalid operator, etc.
	* `200009` - the category path specified in the query doesn't exist
* `401` - unauthorized - when the Authorization header is not present, or contains an invalid site token
	* `101000` - sub-error code
* `403` - forbidden - this is returned when the user trying to access the API does not have the proper permissions


### Filtering Syntax

Filtering is supported by constraining at most one item field. Only the specified system fields and the item's category set can be used for filtering.

The list of supported system fields is:

* Id
* Name
* Weight
* ReleaseDate
* ExpiryDate
* CreateDate
* LastUpdateDate
* Enabled

The filtering syntax involves specifying a list of constraints, logically chained using the AND operator which must apply to the one field specified. The constraints are built using the following operators:

| operator | name | example | applicable type |
|:--------:|:----:|---------|:---------------:|
| N/A | equals (==) | `where={"name" : "item-name"}` | all |
| $ne | not equal (\!=) | `where={"id": {"$ne": 42}}` | all |
| $lt | less than (<) | `where={"weight" : {"$lt": 3}}` | all |
| $lte | less than or equal (<=) | `where={"name" : {"$lte": "omega"}}` | all |
| $gt | greater than (>) | `where={"releaseDate" : {"$gt": "jun 10 2012"}}` | all |
| $gte | greater than or equal (>=) | `where={"name" : {"$gte": "alpha"}}` | all |
| $contains | contains | `where={"name": {"$contains": "delta"}}` | string-only |
| $beginsWith | begins with | `where={"name": {"$beginsWith": "prefix"}}` | string-only |

#### Important Notes

* Multiple constraints can be chained, and the chaining operator is AND. We do not support OR-queries

    ```
    where={"name": {"$gt": "alpha", "$lt": "omega", "$contains":"foo"}}
    ```
* Equality has no dedicated operator and it cannot be chained together with other constraints. The only way to specify that something must equal a value is like so:

    ```
    where={"name": "epsilon"}
    ```
* To check that an item is labeled with a certain category the following syntax must be used:

    ```
    where={"category": "/my/category/path"}
    ```
* The category is specified as a category-path string or by providing the category's numeric id. The path should start with a `/`. If it does not, the `/` will be added automatically to the category string. The following is equivalent to the previous example:

    ```
    where={"category": "my/category/path"}
    ```
* Field names, and the `category` label are case-insensitive
* null-values will returns false for every comparison except equality and `$ne` operator. These two operators can be used to filter out the items that have missing values for certain fields

    ```
    where={"weight": null}
    where={"weight": {"$ne": null}}        
    ```

#### Examples

* Filtering by name

    ```
    GET /api/v2/admin/sites/123/webapps/TestWebapp1/items?where={"name": {"$contains": "item"}}
    ```
* Filtering by date

    ```
    GET /api/v2/admin/sites/123/webapps/TestWebapp1/items?where={"createDate": {"$gte": "2001-01-01", "$lte": "2013-01-01"}}
    ```
* Filtering by category id

    ```
    GET /api/v2/admin/sites/123/webapps/TestWebapp1/items?where={"category": 123}
    ```
    
* Filtering by category path

    ```
    GET /api/v2/admin/sites/123/webapps/TestWebapp1/items?where={"category": "my-label"}
    ```




    
### Ordering Syntax

The `order` query parameter specifies which field will be used to order the results of the query. Only the following system fields can be used to order the results:

* Id
* Name
* Weight
* ReleaseDate
* ExpiryDate
* CreateDate
* LastUpdateDate
* Enabled

To order the results in ascending order, just provide the system field name. If the results are to be sorted in descending order prefix the system field name with a `-` (dash).

If no ordering is specified the items will be order by `name` ascending.

When sorting the items using a specified field, in case of ties due to equal values for that field, items will be further sorted by `name`.

#### Examples

* Sorting ascending by name
    
    ```
    GET /api/v2/admin/sites/123/webapps/TestWebapp1/items?order=name
    ```
* Sorting descending by name

    ```
    GET /api/v2/admin/sites/123/webapps/TestWebapp1/items?order=-name
    ```

