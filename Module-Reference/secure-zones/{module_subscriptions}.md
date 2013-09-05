## {module\_subscriptions,show\_expiry,show\_prices,reserved,render\_json}

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
      <li class="zoneName"><a href="/Default.aspx?PageID=54321">Member Only Area</a></li>
      <li>Never</li>
    </ul>
  </li>
  <li>
    <ul>
      <li class="zoneName"><a href="/Default.aspx?PageID=54321">Secure Zone 1</a></li>
      <li>Never</li>
    </ul>
  </li>
  <li>
    <ul>
      <li class="zoneName"><a href="/Default.aspx?PageID=54321">Secure Zone 2</a></li>
      <li>Never</li>
    </ul>
  </li>
</ul>
~~~

---


`{module_subscriptions,true,true,,true}`

Renders the below:

~~~
{ "SecureZoneSubscriptionList" : { "EntityId" : 11723915,
      "Subscriptions" : [ { "CostPerPeriod" : "0",
            "CycleType" : "",
            "ExpiryDate" : "01/01/9999 00:00:00",
            "SellAccess" : false,
            "ZoneId" : "51",
            "ZoneName" : "Member Only Area"
          },
          { "CostPerPeriod" : "0",
            "CycleType" : "",
            "ExpiryDate" : "01/01/9999 00:00:00",
            "SellAccess" : false,
            "ZoneId" : "4859",
            "ZoneName" : "test secure zone"
          },
          { "CostPerPeriod" : "0",
            "CycleType" : "",
            "ExpiryDate" : "01/01/9999 00:00:00",
            "SellAccess" : false,
            "ZoneId" : "4871",
            "ZoneName" : "test secure zone 2"
          }
        ]
    } }
~~~
        
