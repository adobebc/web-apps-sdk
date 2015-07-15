# Summary

This page proposes several use cases which showcase how fast and convenient is to use web apps sdk.

## Create a dropdown

### Static data (webapps_dd_static)

```html
<bc-select id="ddOrderBy">
    <option value="0">Order by</option>
    <option value="id">Customer Id</option>
    <option value="firstName">First Name</option>
    <option value="middleName">Middle Name</option>
    <option value="lastName">Last Name</option>
</bc-select>
```

### Dropdown dynamic configuration (webapps_dd_dynamic)

```html
<bc-select id="ddOrderBy"></bc-select>

<script type="text/javascript">
var orderByDd = document.getElementById("ddOrderBy");
orderByDd.configure({
    items: [
        {"value": "0", "text": "Order by"},
        {"value": "id", "text": "Customer Id"},
        {"value": "firstName", "text": "Order by"},
        {"value": "middleName", "text": "Middle name"},
        {"value": "lastName", "text": "Last name"},
        {"value": "homePhone", "text": "Phone number"}
    ]
});
</script>
```

### Dynamic data (json) (webapps_dd_json)

```html
<bc-select id="ddOrderBy" value-prop="id" text-prop="firstName">
    <bc-json url="/_System/apps/bc-crm-next/assets/datasource/customers.json" rel="datasource"></bc-json>
</bc-select>
```

### Dynamic data (BC api) (webapps_dd_api)

```html
<bc-select id="ddCustomers" value-field="id" text-field="firstName">
    <bc-api api-name="customers" api-version="v3" rel="datasource"></bc-json>
</bc-select>

<script type="text/javascript">
    var customersDd = document.getElementById("ddCustomers");
    
    customersDd.configure({
        "bcConfig": {
            "siteUrl": "...",
            "accessToken": "..."
        }
    });
</script>
```
