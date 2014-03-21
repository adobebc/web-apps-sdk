# bc-gallery-app

Simple image slider with easy image management interface

BC Gallery is a free sample application provided by Adobe(r) Business Catalyst to showcase the capabilities of the Business Catalyst APIs and Web Apps SDK. The app leverages the web apps and file system APIs platform capabilities to deliver a friendly image management experience. 

+	Front-end gallery slider based on jQuery bxSlider plug-in
+	Image management user interface
+	Thumbnail list view
+	Re-order images through drag & drop


## Getting the app

In order to deploy "Gallery" on a Business Catalyst site do the following:

+ ```git clone https://github.com/adobebc/web-apps-sdk.git```
+ ```cd samples/bc-gallery/```
+ copy the `Layouts/` folder on your site using sftp.
+ copy the `bc-gallery/` folder on your site using sftp.
+ copy the `_System/` folder on your site using sftp.

## What’s included
The application will install on your site the following components:
+	a `bc-gallery` web app; this is where we store all the image meta information like name, or order
+	a `bc-gallery` folder which includes the image slider to be displayed in your site front-end and a subfolder where the app will store your gallery images
+	a `bc-gallery` web app layout, which controls the appearance of your image slider
+	the `bc-gallery` back-end files, saved under `_System/Apps/bc-gallery/` which contains the pages and scripts to power up the gallery admin interface

## Working with the app
Once the app is installed and launched, you can add new images to the gallery using the "**Add images**" button. Images are saved to the `/bc-gallery/images/` folder.  Deleting an image can be done right from the list using the delete image icon displayed when hovering over an image.

In the front-end things are pretty straightforward: the `/bc-gallery/index.html` page lists all the images currently available in your gallery using the jQuery bxSlider plug-in.

## Requirements
+	Website should be on the eCommerce plan
+	User needs to have web apps and FTP and Administer system permissions
+	JavaScript must be enabled

## License & Support
+	This is a sample application provided by Adobe® Business Catalyst under MIT license without any warranty or support
