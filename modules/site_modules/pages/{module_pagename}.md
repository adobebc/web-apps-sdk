## {module_pagename}

This module simply renders a web page name.

### Examples

`{module_pagename}`

Renders the name of the page in plain text

***

`<img src=”/images/module_pagename.jpg”>`

You can make a different image load on a per page basis by using `{module_pagename}` in the image source as shown above. 

This will then render the word ‘About’ (if you are on a page named ‘About’) and the resulting image link would be <img src=”/images/About.jpg”>.

***

`<title>My Site | {module_pagename}</title>`

You can also use this module between the title tags to set the page title.
