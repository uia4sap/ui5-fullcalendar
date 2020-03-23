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

    var EventCalendar = Control.extend("uia.fullcalendar.EventCalendar", /** @lends uia.fullcalendar.EventCalendar.prototype */ {

        __calendar: undefined,

        __events: [],

        metadata: {

            "library": 'uia.fullcalendar',

            "properties": {

                title: { type: "string", group: "appearance", defaultValue: undefined },

                viewType: { type: "uia.fullcalendar.ViewType", group: "appearance", defaultValue: uia.fullcalendar.ViewType.DayMonth },

                allDaySlot: { type: "boolean", group: "timegrid", defaultValue: false },

                themeSystem: { type: "string", group: "theme", defaultValue: "standard" },

                height: { type: "int", group: "sizing", default: undefined },

                aspectRatio: { type: "float", group: "sizing", default: 1.35 },

                locale: { type: "string", group: "locale", defaultValue: "en" },

                openEvent: { type: "boolean", group: "action", defaultValue: false }
            },

            "defaultAggregation": "events",

            "aggregations": {

                events: {
                    type: "uia.fullcalendar.EventDoc",
                    multiple: true,
                    singularName: "events",
                    bindable: "bindable",
                },

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

        setAspectHeight: function(height) {
            this.setProperty("height", height, true);
            if(this.__calendar) {
                this.__calendar.setOption("height", aspectRatio);
            }
        },

        setAspectRatio: function(aspectRatio) {
            this.setProperty("aspectRatio", aspectRatio, true);
            if(this.__calendar) {
                this.__calendar.setOption("aspectRatio", aspectRatio);
            }
        },

        setLocale: function(locale) {
            this.setProperty("locale", locale, true);
            if(this.__calendar) {
                this.__calendar.setOption("locale", locale);
            }
        },

        refetchEventSources: function() {
            if(this.__calendar) {
                this.__calendar.refetchEvents();
            }
        },

        addEvent: function(oEventDoc) {
            this.addAggregation("events", oEventDoc);

            var oEvents = [];
            var items = this.getAggregation("events") || [];
            items.forEach(item => oEvents.push(item.toEvent()));
            this.__events = oEvents;
            if(this.__calendar) {
                this.__calendar.addEvent(oEventDoc.toEvent());
            }
        },

        updateEvents: function(sReason) {
            this.destroyEvents();
            this.updateAggregation("events");

            var oEvents = [];
            var items = this.getAggregation("events") || [];
            items.forEach(item => oEvents.push(item.toEvent()));
            this.__events = oEvents;
        },

        updateCalendar: function(iDuration, bLazy, sEasing) {
            if(this.__calendar) {}
        },

        onEventClick: function(oEventInfo) {
            oEventInfo.jsEvent.preventDefault(); // don't let the browser navigate
            if(this.getOpenEvent() && oEventInfo.event.url) {
                window.open(oEventInfo.event.url);
            }
            this.fireEventClick({ "eventInfo": oEventInfo });
        },

        onAfterRendering: function() {
            var headerButton = uia.fullcalendar.HeaderButton;
            var model = {
                plugins: ["dayGrid", "timeGrid", "bootstrap"],
                height: this.getHeight(),
                aspectRatio: this.getAspectRatio(),
                locale: this.getLocale(),
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
                events: this.__events,
                eventTimeFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                },
                eventClick: info => this.onEventClick.call(this, info)
            };

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

    return EventCalendar;

}, /* bExport= */ true);
