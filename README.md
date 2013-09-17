# bcapi.js

This is a sample library for working with Business Catalyst API. For more information on how to use this please read 
[BCAPI generated doc](http://adobebc.github.io/bcapi.js/).

## Setup dev environment

For setting up bcapi.js project development environment follow the steps below:

  - install [Git](http://git-scm.com/book/en/Getting-Started-Installing-Git) on your computer
  - install [NodeJS](http://nodejs.org/) on your computer (optional)
  - launch a command line / terminal
  - git clone https://github.com/adobebc/bcapi.js.git
  - cd bcapi.js
  - npm install grunt grunt-cli grunt-jsdoc grunt-contrib-concat grunt-contrib-uglify
  - Generate documentation: 
    - node_modules/.bin/grunt jsdoc
    - Access doc/index.html (for getting started)
  - Run unit tests (works on Linux and Mac OS):
    - ./run_specs &lt;browsers absolute path comma separated values&gt; (e.g: ./run_specs /usr/bin/google-chrome,/usr/bin/firefox)
  - Run integration tests (works on Linux and Mac OS)
    - ./run_integration &lt;browsers absolute path comma separated values&gt; (e.g: ./run_integration /usr/bin/google-chrome,/usr/bin/firefox)
  - Generate a bcapi distribution:
    - ./node_modules/.bin/grunt concat uglify:bcapi_dist
    - Access dist/bcapi-full.js (non minified version of bcapi)
    - Access dist/bcapi-full.min.js (minified version of bcapi)
