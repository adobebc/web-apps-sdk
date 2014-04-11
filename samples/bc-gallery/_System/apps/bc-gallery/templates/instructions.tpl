Simple image slider with easy image management interface

BC Gallery is a free sample application provided by Adobe(r) Business Catalyst to showcase the capabilities of the Business Catalyst APIs and Web Apps SDK. 
The app leverages the web apps and file system APIs platform capabilities to deliver a friendly image management experience. 

<ul>
   <li>Front-end gallery slider based on jQuery bxSlider plug-in.</li>
   <li>Image management user interface.</li>
   <li>Thumbnail list view.</li>
   <li>Re-order images through drag & drop.</li>
</ul>

<h2>What&#39;s included</h2>

The application will install on your site the following components:

<ul>
	<li>a <strong>bc-gallery</strong> web app; this is where we store all the image meta information like name, or order.</li>
	<li>a <strong>bc-gallery</strong> folder which includes the image slider to be displayed in your site front-end and a subfolder where the app will store your gallery images.</li>
	<li>a <strong>bc-gallery</strong> web app layout, which controls the appearance of your image slider.</li>
	<li>the <strong>bc-gallery</strong> back-end files, saved under <strong>_System/Apps/bc-gallery/</strong> which contains the pages and scripts to power up the gallery admin interface.</li>
</ul>

<h2>Working with the app</h2>

Once the app is installed and launched, you can add new images to the gallery using the "<strong>Add images</strong>" button. 
Images are saved to the <strong>/bc-gallery/images/</strong> folder.  
Deleting an image can be done right from the list using the delete image icon displayed when hovering over an image.

In the front-end things are pretty straightforward: the <strong>/bc-gallery/demo.html</strong> page lists all the images currently available in your gallery using the jQuery bxSlider plug-in.

<br/><br/>

<div class="deleteWarning">Uninstall operation can not be undone.</div>

<button type="button" class="btn btn-default" data-sid="btn-uninstall-app">Uninstall application</button>