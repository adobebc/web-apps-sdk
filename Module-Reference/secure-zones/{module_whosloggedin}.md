## {module_whosloggedin,page}

Renders the name of the customer that is currently logged in, and a Log Out link.

### Parameters

`page` - The page you want to send the customer to when they click the [Log in] link.

### Examples

If a user is logged in, `{module_whosloggedin,/loginpage.htm}` renders:

`John Smith logged in. <a href="/LogOutProcess.aspx">Log out</a>.`

***

If no users are logged in `{module_whosloggedin,/loginpage.htm}` renders:

`No one logged in. <a href="/loginpage.htm">Log in</a>`
