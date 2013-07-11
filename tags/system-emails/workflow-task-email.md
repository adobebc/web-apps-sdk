## Workflow Task Email

### Location
* **Admin Console:** Site Manager > System Emails > Workflow Task
* **SFTP & Develop Mode:** /Layouts/OutboundEmails/WorkflowTask.html

### Tags

Tag | Description
-------------- | -------------
`{tag_currentusername}` |  Name of user currently logged in to site
`{tag_formsummary}` |	Summary of the web form submitted
`{tag_objectname}` |	Name of the item type this workflow step refers to (case, order, web page, template)
`{tag_objecturl}` |	URL to view the item associated with the workflow
`{tag_objecturlsecure}` |	Secure URL to view the item associated with the workflow
`{tag_rolename}` |	Name of the role the user belongs to
`{tag_workflowname}` |	Name of the triggered workflow
