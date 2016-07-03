var win = $(window),
    nav = $("#nav-bar"),
    offset = nav.offset().top;

win.scroll(function() {
    if (offset < win.scrollTop()) {
        nav.addClass("fixed");
    } else {
        nav.removeClass("fixed");
    }
});
