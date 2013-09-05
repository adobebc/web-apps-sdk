## Customer Order List Layout

### Location
* **Admin Console:** Site Manager > Module Templates > Customer Order Layouts > List Layout
* **SFTP & Develop Mode:** /layouts/customerorders/list.html

### Tags

Tag | Description
-------------- | -------------
`{tag_amountoutstanding}` | Amount outstanding on invoice
`{tag_amountoutstandingactual}` | Amount of invoice outstanding, only taking into account successful payments (pending payments excluded)
`{tag_amountpaid}` | Amount already paid on invoice
`{tag_amountpaidactual}` | Amount of invoice paid with a successful payment (pending payments excluded)
`{tag_assignedto}` | Name of the person whom the order is assigned to
`{tag_awbnumber}` | Tracking number from shipping provider(also known as AWB number). You can edit this information for each order
`{tag_createdate}` | Create date of the order
`{tag_invoicedate}` | Date of Invoice
`{tag_invoicenumber}` | Invoice Number
`{tag_invoicetotal}` | Total invoice amount
`{tag_invoicetotaltaxamount}` | Total tax associated with order (product tax + shipping tax)
`{tag_lastupdatedate}` | Last update date of the order
`{tag_orderid}` | Order ID (can use this value to search for order via Customer section)
`{tag_ordername}` | Name of order
`{tag_ordertype}` | Type of the order; for example, Invoice or Quote
`{tag_ownername}` | Name of the person who owns the order
`{tag_productextension}` | Three-letter extension of the file if an e-Product; for example, PDF. Use to render out relevant icon for e-Product (applies to flat listing only; for example, `{module_order,a,,flat}`)
`{tag_productid}` | Displays the internal ID of the product in the order (applies to flat listing only; for example, `{module_order,a,,flat}`)
`{tag_productname}` | Displays the name of the product in the order (applies to flat listing only; for example, `{module_order,a,,flat}`). Provides a link to download product if e-Product.
`{tag_shippinginstructions}` | Any specific shipping instructions that accompany the order
`{tag_status}` | Stats of the order
`{tag_trackingurl,Your Text}` | URL of the shipper to track shipments. You can edit this information for each order
`{tag_workflow}` | Workflow name assigned to order
