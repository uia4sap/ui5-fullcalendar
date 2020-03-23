/* global Calendar:true */
sap.ui.define([
    "sap/ui/core/Element",
    "./library"
], function(
    Element,
    library
) {
    "use strict";

    var EventDoc = Element.extend("uia.fullcalendar.Element", /** @lends uia.fullcalendar.Element.prototype */ {

        metadata: {

            "library": 'uia.fullcalendar',

            "properties": {

                eventId: { type: "string", group: "evvent" },

                groupId: { type: "string", group: "evvent", defaultValue: undefined },

                allDay: { type: "boolean", group: "evvent", defaultValue: false },

                start: { type: "string", group: "evvent", defaultValue: undefined },

                end: { type: "string", group: "evvent", defaultValue: undefined },

                title: { type: "string", group: "evvent", defaultValue: undefined },

                url: { type: "string", group: "evvent", defaultValue: undefined },

                backgroundColor: { type: "string", group: "evvent", defaultValue: "rgba(0,0,255,0.6)" },

                borderColor: { type: "string", group: "evvent", defaultValue: "rgba(0,0,255,0.6)" },

                textColor: { type: "string", group: "evvent", defaultValue: "rgba(255,255,255,1)" },

                source: { type: "any", group: "evvent", defaultValue: undefined }
            }
        },

        constructor: function(sId, mSettings) {
            Element.apply(this, arguments);
        },

        toEvent: function() {
            return {
                id: this.getEventId(),
                groupId: this.getGroupId(),
                allDay: this.getAllDay(),
                start: this.getStart(),
                end: this.getEnd(),
                title: this.getTitle(),
                url: this.getUrl(),
                backgroundColor: this.getBackgroundColor(),
                borderColor: this.getBorderColor(),
                textColor: this.getTextColor(),
                source: this.getSource(),
                classNames: ["event-select"]
            }
        }
    });

    return EventDoc;

}, /* bExport= */ true);
