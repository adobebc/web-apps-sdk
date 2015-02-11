<div class="container">
    <div class="row">
        <div class="col-md-12" role="main">
           <h1>Instructions</h1>
           <h3>Resource picker</h3>
           <p>
            The application contains drop-down lists from where a resource can be selected. From the first drop-down a resource can be selected by name; the second drop-down specifies resource version,
            for the moment only the v3 APIs are supported. In the third drop-down a sub-resource can be specified for the currently selected resource. A sub-resource is a resource that depends on the first
            resource, for example blog-posts and blogs. When a sub-resource is selected a sub-resource id must be specified by selecting one from the fourth drop-down. All these actions conclude by displaying
            resource fields.
           </p>
           <h3>Resource fields picker</h3>
           <p>
           When the resource fields are displayed as a result of resource selection, fields can be chosen individually and as a result the module data and JQuery requests are generated with the specified fields
           and resource data completed. Both in module_data and JQuery tabs primary key fields are highlighted.
           </p>
           <h3>Query builder</h3>
                               <p>
                               The query builder can be used to specify where conditions. First drop-down contains the selected resource fields, the second the relation operator and the third the value wanted for the
                               selected field. When all three fields are completed the application automatically adds where conditions to module_data tab and JQuery tab. Multiple rules can be specified.
                               </p>
           <h3>Module data tab</h3>
           <p>
           In the module data tab the tag is generated with the previously selected fields already completed.
           </p>

             <h3>JQuery tab</h3>
             <p>
             The JQuery tab generates Jquery snippets based on selected resource,fields and queries. Request type can be specified and the snippet will change accordingly. Displayed request types drop-down
             will always show only the permitted requests. For example on sub-resources PUT requests are not allowed.
             For GET requests selected fields will be transmitted as URL parameters. For POST, PUT, DELETE requests fields will be automatically populated with values from an existing resource.
             </p>
        </div>
    </div>
</div>