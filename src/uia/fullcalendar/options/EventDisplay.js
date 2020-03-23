/* global Calendar:true */
sap.ui.define([
    "sap/ui/core/Element",
    "../library"
], function(
    Element,
    library
) {
    "use strict";

    var EventDisplay = Element.extend("uia.fullcalendar.options.EventDisplay", /** @lends uia.fullcalendar.options.EventDisplay.prototype */ {

        metadata: {

            "library": 'uia.fullcalendar',

            "properties": {

                hour: { type: "string", group: "evvent", defaultValue: "2-digit" },

                minute: { type: "string", group: "evvent", defaultValue: "2-digit" },

                second: { type: "string", group: "evvent", defaultValue: undefined },

                hour24: { type: "boolean", group: "evvent", defaultValue: true },

                meridiem: { type: "boolean", group: "evvent", defaultValue: false }
            }
        },

        constructor: function(sId, mSettings) {
            Element.apply(this, arguments);
        },

        applyOption: function(model) {
            model.eventTimeFormat = {
                hour: this.getHour(),
                minute: this.getMinute(),
                second: this.getSecond(),
                hour12: !this.getHour24(),
                meridiem: this.getMeridiem(),
            }
            return model;
        }
    });

    return EventDisplay;

}, /* bExport= */ true);
