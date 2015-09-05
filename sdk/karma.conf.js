module.exports = function(config) {
    var configuration = {
        browsers: ["Chrome", "Firefox"],

        frameworks: ["jasmine"],

        files: [
            "lib/webcomponentsjs/webcomponents-lite.min.js",
            {
                pattern: "lib/**",
                included: false,
                served: true,
                watched: false
            },
            "https://code.jquery.com/jquery-2.1.4.js",
            "https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js",
            {
                pattern: "src/bcapi.js",
                included: true,
                served: true,
                watched: false
            },
            {
                pattern: "src/helper.js",
                included: true,
                served: true,
                watched: false
            },
            {
                pattern: "src/webcomponents/components.js",
                included: true,
                served: true,
                watched: false
            },
            {
                pattern: "src/webcomponents/components_exceptions.js",
                included: true,
                served: true,
                watched: false
            },
            {
                pattern: "src/webcomponents/datasources/datasource.js",
                included: true,
                served: true,
                watched: false
            },
            {
                pattern: "src/webcomponents/**/*.js",
                included: false,
                served: true,
                watched: false
            },
            {
                pattern: "src/webcomponents/**/*.html",
                included: true,
                served: true,
                watched: false
            },
            {
                pattern: "test/webcomponents/helpers/components_helper.js",
                included: true,
                watched: false
            },
            {
                pattern: "test/webcomponents/helpers/custom_matchers.js",
                included: true,
                watched: false
            },
            {
                pattern: "test/webcomponents/**/*.js",
                watched: false
            }
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

    config.set(configuration);
};