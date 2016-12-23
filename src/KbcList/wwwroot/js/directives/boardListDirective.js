(function (angular) {
    'use strict';
    
    angular
        .module('KbcList')
        .directive('boardList', BoardListDirective)

    BoardListDirective.$inject = ['$rootScope', 'boardHelpers'];

    function BoardListDirective($rootScope, boardHelpers) {
        return {
            scope: {
                changePosition: '&newPositionFn',
                boardListIndex: '&boardListIndex'
            },
            link: function (scope, elem, attrs) {
                scope.showAddCard = false;
                $rootScope.waitEventList = false;
                elem.bind("mousemove", function (ev) {

                    // When there are not drag and drop event initiate
                    if (!$rootScope.dragInfo)
                        return;

               /*     $("#" + $rootScope.dragInfo.idElem).css({
                        top: (ev.originalEvent.pageY + 30) - $(window).scrollTop(),
                        left: (ev.originalEvent.pageX + 30)
                    });*/
                    
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

                    var kbcListContent =  $(this).children(".kbc-list-card").children(".kbclist-content");
                    var height = $rootScope.dragInfo.heightElem;
                    var placeholder = boardHelpers.getTargetElement(height, "kbc-board-list-bottom");
                    kbcListContent.append(placeholder);

                    $rootScope.dragInfo.positionPlaceholder.y = kbcListContent.children().length - 1;
                    $rootScope.dragInfo.positionPlaceholder.x = scope.boardListIndex();
                });
            }
        }
    }
})(window.angular);