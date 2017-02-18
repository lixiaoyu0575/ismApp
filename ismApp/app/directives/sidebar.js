//Sidebar Menu Handle
angular.module('app')
    .directive('sidebarMenu', function() {
        return {
            restrict: 'AC',
            link: function (scope, el, attr) {
                //---------------------bot controll------------------//
                scope.chatbotAction = "Open Chatbot";
                scope.chatbotVisStyle = {"display": "block"};
                $(document).keydown(function (event) {
                    var style = scope.chatbotVisStyle;
                    console.log(event.keyCode);
                    if (event.keyCode === 192) {
                        style.display = style.display === "block" ? "none" : "block";
                        console.log(scope.chatbotVisStyle);
                        scope.$apply();
                    }
                });
                scope.openOrCloseChatbot = function () {
                    var chatbotAction = scope.chatbotAction === "Open Chatbot" ? openChatbot() : closeChatbot();
                };
                //scope.openOrCloseChatbot();
                scope.testBot = function () {
                    var botDiv = $("#botDiv"),
                        height;
                    height = botDiv.height() === 600 ? 38 : 600;
                    botDiv.height(height);
                    console.log("testBot clicked");
                };


                scope.testBot();
                function openChatbot() {
                    var iframe = document.createElement("iframe");
                    scope.chatbotAction = "Waiting ......";
                    console.log(iframe);
                    iframe.id = "botIframe";
                    iframe.src = "http://59.110.52.133:3002";
                    iframe.width = 400;
                    iframe.height = 600;
                    // iframe.style = "position: fixed;right: 0;z-index: 999;bottom: 0";
                    console.log(iframe);
                    iframe.onload = function () {
                        scope.chatbotAction = "Close Chatbot";
                        scope.$apply();
                    };
                    $("#botDiv").append(iframe);
                }
                function closeChatbot() {
                    console.log("it is closeChatbot");
                    $("#botIframe").remove();
                    scope.chatbotAction = "Open Chatbot";
                }
                // var iframe = document.createElement("iframe");
                // console.log(iframe);
                // iframe.src = "http://59.110.52.133:3002";
                // iframe.width = 400;
                // iframe.height = 600;
                // iframe.style = "position: fixed;right: 0;z-index: 999;bottom: 0";
                // if (iframe.attachEvent) {
                //     iframe.attachEvent("onload", function () {
                //         console.log($(".wc-header"));
                //     });
                // } else {
                //     iframe.onload = function () {
                //         console.log($(".wc-header"));
                //         console.log($("#BotChatGoesHere");
                //     };
                // }
                // document.getElementById("botIframe").appendChild(iframe);
                //-----------------side bar----------------------//
                el.find('li.active').parents('li').addClass('active open');

                el.on('click', 'a', function (e) {
                    e.preventDefault();
                    var isCompact = $("#sidebar").hasClass("menu-compact");
                    var menuLink = $(e.target);
                    if ($(e.target).is('span'))
                        menuLink = $(e.target).closest('a');
                    if (!menuLink || menuLink.length == 0)
                        return;
                    if (!menuLink.hasClass("menu-dropdown")) {
                        if (isCompact && menuLink.get(0).parentNode.parentNode == this) {
                            var menuText = menuLink.find(".menu-text").get(0);
                            if (e.target != menuText && !$.contains(menuText, e.target)) {
                                return false;
                            }
                        }
                        window.scrollTo(0,0);
                        return;
                    }
                    var submenu = menuLink.next().get(0);
                    if (!$(submenu).is(":visible")) {
                        var c = $(submenu.parentNode).closest("ul");
                        if (isCompact && c.hasClass("sidebar-menu"))
                        {
                            return;
                        }
                        c.find("* > .open > .submenu")
                            .each(function() {
                                if (this != submenu && !$(this.parentNode).hasClass("active")) {
                                    $(this).slideUp(200).parent().removeClass("open");
                                }
                            });
                    }
                    if (isCompact && $(submenu.parentNode.parentNode).hasClass("sidebar-menu"))
                        return false;
                    $(submenu).slideToggle(200).parent().toggleClass("open");
                    window.scrollTo(0,0);
                    return false;
                });
            }
        };
    });

