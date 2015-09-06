/**
 * This class offers a flexible drop down component which has BC look & feel. In comparison with standard HTML select,
 * this component benefit from [advanced data sources]{@link BCAPI.Components.DataSources} provided by UI SDK.
 *
 * ## Properties
 *
 * Below you can find a complete list of properties which can be configured for this component:
 *
 * | Property name | Property description |
 * | ------------------- | -------------------------- |
 * | items | An array providing the items which must be displayed in the dropdown. |
 * | valueProp | A string telling which is the value property which must be extracted from each item. |
 * | textProp | A string telling which is the text property which must be extracted from each item and displayed to users. |
 *
 * ## Events
 *
 * | Event name.| Event description |
 * |---------------------------------|---------------------------------|
 * | changed | This event is triggered whenever dropdown selection is changed. |
 * | dataLoaded | This event is triggered whenever dropdown is configured with an asynchronous data source. See {@link BCAPI.Components.DataSources} |
 *
 * ## Usage
 *
 * ### Html markup
 *
 * ```html
 * <bc-select id="ddOrderBy">
 *   <option value="0">Order by</option>
 *   <option value="id">Customer Id</option>
 *   <option value="firstName">First Name</option>
 *   <option value="middleName">Middle Name</option>
 *   <option value="lastName">Last Name</option>
 * </bc-select>
 * ```
 *
 * ### Html markup + javascript
 *
 * ```html
 * <bc-select id="ddOrderBy"></bc-select>
 *
 * <script type="text/javascript">
 * document.addEventListener('WebComponentsReady', function() {
 *     var orderByDd = document.getElementById("ddOrderBy");
 *
 *     orderByDd.configure({
 *         items: [
 *                 {"value": "0", "text": "Order by"},
 *                 {"value": "id", "text": "Customer Id"},
 *                 {"value": "firstName", "text": "Order by"},
 *                 {"value": "middleName", "text": "Middle name"},
 *                 {"value": "lastName", "text": "Last name"},
 *                 {"value": "homePhone", "text": "Phone number"}
 *        ]
 *     });
 * });
 * </script>
 * ```
 *
 * ### Javascript only
 *
 * ```javascript
 * var orderByDd = document.createElement("bc-select");
 *
 * orderByDd.configure({
 *     items: [
 *         {"value": "0", "text": "Order by"},
 *         {"value": "id", "text": "Customer Id"},
 *         {"value": "firstName", "text": "Order by"},
 *         {"value": "middleName", "text": "Middle name"},
 *         {"value": "lastName", "text": "Last name"},
 *         {"value": "homePhone", "text": "Phone number"}
 *    ]
 * });
 * ```
 *
 * @name DropDown
 * @class
 * @public
 * @memberof BCAPI.Components
 * @augments BCAPI.Components.Component
 */
var webComponent = (function() {
    EVT_CHANGED = "changed";
    EVT_DATA_LOADED = "dataLoaded";

    var webComponent = {
        is: "bc-select",
        properties: {
            items: {
                type: Array,
                notify: true,
                observer: "_refreshItemsSelect"
            },
            valueProp: {
                type: String,
                value: "value"
            },
            textProp: {
                type: String,
                value: "text"
            },
            "class": {
                type: String,
                notify: true,
                observer: "_changeClass"
            },
            _dataSource: {
                type: Object,
                notify: true,
                observer: "_buildFromDataSource"
            },
            _supportsDataSource: {
                readOnly: true,
                type: Boolean,
                value: true
            }
        },
        customEvents: [
            EVT_CHANGED,
            EVT_DATA_LOADED
        ],
        /**
         * This method is invoked automatically when the component is ready to be used. At this point the component has not
         * been attached to the main dom. Internally, the method uses the shadow dom and tries to configure dataSource
         * and render all required items.
         *
         * @public
         * @instance
         * @method  ready
         * @return {undefined} No result.
         * @memberof BCAPI.Components.DropDown
         */
        ready: function() {
            this._innerSelect = this.$.ddItemsHolder;
            this.class = "form-control";

            var options = this.$.selectModel.querySelectorAll("option"),
                dataSource = this.$.selectModel.querySelector("*[rel='datasource']"),
                items;

            if (options.length > 0) {
                items = this._buildFromMarkup(options);

                this.configure({
                    "items": items
                });
            }

            if (dataSource && dataSource.isDataSource && dataSource.isDataSource()) {
                this._dataSource = dataSource;
            }
        },
        /**
         * This method obtains the current selected item.
         *
         * @public
         * @instance
         * @method getValue
         * @return {Object} The selected item.
         * @memberof BCAPI.Components.DropDown
         */
        getValue: function() {
            var items = this.items || [],
                selectedIndex = this.$.ddItemsHolder.selectedIndex;

            if (selectedIndex < 0 || selectedIndex > items.length) {
                return undefined;
            }

            return items[selectedIndex];
        },
        /**
         * This method sets the current value from the dropdown.
         *
         * @param {Object} newValue The new value used for setting the correct selectedIndex.
         * @returns {Boolean} True if the value was correctly set and false if the value does not match any of the items available in the dropdown.
         * @memberof BCAPI.Components.DropDown
         */
        setValue: function(newValue) {
            var itemIdx = -1,
                items = this.items || [];

            for (var idx = 0; idx < items.length; idx++) {
                var currItem = items[idx];

                if (currItem[this.valueProp] === newValue) {
                    itemIdx = idx;
                    break;
                }
            }

            if (itemIdx > -1) {
                this.$.ddItemsHolder.selectedIndex = itemIdx;
                this._handleChange();
            }
            
            return itemIdx > -1;
        },
        /**
         * This method provides a way to quickly configure the current dropdown.
         *
         * @public
         * @method configure
         * @instance
         * @param  {Object} opts All properties which must be set to the current dropdown instance.
         * @return {undefined} No result.
         * @memberof BCAPI.Components.DropDown
         * @example
         * var dropDown = document.createElement("bc-select");
         * dropDown.configure({
         *     "items": [
         *         {"value": "0", "text": "Order by"}
         *     ]
         * });
         */
        configure: function(opts) {
            var legacyBcConfig = this._bcConfig;

            this.items = opts.items || this.items;
            this._dataSource = opts.dataSource || this._dataSource;
            this._bcConfig = opts.bcConfig || this._bcConfig;

            if (this._bcConfig && this._dataSource) {
                this._dataSource.configure({
                    "bcConfig": this._bcConfig
                });
            }

            if (this._bcConfig && this._bcConfig !== legacyBcConfig && this._dataSource) {
                this._buildFromDataSource(this._dataSource);
            }
        },
        /**
         * This method is invoked in order to handle item selection changed event triggerd by the inner select element.
         *
         * @private
         * @instance
         * @method handleChange
         * @param  {Event} evt The dom event emmited by the inner dropdown dom element.
         * @return {undefined} No result.
         * @memberof BCAPI.Components.DropDown
         */
        _handleChange: function(evt) {
            var selectedItem = this.getValue();

            this.trigger(EVT_CHANGED, selectedItem);
        },
        /**
         * This method obtains the items defined using the markup approach for this component.
         *
         * @private
         * @instance
         * @method  _buildFromMarkup
         * @param  {options} options The options object used for obtaining the items defined in markup.
         * @return {Array} The items obtained from the markup.
         * @memberof BCAPI.Components.DropDown
         */
        _buildFromMarkup: function(options) {
            var items = [];

            for (var idx = 0; idx < options.length; idx++) {
                var option = options[idx],
                    item = {
                        "value": option.value,
                        "text": option.text,
                        "selected": option.selected
                    };

                items.push(item);
            }

            return items;
        },
        /**
         * This method builds the items which must be rendered from the internally defined dataSource. It wires an async
         * listener to the data source events and renders all items when necessary.
         *
         * @private
         * @instance
         * @method _buildFromDataSource
         * @param  {BCAPI.Components.DataSource} dataSource The data source which must be used for obtaining the items.
         * @return {undefined} No result.
         * @memberof BCAPI.Components.DropDown
         */
        _buildFromDataSource: function(dataSource) {
            var loader = dataSource.list(),
                self = this;

            if (!loader) {
                return;
            }

            loader.done(function(data) {
                self._fetched = true;
                self._updateData(data);

                self.trigger(EVT_DATA_LOADED, {});
            });
        },
        /**
         * This method updates the currently displayed data with new values provided through data argument.
         *
         * @private
         * @instance
         * @method _updateData
         * @param  {Object} data The new data which must be rendered within the component. All relevant records must be placed under items property belonging to data.
         * @return {undefined} No result.
         */
        _updateData: function(data) {
            var items = data.items,
                rows = [];

            for (var idx = 0; items && idx < items.length; idx++) {
                var row = {},
                    item = items[idx];

                row.value = item[this.valueProp];
                row.text = item[this.textProp];

                rows.push(row);
            }

            this.configure({
                "items": rows
            });
        },
        /**
         * This method is invoked whenever items must be rendered.
         *
         * @private
         * @instance
         * @method  _refreshItemsSelect
         * @param  {Array} items An array of items which must be displayed.
         * @return {undefined} No result.
         * @memberof BCAPI.Components.DropDown
         */
        _refreshItemsSelect: function(items) {
            var select = this.$.ddItemsHolder;

            select.options.length = 0;

            for (var i = 0; i < items.length; i++) {
                var option = document.createElement("option");
                option.value = items[i].value;
                option.selected = items[i].selected;
                option.textContent = items[i].text;

                select.add(option);
            }
        },
        /**
         * This method handles the change of css classes applied to the current dropdown instance.
         *
         * @private
         * @instance
         * @method  _changeClass
         * @param  {String} newClass A whitespace separated list of classes.
         * @return {undefined} No result.
         * @memberof BCAPI.Components.DropDown
         */
        _changeClass: function(newClass) {
            this.__base.changeClass(newClass, this._innerSelect);
        }
    };

    webComponent = BCAPI.Components.ComponentsFactory.get(webComponent);

    return webComponent;
})();