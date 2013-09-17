## Invoice Email

### Location
* **Admin Console:** Site Manager > System Emails > Invoice
* **SFTP & Develop Mode:** /Layouts/OutboundEmails/Invoice.html

### Tags

Tag | Description
-------------- | -------------
`{tag_addressbilling}` | Billing address for order
`{tag_addressdefault}` | Default address for contact/company
`{tag_addresshome}` | Home address of the customer
`{tag_addressshipping}` | Shipping address for order
`{tag_addresswork}` | Work address of the customer
`{tag_amountoutstanding}` | Amount outstanding on invoice
`{tag_amountpaid}` | Amount already paid on invoice
`{tag_company}` | Renders the company name
`{tag_countrycode}` | Two-letter country code; use it to indicate currency on invoice
`{tag_crmform}` | The data from all CRM forms attached to an order (Works only with eCommerce)
`{tag_custom1}` | Information stored in imported Custom 1 field
`{tag_custom2}` |   Information stored in imported Custom 2 field
`{tag_custom3}` | 	Information stored in imported Custom 3 field
`{tag_custom4}` | 	Information stored in imported Custom 4 field
`{tag_customform}`	 | Displays all custom fields collected on the registration step of the check out. (This tag does not accept any parameters & only works in eCommerce)
`{tag_directdebitdate}`	 | The date automatic debit is processed for invoice
`{tag_directdebitdays}`	 | Number of days before automatic debit is processed for invoice
`{tag_directdebitinfo}`	 | Direct debit information relating to order. Only shown if order generated via recurring engine rather than by customer or Admin.
`{tag_directdebittype}` | 	Type of automatic debit for invoice; for example, credit card or direct debit
`{tag_invoicedate}` | 	Date of invoice
`{tag_invoicediscountamount}` | 	Total discounted amount of invoice excluding shipping charges
`{tag_invoicediscountcode}`	 | Discount code used
`{tag_invoicediscountpercent}` | 	Discount percent applied to invoice total
`{tag_invoicegiftvoucher}`	 | Gift voucher used
`{tag_invoicegiftvoucheramount}` | 	Amount paid using a gift voucher
`{tag_invoicenumber}` | 	Invoice number
`{tag_invoicetime}` | 	Time of invoice
`{tag_invoicetotal}`	 | Total invoice amount
`{tag_invoicetotalextaxamount}`	 | Invoice total amount excluding tax (products ex tax + shipping ex tax)
`{tag_invoicetotaltaxamount}` | 	Total tax associated with order (product tax + shipping tax)
`{tag_orderid}`	 | Order ID normally assigned to quotes. Can search on this value via Customer section
`{tag_ordername}`	 | Name of order
`{tag_phonecell}` | 	Mobile phone number for contact/company
`{tag_phonehome}` | 	Home phone number for contact/company
`{tag_phonework}`	 | Work phone number for contact/company
`{tag_productcode}` | 	Product code
`{tag_productdescription}`	 | Product description you entered when generating order
`{tag_producteditorcontent}` | 	Product description as it appears in the WYSIWYG editor
`{tag_productextaxamount}` | 	Product price exclusive of tax
`{tag_productgrandtotal}` | 	Total cost of products (Total Product cost + Total Tax for Products)
`{tag_productimage}`	 | Small image of the product
`{tag_productinctaxamount}` | 	Product price inclusive of tax
`{tag_productname}`	 | Name of product
`{tag_productquantity}` | 	Product quantity
`{tag_productsubtotal}` | 	Total cost of all products exclusive of tax
`{tag_producttaxamount}` | 	Amount of tax for one product ($)
`{tag_producttaxpercentage}` | 	For example, `{tag_producttaxpercentage,percentage}` where customer can simply supply the percentage in the tag, like 10% for OZ or 12.5% for Europe. The system gets the percentage of the amount and displays it.
`{tag_producttaxrate}`	 | Tax rate applied to product (%)
`{tag_producttaxtotal}` | 	Total amount of tax payable for products
`{tag_producttotal}`	 | Total amount for product (Product x Quantity + Tax Rate)
`{tag_producttotalextax}`	 | Total amount for product excluding tax (Product x Quantity)
`{tag_recipientaddress}` | 	Email address of the recipient
`{tag_recipientname}` | 	Full name of contact or company
`{tag_recipientrelated}` | 	Displays the first contact/company related to the invoicee
`{tag_shippingattention}` | 	The person to address the order to
`{tag_shippingattention}` | 	The person to address the order to
`{tag_shippingdescription}` | 	Description of shipping product
`{tag_shippingextaxamount}`	 | Shipping cost exclusive of tax
`{tag_shippinginstructions}` | 	Any specific shipping instructions that accompany the order
`{tag_shippingtaxamount}` | 	Amount of tax for shipping
`{tag_shippingtaxrate}` | 	Tax rate applied to shipping (%)
`{tag_shippingtotal}` | 	Total amount for shipping (Shipping cost + Tax Rate)
`{tag_totaltaxpercentage}` | 	`{tag_totaltaxpercentage,percentage, calculateBeforeShipping,calculateBeforeDiscount}` where the customer can supply the tax percentage as a tag parameter, such as 10 for 10% in Australia or 12.5 for 12.5% in Europe. The system calculates the percentage of the amount and display it. Enter "true" or "false" for calculateBeforeShipping and calculateBeforeDiscount to set when the tax percentage is calculated.

### Important information

The Invoice Email can be used for taking payments on a custom web form, payments on an event booking form and for the eCommerce. Within these use cases certain tags work or do not in these respective use cases.
