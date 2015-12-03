# Get started tutorial

In this tutorial you can find information about how to create your first application using the BC Web Apps SDK. Below,
you can find the folder structure we are going to create:

* app name
    - /_System/apps/app_name
        * assets
            + css
                * bcapi-latest.css (downloaded from github or cdn)
            + lib
                * bcapi-deps-latest.js (downloaded from github or cdn)
                * bcapi-latest.js (dowloaded from github or cdn)
                * bcapi-webcomponents-latest.html (downloaded from github cdn)
            + datasource
                * options.json
        * index.html

## Create a dropdown with some options displayed

```html
<!-- / _System/apps/app_name/index.html -->

<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Hello world webapp</title>

        <link rel="stylesheet" href="/_System/apps/app_name/assets/css/bcapi-latest.css">        
        <script type="text/javascript" src="/_System/apps/app_nameassets//lib/bcapi-deps-latest.js"></script>
        <script type="text/javascript" src="/_System/apps/app_nameassets//lib/bcapi-latest.js"></script>
        <link rel="import" href="/_System/apps/app_nameassets//lib/bcapi-webcomponents-latest.html">
    </head>

    <body>
        <bc-select id="ddOrderBy">
            <option value="0">Order by</option>
            <option value="id">Customer Id</option>
            <option value="firstName">First Name</option>
            <option value="middleName">Middle Name</option>
            <option value="lastName">Last Name</option>
        </bc-select>
    </body>
</html>
```

![Dropdown result](tutorials/get-started/dropdown-result.png)

The above example creates a Business Catalyst dropdown populated with several items.
Rendered dropdown has all required css classes applied:

## Create a dropdown using html + javascript

```html
<!-- / _System/apps/app_name/index.html -->

<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Hello world webapp</title>

        <link rel="stylesheet" href="/_System/apps/app_name/assets/css/bcapi-latest.css">        
        <script type="text/javascript" src="/_System/apps/app_nameassets//lib/bcapi-deps-latest.js"></script>
        <script type="text/javascript" src="/_System/apps/app_nameassets//lib/bcapi-latest.js"></script>
        <link rel="import" href="/_System/apps/app_nameassets//lib/bcapi-webcomponents-latest.html">
    </head>

    <body>
        <bc-select id="ddOrderBy"></bc-select>

        <script type="text/javascript">
        document.addEventListener('WebComponentsReady', function() {
            var orderByDd = document.getElementById("ddOrderBy");
            orderByDd.configure({
                items: [
                    {"value": "0", "text": "Order by"},
                    {"value": "id", "text": "Customer Id"},
                    {"value": "firstName", "text": "Order by"},
                    {"value": "middleName", "text": "Middle name"},
                    {"value": "lastName", "text": "Last name"}
                ]
            });
        });
        </script>
    </body>
</html>
```

![Dropdown result](tutorials/get-started/dropdown-result.png)

In comparison with the first example, the current example shows how you can configure
components using JavaScript. You can find more information about components and
dropdown at:

* {@link BCAPI.Components}
* {@link BCAPI.Components.Component}
* {@link BCAPI.Components.DropDown}

## Create a dropdown using javascript

```html
<!-- / _System/apps/app_name/index.html -->

<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Hello world webapp</title>

        <link rel="stylesheet" href="/_System/apps/app_name/assets/css/bcapi-latest.css">        
        <script type="text/javascript" src="/_System/apps/app_nameassets//lib/bcapi-deps-latest.js"></script>
        <script type="text/javascript" src="/_System/apps/app_nameassets//lib/bcapi-latest.js"></script>
        <link rel="import" href="/_System/apps/app_nameassets//lib/bcapi-webcomponents-latest.html">
    </head>

    <body>
        <script type="text/javascript">
        document.addEventListener('WebComponentsReady', function() {
            var orderByDd = document.createElement("bc-select");
            orderByDd.setAttribute("id", "ddOrderByThird");
            orderByDd.configure({
                items: [
                    {"value": "0", "text": "Order by"},
                    {"value": "id", "text": "Customer Id"},
                    {"value": "firstName", "text": "Order by"},
                    {"value": "middleName", "text": "Middle name"},
                    {"value": "lastName", "text": "Last name"}
                ]
            });

            document.body.appendChild(orderByDd);
        });
        </script>
    </body>
</html>
```

![Dropdown result](tutorials/get-started/dropdown-result.png)

In the above example you can see how Business Catalyst Web Apps components can be
created only by using javascript DOM api.

## Create a dropdown which displays data from json file

```html
<!-- / _System/apps/app_name/index.html -->

<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Hello world webapp</title>

        <link rel="stylesheet" href="/_System/apps/app_name/assets/css/bcapi-latest.css">        
        <script type="text/javascript" src="/_System/apps/app_nameassets//lib/bcapi-deps-latest.js"></script>
        <script type="text/javascript" src="/_System/apps/app_nameassets//lib/bcapi-latest.js"></script>
        <link rel="import" href="/_System/apps/app_nameassets//lib/bcapi-webcomponents-latest.html">
    </head>

    <body>
        <bc-select id="ddOrderBy" value-prop="id" text-prop="text">
            <bc-json url="/_System/apps/bc-crm-next/assets/datasource/options.json" rel="datasource"></bc-json>
        </bc-select>
    </body>
</html>
```

```json
{
    "items": [
            {"id": "0", "text": "Order by"},
            {"id": "id", "text": "Customer Id"},
            {"id": "firstName", "text": "Order by"},
            {"id": "middleName", "text": "Middle name"},
            {"id": "lastName", "text": "Last name"}
    ]
}
```

![Dropdown result](tutorials/get-started/dropdown-result.png)

The above example introduces an extremely important concept of Business Catalyst Web Apps SDK: **datasources**.
A datasource main responsibility is to provide data and to abstract the way that data is obtained. You can read
more about datasources on {@link BCAPI.Components.DataSources}

## Create a dropdown which displays data from BC api

```html
<!-- / _System/apps/app_name/index.html -->

<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Hello world webapp</title>

        <link rel="stylesheet" href="/_System/apps/app_name/assets/css/bcapi-latest.css">        
        <script type="text/javascript" src="/_System/apps/app_nameassets//lib/bcapi-deps-latest.js"></script>
        <script type="text/javascript" src="/_System/apps/app_nameassets//lib/bcapi-latest.js"></script>
        <link rel="import" href="/_System/apps/app_nameassets//lib/bcapi-webcomponents-latest.html">
    </head>

    <body>
        <bc-select id="ddCustomers" value-prop="id" text-prop="firstName">
            <bc-api api-name="customers" api-version="v3" fields="id,firstName" rel="datasource"></bc-api>
        </bc-select>
    </body>
</html>
```

Continuing the discussion about datasource **bc-api** seamlessly integrates available Business Catalsyt v3 apis with
available components from the SDK. You can find more information about bc-api on {@link BCAPI.Components.DataSources.ApiDataSource}

## Conclusions

In the above examples we have briefly described multiple ways of using Business Catalyst Web Apps sdk components. In addition, we presented fast ways to wire data into components.

The data wiring strategy can be reused in most of the components from the SDK. At this point,
you should probably inspect which components are ready to be used and what options are available
for configuring the SDK:

* {@link BCAPI.Components}
* {@tutorial configure-sdk}
* {@link BCAPI.Security}