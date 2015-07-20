# Introduction

Web apps sdk provides the toolkit for developing applications for Business Catalyst.

## Architecture

![High level packages](https://raw.githubusercontent.com/adobebc/web-apps-sdk/web-apps-sdk-ui/sdk/doc-ui/ui-sdk-overview.png)

### BCAPI.Components

Usually, developers will use **BCAPI.Components** namespace in order to create the user interface for their application. This package offers a rich set of visual elements which can be used out of the box. Developers can use the following components out of the box:

* **BCAPI.Components.TextField** - A specialized business catalyst text field which also integrates an optional search button.
* **BCAPI.Components.DropDown** - A specialized business catalyst drop down element which also supports bindable data sources.
* **BCAPI.Components.DataGrid** - A specialized business catalyst data grid which supports nested elements and custom templates for each individual column.

Depending on the component and developer use case there might be necessary to use some lower level classes found in:

* **BCAPI.Components.DataSources**
* **BCAPI.Components.Validation**

### BCAPI.Components.DataSources

This namespace provides out of the box datasources which can be used to wire data into visual elements. At the moment there are only two data sources supported:

1. **BCAPI.Components.DataSources.JsonDataSource** - A specialized data source which can be used to wire json files into visual elements.
1. **BCAPI.Components.DataSources.ApiDataSource** - A specialized data source which can be used to wire BC v3 (and newer) apis into visual elements.

## Supported browsers

The current prototype of BC UI SDK supports latest versions of all major browsers. We are actively
testing this on:

* Internet Explorer 11
* Chrome
* Firefox
* Safari