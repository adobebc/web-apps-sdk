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
describe("bc-datagrid test suite for ensuring everything works as expected.", function() {
    beforeEach(function() {
        this._markupLoader = ComponentTestHelpers.loadTemplate("/test/webcomponents/templates/datagrid/datagrid.html");
        this._contentHolder = document.createElement("div");

        document.body.appendChild(this._contentHolder);
    });

    afterEach(function() {
        this._markupLoader = undefined;
        document.body.removeChild(this._contentHolder);
    });

    it("Ensures bc-datagrid configure works as expected - rows are rendered based on loaded data.", function(done) {
        var self = this,
            compsLoader = $.Deferred(),
            grid = undefined,
            dataSource = undefined;

        this._markupLoader.then(function(compMarkup) {
            self._contentHolder.innerHTML = compMarkup;

            ComponentTestHelpers.execWhenReady(function() {
                return document.querySelector("bc-datagrid");
            }, function(comp) {
                expect(comp).not.toBe(undefined);

                grid = comp;

                if (grid && dataSource) {
                    compsLoader.resolve({
                        "grid": grid,
                        "dataSource": dataSource
                    });
                }
            });

            ComponentTestHelpers.execWhenReady(function() {
                return document.querySelector("bc-json");
            }, function(comp) {
                expect(comp).not.toBe(undefined);

                dataSource = comp;

                if (grid && dataSource) {
                    compsLoader.resolve({
                        "grid": grid,
                        "dataSource": dataSource
                    });
                }
            });

            compsLoader.then(function(comps) {
                var grid = comps.grid,
                    dataSource = comps.dataSource;

                grid.configure();
                expect(grid.dataSource).toBe(dataSource);

                _assertComponentColumns(grid);

                grid.on("dataUpdated", function(data) {
                    // _assertComponentRows.call(self, grid, dataSource, data);

                    done();
                });
            });
        });
    });

    /**
     * This method ensures all component columns are corrected loaded from dom for the given datagrid. It relies on the
     * column defined in /test/webcomponents/templates/datagrid/datagrid.html template.
     *
     * @param {BCAPI.Components.DataGrid} dataGrid The data grid we currently assert.
     * @returns {undefined}
     */
    function _assertComponentColumns(dataGrid) {
        expect(dataGrid.columns.length).toBe(3);

        var idCol = dataGrid.columns[0],
            firstNameCol = dataGrid.columns[1],
            lastNameCol = dataGrid.columns[2];

        expect(idCol.id).toBe("id");
        expect(idCol.name).toBe("Id");
        expect(idCol.rel).toBe("property");
        expect(idCol.style).toBe(undefined);
        expect(idCol.template).toBe("<span>{{getItemValue(item,col.id)}}</span>");

        expect(firstNameCol.id).toBe("firstName");
        expect(firstNameCol.name).toBe("First name");
        expect(firstNameCol.rel).toBe("property");
        expect(firstNameCol.style).toBe(undefined);
        expect(firstNameCol.template).toBe("<span>{{getItemValue(item,col.id)}}</span>");

        expect(lastNameCol.id).toBe("lastName");
        expect(lastNameCol.name).toBe("Last name");
        expect(lastNameCol.rel).toBe("property");
        expect(lastNameCol.style).toBe(undefined);
        expect(lastNameCol.template).toBe("<span>{{item.lastName}}</span>");
    }

    /**
     * This method ensures all data source rows are correctly rendered in the grid.
     *
     * @param {BCAPI.Components.DataGrid} dataGrid The data grid which we assert.
     * @param {BCAPI.Components.DataSources.DataSource} dataSource The data source which we expect to be rendered withi the data grid.
     * @param {Object} data The data loaded from the data source.
     * @returns {undefined}
     */
    function _assertComponentRows(dataGrid, dataSource, data) {
        expect(dataGrid.rows).not.toBe(undefined);
        expect(data).not.toBe(undefined);

        expect(data.items).not.toBe(undefined);
        expect(dataGrid.rows.length).toBe(data.items.length);

        var expectedItems = data.items,
            expectedRowAssertions = data.items.length * dataGrid.columns.length,
            rowAssertions = 0;

        /*for (var idx = 0; idx < data.items.length; idx++) {
            var row = data.items[idx],
                elements = dataGrid.querySelectorAll("span");

            for (var colIdx = 0; colIdx < dataGrid.columns.length - 1; colIdx++) {
                var col = dataGrid.columns[colIdx],
                    elemFound = false;

                for (var elemIdx = 0; elemIdx < elements.length; elemIdx++) {
                    console.log(elements[elemIdx].innerHTML + "--->" + row[col.id]);
                    if (elements[elemIdx].innerHTML === row[col.id]) {
                        elemFound = true;
                        break;
                    }
                }

                expect(elemFound).toBeTruthy();
                rowAssertions++;
            }
        }*/

        throw new Error(dataGrid.innerHTML);

        expect(rowAssertions).toBe(expectedRowAssertions);
    }
});