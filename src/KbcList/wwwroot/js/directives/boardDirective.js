(function (angular) {
    'use strict';

    angular
        .module('KbcList')
        .directive('board', BoardDirective);


    function BoardDirective($rootScope, boardService) {
        return function (scope, elem, attrs) {

            // For dragover event on all HTML body
            elem.bind("mousemove", function (ev) {

                if (!$rootScope.dragInfo)
                    return;

                var boardItemElem = document.getElementById($rootScope.dragInfo.idElem);

                $(boardItemElem).css({
                    top: (ev.originalEvent.pageY + 30) - $(window).scrollTop(),
                    left: (ev.originalEvent.pageX + 30)
                });
            });
            elem.bind("mouseup", function (ev) {
                if (!$rootScope.dragInfo)
                    return;

                var boardItemElem = document.getElementById($rootScope.dragInfo.idElem);

                $("#kbcCurrent").replaceWith(boardItemElem);
                $(boardItemElem).css("position", "static");
                $(boardItemElem).css("width", "auto");

                $("body").removeClass("noselect");
                console.log($rootScope.dragInfo);
                $rootScope.changePosition($rootScope.dragInfo);

                $rootScope.dragInfo = null;
            });
        }
    }
})(window.angular);