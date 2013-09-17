The below table is a reference used with the Open Admin method. The table outlines all the default menu item names, and the associated ids and weights.

Use these ids to target specific menu items in your menu.json file. For more details, see [Getting started with Open Admin](/content/developer-guides/open-admin/getting-started-with-open-admin.html).

**Note:** If you are passing through query parameters in the URL, make sure to avoid using the following parameters. These system parameters will be picked up by the rendering enginge and will cause errors if used.

* id
* preview

For example, if your URL has *edit.html?id=some_item_id*, this will try to find a page matching this id or will return a 404 error page.

<table>
  <tr>
    <th align="left" width="191" height="58">Menu Item Names</th>
    <th align="left" width="285" widtd="229">ID</th>
    <th align="left" width="158" widtd="294">Default Weight</th>
  </tr>
  <tr>
  <td colspan="4"></td>
  </tr>
  <tr>
  <tr>
    <th align="left" widtd="147">Dashboard</th>
    <td>menu-dashboard</td>
    <td>10000</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th align="left">Site Manager</th>
    <td>menu-site-manager</td>
    <td>20000</td>
  </tr>
  <tr>
    <td> Pages</td>
    <td>	menu-webpages</td>
    <td>10000</td>
  </tr>
  <tr>
    <td> Page Templates</td>
    <td>	menu-site-templates</td>
    <td>20000</td>
  </tr>
  <tr>
    <td> Module Templates</td>
    <td>	menu-module-templates</td>
    <td>30000</td>
  </tr>
  <tr>
    <td>Content Holders</td>
    <td>	menu-content-holders</td>
    <td>40000</td>
  </tr>
  <tr>
    <td> Menus</td>
    <td>	menu-dynamic-menus</td>
    <td>50000</td>
  </tr>
  <tr>
    <td> Web Forms</td>
    <td>	menu-webforms</td>
    <td>60000</td>
  </tr>
  <tr>
    <td> File Manager</td>
    <td>	menu-file-manager</td>
    <td>70000</td>
  </tr>
  <tr>
    <td> Secure Zones</td>
    <td>	menu-secure-pages</td>
    <td>80000</td>
  </tr>
  <tr>
    <td> URL Redirects</td>
    <td>	menu-url-redirects</td>
    <td>90000</td>
  </tr>
  <tr>
    <td> Site Search</td>
    <td>	menu-site-search</td>
    <td>100000</td>
  </tr>
  <tr>
    <td> System Pages</td>
    <td>	menu-system-messages</td>
    <td>110000</td>
  </tr>
  <tr>
    <td> System E-Mails</td>
    <td>	menu-system-emails </td>
    <td>120000</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th align="left">Web Apps</th>
    <td>menu-webapps</td>
    <td>30000</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
      </tr>
  <tr>
    <th align="left">Modules</th>
    <td>menu-modules</td>
    <td>40000</td>
  </tr>
  <tr>
    <td> Blogs</td>
    <td>	menu-blogs</td>
    <td>10000</td>
  </tr>
  <tr>
    <td> Events</td>
    <td>	menu-events</td>
    <td>20000</td>
  </tr>
  <tr>
    <td> Photo Galleries</td>
    <td>	menu-galleries</td>
    <td>30000</td>
  </tr>
  <tr>
    <td> News</td>
    <td>	menu-news</td>
    <td>40000</td>
  </tr>
  <tr>
    <td> Media Downloads</td>
    <td>	menu-downloads</td>
    <td>50000</td>
  </tr>
  <tr>
    <td> Comments</td>
    <td>	menu-comments</td>
    <td>60000</td>
  </tr>
  <tr>
    <td> FAQs</td>
    <td>	menu-faq</td>
    <td>70000</td>
  </tr>
  <tr>
    <td> Ad Rotators</td>
    <td>	menu-banners</td>
    <td>80000</td>
  </tr>
  <tr>
    <td> Forums</td>
    <td>	menu-forums </td>
    <td>90000</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th align="left">CRM</th>
    <td>menu-customers</td>
    <td>50000</td>
  </tr>
  <tr>
    <td> Search</td>
    <td>	menu-customers-search</td>
    <td>30000</td>
  </tr>
  <tr>
    <td> Customers</td>
    <td>	menu-customers-manage</td>
    <td>40000</td>
  </tr>
  <tr>
    <td> Orders</td>
    <td>	menu-orders</td>
    <td>50000</td>
  </tr>
  <tr>
    <td> Cases</td>
    <td>	menu-cases</td>
    <td>60000</td>
  </tr>
  <tr>
    <td>Event Bookings</td>
    <td>	menu-bookings</td>
    <td>70000</td>
  </tr>
  <tr>
    <td> Opportunities</td>
    <td>	menu-opportunities</td>
    <td>80000</td>
  </tr>
  <tr>
    <td> Sales Forecasts</td>
    <td>	menu-forecasts</td>
    <td>90000</td>
  </tr>
  <tr>
    <td> Extend CRM Database</td>
    <td>	menu-customers-database </td>
    <td>100000</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th align="left">E-Commerce</th>
    <td>menu-ecommerce</td>
    <td>60000</td>
  </tr>
  <tr>
    <td> Products</td>
    <td>	menu-products</td>
    <td>10000</td>
  </tr>
  <tr>
    <td> Catalogs</td>
    <td>	menu-catalogs</td>
    <td>20000</td>
  </tr>
  <tr>
    <td> Discount Codes</td>
    <td>	menu-discount-codes</td>
    <td>30000</td>
  </tr>
  <tr>
    <td> Gift Vouchers</td>
    <td>	menu-giftvouchers</td>
    <td>40000</td>
  </tr>
  <tr>
    <td> Affiliate Programs</td>
    <td>	menu-affiliate-programs</td>
    <td>50000</td>
  </tr>
  <tr>
    <td> Payment Gateways</td>
    <td>	menu-payment-gateways</td>
    <td>60000</td>
  </tr>
  <tr>
    <td> Tax Codes</td>
    <td>	menu-taxcodes</td>
    <td>70000</td>
  </tr>
  <tr>
    <td> Shipping Options</td>
    <td>	menu-shipping-options</td>
    <td>80000</td>
  </tr>
  <tr>
    <td> Shop Settings</td>
    <td>	menu-settings-shop </td>
    <td>90000</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th align="left">E-Mail Marketing</th>
    <td>menu-email-marketing</td>
    <td>70000</td>
  </tr>
  <tr>
    <td> E-Mail Campaigns</td>
    <td>	menu-email-campaigns</td>
    <td>10000</td>
  </tr>
  <tr>
    <td> Mailing Lists</td>
    <td>	menu-mailing-lists </td>
    <td>20000</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <th align="left">Reports</th>
    <td>menu-reports</td>
    <td>80000</td>
  </tr>
  <tr>
    <td> Visitors</td>
    <td>	menu-reports-visitors</td>
    <td>10000</td>
  </tr>
  <tr>
    <td height="25"> Traffic Sources</td>
    <td>	menu-reports-traffic</td>
    <td>20000</td>
  </tr>
  <tr>
    <td> Website Content</td>
    <td>	menu-reports-content</td>
    <td>30000</td>
  </tr>
  <tr>
    <td> Web Forms Usage</td>
    <td>	menu-reports-webforms</td>
    <td>40000</td>
  </tr>
  <tr>
    <td> E-Commerce</td>
    <td>	menu-reports-ecommerce</td>
    <td>50000</td>
  </tr>
  <tr>
    <td> E-Mail Campaigns</td>
    <td>	menu-reports-email-campaigns</td>
    <td>60000</td>
  </tr>
  <tr>
    <td> Custom Reports</td>
    <td>	menu-reports-custom</td>
    <td>70000</td>
  </tr>
  <tr>
    <td> Admin Reports</td>
    <td>	menu-reports-admin-usage</td>
    <td>90000</td>
  </tr>
  <tr>
   <td>&nbsp;</td>
   <td>&nbsp;</td>
   <td>&nbsp;</td>
  </tr>
  <tr>
    <th align="left">Site Settings</th>
    <td>menu-site-settings</td>
    <td>90000</td>
  </tr>
  <tr>
    <td> Site Domains</td>
    <td>	menu-settings-domains</td>
    <td>10000</td>
  </tr>
  <tr>
    <td> E-Mail Accounts</td>
    <td>	menu-settings-emailaccounts</td>
    <td>20000</td>
  </tr>
  <tr>
    <td> Admin Users</td>
    <td>	menu-settings-adminusers</td>
    <td>30000</td>
  </tr>
  <tr>
    <td> User Roles</td>
    <td>	menu-settings-userroles</td>
    <td>40000</td>
  </tr>
  <tr>
    <td> Categories</td>
    <td>	menu-settings-categories</td>
    <td>50000</td>
  </tr>
  <tr>
    <td> Manage Workflows</td>
    <td>	menu-settings-workflows</td>
    <td>60000</td>
  </tr>
  <tr>
    <td> Social Integration</td>
    <td>	menu-settings-facebook</td>
    <td>70000</td>
  </tr>
  <tr>
    <td> Mobile Support</td>
    <td>	menu-settings-mobilesupport</td>
    <td>80000</td>
  </tr>
  <tr>
    <td> Captcha</td>
    <td>	menu-settings-captcha</td>
    <td>90000</td>
  </tr>
  <tr>
    <td> Site Map</td>
    <td>	menu-settings-site-map</td>
    <td>100000</td>
  </tr>
  <tr>
    <td> RSS Channels</td>
    <td>	menu-settings-rss-channels</td>
    <td>110000</td>
  </tr>
  <tr>
    <td> Site Billing</td>
    <td>	menu-billing-settings</td>
    <td>120000</td>
  </tr>
  <tr>
    <td> Customer Service Ticketing</td>
    <td>	menu-settings-service-ticketing</td>
    <td>130000</td>
  </tr>
  <tr>
    <td> QuickBooks</td>
    <td>	menu-settings-quickbooks</td>
    <td>140000</td>
  </tr>
  <tr>
    <td>API Integration</td>
    <td>	menu-settings-api-integration</td>
    <td>150000</td>
  </tr>
  <tr>
    <td> Site Management</td>
    <td>	menu-generalsettings</td>
    <td>170000</td>
  </tr>
  <tr>
    <td> Secure Domain Redirection</td>
    <td>	menu-settings-secure-redirect</td>
    <td>180000</td>
  </tr>
  <tr>
    <td> Beta Features</td>
    <td>	menu-settings-beta-features</td>
    <td>190000</td>
  </tr>
</table>
