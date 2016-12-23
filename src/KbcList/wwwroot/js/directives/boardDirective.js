(function (angular) {
    'use strict';

    angular
        .module('KbcList')
        .directive('board', BoardDirective);

    function BoardDirective($rootScope,  boardService) {
        return function (scope, elem, attrs) {

            // For dragover event on all HTML body
            elem.bind("mousemove", function (ev) {
                scope.$broadcast('mousemoveBodyEvent', {
                    mouseX: ev.originalEvent.pageX, 
                    mouseY: ev.originalEvent.pageY
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