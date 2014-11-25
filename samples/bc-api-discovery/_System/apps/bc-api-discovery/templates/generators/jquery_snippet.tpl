<code class="javascript hljs">
    var request = $.ajax({<br>
    &nbsp;&nbsp;&nbsp;&nbsp;url: {{url}},<br>
    {{~#if dataFields}}
    &nbsp;&nbsp;&nbsp;&nbsp;{{dataFields}},<br>
    {{~/if~}}
    &nbsp;&nbsp;&nbsp;&nbsp;type: {{methodType}},<br>
    &nbsp;&nbsp;&nbsp;&nbsp;contentType: "application/json",<br>
    &nbsp;&nbsp;&nbsp;&nbsp;headers: {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "Authorization":  BCAPI.Helper.Site.getAccessToken()<br>
    &nbsp;&nbsp;&nbsp;&nbsp;}<br>
    });<br>
    request.done(function(data) {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;console.log(data);<br>
    })<br>
    &nbsp;&nbsp;&nbsp;&nbsp;request.fail(function(jqXHR) {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;console.log("Request failed.");<br>
    &nbsp;&nbsp;&nbsp;&nbsp;console.log("Error code: " + jqXHR.status);<br>
    &nbsp;&nbsp;&nbsp;&nbsp;console.log("Error text: " + jqXHR.statusText);<br>
    &nbsp;&nbsp;&nbsp;&nbsp;console.log("Response text: " + jqXHR.responseText);<br>
    })<br>
</code>
