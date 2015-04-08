# bc-orders-report

Sample orders report

BC Orders app is a free sample application provided by Adobe Business Catalyst to showcase the capabilities of the Business Catalyst APIs and Web Apps SDK. The app leverages the CRM APIs platform capabilities to deliver a custom orders report that includes shipping costs and total taxes.

+ List total orders, grouped by order status
+ Display order total, shipping total and total tax
+ Filter by date

## Getting the app

In order to deploy "BC Orders App" on a Business Catalyst site do the following:

+ git clone `https://github.com/adobebc/web-apps-sdk.git`
+ cd `samples/bc-orders-report/`
+ copy the `\_System` folder on your site using sftp.

## What’s included

The application will install on your site the following components:

+ the `bc-orders-report` back-end files, saved under `_System/Apps/bc-orders-report/` which contains the pages and scripts to power up the report admin interface
+ a new admin menu entry named `Orders report`; this will load the orders report;

## Working with the app

Once the app is installed, you need to click on the Orders.app menu entry and authorize the app to run on the site. Following authorization, the app will load a custom orders report showing order status, total value, shipping value and tax. You will be able to filter orders by date.

## Requirements

+ Website should be on the eCommerce plan
+ User needs to have web apps and FTP and Administer system permissions
+ JavaScript must be enabled

## License & Support

+	This is a sample application provided by Adobe® Business Catalyst under MIT license without any warranty or support
