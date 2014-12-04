/* 
* 
* Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

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

orderWrapper.prototype.queryOrders = function(queryString, access_token) {


    console.log(access_token);

    var requestBase = $.ajax({
        url: this._rootPath + "webresources/api/v3/sites/current/orders",
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

    return requestBase;
}

orderWrapper.prototype.queryOrderItems = function(queryString, access_token) {


    var url = this._rootPath + "webresources/api/v3/sites/current/orderitems";

    console.log(queryString);
    console.log(url);

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

    return requestBase;
}

var orderW = new orderWrapper();
var access_token = BCAPI.Helper.Site.getAccessToken();


//This function it is used to render each order row and append it to main table content.
function renderRow(orderStatus, id, row) {
    var $orderTableRow = $("<tr/>", {
        class: "resultRow" + id
    });

    var $statusTypeData = $("<td/>").append($("<span/>", {
        text: orderStatus
    }).css('white-space', 'pre'));
    $statusTypeData.appendTo($orderTableRow);

    var $totalOrdersData = $("<td/>").append($("<span/>", {
        text: row.TotalOrders
    }).css('white-space', 'pre'));
    $totalOrdersData.appendTo($orderTableRow);

    var $subtotalData = $("<td/>").append($("<span/>", {
        text: row.Subtotal
    }).css('white-space', 'pre'));
    $subtotalData.appendTo($orderTableRow);

    var $totalShippingData = $("<td/>").append($("<span/>", {
        text: row.TotalShipping
    }).css('white-space', 'pre'));
    $totalShippingData.appendTo($orderTableRow);

    var $totalTaxData = $("<td/>").append($("<span/>", {
        text: row.TotalTax
    }).css('white-space', 'pre'));
    $totalTaxData.appendTo($orderTableRow);

    var $totalAmountData = $("<td/>").append($("<span/>", {
        text: row.TotalAmount
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

function renderRowTotals(id, resultRows)
{
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

    var $orderTableRow = $("<tr/>", {
        class: "resultRow" + id
    });

    var $statusTypeData = $("<td/>").append($("<b/>", {
        text: "Total"
    }).css('white-space', 'pre'));
    $statusTypeData.appendTo($orderTableRow);

    var $totalOrdersData = $("<td/>").append($("<b/>", {
        text: row.TotalOrders
    }).css('white-space', 'pre'));
    $totalOrdersData.appendTo($orderTableRow);

    var $subtotalData = $("<td/>").append($("<b/>", {
        text: row.Subtotal
    }).css('white-space', 'pre'));
    $subtotalData.appendTo($orderTableRow);

    var $totalShippingData = $("<td/>").append($("<b/>", {
        text: row.TotalShipping
    }).css('white-space', 'pre'));
    $totalShippingData.appendTo($orderTableRow);

    var $totalTaxData = $("<td/>").append($("<b/>", {
        text: row.TotalTax
    }).css('white-space', 'pre'));
    $totalTaxData.appendTo($orderTableRow);

    var $totalAmountData = $("<td/>").append($("<b/>", {
        text: row.TotalAmount
    }).css('white-space', 'pre'));
    $totalAmountData.appendTo($orderTableRow);

    //append order row to main table
    $orderTableRow.appendTo($("#main_content_table").children("tbody"));
}



$(function() {
     $("#searchLoader").hide();
    //generateList();
    $(".date-picker").datepicker({
        beforeShow: function() {
            setTimeout(function() {
                $(".ui-datepicker").css("z-index", 9999999);
            }, 10);
        }
    })
});

$(".date-picker").on("change", function() {
    var id = $(this).attr("id");
    var val = $("label[for='" + id + "']").text();
    $("#msg").text(val + " changed");
    $("#datePeriod").val("0");
});

function changeDate()
{
    var period = $("#datePeriod").val();
    if(period != "0") {
       var nowDate = new Date();
       var startDate = undefined; 
        if(period == "Today") {
            startDate = new Date();
            startDate.setDate(nowDate.getDate());
            startDate.setHours(0,0,0,0);
        }
        else if(period == "Yesterday") {
            startDate = new Date();
            startDate.setDate(nowDate.getDate() - 1);
            startDate.setHours(0,0,0,0);
        }
        else if(period == "Last Week") {
            startDate = new Date();
            startDate.setDate(nowDate.getDate() - 7);
            startDate.setHours(0,0,0,0);
        }
        else if(period == "Last Month") {
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear(), startDate.getMonth() - 1, startDate.getDay());
            startDate.setHours(0,0,0,0);
        }
        else if(period == "Last 3 Months") {
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear(), startDate.getMonth() - 3, startDate.getDay());
            startDate.setHours(0,0,0,0);
        }
        else if(period == "Last 6 Months") {
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear(), startDate.getMonth() - 6, startDate.getDay());
            startDate.setHours(0,0,0,0);
        }
        else if(period == "Last Year") {
            startDate = new Date();
            startDate.setFullYear(startDate.getFullYear() - 1, startDate.getMonth(), startDate.getDay());
            startDate.setHours(0,0,0,0);
        }

        $('#datepickerStart').datepicker("setDate", startDate);
        $('#datepickerEnd').datepicker("setDate", nowDate);
    }
}

function generateList() {
    $('#main_content_table tbody').html("");

    $("#searchLoader").show();

    var startDate = $("#datepickerStart").datepicker("getDate");
    var endDate = $("#datepickerEnd").datepicker("getDate");

    var nowDate = new Date();
    var stringNowDate = nowDate.toISOString();

    var startOfTimeDate = new Date(1971, 2, 2);
    var stringstartOfTimeDate = startOfTimeDate.toISOString();


    var whereQuery = encodeURI('{ "$and": [ {  "createDate": { "$gte": ' + '"' + (startDate == null ? stringstartOfTimeDate : endDate) + '"' + '} }, { "createDate": { ' + '"$lt":' + '"' + (endDate == null ? stringNowDate : endDate) + '"' + '} } ] }');

    var query = "";

    var request = orderW.queryOrders(query, access_token);

    request.always(function() {
        $("#searchLoader").hide();
    })

    request.done(function(orderResult) {
        // array that will contain all deferred objects
        var deferreds = [];

        // make the ajax calls for orders
        for (var i = 0; i < orderResult.totalItemsCount; i += 2) {
            var query = "skip=" + i + "&limit=2" + "&fields=id,status,taxCode,taxCodeId,shippingPrice,shippingTaxRate,totalPrice";
            var request = orderW.queryOrders(query, access_token);
            deferreds.push(request);
        }

        // check if all ajax calls have finished
        var defferedPromises = $.when.apply($, deferreds);

        defferedPromises.done(function() {

            var orders = {};

            resultRows = {};
            if (!($.isArray(arguments)) && $.isArray(arguments[0]))
            // arguments contain tuples (array[3]) (data, state, jXHR) for each callback that would be passed to each ajax done function.
            // Also, in this case, arguments is an object, not an array, even though it behaves like an array.
            {

                for (var i = 0; i < arguments.length; i++) {

                    var orderResult = arguments[i][0];
                    orderResult.items.forEach(function(item) {

                        if (!(item.status.label in resultRows)) {
                            resultRows[item.status.label] = new RowResult();
                        }

                        resultRows[item.status.label].TotalShipping += item.shippingPrice;
                        resultRows[item.status.label].TotalTax += item.shippingPrice * item.shippingTaxRate;
                        resultRows[item.status.label].TotalOrders++;
                        resultRows[item.status.label].TotalAmount += item.totalPrice;

                        if (item.taxCodeId != null) {
                            var preTax = item.totalPrice / (1 + item.taxCode.rate);
                            resultRows[item.status.label].Subtotal += preTax;
                            resultRows[item.status.label].TotalTax += item.totalPrice - preTax;
                        }

                        orders[item.id] = item;
                    });
                }
            } else // for only one ajax result there is no tuple, just the 3 elements that would be in a tuple
            {
                var item = arguments[0];

                if (!(item.status.label in resultRows)) {
                    resultRows[item.status.label] = new RowResult();
                }

                resultRows[item.status.label].TotalShipping += item.shippingPrice;
                resultRows[item.status.label].TotalTax += item.shippingPrice * item.shippingTaxRate;
                resultRows[item.status.label].TotalOrders++;
                resultRows[item.status.label].TotalAmount += item.totalPrice;

                if (item.taxCodeId != null) {
                    var preTax = item.totalPrice / (1 + item.taxCode.rate);
                    resultRows[item.status.label].Subtotal += preTax;
                    resultRows[item.status.label].TotalTax += item.totalPrice - preTax;
                }


                orders[item.id] = item;
            }

            // make the ajax calls for the products of the products

            var orderItemRequest = orderW.queryOrderItems("", access_token);

            var defferedProductRequests = [];

            orderItemRequest.done(function(orderItemsResult) {
                for (var i = 0; i < orderItemsResult.totalItemsCount; i += 2) {
                    var query = "skip=" + i + "&limit=2";
                    var request = orderW.queryOrderItems(query, access_token);
                    defferedProductRequests.push(request)
                }

                var defferedOrderItemPromises = $.when.apply($, defferedProductRequests);

                defferedOrderItemPromises.done(function() {
                    if (!($.isArray(arguments)) && $.isArray(arguments[0]))
                    // arguments contain tuples (array[3]) (data, state, jXHR) for each callback that would be passed to each ajax done function.
                    // Also, in this case, arguments is an object, not an array, even though it behaves like an array.
                    {

                        for (var i = 0; i < arguments.length; i++) {

                            var orderItemResult = arguments[i][0];
                            orderItemResult.items.forEach(function(item) {

                                if (orders[item.orderId].taxCodeId == null) {
                                    resultRows[orders[item.orderId].status.label].Subtotal += item.units * item.unitPrice;
                                    resultRows[orders[item.orderId].status.label].TotalTax += item.units * item.unitPrice * item.unitTaxRate;
                                }

                            });
                        }
                    } else // for only one ajax result there is no tuple, just the 3 elements that would be in a tuple
                    {
                        var item = arguments[0];

                        if (orders[item.orderId].taxCodeId == null) {
                            resultRows[orders[item.orderId].status.label].Subtotal += item.units * item.unitPrice;
                            resultRows[orders[item.orderId].status.label].TotalTax += item.units * item.unitPrice * item.unitTaxRate;
                        }
                    }

                    var id = 0;
                    for (var statusType in resultRows) {
                        if (resultRows.hasOwnProperty(statusType)) {
                            renderRow(statusType, id++, resultRows[statusType]);
                        }
                    }

                    renderRowTotals(id, resultRows);
                });

                defferedOrderItemPromises.fail(function() {
                    ajaxFailed();
                });

                defferedOrderItemPromises.always(function() {
                    $("#searchLoader").hide();
                })

            });

        });

        defferedPromises.fail(function() {
            ajaxFailed();
        });

        defferedPromises.always(function() {
            $("#searchLoader").hide();
        })

    });
}


function ajaxSuccess() {
    $("#panelHeadingToAddAlert").
    append($("<div/>", {
        class: "row",
        id: "removeSuccessMessage",
        style: "margin-top:10px;margin-bottom:10px;text-align:center"
    }).append($("<div/>", {
        class: "alert alert-success",
        role: "alert",
        style: "margin-bottom:0px"
    }).append("<strong>Operation succesfull.")))

    window.setTimeout(function() {
        $("#removeSuccessMessage").fadeTo(500, 0).slideUp(500, function() {
            $(this).remove();
        });
    }, 1000);
}

function ajaxFailed() {

    $("#panelHeadingToAddAlert").
    append($("<div/>", {
        class: "row",
        id: "removeFailedMessage",
        style: "margin-top:10px;margin-bottom:10px;text-align:center"
    }).append($("<div/>", {
        class: "alert alert-danger",
        role: "alert",
        style: "margin-bottom:0px"
    }).append("<strong>An error occurred.")))

    window.setTimeout(function() {
        $("#removeFailedMessage").fadeTo(500, 0).slideUp(500, function() {
            $(this).remove();
        });
    }, 1000);
}