## {module_subscriptions,show_expiry,show_prices,reserved,render_json}

*Visitor must be logged in to a Secure Zone.*

Renders a list of logged in user's secure zone subscriptions.

### Parameters

* `show_expiry` - shows or hides the expiry date of the secure zone (true/false; default:true)
* `show_prices` - shows or hides the cost of the subscription to that secure zone (true/false; default:true)
* `render_json` - Will render the secure zone information in Json format which can be manually parsed (true/false)

### Examples

`{module_subscriptions}`

Renders the below:

~~~

<ul class="zoneSubscriptions">
<li>
<ul>
<li class="zoneName"><a href="/Default.aspx?PageID=5015150">Member Only Area</a></li>
<li>Never</li>
</ul>
</li>
<li>
<ul>
<li class="zoneName"><a href="/Default.aspx?PageID=5015148">test secure zone</a></li><li>Never</li>
</ul>
</li>
<li>
<ul>
<li class="zoneName"><a href="/Default.aspx?PageID=5015148">test secure zone 2</a></li>
<li>Never</li></ul>
</li>
</ul>

~~~


