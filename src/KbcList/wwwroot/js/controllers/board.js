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
                console.log($rootScope.dragInfo.idElem);
                //console.log(ev.originalEvent.pageX);
              //  $(boardItemElem).remove();
                $(boardItemElem).css({
                    top :  (ev.originalEvent.pageY + 30) - $(window).scrollTop(),
                    left : (ev.originalEvent.pageX + 30) 
                });
            });
             elem.bind("mouseup", function (ev) {
                    if (!$rootScope.dragInfo)
                        return;

                    var boardItemElem = document.getElementById($rootScope.dragInfo.idElem);

                    console.log($rootScope.dragInfo.idElem);
                    $("#kbcCurrent").replaceWith(boardItemElem);
                    $(boardItemElem).css("position", "static");
                    $(boardItemElem).css("width", "auto");
                    $rootScope.dragInfo = null;
                });
        }
    }
    function BoardListDirective($rootScope) {
        return {
            scope: {
                changePosition: '&newPositionFn'
            },
            link: function (scope, elem, attrs) {
               
                $rootScope.waitEventList = false;
                elem.bind("mousemove", function (ev) {
                    // For not receve multiple same event
                    //  waitHelper.wait("MOUSEMOVE_BOARDLIST", 300);

                  /*  if ($rootScope.waitEventList)
                        return;
                    $rootScope.waitEventList = true;
                    setTimeout(function () { $rootScope.waitEventList = false }, 20);*/

                    // When there are not drag and drop event
                    if (!$rootScope.dragInfo)
                        return;

                    // When drag is on the placeholder
                    if (ev.target.id == "kbcCurrent")
                        return;

                    if(!$(ev.target).hasClass('kbclist'))
                        return;

                    // When there are already placeholder in the list
                    if (elem.find(".kbc-board-list-bottom").length)
                        return;

                    $("#kbcCurrent").remove();
                    $(this).children(".kbc-list-card").children(".kbclist-content")
                        .append(targetElement($rootScope.dragInfo.heightElem, "kbc-board-list-bottom"));

                    console.log("coucou");
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
                    var width = $(boardItemElem).outerWidth()
                    $(boardItemElem).before(targetElement(dragInfo.heightElem));
                    $("body").append(boardItemElem);
                    $("body").addClass("noselect");
                    $(boardItemElem).css("width", width);

                    $(boardItemElem).css({
                        top :  (ev.originalEvent.pageY + 20) - $(window).scrollTop(),
                        left : (ev.originalEvent.pageX + 20) 
                    });

                    $(boardItemElem).css("position", "fixed");
                    $(boardItemElem).css("z-index", "2030");
                });
                elem.on('dragend', function (ev) {
                    $("#kbcCurrent").remove();
                    var data = ev.originalEvent.dataTransfer.getData("text");
                    $(document.getElementById(data)).css("position", "static");
                });

                var neFaitRien = false;
                elem.on('mousemove', function (ev) {

                  

                    if (neFaitRien)
                        return;
                    neFaitRien = true;
                    $rootScope.waitEventList = true;
                    setTimeout(function () { neFaitRien = false, $rootScope.waitEventList = false }, 20);
                  
                  
                    if ($rootScope.dragInfo) {

                        if($(elem).attr("id") == $rootScope.dragInfo.idElem)
                            return;

                        ev.stopPropagation();

                 
                        console.log("over");
                        
                        var kbcCurrent = $(elem).closest(".kbclist-content").find("#kbcCurrent");

                        $rootScope.dragInfo.positionPlaceholder.y = scope.boardIndex();

                        if (kbcCurrent.length && $(kbcCurrent).prev()
                            && $(kbcCurrent).prev()[0] == boardItemElem) {
                            $("#kbcCurrent").after(boardItemElem);
                              console.log("prev");
                        }
                        else if (kbcCurrent.length && $(kbcCurrent).next()
                            && $(kbcCurrent).next()[0] == boardItemElem) {
                            $("#kbcCurrent").before(boardItemElem);
                              console.log("next");
                        }
                        else {
                            $("#kbcCurrent").remove();
                            $(boardItemElem).before(targetElement($rootScope.dragInfo.heightElem));
                             console.log("autre");
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
            { id: 2, title: "autre", items: [
                    { id: 4, title: "acheter zz" },
                    { id: 5, title: "acheter cc" },
                    { id: 6, title: "acheter ccc" }]
            },
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