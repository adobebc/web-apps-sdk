<div class="description">
<h3 class="skiptoc">Description</h3>
<p>Something about the Booking module.</p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span>module_booking,filter,ID or numberOfBookings</span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
    <li>filter - filtering criteria for display and can be one of the following:
    <ul>
        <li>i - individual item</li>
        <li>a - all items</li>
        <li>l - latest items</li>
        <li>r - random item</li>
        <li>cr - displays a random item in a particular category</li>
    </ul>
    </li>
    <li>ID or numberOfBookings
    <ul>
        <li>id - the ID of the booking module. This is system generated and does not need to be changed</li>
        <li>numberOfBookings - can be used in conjunction with l parameter to limit the number of bookings displayed</li>
    </ul>
    </li>
</ul>
</div>
<div id="layouts">
<h3>This module is rendered with these layouts</h3>
<ul>
    <li>Event Layouts &gt;&nbsp;<a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/booking-events-layouts/list-layout" title="List Layout">List Layout</a></li>
    <li>This module also supports <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/custom-templates">custom templates</a></li>
</ul>
</div>
<div id="Examples">
<h3>Examples</h3>
<ul>
    <li>{<span>module_booking,a</span>} - displays all the bookings</li>
    <li>{<span>module_booking,i,24407</span>} - displays an individual event item with the ID 24407</li>
    <li>{<span>module_booking,l,5</span>} - displays 5 latest events</li>
    <li>{<span>module_booking,r</span>} - displays a single random item</li>
    <li>{<span>module_booking,c,14075</span>} - displays all the items classified in the category with the ID 14075</li>
    <li>{<span>module_booking,cr,14075</span>} - displays a random item classified in the category with the ID 14075</li>
    <li>{<span>module_booking,i,63522  template="/layouts/custom/bookings.tpl"</span>} - displays an individual item using a <a href="http://knowledgebase6.businesscatalyst.com/kb/modules-and-tags-reference/layouts/custom-templates">custom template</a></li>
</ul>
</div>
