/* global Calendar:true */
sap.ui.define([
    "sap/ui/core/Element",
    "./library"
], function(
    Element,
    library
) {
    "use strict";

    var EventBuilder = Element.extend("uia.fullcalendar.EventBuilder", /** @lends uia.fullcalendar.CalendarEvent.EventBuilder */ {

        holiday: function(date, backgroundColor) {
            return {
                allDay: true,
                start: date,
                rendering: "background",
                backgroundColor: backgroundColor || "#eeeeee",
                borderColor: "#000000"
            }
        },

        workday: function(date, backgroundColor) {
            return {
                allDay: true,
                start: date,
                rendering: "background",
                backgroundColor: backgroundColor || "rgba(0,0,255,0.2)",
                borderColor: "#000000"
            }
        }

    });

    return EventBuilder;

}, /* bExport= */ true);
