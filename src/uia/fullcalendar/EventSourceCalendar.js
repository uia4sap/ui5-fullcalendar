/* global Calendar:true */
sap.ui.define([
    "sap/ui/core/Control",
    "sap/ui/core/Element",
    "./3rdparty/fullcalendar/core/main",
    "./3rdparty/fullcalendar/bootstrap/main",
    "./3rdparty/fullcalendar/daygrid/main",
    "./3rdparty/fullcalendar/timegrid/main",
    "./3rdparty/fullcalendar/core/locales-all",
    "jquery.sap.global",
    "./library"
], function(
    Control,
    Element,
    FullCalendarJS,
    BootstrapJS,
    DayGridJS,
    TimeGridJS,
    LocalesJS,
    jQuery,
    library
) {
    "use strict";

    var EventSourceCalendar = Control.extend("uia.fullcalendar.EventSourceCalendar", /** @lends uia.fullcalendar.EventSourceCalendar.prototype */ {

        __calendar: undefined,

        metadata: {

            "library": 'uia.fullcalendar',

            "properties": {

                title: { type: "string", group: "appearance", defaultValue: undefined },

                viewType: { type: "uia.fullcalendar.ViewType", group: "appearance", defaultValue: uia.fullcalendar.ViewType.DayMonth },

                allDaySlot: { type: "boolean", group: "timegrid", defaultValue: false },

                themeSystem: { type: "string", group: "theme", defaultValue: "standard" },

                height: { type: "string", group: "sizing", default: undefined },

                aspectRatio: { type: "float", group: "sizing", default: undefined },

                locale: { type: "string", group: "locale", defaultValue: "en" },

                firstDay: { type: "int", group: "locale", defaultValue: undefined },
                
                timeZone: { type: "string", group: "locale", defaultValue: "local" },

                openEvent: { type: "boolean", group: "action", defaultValue: false }
            },

            "aggregations": {

                header: {
                    type: "uia.fullcalendar.options.Header",
                    multiple: false
                },

                eventDisplay: {
                    type: "uia.fullcalendar.options.EventDisplay",
                    multiple: false
                }
            },

            "events": {

                eventsFetch: {

                    parameters: {

                        fetchInfo: { type: "object" },

                        successCallback: { type: "funciton" },

                        failureCallback: { type: "funciton" }
                    }
                },

                eventClick: {

                    parameters: {

                        eventInfo: { type: "object" }
                    }
                }
            }
        },

        constructor: function(sId, mSettings) {
            Control.apply(this, arguments);
        },

        setHeight: function(height) {
            this.setProperty("height", height, true);
            if(this.__calendar) {
                this.__calendar.setOption("height", aspectRatio);
            }
        },

        setLocale: function(locale) {
            this.setProperty("locale", locale, true);
            if(this.__calendar) {
                this.__calendar.setOption("locale", locale);
            }
        },

        setFirstDay: function(firstDay) {
            this.setProperty("firstDay", firstDay, true);
            if(this.__calendar) {
                this.__calendar.setOption("firstDay", firstDay);
            }
        },

        setAspectRatio: function(aspectRatio) {
            this.setProperty("aspectRatio", aspectRatio, true);
            if(this.__calendar) {
                this.__calendar.setOption("aspectRatio", aspectRatio);
            }
        },

        refetchEventSources: function() {
            if(this.__calendar) {
                this.__calendar.refetchEvents();
            }
        },

        onEventClick: function(oEventInfo) {
            oEventInfo.jsEvent.preventDefault(); // don't let the browser navigate
            if(this.getOpenEvent() && oEventInfo.event.url && oEventInfo.event.url != "null") {
                window.open(oEventInfo.event.url);
            }
            this.fireEventClick({ "eventInfo": oEventInfo });
        },

        onAfterRendering: function() {
            var headerButton = uia.fullcalendar.HeaderButton;
            var model = {
                plugins: ["dayGrid", "timeGrid", "bootstrap"],
                timeZone: this.getTimeZone(),
                height: this.getHeight(),
                aspectRatio: this.getAspectRatio(),
                locale: this. getLocale(),
                firstDay: this.getFirstDay(),
                themeSystem: this.getThemeSystem(),
                defaultView: this.getViewType(),
                allDaySlot: this.getAllDaySlot(),
                header: {
                    left: [
                        headerButton.Prev,
                        headerButton.Next
                    ].join(",") + " " + headerButton.Today,
                    center: headerButton.Title,
                    right: [
                        headerButton.TimeDay,
                        headerButton.TimeWeek,
                        headerButton.DayMonth,
                    ].join(",")
                },
                eventTimeFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                },
                eventClick: info => this.onEventClick.call(this, info)
            };
            model["eventSources"] = [{
                events: (fi, s, f) => this.fireEventsFetch({
                    fetchInfo: fi,
                    successCallback: s,
                    failureCallback: f
                })
            }]

            var oEventDisplay = this.getAggregation("eventDisplay");
            if(oEventDisplay) {
                model = oEventDisplay.applyOption(model);
            }
            var oHeader = this.getAggregation("header");
            if(oHeader) {
                model = oHeader.applyOption(model);
            }

            var cal = document.getElementById(this.getId());
            this.__calendar = new FullCalendar.Calendar(cal, model);
            this.__calendar.render();
        }
    });

    return EventSourceCalendar;

}, /* bExport= */ true);
