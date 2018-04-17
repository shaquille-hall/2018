$(window).bind("load resize", function() {
    if (!Init.loaded) {
        Init.init();
        Init.loaded = true;
    }

    if(!ContactForm.loaded) {
        ContactForm.init();
        ContactForm.loaded = true;
    }
     
    if ($(window).width() < 650) {
        Init.showMobile();
        Init.hideStandard();
    } else {
        Init.showStandard();
        Init.hideMobile();
    }
});

window.onscroll = function() {
    toggleNavBar();
}

function toggleNavBar() {
    if ($(window).scrollTop() > $(".logo").height()) {
        $("#navBar").css({"position" : "fixed", "margin-top" : (-($(".logo").height()))});
        $('.dropdownMenu').css({"background-color": "#ff4d4d", "color":"white"});
    } else {
        $("#navBar").css({"position" : "relative", "margin-top" : "0px"});
        $('.dropdownMenu').css({"background-color": "white", "color":"black"});
    }
}

