## Online Shop Overall Layout

### Location
* **Admin Console:** Site Manager > Module Templates > Online Shop Layouts > Overall Layout
* **SFTP & Develop Mode:** /layouts/onlineshop/page_content.html

### Tags

Tag | Description
-------------- | -------------
`{tag_browsepanel}` | Displays the browse panel for current catalog. (Use `{tag_browsepanel, hideOnSale, hidePriceBrackets, hideSubCatalogues}` to customize)
`{tag_cataloguebreadcrumbs}` | Catalog breadcrumbs help customers easily navigate between related catalogs
`{tag_cataloguelist}` | Lists the subcatalogs in the current catalog (Use `{tag_cataloguelist,x}` where x is the number of catalogs per row)
`{tag_description}` | Catalog description
`{tag_name}` | Catalog name
`{tag_nextpage}` | Next page link to browse products in current catalog (can be customized to use image)
`{tag_pagination}` | Enhanced pagination; for example, "1 .. 2 3 4 5 .. 10" to provide fast access to adjacent pages
`{tag_previouspage}` | Previous page link to traverse products in current catalog (can be customized to use image)
`{tag_productlist}` | Lists the products in the current catalog (Use `{tag_productlist,productsPerRow,targetFrame,resultsPerPage,sortType,hideEmptyMessages,useLi}` meaning, the number of products per row, the target frame. For example, _blank or leave empty, the number of products per page, the sort type (weight, name, price, release date, expiry date, date) - you can use asc and desc for ordering, like 'price desc', hide the empty message, if no products exist (true,false), render using LI elements (true,false) )
`{tag_shoppingcartsummary}` | Shows shopping cart summary with view cart link `{tag_shoppingcartsummary,horizontal}` and `{tag_shoppingcartsummary,vertical}` to display horizontally and vertically respectively, `{tag_shoppingcartsummary,,quote}` to display total.
