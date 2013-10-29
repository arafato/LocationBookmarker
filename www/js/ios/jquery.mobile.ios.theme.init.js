﻿(function ($) {
    // all dialog buttons should close their parent dialog
    $(".ui-dialog button").live("click", function () {
        $("[data-role='dialog']").dialog("close");
    });

    $(document).on("mobileinit", function () {
        $.mobile.defaultPageTransition = "slide";
    });
})(jQuery);