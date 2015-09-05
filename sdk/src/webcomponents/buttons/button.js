/**
 * This class provides a reusable button component with the same look & feel as BC buttons.
 * From a functionality point of view this component also carries data object for giving developer
 * quick access to the context where the button was clicked.
 *
 * ## Properties
 *
 * Below you can find a complete list of properties which can be configured for this component:
 *
 * | Property name | Property description |
 * | ------------------- | -------------------------- |
 * | style | The style css classes which must be applied to the inner rendered button tag. |
 * | data | The data carried by this object. You can easily access it in all event listeners. |
 *
 * ## Events
 *
 * | Event name.| Event description |
 * |---------------------------------|---------------------------------|
 * | dataChanged | This event is triggered whenever the data attached to the button is changed. |
 *
 * ## Usage
 *
 * ```html
 * <bc-button>Simple button</bc-button>
 * ```
 *
 * @class Button
 * @public
 * @memberof BCAPI.Components
 * @augments BCAPI.Components.Component
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