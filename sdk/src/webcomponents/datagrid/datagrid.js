/*
*
*Copyright (c) 2012-2014 Adobe Systems Incorporated. All rights reserved.

*Permission is hereby granted, free of charge, to any person obtaining a
*copy of this software and associated documentation files (the "Software"),
*to deal in the Software without restriction, including without limitation
*the rights to use, copy, modify, merge, publish, distribute, sublicense,
*and/or sell copies of the Software, and to permit persons to whom the
*Software is furnished to do so, subject to the following conditions:
*
*The above copyright notice and this permission notice shall be included in
*all copies or substantial portions of the Software.
*
*THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
*FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
*DEALINGS IN THE SOFTWARE.
*
*/
/**
 * This class offers a fully customisable DataGrid component. It has a modern look & feel and allows developers to wire various
 * datasources into it.
 *
 * @class DataGrid
 * @public
 * @memberof BCAPI.Components
 */
var webComponent = {
    is: "bc-datagrid",
    properties: {
        columns: Array,
        rows: Array,
        repeatedRow: String,
        apiName: String,
        apiVersion: String,
        visible: Boolean,
        dataVarname: String,
        bcConfig: Object,
        currData: {
            type: Object,
            readonly: true
        },
        _dataSource: {
            type: Object,
            notify: true
        },
        _expectsDataSource: {
            type: Boolean
        }
    },
    /**
     * This method is invoked automatically when component is ready and tries to wire available datasource from shadow dom.
     *
     * @public
     * @instance
     * @returns {undefined} No result.
     * @memberof BCAPI.Components.DataGrid
     */
    ready: function() {
        this._dataSource = Polymer.dom(this).querySelector("*[rel='datasource']");

        if (this._dataSource) {
            this._expectsDataSource = true;
        }
    },
    /**
     * This method is invoked automatically once the datagrid is attached to the main dom. It tries to obtain the template for custom defined repeated row.
     *
     * @public
     * @instance
     *
     * @return {undefined} No result.
     * @memberof BCAPI.Components.DataGrid
     */
    attached: function() {
        var repeatedRowDiv = Polymer.dom(this).querySelector("div[rel='custom-repeated-row']");

        if (repeatedRowDiv) {
            this.repeatedRow = repeatedRowDiv.innerHTML;
        }
    },
    /**
     * This method allows developers to configure the current instance of the datagrid. Each bindable property can be configured using this method.
     *
     * @param {opts} opts The options which must be configured on datasource.
     * @param {Array} opts.columns An array holding the descriptor of each individual column.
     * @param {Array} opts.rows An array holding each row items.
     * @param {BCAPI.Components.DataSources.DataSource} opts.dataSource The datasource instance we want to wire into the datagrid.
     * @return {undefined} No result.
     * @memberof BCAPI.Components.DataGrid
     */
    configure: function(opts) {
        opts = opts || {};

        this.dataVarname = opts.dataVarname || this.dataVarname;
        this.bcConfig = opts.bcConfig || this.bcConfig || {};
        this._dataSource = opts.dataSource || this._dataSource;

        if (this._dataSource) {
            this._dataSource.configure({
                "bcConfig": this.bcConfig
            });
        }

        this.columns = opts.columns || this._getColsFromMarkup() || this.columns;
        this.rows = opts.rows || this._loadItems() || this.rows;
    },
    /**
     * This method shows or hide the current instance of the datagrid.
     *
     * @public
     * @instance
     *
     * @param {Boolean} visible A flag telling if the datagrid should be visible or hidden.
     * @return {undefined} No result.
     * @memberof BCAPI.Components.DataSource
     */
    display: function(visible) {
        this.visible = visible || false;
    },
    /**
     * This method returns the item available in the grid at a given index.
     *
     * @public
     * @instance
     * @param {Number} idx The index (row number) where the item can be found.
     * @return {Object} The item from the specified index or undefined if the row is not available.
     * @memberof BCAPI.Components.DataGrid
     */
    getItemAt: function(idx) {
        return this.rows[idx];
    },
    /**
     * This method triggers a full text search in the current datagrid.
     *
     * @public
     * @instance
     * @param {String} filterValue The filter we want to apply to the items belonging to the grid (or its underlining datasource).
     * @param {Number} limit The maximum number of items which can be included in the resultset.
     * @param {String} orderCriteria The order criteria used for arranging the items from the result set.
     * @return {undefined} No result.
     * @memberof BCAPI.Components.DataGrid
     */
    searchFullText: function(filterValue, limit, orderCriteria) {
        if (!filterValue || filterValue.trim().length === 0) {
            this._loadItems({
                "limit": limit,
                "order": orderCriteria
            });

            return;
        }

        var filter = {
                "$or": []
            },
            self = this;

        for (var idx = 0; idx < this.columns.length; idx++) {
            var col = this.columns[idx],
                clause = {};

            if (col.rel !== "property") {
                continue;
            }

            clause[col.id] = {
                "$contains": filterValue
            };

            filter.$or.push(clause);
        }

        this._loadItems({
            "limit": limit,
            "order": orderCriteria,
            "where": filter
        });
    },
    /**
     * This method scans the current datagrid markup and tries to obtain datagrid columns definition.
     *
     * @private
     * @instance
     * @returns {Array} An array containing all columns descriptors extracted from markup.
     * @memberof BCAPI.Components.DataGrid
     */
    _getColsFromMarkup: function() {
        var colElement = Polymer.dom(this).querySelector("bc-columns"),
            self = this,
            cols = [];

        $(colElement).find("> div").each(function(idx, item) {
            item = $(item);

            var itemId = item.attr("data-id"),
                itemName = item.attr("title"),
                itemRel = item.attr("rel"),
                itemTemplate = item.html().trim();

            if (itemRel === "property") {
                if (!itemTemplate) {
                    itemTemplate = "<span>{{getItemValue(item,col.id)}}</span>";
                }

                cols.push({
                    "id": itemId,
                    "name": itemName,
                    "template": itemTemplate,
                    "rel": "property"
                });

                return;
            }

            if (itemRel === "custom-column") {
                cols.push({
                    "template": itemTemplate,
                    "name": itemName
                });

                return;
            }
        });

        return cols;
    },
    /**
     * This method loads items from the underlining datasource. Options parameter controls the arguments that reach into data source list operation.
     *
     * @public
     * @instance
     *
     * @param  {Object} opts The load options which influence the final listed items. It can be used to define custom queries for the datasource.
     * @param {String} opts.order Defines the order criteria for arranging items.
     * @param {String} opts.where Defines the filter which must be applied when listing records.
     * @param {Number} limit Defines the maximum number of items which must be listed.
     * @return {undefined} No result.
     * @memberof BCAPI.Components.DataGrid
     */
    _loadItems: function(opts) {
        var fetchOptions = {},
            self = this;

        opts = opts || {};

        if (opts.order && opts.order && opts.order !== "0") {
            fetchOptions.order = opts.order;
        }

        if (opts.where) {
            fetchOptions.where = opts.where;
        }

        if (opts.limit) {
            fetchOptions.limit = opts.limit;
        }

        this._dataSource.list(fetchOptions).done(function(data) {
            self._updateCurrentData(data);
        });
    },
    /**
     * This method renders the given data into the datagrid display area.
     *
     * @public
     * @instance
     *
     * @param  {Object} data An object holding data which must be displayed in the datagrid.
     * @returns {undefined} No result.
     * @memberof BCAPI.Components.DataGrid
     */
    _updateCurrentData: function(data) {
        this.currData = data;
        this.configure({
            rows: data.items
        });
    }
};

webComponent = BCAPI.Components.ComponentsFactory.get(webComponent);