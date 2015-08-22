module.exports = function(config) {
    var configuration = {
        browsers: ["Chrome",  "Firefox"],

        customLaunchers: {
            Chrome_travis_ci: {
                base: "Chrome",
                flags: ["--no-sandbox"]
            }
        },

        frameworks: ["jasmine"],

        files: [
            "lib/webcomponentsjs/webcomponents-lite.min.js",
            {
                pattern: "lib/**",
                included: false,
                served: true,
                watched: true
            },
            "https://code.jquery.com/jquery-2.1.4.js",
            "https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js",
            {
                pattern: "src/bcapi.js",
                included: true,
                served: true,
                watched: true
            },
            {
                pattern: "src/helper.js",
                included: true,
                served: true,
                watched: true
            },            
            {
                pattern: "src/webcomponents/components.js",
                included: true,
                served: true,
                watched: true
            },
            "src/webcomponents/**/*.html",
            "src/webcomponents/**/*.js",
            {
                pattern: "test/webcomponents/components_helper.js",
                included: true
            },
            "tests/webcomponents/*.js"
        ],

        reporters: ["progress", "coverage"],

        preprocessors: {
            "src/**/*.js": ["coverage"]
        },

        port: 9876,

        proxies: {
            "/lib": "http://localhost:9876/base/lib",
            "/src": "http://localhost:9876/base/src"
        },

        coverageReporter: {
            type: "html",
            dir: "coverage/"
        }
    };

    if(process.env.TRAVIS){
        configuration.browsers = ["Chrome_travis_ci", "Firefox"];
    }

    config.set(configuration);    
};