# Get started tutorial

In this tutorial you can find information about how to create your first application using the BC Web Apps SDK. Below,
you can find the folder structure we are going to create:

* <app name>
    - /_System/apps/<app_name>
        * assets
            - css
                * bcapi-latest.css (downloaded from github or cdn)
            - lib
                * bcapi-deps-latest.js (downloaded from github or cdn)
                * bcapi-latest.js (dowloaded from github or cdn)
                * bcapi-webcomponents-latest.html (downloaded from github cdn)
        * index.html

## Create a simple dropdown with some options displayed

```html
<!-- / _System/apps/<app_name>/index.html -->

<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Hello world webapp</title>

        <link rel="stylesheet" href="/_System/apps/<app_name>/assets/css/bcapi-latest.css">        
        <script type="text/javascript" src="/_System/apps/<app_name>assets//lib/bcapi-deps-latest.js"></script>
        <script type="text/javascript" src="/_System/apps/<app_name>assets//lib/bcapi-latest.js"></script>
        <link rel="import" href="/_System/apps/<app_name>assets//lib/bcapi-webcomponents-latest.html">
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

The above example creates a Business Catalyst dropdown populated with several items.
Rendered dropdown has all required css classes applied:

![Dropdown result](/tutorials)
