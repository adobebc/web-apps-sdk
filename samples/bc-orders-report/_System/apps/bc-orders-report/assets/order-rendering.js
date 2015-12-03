/* 
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
 */

function orderWrapper() {
    this._rootPath = "/";
}

orderWrapper.prototype.queryOrders = function (queryString, access_token) {

    var requestBase = $.ajax({
        url: this._rootPath + "webresources/api/v3/sites/current/orders",
        type: "GET",
        conenection: "keep-alive",
        contentType: "application/json",
        data: queryString,
        processData: false,
        cache: false,
        timeout: 20000,
        headers: {
            "Authorization": access_token
        }
    });

    return requestBase;
}

orderWrapper.prototype.queryOrderItems = function (queryString, access_token) {


    var url = this._rootPath + "webresources/api/v3/sites/current/orderitems";

    var requestBase = $.ajax({
        url: url,
        type: "GET",
        conenection: "keep-alive",
        contentType: "application/json",
        processData: false,
        data: queryString,
        cache: false,
        timeout: 20000,
        headers: {
            "Authorization": access_token
        }
    });

    return requestBase;
}

var orderW = new orderWrapper();
var access_token = BCAPI.Helper.Site.getAccessToken();

//This function it is used to render each order row and append it to main table content.
function renderRow(orderStatus, id, row) {
    var $orderTableRow = $("<tr/>", {
        class: "resultRow" + id
    });

    var precision = 2;

    var $statusTypeData = $("<td/>").append($("<span/>", {
        text: orderStatus
    }).css('white-space', 'pre'));
    $statusTypeData.appendTo($orderTableRow);

    var $totalOrdersData = $("<td/>").append($("<span/>", {
        text: row.TotalOrders
    }).css('white-space', 'pre'));
    $totalOrdersData.appendTo($orderTableRow);

    var $subtotalData = $("<td/>").append($("<span/>", {
        text: numberWithCommas(row.Subtotal.toFixed(precision))
    }).css('white-space', 'pre'));
    $subtotalData.appendTo($orderTableRow);

    var $totalShippingData = $("<td/>").append($("<span/>", {
        text:  numberWithCommas(row.Subtotal.toFixed(precision))
    }).css('white-space', 'pre'));
    $totalShippingData.appendTo($orderTableRow);

    var $totalTaxData = $("<td/>").append($("<span/>", {
        text: numberWithCommas(row.Subtotal.toFixed(precision))
    }).css('white-space', 'pre'));
    $totalTaxData.appendTo($orderTableRow);

    var $totalAmountData = $("<td/>").append($("<span/>", {
        text:  numberWithCommas(row.Subtotal.toFixed(precision))
    }).css('white-space', 'pre'));
    $totalAmountData.appendTo($orderTableRow);

    //append order row to main table
    $orderTableRow.appendTo($("#main_content_table").children("tbody"));
}

function RowResult() {
    this.TotalShipping = 0;
    this.TotalTax = 0;
    this.TotalAmount = 0;
    this.TotalOrders = 0;
    this.Subtotal = 0;
}

function renderRowTotals(id, resultRows) {
    var row = new RowResult();

    for (var statusType in resultRows) {
        if (resultRows.hasOwnProperty(statusType)) {
            row.TotalShipping += resultRows[statusType].TotalShipping;
            row.TotalTax += resultRows[statusType].TotalTax;
            row.TotalAmount += resultRows[statusType].TotalAmount;
            row.TotalOrders += resultRows[statusType].TotalOrders;
            row.Subtotal += resultRows[statusType].Subtotal;
        }
    }

    var precision = 2;

    var $orderTableRow = $("<tr/>", {
        class: "resultRow" + id
    });

    var $statusTypeData = $("<td/>").append($("<b/>", {
        text: "Total"
    }).css('white-space', 'pre'));
    $statusTypeData.appendTo($orderTableRow);

    var $totalOrdersData = $("<td/>").append($("<b/>", {
        text: numberWithCommas(row.TotalOrders)
    }).css('white-space', 'pre'));
    $totalOrdersData.appendTo($orderTableRow);

    var $subtotalData = $("<td/>").append($("<b/>", {
        text: numberWithCommas(row.Subtotal.toFixed(precision))
    }).css('white-space', 'pre'));
    $subtotalData.appendTo($orderTableRow);

    var $totalShippingData = $("<td/>").append($("<b/>", {
        text: numberWithCommas(row.TotalShipping.toFixed(precision))
    }).css('white-space', 'pre'));
    $totalShippingData.appendTo($orderTableRow);

    var $totalTaxData = $("<td/>").append($("<b/>", {
        text: numberWithCommas(row.TotalTax.toFixed(precision))
    }).css('white-space', 'pre'));
    $totalTaxData.appendTo($orderTableRow);

    var $totalAmountData = $("<td/>").append($("<b/>", {
        text: numberWithCommas(row.TotalAmount.toFixed(precision))
    }).css('white-space', 'pre'));
    $totalAmountData.appendTo($orderTableRow);

    //append order row to main table
    $orderTableRow.appendTo($("#main_content_table").children("tbody"));
}


$(function () {
    $("#searchLoader").hide();

    $(".date-picker").datepicker({
        beforeShow: function () {
            setTimeout(function () {
                $(".ui-datepicker").css("z-index", 9999999);
            }, 10);
        }
    });

    $(".date-picker").on("change", function () {
        $("#datePeriod").val("0");
    });

    $("#datePeriod").val('Today');
    changeDate();
    generateList();
});

function changeDate() {
    var period = $("#datePeriod").val();
    if (period != "0") {
        var nowDate = new Date();
        var startDate = undefined;
        if (period == "Today") {
            startDate = new Date();
            startDate.setDate(nowDate.getDate());
            startDate.setHours(0, 0, 0, 0);
        }
        else if (period == "Yesterday") {
            startDate = new Date();
            startDate.setDate(nowDate.getDate() - 1);
            startDate.setHours(0, 0, 0, 0);
        }
        else if (period == "Last Week") {
            startDate = new Date();
            startDate.setDate(nowDate.getDate() - 7);
            startDate.setHours(0, 0, 0, 0);
        }
        else if (period == "Last Month") {
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear(), startDate.getMonth() - 1, startDate.getDay());
            startDate.setHours(0, 0, 0, 0);
        }
        else if (period == "Last 3 Months") {
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear(), startDate.getMonth() - 3, startDate.getDay());
            startDate.setHours(0, 0, 0, 0);
        }
        else if (period == "Last 6 Months") {
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear(), startDate.getMonth() - 6, startDate.getDay());
            startDate.setHours(0, 0, 0, 0);
        }
        else if (period == "Last Year") {
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear() - 1, startDate.getMonth(), startDate.getDay());
            startDate.setHours(0, 0, 0, 0);
        }

        $('#datepickerStart').datepicker("setDate", startDate);
        $('#datepickerEnd').datepicker("setDate", nowDate);
    }
}

var doneGeneratingPreviousList = true;
function generateList() {
    if (!doneGeneratingPreviousList) {
        return;
    }
    doneGeneratingPreviousList = false;

    $('#main_content_table tbody').html("");

    $("#searchLoader").show();

    var startDate = $("#datepickerStart").datepicker("getDate");
    var endDate = $("#datepickerEnd").datepicker("getDate");

    if (endDate != null) {
        endDate = new Date(endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
            23, 59, 59);
    }
    else {
        var nowDate = new Date();
        endDate = new Date(nowDate.getFullYear(),
            nowDate.getMonth(),
            nowDate.getDate(),
            23, 59, 59);
    }

    if (startDate == null) {
        var beginningOfTimeDate = new Date(1971, 2, 2);
        startDate = beginningOfTimeDate;
    }

    var whereQuery = encodeURI('{ "$and": [ {  "createDate": { "$gte": ' + '"' + startDate.toISOString() + '"' + '} }, \
                                            { "createDate": { ' + '"$lt":' + '"' + endDate.toISOString() + '"' + '} } ] }');

    var query = "where=" + whereQuery;

    var request = orderW.queryOrders(query, access_token);

    request.done(function (orderResult) {
        // array that will contain all deferred objects
        var deferreds = [];

        // make the ajax calls for orders
        for (var i = 0; i < orderResult.totalItemsCount; i += 500) {
            var query = "skip=" + i + "&limit=500" + "&fields=id,status,taxCode,taxCodeId,shippingPrice,shippingTaxRate,totalPrice" + "&where=" + whereQuery;
            var request = orderW.queryOrders(query, access_token);
            deferreds.push(request);
        }

        // check if all ajax calls have finished
        var defferedPromises = $.when.apply($, deferreds);

        defferedPromises.done(function () {

            var orders = {};

            resultRows = {};
            if (!($.isArray(arguments)) && $.isArray(arguments[0]))
            // arguments contain tuples (array[3]) (data, state, jXHR) for each callback that would be passed to each ajax done function.
            // Also, in this case, arguments is an object, not an array, even though it behaves like an array.
            {

                for (var i = 0; i < arguments.length; i++) {

                    var orderResult = arguments[i][0];
                    orderResult.items.forEach(function (item) {

                        if (typeof item == 'undefined') {
                            return;
                        }

                        if (typeof item != 'undefined' && item.status == null) {
                            item.status = {label: "Undefined status"};
                        }

                        if (!(item.status.label in resultRows)) {
                            resultRows[item.status.label] = new RowResult();
                        }

                        resultRows[item.status.label].TotalShipping += item.shippingPrice;
                        resultRows[item.status.label].TotalTax += item.shippingPrice * item.shippingTaxRate;
                        resultRows[item.status.label].TotalOrders++;
                        resultRows[item.status.label].TotalAmount += item.totalPrice;

                        if (item.taxCodeId != null && item.taxCodeId != -1) {
                            var preTax = item.totalPrice / (1 + item.taxCode.rate);
                            resultRows[item.status.label].Subtotal += preTax;
                            resultRows[item.status.label].TotalTax += item.totalPrice - preTax;
                        }

                        orders[item.id] = item;
                    });
                }
            } else if (arguments.length != 0)// for only one ajax result there is no tuple, just the 3 elements that would be in a tuple
            {
                var orderResult = arguments[0];

                orderResult.items.forEach(function (item) {

                    if (typeof item == 'undefined') {
                        return;
                    }

                    if (typeof item != 'undefined' && item.status == null) {
                        item.status = {label: "Undefined status"};
                    }

                    if (!(item.status.label in resultRows)) {
                        resultRows[item.status.label] = new RowResult();
                    }

                    resultRows[item.status.label].TotalShipping += item.shippingPrice;
                    resultRows[item.status.label].TotalTax += item.shippingPrice * item.shippingTaxRate;
                    resultRows[item.status.label].TotalOrders++;
                    resultRows[item.status.label].TotalAmount += item.totalPrice;

                    if (item.taxCodeId != null && item.taxCodeId != -1) {
                        var preTax = item.totalPrice / (1 + item.taxCode.rate);
                        resultRows[item.status.label].Subtotal += preTax;
                        resultRows[item.status.label].TotalTax += item.totalPrice - preTax;
                    }

                    orders[item.id] = item;
                });
            }

            // make the ajax calls for the products of the orders

            var orderItemRequest = orderW.queryOrderItems("", access_token);

            var defferedProductRequests = [];

            orderItemRequest.done(function (orderItemsResult) {
                for (var i = 0; i < orderItemsResult.totalItemsCount; i += 500) {
                    var query = "skip=" + i + "&limit=500";
                    var request = orderW.queryOrderItems(query, access_token);
                    defferedProductRequests.push(request)
                }

                var defferedOrderItemPromises = $.when.apply($, defferedProductRequests);

                defferedOrderItemPromises.done(function () {
                    if (!($.isArray(arguments)) && $.isArray(arguments[0]))
                    // arguments contain tuples (array[3]) (data, state, jXHR) for each callback that would be passed to each ajax done function.
                    // Also, in this case, arguments is an object, not an array, even though it behaves like an array.
                    {

                        for (var i = 0; i < arguments.length; i++) {

                            var orderItemResult = arguments[i][0];
                            orderItemResult.items.forEach(function (item) {

                                if (typeof orders[item.orderId] != 'undefined' && orders[item.orderId].taxCodeId == null) {
                                    resultRows[orders[item.orderId].status.label].Subtotal += item.units * item.unitPrice;
                                    resultRows[orders[item.orderId].status.label].TotalTax += item.units * item.unitPrice * item.unitTaxRate;
                                }

                            });
                        }
                    } else // for only one ajax result there is no tuple, just the 3 elements that would be in a tuple
                    {
                        var orderItemResult = arguments[0];

                        orderItemResult.items.forEach(function (item) {

                            if (typeof orders[item.orderId] != 'undefined' && orders[item.orderId].taxCodeId == null) {
                                resultRows[orders[item.orderId].status.label].Subtotal += item.units * item.unitPrice;
                                resultRows[orders[item.orderId].status.label].TotalTax += item.units * item.unitPrice * item.unitTaxRate;
                            }

                        });
                    }

                    $("#searchLoader").hide();

                    var id = 0;

                    for (var statusType in resultRows) {
                        if (resultRows.hasOwnProperty(statusType)) {
                            if (statusType != "Undefined status") {
                                renderRow(statusType, id++, resultRows[statusType]);
                            }

                        }
                    }

                    if ("Undefined status" in resultRows && resultRows.hasOwnProperty("Undefined status")) {
                        renderRow("Undefined status", id++, resultRows["Undefined status"]);
                    }

                    renderRowTotals(id, resultRows);
                    doneGeneratingPreviousList = true;
                });

                defferedOrderItemPromises.fail(function () {
                    $("#searchLoader").hide();
                    doneGeneratingPreviousList = true;
                    ajaxFailed("Could not retrieve all products");
                });
            });

        });

        defferedPromises.fail(function () {
            $("#searchLoader").hide();
            doneGeneratingPreviousList = true;
            ajaxFailed("Could not retrieve all orders");
        });
    });

    request.fail(function () {
        $("#searchLoader").hide();
        doneGeneratingPreviousList = true;
        ajaxFailed("Could not query number of order items");
    });
}

function ajaxFailed(message) {

    if (typeof message == 'undefined') {
        message = "An error occurred."
    }

    systemNotifications.showError(message);
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}