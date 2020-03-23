/* global Calendar:true */
sap.ui.define([
    "sap/ui/core/Element",
    "../library"
], function(
    Element,
    libray
) {
    "use strict";

    var HeaderButton = Element.extend("uia.fullcalendar.options.HeaderButton", /** @lends uia.fullcalendar.options.HeaderButton.prototype */ {

        metadata: {

            library: 'uia.fullcalendar',

            properties: {

                type: { type: "uia.fullcalendar.HeaderButton", group: "appearance", defaultValue: uia.fullcalendar.HeaderButton.Today },

                joinNext: { type: "boolean", group: "appearance", defaultValue: false },

            }
        },

        constructor: function(sId, mSettings) {
            Element.apply(this, arguments);
        },

        joinNext: function(result, buttons) {
            if(buttons.length == 0) {
                return result + this.getType();
            }
            var button = buttons.shift();
            if(this.getJoinNext()) {
                return button.joinNext(result + this.getType()  + " ", buttons);
            }
            else {
                return button.joinNext(result + this.getType() + ",", buttons);
            }
        }
    });

    return HeaderButton;

}, /* bExport= */ true);
