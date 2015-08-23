window.ComponentCustomMatchers = (function() {
    return {
        /**
         * This method provides a custom matcher which can be used to determine if a given function raises a concrete 
         * exception or not.
         */
        toBeCustomError: function() {
            return {
                compare: function(interceptedMethod, errorType) {
                    var result = {};

                    try {
                        interceptedMethod();

                        result.pass = false;
                        result.message = "The intercepted method did not raised exception of type: " + errorType;
                    }
                    catch(actualEx) {
                        result.pass = actualEx.errorType === errorType && actualEx.msg;

                        if (!result.pass) {
                            if (!actualEx) {
                                result.message = "No exception provided for assertion."
                            }
                            else if (actualEx.errorType !== errorType) {
                                result.message = "The given exception is not a custom exception of type " + errorType;
                            }
                            else if (!actualEx.msg) {
                                result.message = "The given exception does not have a msg set."
                            }
                        }
                    }

                    return result;
                }
            }
        }
    };
})(); 