/* global Calendar:true */
sap.ui.define([
    "sap/ui/core/Element",
    "./HeaderButton",
    "../library"
], function(
    Element,
    HeaderButton,
    library
) {
    "use strict";

    var Header = Element.extend("uia.fullcalendar.options.Header", /** @lends uia.fullcalendar.options.Header.prototype */ {

        metadata: {

            library: 'uia.fullcalendar',

            properties: {

                visible: { type: "boolean", group: "header", defaultValue: true }
            },

            aggregations: {

                left: {
                    type: "uia.fullcalendar.options.HeaderButton",
                    multiple: true,
                },

                center: {
                    type: "uia.fullcalendar.options.HeaderButton",
                    multiple: true,
                },

                right: {
                    type: "uia.fullcalendar.options.HeaderButton",
                    multiple: true,
                },
            },
        },

        constructor: function(sId, mSettings) {
            Element.apply(this, arguments);
        },

        applyOption: function(model) {
            var left = this.getLeft();
            var center = this.getCenter();
            var right = this.getRight();
            var left0 = left.length == 0 ? null : left.shift();
            var center0 = center.length == 0 ? null : center.shift();
            var right0 = right.length == 0 ? null : right.shift();
            model.header = {
                left: left0 ? left0.joinNext("", left) : undefined,
                center: center0 ? center0.joinNext("", center) : undefined,
                right: right0 ? right0.joinNext("", right) : undefined
            }
            return model;
        }
    });

    return Header;

}, /* bExport= */ true);
