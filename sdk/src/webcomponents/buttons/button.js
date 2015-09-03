/**
 * This class provides a reusable button component with the same look & feel as BC buttons.
 * From a functionality point of view this component also carries data object for giving developer
 * quick access to the context where the button was clicked.
 *
 * ### Events
 *
 * | Event name.| Event description |
 * |---------------------------------|---------------------------------|
 * | dataChanged | This event is triggered whenever the data attached to the button is changed. |
 *
 * ### Usage
 *
 * ```html
 * <bc-button></bc-button>
 * ```
 * @class Button
 * @public
 * @memberof BCAPI.Components
 */
var webComponent = {
    is: "bc-button",
    properties: {
        style: String,
        data: {
            type: Object,
            observer: "_onDataChanged"
        }
    },
    customEvents: [
        "dataChanged"
    ],
    _onDataChanged: function(newData) {
        this.trigger("data-changed", newData);
    }
};

webComponent = BCAPI.Components.ComponentsFactory.get(webComponent);