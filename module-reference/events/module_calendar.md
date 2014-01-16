<div class="description">
<h3 class="skiptoc">Description</h3>
<p>This module renders either the News or the Events modules on a calendar.
</p>
</div>
<div id="syntax">
<h3>Syntax</h3>
<p>{<span>module_calendar,what,filter,</span>}</p>
</div>
<div id="parameters">
<h3>Parameters</h3>
<ul>
    <li>what - the type of item to display. This parameter has 3 possible values:
    <ul>
        <li>0 - display both News and Events</li>
        <li>7 - display only News</li>
        <li>48 - display only Events</li>
    </ul>
    </li>
    <li>filter - filtering criteria for display and can be one of the following:
    <ul>
        <li>a - all items</li>
        <li>c - displays an item in a particular category</li>
    </ul>
    </li>
</ul>
</div>
<div id="layouts">
<h3>This module is rendered with these layouts</h3>
<ul>
    <li>This module does not use a layout, here is how its output looks like:
    <img alt="" src="/kb_resources/screenshots/2013-03-27_1458.png" style="border:0px;  border-image: initial;" />
    </li>
</ul>
</div>
<div id="Examples">
<h3>Examples</h3>
<ul>
    <li>{<span>module_calendar,7,a,</span>} - displays all the news items on the calendar view</li>
    <li>{<span>module_calendar,48,a,</span>} - displays all the event (booking) items on the calendar view</li>
    <li>{<span>module_calendar,0,a,</span>} - displays both events and news items on the calendar view</li>
</ul>
</div>
