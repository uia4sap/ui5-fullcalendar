/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library uia.fullcalendar.
 */
sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/library'
], function (
	jQuery,
	library
) {
	"use strict";

	/**
	 * An tui-calendar library.
	 *
	 * @namespace uia.fullcalendar
	 * @name uia.fullcalendar.BaseCalendar
	 * @public
	 */

	// library dependencies

	// delegate further initialization of this library to the Core
	sap.ui.getCore().initLibrary({
		name: "uia.fullcalendar",
		dependencies: ["sap.ui.core"],
		types: [
			"uia.fullcalendar.HeaderButton",
			"uia.fullcalendar.ViewType"
		],
		interfaces: [],
		controls: [
			"uia.fullcalendar.EventCalendar",
			"uia.fullcalendar.EventSourceCalendar"
		],
		elements: [
			"uia.fullcalendar.EventBuilder",
			"uia.fullcalendar.EventDoc",
			"uia.fullcalendar.options.EventDisplay",
			"uia.fullcalendar.options.Header",
			"uia.fullcalendar.options.HeaderButton"
		],
		noLibraryCSS: false,
		version: "${version}"
	});

	uia.fullcalendar.ViewType = {

		DayMonth: "dayGridMonth",

		DayWeek: "dayGridWeek",

		TimeWeek: "timeGridWeek",

		timeDay: "timeGridDay"
	};

	uia.fullcalendar.HeaderButton = {

		Title: "title",

		Prev: "prev",

		Next: "next",

		PrevYear: "prevYear",

		NextYear: "nextYear",

		Today: "today",

		TimeDay: "timeGridDay",

		TimeWeek: "timeGridWeek",
		
		DayMonth: "dayGridMonth"
	};

	jQuery.sap.includeStyleSheet("resources/uia/fullcalendar/3rdparty/fullcalendar/core/main.css");	
	jQuery.sap.includeStyleSheet("resources/uia/fullcalendar/3rdparty/fullcalendar/bootstrap/main.css");	
	jQuery.sap.includeStyleSheet("resources/uia/fullcalendar/3rdparty/fullcalendar/daygrid/main.css");	
	jQuery.sap.includeStyleSheet("resources/uia/fullcalendar/3rdparty/fullcalendar/timegrid/main.css");	

	return uia.fullcalendar;

});
