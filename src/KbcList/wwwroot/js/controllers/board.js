(function (angular) {
    'use strict';

    angular
        .module('KbcList')
        .controller('BoardCtrl', BoardCtrl);

    function BoardCtrl($scope, kbcMenuService, boardService) {
        var vm = this;
        vm.boardLists = null;/* [
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
            { id: 3, title: "autre" }]; */
        vm.changePosition = changePosition;
        vm.init = init;
        return vm;

        function init(){
              boardService.getBoard().success(function (data) {
                  console.log(vm.boardLists);
                  console.log(data);
                vm.boardLists = data;
            });
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