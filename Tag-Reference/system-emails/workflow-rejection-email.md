## Workflow Rejection Email

### Location
* **Admin Console:** Site Manager > System Emails > Workflow Rejection
* **SFTP & Develop Mode:** /Layouts/OutboundEmails/WorkflowRejection.html

### Tags

Tag | Description
-------------- | -------------
`{tag_currentusername}` |  Name of user currently logged in to site
`{tag_objectname}` |	Name of the item type this workflow step is about (case, order, web page, template)
`{tag_objecturl}` |	URL to view the item associated with the workflow
`{tag_objecturlsecure}` |	Secure URL to view the item associated with the workflow
`{tag_rejectionreason}` |	Reason for rejecting task, as Admin entered
`{tag_rolename}` |	Name of the role the user belongs to
