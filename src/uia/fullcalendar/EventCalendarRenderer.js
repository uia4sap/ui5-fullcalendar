sap.ui.define([
    'jquery.sap.global'
], function(
    jQuery
) {
    "use strict";

    /**
     * EventCalendarRenderer renderer.
     * 
     * @static
     * @namespace
     */
    var EventCalendarRenderer = {};

    /**
     * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
     *
     * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
     * @param {sap.ui.core.Control} oCalendar An object representation of the control that should be rendered.
     */
    EventCalendarRenderer.render = function(oRm, oCalendar) {
        oRm.write("<div class='uia-fullcalendar'");
        oRm.writeControlData(oCalendar);
        oRm.write("></div>");
    };


    return EventCalendarRenderer;

}, /* bExport= */ true);
