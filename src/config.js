(function($) {
	/**
	 * This namespace holds global configuration of the sdk. You can easily change the values from here
	 * in order to influence how various models and services work.
	 * 
	 * @namespace BCAPI.Config
	 */
	var Config = {};

	/**
	 * Namespace which holds default values for pagination (server side / client side).
	 * 
	 * @namespace BCAPI.Config.Pagination
	 * @property {Integer} limit Default number of records we want to retrieve in one paginated API call.
	 * @property {Integet} skip Default start record used in one paginated API call.
	 * @property {Integer} lowestPage Default lowest page allowed to be requested through paginated API call. 
	 */
	Config.Pagination = {
		lowestPage: 0,
		limit: 10,
		skip: 0
	};
	
	BCAPI.Config = Config;
})(jQuery);