# Summary

This page proposes several use cases which showcase how fast and convenient is to use web apps sdk.

## Create a dropdown

### Static data

```html
<bc-select id="ddOrderBy">
    <option value="0">Order by</option>
    <option value="id">Customer Id</option>
    <option value="firstName">First Name</option>
    <option value="middleName">Middle Name</option>
    <option value="lastName">Last Name</option>
</bc-select>
```

### Dynamic data (json)

```html
<bc-select id="ddOrderBy">
    <bc-json url="/_System/apps/bc-crm-next/assets/datasource/customers.json" rel="datasource"></bc-json>
</bc-select>
```

### Dynamic data (BC api)

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

### Dropdown dynamically configured

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
