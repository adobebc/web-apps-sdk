(function($) {
    /**
     * This class provides the contract which must be implemented by each concrete datasource from the sdk.
     * A datasource is a data provider which can be plugged into various components from the framework in order to
     * display the data in different layouts. Most components offered by the sdk supports rendering data from a datasource.
     *
     * Each concrete implementation might have its own supported options and it is not mandatory to provide
     * an implementation for all the methods from DataSource.
     *
     * @class  DataSource
     * @memberof BCAPI.Components.DataSources
     */
    function DataSource() { }

    /**
     * This method must be overriden by each concrete datasource in order to provide the logic for loading
     * an individual item.
     *
     * @public
     * @instance
     * @abstract
     * @method  fetch
     * @param  {Object} opts An object describing all relevant information for the fetch operation.
     * @return {Promise} A promise object which is going to be resolved with data.
     * @memberof BCAPI.Components.DataSources.DataSource
     */
    DataSource.prototype.fetch = function(opts) {
        throw new Error("Not implemented.");
    };

    /**
     * This method must be overriden by each concrete datasource in order to provide the logic for loading
     * a subset of items belonging to the datasource.
     *
     * @public
     * @instance
     * @abstract
     * @method  list
     * @param  {Object} opts An object describing all relevant information for the list operation.
     * @return {Promise} A promise object which is going to be resolved with data.
     * @memberof BCAPI.Components.DataSources.DataSource
     */
    DataSource.prototype.list = function(opts) {
        throw new Error("Not implemented.");
    };

    /**
     * This method must be overriden by each concrete datasource in order to provide the logic for adding
     * a new item to the datasource.
     *
     * @public
     * @instance
     * @abstract
     * @method  create
     * @param  {Object} opts An object describing all relevant information for the create operation.
     * @return {Promise} A promise object which is going to be resolved with data.
     * @memberof BCAPI.Components.DataSources.DataSource
     */
    DataSource.prototype.create = function(opts) {
        throw new Error("Not implemented.");
    };

    /**
     * This method must be overriden by each concrete datasource in order to provide the logic for updating
     * an existing item from the datasource.
     *
     * @public
     * @instance
     * @abstract
     * @method  update
     * @param  {Object} opts An object describing all relevant information for the update operation.
     * @return {Promise} A promise object which is going to be resolved with data.
     * @memberof BCAPI.Components.DataSources.DataSource
     */
    DataSource.prototype.update = function(opts) {
        throw new Error("Not implemented.");
    };

    /**
     * This method must be overriden by each concrete datasource in order to provide the logic for removing
     * an existing item from the datasource.
     *
     * @public
     * @instance
     * @abstract
     * @method  delete
     * @param  {Object} opts An object describing all relevant information for the delete operation.
     * @return {Promise} A promise object which is going to be resolved with data.
     * @memberof BCAPI.Components.DataSources.DataSource
     */
    DataSource.prototype.delete = function(opts) {
        throw new Error("Not implemented.");
    };

    BCAPI.Components.DataSources.DataSource = BCAPI.Components.DataSources.DataSource || DataSource;
})($);