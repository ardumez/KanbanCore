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
        function setTop(posY) {
            return (posY + 10) - $(window).scrollTop() + "px";
        }
        return function (scope, elem, attrs) {
            elem.bind("dragover", function (ev) {

              
                    $("#" + $rootScope.dragInfo.idElem).css("position", "fixed");
                    $("#" + $rootScope.dragInfo.idElem).css("top", setTop(ev.originalEvent.pageY));
                    $("#" + $rootScope.dragInfo.idElem).css("left", (ev.originalEvent.pageX + 10) + "px");
                
            });
        }
    }
    function BoardListDirective($rootScope) {
        return {
            scope: {
                changePosition: '&newPositionFn'
            },
            link: function (scope, elem, attrs) {
                elem.bind("drop", function (ev) {
                    ev.preventDefault();
                //    elem.parent().find('current-item');
                    $(document.getElementById($rootScope.dragInfo.idElem)).css("position", "static");
                    $("#kbcCurrent").replaceWith(document.getElementById($rootScope.dragInfo.idElem));
                    //    scope.changePosition({position: $rootScope.dragInfo});
                });
                var waitEvent = false;
                elem.bind("dragover", function (ev) {
                    ev.preventDefault();
                  //  setTimeout(function () { waitEvent = false }, 200);
                    if ($(ev.target).hasClass("kbclist")) {
                       
                        var height = $(document.getElementById($rootScope.dragInfo.idElem)).height();
                        if ($(ev.target).closest(".kbclist").children(".kbclist-content").children(".kbc-board-list-bottom").size() == 0) {
                            $("#kbcCurrent").remove();
                            $(ev.target).closest(".kbclist").children(".kbclist-content").append(targetElement(height, "kbc-board-list-bottom"));
                        }
                    }
                });
                scope.moveItem = function () {
                    alert("coucou");
                }
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
                elem.on('mousemove', function(){
                    console.log("mousemove");
                });
                elem.on('dragstart', function (ev) {
                    // elem.addClass('current-selected');
                    var dragInfo = {
                        idElem: ev.target.id,
                        positionElem: { x: 0, y: scope.boardIndex() },
                        positionPlaceholder: { x: 0, y: scope.boardIndex() }
                    }
                    $rootScope.dragInfo = dragInfo;
                  //  ev.originalEvent.dataTransfer.setData("text", JSON.stringify(dragInfo));
/*
                  //  var data = angular.fromJson(ev.dataTransfer.getData("text"));
                    var height = $(document.getElementById(ev.target.id)).height();

                    $(ev.target).css("width", $(boardItemElem).width());
                    $(ev.target).css("position", "fixed");
                    $(ev.target).before(targetElement(height));
                    $(ev.target).parent().append(boardItemElem);
*/
                    ev.originalEvent.dataTransfer.setDragImage(new Image(), 10, 10);
                    //console.log("coucou");
                });
                elem.on('dragend', function (ev) {
                    $("#kbcCurrent").remove();
                    var data = ev.originalEvent.dataTransfer.getData("text");
                    $(document.getElementById(data)).css("position", "static");
                });

                var neFaitRien = false;
                elem.on('dragover', function (ev) {
                   // ev.preventDefault();
                 //   setTimeout(function () { neFaitRien = false }, 200);

                    var data = $rootScope.dragInfo;

                    var height = $(document.getElementById(data.idElem)).height();
                    var kbcCurrent = elem.parent().find("#kbcCurrent");

                    $rootScope.dragInfo.positionPlaceholder.y = scope.boardIndex();

                    if (kbcCurrent.length && $(kbcCurrent).prev() && $(kbcCurrent).prev()[0] == boardItemElem) {
                        $("#kbcCurrent").after(boardItemElem);
                    }
                    else if (kbcCurrent.length && $(kbcCurrent).next() && $(kbcCurrent).next()[0] == boardItemElem) {
                        $("#kbcCurrent").before(boardItemElem);
                    }
                    else {
                        $("#kbcCurrent").remove();
                        var height = $(document.getElementById(data.idElem)).height();
                        $(boardItemElem).before(targetElement(height));
                        $("#kbcCurrent").attr("board-index", $(boardItemElem).attr("board-index"));
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
            { id: 2, title: "autre" }];
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