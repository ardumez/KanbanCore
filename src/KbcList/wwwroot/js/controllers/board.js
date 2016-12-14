(function (angular) {
    'use strict';

    angular
        .module('KbcList')
        .controller('BoardCtrl', BoardCtrl)
        .directive('boardList', BoardListDirective)
        .directive('boardItem', BoardItemDirective)
        .directive('board', BoardDirective);

    BoardCtrl.$inject = ['$scope'];

    function BoardDirective($rootScope) {
        return function (scope, elem, attrs) {
            elem.bind("mousemove", function (ev) {

                if (!$rootScope.dragInfo)
                    return;

                var boardItemElem = document.getElementById($rootScope.dragInfo.idElem);

                $(boardItemElem).css({
                    top :  (ev.originalEvent.pageY + 20) - $(window).scrollTop(),
                    left : (ev.originalEvent.pageX + 20) 
                });
            });
        }
    }
    function BoardListDirective($rootScope) {
        return {
            scope: {
                changePosition: '&newPositionFn'
            },
            link: function (scope, elem, attrs) {
                elem.bind("mouseup", function (ev) {
                    if (!$rootScope.dragInfo)
                        return;

                    var boardItemElem = document.getElementById($rootScope.dragInfo.idElem);

                    $(boardItemElem).css("position", "static");
                    $("#kbcCurrent").replaceWith(boardItemElem);

                    $rootScope.dragInfo = null;
                });
                var waitEvent = false;
                elem.bind("mousemove", function (ev) {
                    // For not receve multiple same event
                    //  waitHelper.wait("MOUSEMOVE_BOARDLIST", 300);

                    if (waitEvent)
                        return;
                    waitEvent = true;
                    setTimeout(function () { waitEvent = false }, 300);

                    // When there are not drag and drop event
                    if (!$rootScope.dragInfo)
                        return;

                    // When drag is on the placeholder
                    if (ev.target.id == "kbcCurrent")
                        return;

                    // When there are already placeholder in the list
                    if (elem.find(".kbc-board-list-bottom").length)
                        return;

                    $("#kbcCurrent").remove();
                    $(this).children(".kbclist-content")
                        .append(targetElement($rootScope.dragInfo.heightElem, "kbc-board-list-bottom"));
                });
            }
        }
    }

    function BoardItemDirective($rootScope) {
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
                    $(boardItemElem).before(targetElement(dragInfo.heightElem));
                    $(boardItemElem).parent().append(boardItemElem);
                    $(boardItemElem).css("left", (ev.originalEvent.pageX + 20) + "px");
                    $(boardItemElem).css("width", $(boardItemElem).width());
                    $(boardItemElem).css("position", "fixed");
                });
                elem.on('dragend', function (ev) {
                    $("#kbcCurrent").remove();
                    var data = ev.originalEvent.dataTransfer.getData("text");
                    $(document.getElementById(data)).css("position", "static");
                });

                var neFaitRien = false;
                elem.on('mousemove', function (ev) {

                    event.stopPropagation();

                    if (neFaitRien)
                        return;
                    neFaitRien = true;
                    setTimeout(function () { neFaitRien = false }, 300);

                    if ($rootScope.dragInfo) {

                        var kbcCurrent = elem.parent().find("#kbcCurrent");

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
                            $(boardItemElem).before(targetElement($rootScope.dragInfo.heightElem));
                        }
                    }
                });
            }
        }
    }

    function BoardCtrl($scope, kbcMenuService) {
        var vm = this;
        vm.boardLists = [
            {
                id: 1, title: "A Faire", items: [
                    { id: 1, title: "acheter baguette" },
                    { id: 2, title: "acheter journal" },
                    { id: 3, title: "acheter journal tt" }]
            },
            { id: 2, title: "autre" },
            { id: 3, title: "autre" }];
        vm.init = init;
        vm.changePosition = changePosition;
        return vm;

        function init() {
        }

        function changePosition(position) {
            var elemToMove = vm.boardLists[position.positionElem.x].items;

            elemToMove = move(elemToMove, position.positionElem.y, position.positionPlaceholder.y);
            console.log(elemToMove);
            vm.boardLists.items = elemToMove;
            $scope.$apply();
        }
        function move(array, from, to) {
            if (to === from) return;

            var target = array[from];
            var increment = to < from ? -1 : 1;

            for (var k = from; k != to; k += increment) {
                array[k] = array[k + increment];
            }
            array[to] = target;
            return array;
        }
    };

})(window.angular);