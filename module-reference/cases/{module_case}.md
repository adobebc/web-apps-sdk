## {module_case,filter,workflowID,sortBy,templateId}

Renders a customer's case history within a secure zone, so, when customer logs in they are identified by the system and this module displays all their previous form submissions, according to the 'case list layout'. The Customer can view each case and download files attached to the case.

### Parameters

* `filter` -  filtering criteria for display and can be one of the following:
  * `a` - Renders all items that belong to that customer
	* `c` - Renders all cases that have a particular workflow assigned to them. 
	
	Please note that the `workflowID` parameter will only work if this filter is used.

* `workflowID` - ID of the workflow used to filter the cases rendered.

* `sortBy` - allows you to select the order in which you want to sort the items:
	* `Default` - default sort here is Date Created
	* `Subject` - sorts items according to the subject name alphabetically

* `templateId` - the sitewide template used to display the case details page

### Templates

* [Customer Cases Layouts > Detail Layout](/content/tag-reference/cases/case-detail-layout.html)
* This module also supports custom templates
* User must be logged in in order for the module to render


### Example

* `{module_case,a,,Default}`- This module renders all the cases that belong to a particular customer and those will be sorted by date
* `{module_case,a,,Subject}` - This module renders all the cases that belong to a particular customer and those will be sorted by subject which is the web form name if generated automatically and will be displayed alphabetically
* `{module_case,c,25261,Default,1440381}` - This module will display all cases that have workflow 25261 assigned to them, sort them by date, and assign template id #1440381 to the detail list for each case opened from the generated list
