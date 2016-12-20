$(document).ready(function() {


function windowSize(){
    if ($(window).width() >= '751') {
        $("ul.tabs").addClass("tabs-active");
        // подключение табов 
        $("ul.tabs.tabs-active").jTabs({content: ".tabs_content", animate: true, effect:"fade"});
        $("section#page-services").removeClass("services-mob");

    } else {
        $("ul.tabs").removeClass("tabs-active");
        $("section#page-services").addClass("services-mob");
    }
}
$(window).load(windowSize); // при загрузке
$(window).resize(windowSize); // при изменении размеров




});