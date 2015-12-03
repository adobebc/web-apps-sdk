/*
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
 */
//customer wrapper contains functions that make requests
var operations = {
    QueryCustomer: 0,
    QueryCustomers: 1,
    UpdateCustomer: 2
};

function customerWrapper() {
    this._lastCustomersHttpRequest = null;
    this._lastGetCustomerHttpRequest = null;
    this._lastUpdateCustomerRequest = null;
    this._lastDeleteCustomerRequest = null;
    this._rootPath = "/";
}

customerWrapper.prototype.queryCustomers = function (resource, queryString, access_token, abortLastRequest) {

    if (typeof this._lastCustomersHttpRequest !== "undefined" && this._lastCustomersHttpRequest != null && abortLastRequest) {
        this._lastCustomersHttpRequest.abort();
    }

    var requestBase = $.ajax({
        url: this._rootPath + "webresources/api/v3/sites/current/" + resource,
        type: "GET",
        conenection: "keep-alive",
        contentType: "application/json",
        data: queryString,
        processData: false,
        cache: false,
        timeout: 10000,
        headers: {
            "Authorization": access_token,
            "X-Adobe-SSL": true
        }
    });

    this._lastCustomersHttpRequest = requestBase;
    return requestBase;
}

customerWrapper.prototype.queryCustomer = function (customerId, queryString, access_token, abortLastRequest) {

    if (typeof this._lastGetCustomerHttpRequest !== "undefined" && this._lastGetCustomerHttpRequest != null && abortLastRequest) {
        this._lastGetCustomerHttpRequest.abort();
    }


    var url = this._rootPath + "webresources/api/v3/sites/current/customers/" + customerId;

    var requestBase = $.ajax({
        url: url,
        type: "GET",
        conenection: "keep-alive",
        contentType: "application/json",
        processData: false,
        data: queryString,
        cache: false,
        timeout: 10000,
        headers: {
            "Authorization": access_token,
            "X-Adobe-SSL": true
        }
    });

    this._lastGetCustomerHttpRequest = requestBase;
    return requestBase;
}

customerWrapper.prototype.updateCustomer = function (customerId, jsonData, access_token, abortLastRequest) {
    if (typeof this._lastUpdateCustomerRequest !== "undefined" && this._lastUpdateCustomerRequest != null && abortLastRequest) {
        this._lastUpdateCustomerRequest.abort();
    }

    var requestBase = $.ajax({
        url: this._rootPath + "webresources/api/v3/sites/current/customers/" + customerId,
        type: "PUT",
        conection: "keep-alive",
        contentType: "application/json",
        cache: false,
        timeout: 10000,
        processData: false,
        data: JSON.stringify(jsonData),
        headers: {
            "Authorization": access_token,
            "X-Adobe-SSL": true
        }
    });

    this._lastUpdateCustomerRequest = requestBase;
    return requestBase;
}

customerWrapper.prototype.deleteCustomer = function (customerId, access_token, abortLastRequest) {

    if (typeof this._lastDeleteCustomerRequest !== "undefined" && this._lastDeleteCustomerRequest != null && abortLastRequest) {
        this._lastUpdateCustomerRequest.abort();
    }

    var requestBase = $.ajax({
        url: this._rootPath + "webresources/api/v3/sites/current/customers/" + customerId,
        type: "DELETE",
        conection: "keep-alive",
        contentType: "application/json",
        cache: false,
        timeout: 10000,
        processData: false,
        headers: {
            "Authorization": access_token,
            "X-Adobe-SSL": true
        }
    });

    this._lastDeleteCustomerRequest = requestBase;
    return requestBase;
}


customerWrapper.prototype.getLastRequest = function (operationType) {
    if (!(operationType in operations)) {
        return;
    }

    switch (operationType) {
        case operations.QueryCustomer:
            return _lastGetCustomerHttpRequest;
        case operations.QueryCustomers:
            return _lastCustomersHttpRequest;
        case operations.UpdateCustomer:
            return _updateCustomerHttpRequest;

    }
}

var customerW = new customerWrapper();

var expandedCustomer = false;
var expandedOrders = false;
var access_token = BCAPI.Helper.Site.getAccessToken();

//This function it is used when receiveing an answer from a get customer request and populate the customer list
function renderCustomersFromObject(jsonObject) {

    var totalItems = jsonObject.totalItemsCount;

    if (totalItems == 0) {
        $("#main_content_table").append("No results found.");
        return;
    }

    for (var i = 0; i < jsonObject.items.length; i++) {
        var customer = jsonObject.items[i];
        renderCustomerFromObject(customer);
    }
    ;

    var nrPages = totalItems / 50;

    if (nrPages > 1) {
        showPagination(nrPages)
    }
}


function showPagination(nrPages) {
    var $ul = $("<ul/>", {
        class: "pagination"
    });

    for (var i = 0; i < nrPages; i++) {
        var skip = i * 50;
        $ul.append($("<li>").append($("<a/>", {
            onClick: "searchWithLimit(" + skip + ",50)"
        }).append(i + 1)));
    }
    $("#mainContentPanelBody").append($("<div/>", {
        class: "text-center",
        id: "paginationContainer"
    }).append($ul));
}

//This function it is used to render each customer row and append it to main table content.
function renderCustomerFromObject(jsonObject) {
    var $customerTableRow = $("<tr/>", {
        class: "customer" + jsonObject.id
    });

    var $customerIdTableData = $("<td/>").append($("<input/>", {
        class: "form-control firstFieldsDisabled",
        value: jsonObject.id,
        type: "text",
        id: "customerId_" + jsonObject.id
    }));
    $customerIdTableData.appendTo($customerTableRow);

    var $customerName = $("<td/>").append($("<input/>", {
        value: normalizeValue(jsonObject.firstName) + " " + normalizeValue(jsonObject.middleName) + " " + normalizeValue(jsonObject.lastName),
        class: "form-control firstFieldsDisabled",
        type: "text",
        id: "customerName"
    }));
    $customerName.appendTo($customerTableRow);

    var $customerHomePhoneTableData = $("<td/>").append($("<input/>", {
        class: "form-control firstFieldsDisabled",
        value: getValue(jsonObject.homePhone),
        type: "text",
        id: "homePhone"
    }));
    $customerHomePhoneTableData.appendTo($customerTableRow);

    var $customerEmailTableData = $("<td/>").append($("<input/>", {
        class: "form-control firstFieldsDisabled",
        value: getValue(jsonObject.email1),
        type: "text",
        id: "email1"
    }));
    $customerEmailTableData.appendTo($customerTableRow);

    var $chooseActionTableData = $("<td/>");
    $chooseActionTableData.appendTo($customerTableRow);

    var $buttonDivContainer = $("<div/>", {
        class: "btn-group"
    });
    $buttonDivContainer.appendTo($chooseActionTableData);

    //expand button
    var $customerShowDetailsTableData = $("<td/>");
    $customerShowDetailsTableData.appendTo($customerTableRow);
    var $customerShowDetailsButton = $("<button/>", {
        class: "btn btn-default accordion-toggle",
        title: "Show customer details",
        onClick: "advancedSearch(" + jsonObject.id + ")"
    });
    $customerShowDetailsButton.attr("data-target", "#" + jsonObject.id.toString());
    $customerShowDetailsButton.attr("data-toggle", "collapse");
    $customerShowDetailsButton.attr('alt', 'Customer details');
    $customerShowDetailsButton.appendTo($customerShowDetailsTableData);
    var $customerShowDetailsSpan = $("<span/>", {
        class: "glyphicon glyphicon-chevron-down",
        id: "expandBtn_" + jsonObject.id
    });
    $customerShowDetailsSpan.appendTo($customerShowDetailsButton);


    //show orders button
    var $customerShowDetailsTableData = $("<td/>");
    $customerShowDetailsTableData.appendTo($customerTableRow);
    var $customerShowDetailsButton = $("<button/>", {
        class: "btn btn-default accordion-toggle",
        title: "Show customer orders",
        onClick: "showOrders(" + jsonObject.id + ")"
    });
    $customerShowDetailsButton.attr("data-target", "#" + jsonObject.id.toString());
    $customerShowDetailsButton.attr("data-toggle", "collapse");
    $customerShowDetailsButton.attr("alt", "Customer orders");
    $customerShowDetailsButton.appendTo($customerShowDetailsTableData);
    var $customerShowDetailsSpan = $("<span/>", {
        class: "glyphicon glyphicon-list-alt",
        id: "showOrdersBtn_" + jsonObject.id
    });
    $customerShowDetailsSpan.appendTo($customerShowDetailsButton);

    //delete button
    var $customerDeleteColumn = $("<td/>");
    $customerDeleteColumn.appendTo($customerTableRow);
    var $customerDeleteButton = $("<button/>", {
        class: "btn btn-default",
        title: "Delete customer",
        onClick: "deleteCustomerWrap(" + jsonObject.id + ")"
    });

    $customerDeleteButton.attr("alt", "Delete customer");
    $customerDeleteButton.appendTo($customerDeleteColumn);
    var $customerDeleteSpan = $("<span/>", {
        class: "glyphicon glyphicon-remove"
    });
    $customerDeleteSpan.appendTo($customerDeleteButton);


    //append customer row to main table
    $customerTableRow.appendTo("#main_content_table");


    //disable inputs for editing
    $(".firstFieldsDisabled").attr('disabled', true);


    //add the div with the expandable content
    var $customerExpandedFieldsRow = $("<tr/>", {
        class: "customer" + jsonObject.id
    });
    var $customerExpandedTableData = $("<td/>", {
        colspan: "12",
        class: "hiddenRow"
    })
    var $colapsableDiv = $("<div/>", {
        class: "accordian-body collapse",
        id: jsonObject.id
    })
    $colapsableDiv.appendTo($customerExpandedTableData);
    $customerExpandedTableData.appendTo($customerExpandedFieldsRow);
    $customerExpandedFieldsRow.appendTo("#main_content_table");

}

//This function is used for extracting all input data from a customer and form a json object that will be used at update.
function extractCustomerData(customerId, access_token) {

    values = new Object;
    $(".form_" + customerId).each(function (index) {
        if ($(this).val() != 0) {
            propertyName = $(this).attr('id');

            field = values;

            if (propertyName.indexOf('.') > -1) {
                str = propertyName.split(".");

                for (var i = 0; i < str.length - 1; i++) {
                    if (!field.hasOwnProperty(str[i])) {
                        field[str[i]] = new Object();
                    }

                    field = field[str[i]];
                }

                field[str[str.length - 1]] = $(this).val();

            } else {
                values[propertyName] = $(this).val();
            }
        }
    });

    $("#" + customerId).html("");

    $("#" + customerId).append($("<div/>", {
        style: "text-align:center",
        id: "loaderCustomer" + customerId
    }).append($("<img/>", {
        src: "assets/images/loading.gif"
    })));


    var request = customerW.updateCustomer(customerId, values, access_token, true);

    request.done(function () {
        $("#" + customerId).html("");
        $("#" + customerId).removeClass("in");
        changeExpandButtonIcon(customerId);
        ajaxSuccess("Customer data updated successfully");
    });

    request.fail(function () {
        $("#" + customerId).html("");
        $("#" + customerId).removeClass("in");
        changeExpandButtonIcon(customerId);
        ajaxFailed("Could not update customer");
    })

}

function createQuery(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    query = {
        '$or': [{
            'firstName': {
                '$contains': searchTerm
            }
        }, {
            'lastName': {
                '$contains': searchTerm
            }
        }, {
            'middleName': {
                '$contains': searchTerm
            }
        }, {
            'homePhone.value': {
                '$contains': searchTerm
            }
        }]
    }

    return JSON.stringify(query);
}


$(function () {
    searchWithLimit(0, 50);
});

function cancelExpand(customerId) {
    $("#" + customerId).removeClass("in");
    changeExpandButtonIcon(customerId);
}

function disableSelects() {
    $(".disableSelect").attr("disabled", true);
    $("#valuesFilter").fadeToggle(100);
    $("#refreshButton").fadeToggle(100);
}

function refresh() {
    $("#refreshButton").fadeToggle(100);

    $(".disableSelect").attr("disabled", false);
    $('.disableSelect').val("0");

    $(".disableInputs").attr("disabled", false);
    $(".disableInputs").val("");

    $("#valuesFilter").fadeToggle(100);
    $("#searchButton").hide(100);
}

function disableInputsAndStartSearch() {
    $(".disableInputs").attr("disabled", true);
    $("#searchButton").fadeToggle(100);
}

function startSearch() {

    var property;
    $(".disableSelect").each(function (index) {
        if ($(this).val() != 0) {
            property = $(this).val();
        }
    });

    var operator;
    var propertyValue;

    $(".disableInputs").each(function (index) {
        if ($(this).val() != "") {
            propertyValue = $(this).val();
            operator = $(this).attr('id');
        }
    });

    query = new Object;

    switch (operator) {
        case 'lowerThan':
        {
            query[property] = new Object;
            query[property]['$lte'] = propertyValue;
        }
            break;

        case 'greaterThan':
        {
            query[property] = new Object;
            query[property]['$gte'] = propertyValue;
        }
            break;

        case 'notEquals':
        {
            query[property] = new Object;
            query[property]['$ne'] = propertyValue;
        }
            break;

        case 'equals':
        {
            query[property] = propertyValue;
        }
            break;

        case 'contains':
        {
            query[property] = new Object;
            query[property]['$contains'] = propertyValue;
        }
            break;

        case 'beginsWith':
        {
            query[property] = new Object;
            query[property]['$beginsWith'] = propertyValue;
        }
            break;
    }

    serializedQuery = JSON.stringify(query);

    refresh();
    $('#showFilter').fadeToggle(500);

    customerW.queryCustomers("customers", "where=" + serializedQuery + "&fields= id, homePhone, middleName,  lastName, firstName, email1", access_token, true).done(function (data) {
        renderCustomersFromObject(data);
    });

}

var queryTimeoutSet = false;

function simpleSearch() {
    if (!queryTimeoutSet) {
        queryTimeoutSet = true;
        setTimeout(function () {
            queryString = $('#simpleSearchField').val();
            customerW.queryCustomers("customers", "where=" + createQuery(queryString) + "&fields= id, homePhone, middleName,  lastName, firstName, email1", access_token, true).done(function (data) {
                renderCustomersFromObject(data);
                queryTimeoutSet = false;
            })
        }, 300)
    }
};

function changeExpandButtonIcon(customerId) {

    expandButton = $('#expandBtn_' + customerId);
    currentClass = expandButton.attr('class');
    if (currentClass == 'glyphicon glyphicon-chevron-down') {
        expandButton.attr("class", "glyphicon glyphicon-chevron-up");
    } else {
        expandButton.attr("class", "glyphicon glyphicon-chevron-down");
    }
}

function showOrders(customerId) {

    $('#' + customerId).html("");

    $("#" + customerId).append($("<div/>", {
        style: "text-align:center;background-image",
        id: "loaderCustomer" + customerId
    }).append($("<img/>", {
        src: "assets/images/loading.gif"
    })));

    var request = customerW.queryCustomers("orders", "where={\"entityId\":" + customerId + "}", access_token, true)

    request.done(function (data) {

        $('#' + customerId).html("");

        var $detailsTable = $("<table/>", {
            class: "table table-hover"
        }).
            append($("<thead/>").append($("<tr/>").append($("<th/>").append("Order id")).append($("<th/>").append("Name")).append($("<th/>").append("Total Price")).append($("<th/>").append("Invoiced")).append($("<th/>"))));

        var $tableBody = $("<tbody/>");

        $.each(data.items, function (index, order) {
            var $orderData = $("<tr/>").
                append($("<th/>").append(order.id)).
                append($("<th/>").append(order.name)).
                append($("<th/>").append(order.totalPrice)).
                append($("<th/>").append(order.invoiced)).
                append($("<th/>").append($("<a/>", {
                    href: "/webresources/api/v3/sites/current/orders/" + order.id + "?access_token=" + access_token + "&format=application/vnd.bc.ecommerce.invoice-pdf",
                    target: "_blank"
                }).append("Print invoice")))
            $orderData.appendTo($tableBody);
        });

        $tableBody.appendTo($detailsTable);

        var $expandableDiv = $('#' + customerId);

        $detailsTable.appendTo($expandableDiv);
    })

    request.fail(function () {
        $('#' + customerId).html("");
        ajaxFailed("Could not retrieve orders");
        $("#" + customerId).removeClass("in");
        changeExpandButtonIcon(customerId);
    })
}

function advancedSearch(customerId) {

    changeExpandButtonIcon(customerId);

    $("#" + customerId).append($("<div/>", {
        style: "text-align:center",
        id: "loaderCustomer" + customerId
    }).append($("<img/>", {
        src: "assets/images/loading.gif"
    })));

    var addressTypeNames = {
        "1": "Home Address",
        "2": "Work Address",
        "3": "PO Box",
        "8": "Billing Address"
    }
    var fields = "id,firstName,lastName,middleName,titleTypeId,email1,email2,email3,homeFax,homePhone,mobilePhone,pager,webAddress,workFax,workPhone,anniversary,titleType,ratingType,leadSourceType,industryType,customerType";

    var request = customerW.queryCustomer(customerId, "fields=" + fields, access_token, true);

    request.done(function (data) {
        customer = data;

        $('#' + customer.id).html("");

        var request2 = customerW.queryCustomers("titletypes", "", access_token, true);

        request2.done(function (titleTypes) {

            var $detailsTable = $("<table/>", {
                class: "table"
            }).
                append($("<thead/>").append($("<tr/>").append($("<th/>").append("Contact details")).append($("<th/>").append("Anniversaries")).append($("<th/>").append("Other details"))));


            var $firstName = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "firstName"
                }).append("First Name")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control form_" + customer.id,
                    id: "firstName",
                    placeholder: "First Name",
                    value: customer.firstName
                }));

            var $middleName = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "middleName"
                }).append("Middle Name")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control form_" + customer.id,
                    id: "middleName",
                    placeholder: "Middle Name",
                    value: customer.middleName
                }));


            var $lastName = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "lastName"
                }).append("Last Name ")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control form_" + customer.id,
                    id: "lastName",
                    placeholder: "Last Name",
                    value: customer.lastName
                }));


            var $homePhone = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "homePhone.value"
                }).append("Home Phone")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control form_" + customer.id,
                    id: "homePhone.value",
                    placeholder: "Home Phone",
                    value: getValue(customer.homephone)
                }));

            var $homeFax = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "homeFax.value"
                }).append("Home Phone")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control form_" + customer.id,
                    id: "homeFax.value",
                    placeholder: "Home Fax",
                    value: getValue(customer.homeFax)
                }));


            var $workPhone = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "workPhone.value"
                }).append("workPhone ")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control form_" + customer.id,
                    id: "workPhone.value",
                    placeholder: "Work Phone",
                    value: getValue(customer.workPhone)
                }));


            var $workFax = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "workFax.value"
                }).append("Home Phone")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control form_" + customer.id,
                    id: "workFax.value",
                    placeholder: "Work Fax",
                    value: getValue(customer.workFax)
                }));


            var $mobilePhone = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "mobilePhone.value"
                }).append("Home Phone")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control form_" + customer.id,
                    id: "mobilePhone.value",
                    placeholder: "Mobile Phone",
                    value: getValue(customer.mobilePhone)
                }));


            var $pager = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "pager.value"
                }).append("Pager")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control form_" + customer.id,
                    id: "pager.value",
                    placeholder: "Pager",
                    value: getValue(customer.page)
                }));


            var $email1 = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "email1.value"
                }).append("Email")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control form_" + customer.id,
                    id: "email1.value",
                    placeholder: "Email",
                    value: getValue(customer.email1)
                }));


            var $email2 = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "email2.value"
                }).append("Email 2")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control form_" + customer.id,
                    id: "email2.value",
                    placeholder: "Email 2",
                    value: getValue(customer.email2)
                }));


            var $email3 = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "email3.value"
                }).append("Email 3")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control form_" + customer.id,
                    id: "email3.value",
                    placeholder: "Email 3",
                    value: getValue(customer.email3)
                }));


            var $webaddress = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "webAddress.value"
                }).append("Webaddress")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control form_" + customer.id,
                    id: "webAddress.value",
                    placeholder: "Webaddress",
                    value: getValue(customer.webAddress)
                }));


            var $anniversary1Date = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "anniversary.anniversary1Title"
                }).append("Anniversary 1 Title")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control form_" + customer.id,
                    id: "anniversary.anniversary1Title",
                    placeholder: "Anniversary 1 Title",
                    value: function () {
                        if (customer.anniversary !== null && customer.anniversary !== undefined)
                            return customer.anniversary.anniversary1Title
                        else return ""
                    }
                }));

            var $anniversary1Title = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "anniversary.anniversary1Date"
                }).append("Anniversary 1 Date")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control form_" + customer.id,
                    id: "anniversary.anniversary1Date",
                    placeholder: "Anniversary 1 Date",
                    value: function () {
                        if (customer.anniversary !== null && customer.anniversary !== undefined)
                            return customer.anniversary.anniversary1Date
                        else return ""
                    }
                }));

            var $ratingType = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "ratingType.label"
                }).append("Rating Type")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control",
                    id: "ratingType.label",
                    placeholder: "Rating Type"
                }));

            var $industryType = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "industryType.label"
                }).append("Industry Type")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control",
                    id: "industryType.label",
                    placeholder: "Industry Type"
                }));

            var $customerType = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "customerType.label"
                }).append("Customer Type")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control",
                    id: "customerType.label",
                    placeholder: "Customer Type"
                }));

            var $leadSourcetye = $("<div/>", {
                class: "form-group"
            }).
                append($("<label/>", {
                    for: "leadSourceType.label"
                }).append("Lead Source Type")).
                append($("<input/>", {
                    type: "text",
                    class: "form-control",
                    id: "leadSourceType.label",
                    placeholder: "Lead Source Type"
                }));

            var $titleDiv = $("<div/>", {
                class: "form-group"
            });

            $titleDiv.append($("<label/>", {
                for: "titleTypeId"
            }).append("Title Type"));

            var $titleTypeSelect = $("<select/>", {
                class: "form-control form_" + customer.id,
                id: "titleTypeId"
            });


            $.each(titleTypes.items, function (index, value) {
                if (value.id == customer.titleTypeId) {
                    $titleTypeSelect.append($("<option/>", {
                        value: value.id,
                        selected: "selected"
                    }).append(value.label))
                } else {
                    $titleTypeSelect.append($("<option/>", {
                        value: value.id
                    }).append(value.label))
                }

            });

            $titleTypeSelect.appendTo($titleDiv);

            var $saveButton = $("<button/>", {
                class: "btn btn-default pull-right",
                onClick: "extractCustomerData(" + customer.id + "," + "\"" + access_token.toString() + "\"" + ")",
                id: "saveBtn_" + customer.id,
                style: "margin-left:10px"
            });

            var $customerSaveSpan = $("<span/>", {
                class: "glyphicon glyphicon-save"
            }).append("Save");
            $customerSaveSpan.appendTo($saveButton);


            var $cancelButton = $("<button/>", {
                class: "btn btn-default pull-right",
                onClick: "cancelExpand(" + customer.id + ")",

            });

            var $customerCancelSpan = $("<span/>", {
                class: "glyphicon glyphicon-remove-sign"
            }).append("Cancel");
            $customerCancelSpan.appendTo($cancelButton);


            var $tableBody = $("<tbody/>").
                append($("<tr/>").append($("<td/>").append($firstName).append($middleName).append($lastName).
                        append($mobilePhone).
                        append($email1).
                        append($webaddress)
                ).append($("<td/>").append($anniversary1Date).append($anniversary1Title)
                ).append($("<td/>").
                        append($titleDiv)
                )).append($("<tr/>").append($("<td/>")).append($("<td/>")).append($("<td/>").append($saveButton).append($cancelButton)));


            $tableBody.appendTo($detailsTable);


            var $expandableDiv = $('#' + customer.id);

            $detailsTable.appendTo($expandableDiv);
        });

    });

    request.fail(function () {
        $('#' + customerId).html("");
        $("#" + customerId).removeClass("in");
        changeExpandButtonIcon(customerId);
        ajaxFailed("Could not retrieve extra data for customer with id " + customerId);
    })

}

function getValue(object) {
    if (object !== null && object !== undefined) {
        return object.value
    }
    else {
        return "";
    }
}

function normalizeValue(value) {
    if(value) {
        return value;
    }
    else {
        return "";
    }
}


function enableForEdit(customerId) {
    $(".form_" + customerId).attr("disabled", false);
    $("#editBtn_" + customerId).hide();
    $('#saveBtn_' + customerId).show();
}

function ajaxSuccess(message) {
    systemNotifications.showSuccess("Operation succesfull", message);
}

function ajaxFailed(message) {

    if (typeof message == 'undefined') {
        message = "An error occurred."
    }

    systemNotifications.showError(message);
}


function searchWithLimit(skip, limit) {

    $('#main_content_table tbody').html("");

    var oldPagination = $("#paginationContainer");
    if (oldPagination != null) {
        oldPagination.remove();
    }

    $("#searchLoader").show();

    var operator = 'default';
    //big filter check
    $(".disableInputs").each(function (index) {
        if ($(this).val() != "") {
            propertyValue = $(this).val();
            operator = $(this).attr('id');
        }
    });

    var orderBy = "";
    if ($("#orderBy").val() != 0) {
        orderBy = "&order=" + $("#orderBy").val();
    }


    if (operator == 'default') {
        //simple search check
        if (!queryTimeoutSet) {
            queryTimeoutSet = true;
            setTimeout(function () {

                queryString = $('#simpleSearchField').val();

                query = "where=" + createQuery(queryString) + "&fields= id, homePhone, middleName,  lastName, firstName, email1&skip=" + skip + "&limit=" + limit + orderBy;
                ;

                var request = customerW.queryCustomers("customers", query, access_token, true);

                request.always(function () {
                    $("#searchLoader").hide();
                    queryTimeoutSet = false;
                })

                request.done(function (data) {
                    renderCustomersFromObject(data);

                })

                request.fail(function () {
                    ajaxFailed("Could not retrieve customers");
                })

            }, 300)
        }
        ;
    } else {
        var property;
        $(".disableSelect").each(function (index) {
            if ($(this).val() != 0) {
                property = $(this).val();
            }
        });
        query = new Object;
        switch (operator) {
            case 'lowerThan':
            {
                query[property] = new Object;
                query[property]['$lte'] = propertyValue;
            }
                break;

            case 'greaterThan':
            {
                query[property] = new Object;
                query[property]['$gte'] = propertyValue;
            }
                break;

            case 'notEquals':
            {
                query[property] = new Object;
                query[property]['$ne'] = propertyValue;
            }
                break;

            case 'equals':
            {
                query[property] = propertyValue;
            }
                break;

            case 'contains':
            {
                query[property] = new Object;
                query[property]['$contains'] = propertyValue;
            }
                break;

            case 'beginsWith':
            {
                query[property] = new Object;
                query[property]['$beginsWith'] = propertyValue;
            }
                break;
        }

        serializedQuery = JSON.stringify(query);


        refresh();
        $('#showFilter').fadeToggle(500);

        skipQuery = "where=" + serializedQuery + "&fields= id, homePhone, middleName,  lastName, firstName, email1&skip=" + skip + "&limit=" + limit;

        var filterRequest = customerW.queryCustomers("customers", skipQuery, access_token, true);

        filterRequest.done(function (data) {
            $("#searchLoader").hide();
            renderCustomersFromObject(data);
        });

        filterRequest.fail(function () {
            $("#searchLoader").hide();
            ajaxFailed("Could not retrieve customers");
        })
    }
}

function deleteCustomerWrap(customerId) {

    var x = confirm("Are you sure you want to delete this customer?");

    if (x) {
        request = customerW.deleteCustomer(customerId, access_token);
        request.done(function () {
            ajaxSuccess("Customer deleted successfully");
            $(".customer" + customerId).remove();
        })
        request.fail(function () {
            ajaxFailed("Could not delete customer");
        })
    }
}
