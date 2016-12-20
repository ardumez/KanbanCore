(function (angular) {
    'use strict';

    angular
        .module('KbcList')
        .directive('boardItem', BoardItemDirective);

    BoardItemDirective.$inject = ['$rootScope', 'boardHelpers'];

    function BoardItemDirective($rootScope, boardHelpers) {
        return {
            restrict: "EAC",
            scope: {
                boardItemMove: '=boardItemMove',
                boardIndex: '&boardIndex'
            },
            link: function (scope, elem, attrs) {

                var boardItemElem = elem[0];

                elem.on('mousedown', function (ev) {

                    // For create drag info
                    var dragInfo = {
                        idElem: $(boardItemElem).attr("id"),
                        positionElem: { x: 0, y: scope.boardIndex() },
                        positionPlaceholder: { x: 0, y: scope.boardIndex() },
                        heightElem: $(boardItemElem).outerHeight()
                    }
                    $rootScope.dragInfo = dragInfo;

                    // For get width before extract item 
                    var width = $(boardItemElem).outerWidth();

                    $(boardItemElem).before(boardHelpers.getTargetElement(dragInfo.heightElem));
                    
                    $("body").append(boardItemElem);
                    $("body").addClass("noselect");

                    $(boardItemElem).css({
                        top: (ev.originalEvent.pageY + 20) - $(window).scrollTop(),
                        left: (ev.originalEvent.pageX + 20),
                        position: "fixed",
                        'z-index': '2030',
                        'width': width
                    });

                });

                var waitFor = false;
                elem.on('mousemove', function (ev) {

                    if (waitFor)
                        return;
                    waitFor = true;

                    setTimeout(function () { waitFor = false }, 20);

                    if ($rootScope.dragInfo) {

                        if ($(elem).attr("id") == $rootScope.dragInfo.idElem)
                            return;

                        ev.stopPropagation();

                        var kbcCurrent = $(elem).closest(".kbclist-content").find("#kbcCurrent");

                        $rootScope.dragInfo.positionPlaceholder.y = scope.boardIndex();

                        if (kbcCurrent.length && $(kbcCurrent).prev()
                            && $(kbcCurrent).prev()[0] == boardItemElem) {
                            $("#kbcCurrent").after(boardItemElem);
                        }
                        else if (kbcCurrent.length && $(kbcCurrent).next()
                            && $(kbcCurrent).next()[0] == boardItemElem) {
                            $("#kbcCurrent").before(boardItemElem);
                        }
                        else {
                            $("#kbcCurrent").remove();
                            $(boardItemElem).before(boardHelpers.getTargetElement($rootScope.dragInfo.heightElem));
                        }
                    }
                });
            }
        }
    }
})(window.angular);