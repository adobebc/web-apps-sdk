## Shopping Cart Layout

### Location
* **Admin Console:** Site Manager > Module Templates > Online Shop Layouts > Individual Catalog > Select Country for the Domain of Purchase
* **SFTP & Develop Mode:** /layouts/onlineshop/shopping_cart- *[country]* .html

### Tags

Tag | Description
-------------- | -------------
`{tag_buybutton,Text or Image,true}` | Link to check out and purchase products in cart (Text or Image allow you to render your own text or to use image instead). True is validation function that checks to make sure that every order has a valid shipping charge before the customer is able to pay and finalize the order.
`{tag_cataloguebreadcrumbs}` | Catalog breadcrumbs help customers easily navigate between related catalogs
`{tag_clearcartbutton}` | Link to clear the cart (customize to use image instead)
`{tag_custom1}` | Custom field #1. Use to display any information about a product
`{tag_custom2}` | Custom field #2. Use to display any information about a product
`{tag_custom3}` | Custom field #3. Use to display any information about a product
`{tag_custom4}` | Custom field #4. Use to display any information about a product
`{tag_discountcode}` | An input box for customers to enter discount code in
`{tag_getquotebutton}` | Link to check out and request a quote (customize to use image instead)
`{tag_giftvoucher}` | An input box for customer to enter gift voucher code in
`{tag_giftvoucheramount}` | Total amount of credit applied to this order as a result of a gift voucher
`{tag_invoicediscountamount}` | Total discount amount based on the discount code entered (shipping price is not discounted)
`{tag_invoicetotal}` | Total cost of the current cart (factoring in all costs and discounts)
`{tag_invoicetotalextaxamount}` | Invoice total amount excluding tax (products ex tax + shipping ex tax)
`{tag_orderid}` | Order ID normally assigned to quotes. Can search on this value via Customer section
`{tag_productcode}` | Product code of the product in the cart
`{tag_productdescription}` | Product description captured from the "Instructions" box or "Product Attributes"
`{tag_producteditorcontent}` | Product description as it appears in the WYSIWYG editor
`{tag_productextaxamount}` | Price of each product excluding tax in the cart
`{tag_productgrandtotal}` | Total price of all products including tax in the cart
`{tag_productimage}` | Small image of the product
`{tag_productinctaxamount}` | Price of each product including tax in the cart
`{tag_productname_nolink}` | Product name already in the cart without a link back to the product
`{tag_productname}` | List of product names in the cart
`{tag_productquantity}` | Number of units of each product in the cart
`{tag_productremovelink}` | Link to remove product from the cart
`{tag_productsubtotal}` | Total price of all products excluding tax in the cart
`{tag_producttaxamount}` | Amount of tax for each product in the cart
`{tag_producttaxpercentage}` | For example, `{tag_producttaxpercentage,percentage}` where customer can supply the percentage in the tag, like 10% for OZ or 12.5% for Europe and the system gets the percentage of the amount and display it.
`{tag_producttaxrate}` | Tax rate associated with each product in the cart
`{tag_producttaxtotal}` | Total tax amount for all products in the cart
`{tag_producttotal}` | Total price of each product in the cart (units x unit price inc tax)
`{tag_producttotalextax}` | Total amount for product excluding tax (Product x Quantity)
`{tag_shippingextaxamount}` | Price of shipping option chosen excluding tax
`{tag_shippingoptions,X,Y,Z}` | List of shipping options. Set X to true to enable state tax. Set Y to true to enable state tax regardless of customer country (otherwise only for customers in your country). Set Z to 2-letter country code to limit shipping country; for example, US for United States.
`{tag_shippingtaxamount}` | Amount of tax associated with the shipping option chosen
`{tag_shippingtaxrate}` | Tax rate associated with the shipping option chosen
`{tag_shippingtotal}` | Total cost of the shipping option chosen (shipping ex tax + shipping tax)
`{tag_totaltaxpercentage,percentage, calculateBeforeShipping,calculateBeforeDiscount}` | where the customer can supply the tax percentage as a tag parameter, such as 10 for 10% in Australia or 12.5 for 12.5% in Europe. The system calculates the percentage of the amount and display it. Enter "true" or "false" for calculateBeforeShipping and calculateBeforeDiscount to set when the tax percentage is calculated.
`{tag_totalunits}` | Total product units in the cart
