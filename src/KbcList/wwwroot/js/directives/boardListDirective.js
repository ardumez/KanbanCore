(function (angular) {
    'use strict';
    
    angular
        .module('KbcList')
        .directive('boardList', BoardListDirective)

    BoardListDirective.$inject = ['$rootScope', 'boardHelpers'];

    function BoardListDirective($rootScope, boardHelpers) {
        return {
            scope: {
                changePosition: '&newPositionFn'
            },
            link: function (scope, elem, attrs) {
               
                $rootScope.waitEventList = false;
                elem.bind("mousemove", function (ev) {

                    // When there are not drag and drop event initiate
                    if (!$rootScope.dragInfo)
                        return;

                    // When drag over is on the placeholder
                    if (ev.target.id == "kbcCurrent")
                        return;

                    // When the target is not directly board list but a children
                    if(!$(ev.target).hasClass('kbclist'))
                        return;

                    // When there are already placeholder in the list
                    if (elem.find(".kbc-board-list-bottom").length)
                        return;

                    $("#kbcCurrent").remove();
                    $(this).children(".kbc-list-card").children(".kbclist-content")
                        .append(boardHelpers.getTargetElement($rootScope.dragInfo.heightElem, "kbc-board-list-bottom"));
                });
            }
        }
    }
})(window.angular);