<!--
*
*
* Copyright (c) 2012-2015 Adobe Systems Incorporated. All rights reserved.

* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"),
* to deal in the Software without restriction, including without limitation
* the rights to use, copy, modify, merge, publish, distribute, sublicense,
* and/or sell copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
* DEALINGS IN THE SOFTWARE.
*
*
-->
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
