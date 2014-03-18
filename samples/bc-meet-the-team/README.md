# bc-meet-the-team-app

Simple team listing management

Meet the Team is a free sample application provided by Adobe Business Catalyst to showcase the capabilities of the Business Catalyst APIs and Web Apps SDK. The app leverages the web apps and file system APIs platform capabilities to deliver a friendly team listing and management experience.

+	Display team members’ profiles on the site
+	Manage team members list through a simple admin interface
+	Thumbnail list view of team member profiles
+	Easily add, update or delete members
+	Drag & drop profile image upload
+	Link to team members’ social profiles


## Getting the app

In order to deploy "Meet the Team" on a Business Catalyst site do the following:

+ git clone `https://github.com/adobebc/web-apps-sdk.git`
+ `cd samples/bc-meet-the-team/`
+ copy the `Layouts` folder on your site using sftp.
+ copy the `bc-meet-the-team` folder on your site using sftp.
+ copy the `\_System` folder on your site using sftp.

## What’s included
The application will install on your site the following components:
+	a `bc-meet-the-team` web app; this is where we store all the team member meta information like name, title or links to social profiles
+	a `bc-meet-the-team` folder which includes the team member list to be displayed in your site front-end, the image subfolder which stores your staff pictures, and an `assets/` subfolder with some scripts, styles and images used by the front-end page
+	a `bc-meet-the-team` web app layout, which controls the appearance of your team members list displayed in front-end
+	the `bc-meet-the-team` back-end files, saved under `_System/Apps/bc-meet-the-team/` which contains the pages and scripts to power up the team admin interface

## Working with the app
Once the app is installed and launched, you can add new members to the using the "**Add member**" button. Member images are saved to the `/bc-meet-the-team/images/` folder.  Deleting a member can be done right from the list using the delete icon displayed when hovering over a team member.

In the front-end things are pretty straightforward: on the `/bc-meet-the-team/index.html` page lists all the team members.

## Requirements
+	Website should be on the eCommerce plan
+	User needs to have web apps and FTP and Administer system permissions
+	JavaScript must be enabled

## License & Support
+	This is a sample application provided by Adobe® Business Catalyst under MIT license without any warranty or support
