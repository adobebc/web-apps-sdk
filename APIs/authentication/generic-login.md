## Generic Login

Performs a generic login. The token validity can be set to Short (4 hours validity) or Long (2 weeks validity).

### Request

* **Method:** POST
* **Server:** https://api.worldsecuresystems.com/
* **Path:** /api/v1/admin/tokens

Credentials object with the following parameters:

Parameter | Type | Description
-------------- | ------------- | -------------
`username` | String |  Username (email address) of account, eg. `johnsmith@example.com`
`password` | String | Password for specified account, eg. `password`
`tokenExpiryPeriod` | Enum | Desired token validity eg. `short` or `long`(default) *Optional* 

### Response

An authToken object with the following properties:

Property | Type | Description
-------------- | ------------- | -------------
`token` | String |  Generic authentication token

### Examples

Accepts both JSON and XML requests, based on Content-Type.

#### JSON

**Request:**
~~~
POST /api/v1/admin/tokens HTTPS/1.1
Content-Length: 57
Connection: keep-alive
Content-Type: application/json
 
{"username": "johnsmith@example.com", "password": "password"}
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: length
 
{"token":"42ab136d77ce4e57a931db9e3299c2c82db5b406ad034bcb924e73fe894fcfb1"}
~~~

#### XML

**Request:**
~~~
POST /api/v1/admin/tokens HTTPS/1.1
Content-Length: 153
Connection: keep-alive
Content-Type: application/xml
 
<credentials xmlns="http://ns.adobe.com/bc/api/v1"><username>johnsmith@example.com</username><password>password/password></credentials>
~~~

**Response:**
~~~
HTTP/1.1 200 OK
Content-Type: application/xml; charset=utf-8
Content-Length: length
 
<authToken xmlns="http://ns.adobe.com/bc/api/v1" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"
  <token>c50f6e6be0d1481ca0d8eb0c63642fdd171c17846af04cdd95676a0888141f73</token>
</authToken>
~~~

### Error Codes

This method will return the following error codes:

* `200` - Success
* `400` - Bad request, when username/password are empty or Expiry period value is not equal to `short` or `long`
* `401` - Unauthorized, when username/password are incorrect
  * `107003` - Terms of Use not signed. Includes links to TOU that need to be signed:
    * `rel` - partnerTou
    * `uri` - https://api.worldsecuresystems.com/api/v1/admin/tou/partner
