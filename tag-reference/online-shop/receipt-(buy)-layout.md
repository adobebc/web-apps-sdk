## Receipt (Buy) Layout

### Location
* **Admin Console:** Site Manager > Module Templates > Online Shop Layouts > Receipt - Buy > Select Country for the Domain of Purchase
* **SFTP & Develop Mode:** /layouts/onlineshop/order_receipt- *[country]* .html

### Tags

Tag | Description
-------------- | -------------
`{tag_amount}` | Amount paid
`{tag_authorizationcode}` | Authorization code as the payment gateway returned
`{tag_errormessage}` | Error message associated with the payment
`{tag_invoicenumber}` | Invoice number
`{tag_orderid}` | Internal ID associated with the purchase
`{tag_paymentstatus}` | Status of payment (for example, Success, Failed, or Pending)
