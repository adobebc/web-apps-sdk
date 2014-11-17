/**

The MIT License (MIT)

Copyright (c) 2014 Kelly Banman

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/

(function(app) {
    app.directive('selectize', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                selectize: '&',
                options: '&',
                ngChange: '&'
            },
            link: function(scope, element, attrs, ngModel) {            
                var changing, options, selectize, invalidValues = [];
                // Default options
                options = angular.extend({
                    delimiter: ',',
                    persist: true,
                    mode: element[0].tagName === 'SELECT' ? 'single' : 'multi'
                }, scope.selectize() || {});
                // Activate the widget
                selectize = element.selectize(options)[0].selectize;
                selectize.on('change', function() {
                    setModelValue(selectize.getValue());
                });

                function setModelValue(value) {
                        if (changing) {
                            return;
                        }
                        scope.$parent.$apply(function() {
                            ngModel.$setViewValue(value);
                        });
                        if (options.mode === 'single') {
                            selectize.blur();
                        }
                    }
                // Normalize the model value to an array
                function parseValues(value) {
                        if (angular.isArray(value)) {
                            return value;
                        }
                        if (!value) {
                            return [];
                        }
                        return String(value).split(options.delimiter);
                    }
                // Non-strict indexOf
                function indexOfLike(arr, val) {
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i] == val) {
                                return i;
                            }
                        }
                        return -1;
                    }
                // Boolean wrapper to indexOfLike
                function contains(arr, val) {
                        return indexOfLike(arr, val) !== -1;
                    }
                    // Store invalid items for late-loading options
                function storeInvalidValues(values, resultValues) {
                    values.map(function(val) {
                        if (!(contains(resultValues, val) || contains(invalidValues, val))) {
                            invalidValues.push(val);
                        }
                    });
                }

                function restoreInvalidValues(newOptions, values) {
                    var i, index;
                    for (i = 0; i < newOptions.length; i++) {
                        index = indexOfLike(invalidValues, newOptions[i][selectize.settings.valueField]);
                        if (index !== -1) {
                            values.push(newOptions[i][selectize.settings.valueField]);
                            invalidValues.splice(index, 1);
                        }
                    }
                }

                function setSelectizeValue(value) {
                    var values = parseValues(value);
                    if (changing || values === parseValues(selectize.getValue())) {
                        return;
                    }
                    changing = true;
                    setTimeout(function() {
                        selectize.setValue(values);
                        changing = false;
                        storeInvalidValues(values, parseValues(selectize.getValue()));
                        scope.ngChange();
                    });
                }

                function setSelectizeOptions(newOptions) {
                    var values = parseValues(ngModel.$viewValue);
                    selectize.clearOptions();
                    selectize.addOption(newOptions);

                    if (options.mode === 'multi' && newOptions) {
                        restoreInvalidValues(newOptions, values);
                    }
                    setSelectizeValue(values);
                }
                scope.$parent.$watch(attrs.ngModel, setSelectizeValue);
                
                if (attrs.options) {
                    scope.$parent.$watch(attrs.options, setSelectizeOptions);
                }

                scope.$on('$destroy', function() {
                    selectize.destroy();
                });
            }
        };
    });
})(DiscoveryApp);
