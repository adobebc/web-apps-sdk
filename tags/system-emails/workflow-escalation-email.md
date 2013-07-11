## Workflow Escalation Email

### Location
* **Admin Console:** Site Manager > System Emails > Workflow Escalation
* **SFTP & Develop Mode:** /Layouts/OutboundEmails/WorkflowEscalation.html

### Tags

Tag | Description
-------------- | -------------
`{tag_CreateDate}` |  Date of workflow instance
`{tag_EscalatedRoleName}` |	Role responsible when workflow step is escalated
`{tag_EscalationDate}` |	Escalation date for the workflow step
`{tag_expirydate}` |	Expiration date for workflow step
`{tag_objectname}` |	Name of the item type this workflow step refers to (case, order, web page, template)
`{tag_objecturl}` |	URL to view the item associated with the workflow
`{tag_ReminderDate}` |	Remind date for the workflow step
`{tag_RoleName}` |	Role responsible for the workflow step
`{tag_stepname}` |	Current step of the workflow
`{tag_workflowname}` |	Name of the triggered workflow
