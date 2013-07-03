## Individual Product (Small) Layout

### Location
* **Admin Console:** Site Manager > Module Templates > Online Shop Layouts > Individual Product - Small + Individual Product - Small (Backup)
* **SFTP & Develop Mode:** /layouts/onlineshop/small_product.html + /layouts/onlineshop/small_product_backup.html

### Tags

Tag | Description
-------------- | -------------
`{tag_addtocart}` | Ability to add products to the shopping cart (vertical layout)
`{tag_addtocartinputfield}` | Input field to enter product quantity
`{tag_addtofavorites,addtoImage,removefromImage}` | Add product to favorites list. Optionally customize to display your own custom image for adding and removing.
`{tag_attributes}` | Renders attribute dropdowns for a given product
`{tag_button,Your Text}` | Replace Your Text with your own text; for example, "Click for more information"
`{tag_buynow}` | Add to cart and redirects to check out
`{tag_countrycode}` | Display the country code; for example, AU
`{tag_countrycurrencyformat}` | Display the country currency code; for example, AUD
`{tag_currencyformat}` | Display the currency format; for example, $
`{tag_custom1}` | Custom field #1. Use to display any information about a product
`{tag_custom2}` | Custom field #2. Use to display any information about a product
`{tag_custom3}` | Custom field #3. Use to display any information about a product
`{tag_custom4}` | Custom field #4. Use to display any information about a product
`{tag_description}` | Description of the product (Editor content)
`{tag_discountprice}` | The price if a discount applies to the current customer otherwise the normal sale price.
`{tag_expirydate}` | Expiration date of product
`{tag_grouping}` | Pop-up menu of product attributes used to select a product to add to cart
`{tag_groupinglist}` | List of product attributes used to switch between products
`{tag_instock}` | Number of units in stock
`{tag_itemurl_nolink}` | URL to the item referred, without host
`{tag_itemurl_withhost}` | URL to the item referred, with host
`{tag_largeimage}` | Large image for product
`{tag_largeimage_path}` | Outputs the file path of the image; for example, /images/imagename.jpg
`{tag_maxunits}` | Maximum units
`{tag_minunits}` | Minimum units
`{tag_name_nolink}` | Name of product (does not link to product details)
`{tag_name}` | Name of product
`{tag_onorder}` | Number of units on order
`{tag_onsale}` | Renders 1 if product on sale, otherwise 0. If page elements need to be altered for products on sale, then embed tag in relevant javascript.
`{tag_productcode}` | Product code
`{tag_releasedate}` | Release date of item
`{tag_reorder}` | Number of units to reorder threshold
`{tag_retailprice}` | Retail price of the product
`{tag_saleprice}` | Sale price of the product (the amount that customers are charged)
`{tag_smallimage_nolink}` | Small image for product (does not link to product details)
`{tag_smallimage}` | Small image for product
`{tag_smallimage_path}` | Outputs the file path of the image; for example, /images/imagename.jpg
`{tag_tags}` | Product tags (you can use field for anything)
`{tag_tax}` | Tax amount for the product
`{tag_taxcode}` | Tax code name used for item
`{tag_taxrate}` | Tax rate used for item (%)
`{tag_tellafriend}` | Tell a friend about this product
`{tag_totaldiscountprice}` | Total discounted price of the product: Discount Price + Tax.
`{tag_totalprice}` | Total price of the productT: Sale Price + Tax
`{tag_totalretailprice}` | Total retail price of the product: Retail Price + Tax
`{tag_unittype}` | Product unit type: Single, by the dozen
`{tag_volumeprices}` | Displays volume pricing for product
