Web Components technologies are Working Drafts

The web components related technologies are working drafts or less, subject to change
-   HTML Templates - http://www.w3.org/TR/2014/NOTE-html-templates-20140318/ - is a Group Note
-   Custom Elements - http://www.w3.org/TR/2014/WD-custom-elements-20141216/ - Working Draft
-   Shadow DOM - http://www.w3.org/TR/2014/WD-shadow-dom-20140617/- Working Draft
-   HTML Imports - http://www.w3.org/TR/2014/WD-html-imports-20140311/ - Working Drafts

Web Components Polyfills
Polymer uses web components polyfills in the browsers that don't implement web components, currently FF, Safari and IE.
Polyfills are developed on http://webcomponents.org/ mostly by Google to support Polymer and advances to the Web Components spec.

My concerns are:
-   the quality of the Polyfills, current and ongoing as Polymer advances.
The risk is we might find and be forced to fix bugs in the polyfills to support our components instead of investing time in the component development itself.
The risk applies also to external component developers, BC partners developing for the BC platform.
-   the UI performance on large apps, many elements or complex elements.
This concern is not backed by any benchmark but only by my personal experience with working with large DOM structures and many event listeners.

There appears to be other polyfills for web components but these concerns still applies.
  
Even though Google declares Polyfill 1.0 "Production Ready", the core elements from the Polymer Elements Catalog have issues in FF and IE.
The demos from the Polymer Elements Catalog, https://elements.polymer-project.org/, don’t work in IE11, and I found some issues on FF.
Probably we won't use the elements from this catalog, but any component development will need to take the polyfills risk into account.
