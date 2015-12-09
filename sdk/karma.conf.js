module.exports = function(config) {
    var configuration = {
        browsers: ["Chrome", "Firefox"],

        coverageReporter: {
            type: "html",
            dir: "coverage/"
        },

        frameworks: ["jasmine"],

        files: [
            "lib/webcomponentsjs/webcomponents.min.js",
            {
                pattern: "lib/**",
                included: false,
                served: true,
                watched: false
            },
            "lib/jquery/dist/jquery.js",
            "lib/jquery-cookie/jquery.cookie.js",
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
                included: true,
                served: true,
                watched: true
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

        preprocessors: {
            "src/**/*.js": ["coverage"]
        },

        port: 9876,

        proxies: {
            "/lib": "http://localhost:9876/base/lib",
            "/src": "http://localhost:9876/base/src"
        },

        reporters: ["progress", "coverage", "threshold"],

        thresholdReporter: {
            statements: 95,
            branches: 95,
            functions: 95,
            lines: 95
        }
    };

    config.set(configuration);
};