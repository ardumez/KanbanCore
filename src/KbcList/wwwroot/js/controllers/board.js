(function (angular) {
    'use strict';

    angular
        .module('KbcList')
        .controller('BoardCtrl', BoardCtrl);

    function BoardCtrl($rootScope, $scope, kbcMenuService, boardService) {
        var vm = this;
        vm.boardLists = null;
        vm.changePosition = changePosition;
        vm.init = init;
        vm.addCard = addCard;

        $rootScope.changePosition = changePosition;

        return vm;

        function init() {
            boardService.getBoard().success(function (data) {
                vm.boardLists = data;
            });
        }
        function changePosition(position) {

            var posElem = position.positionElem;
            var posPholder = position.positionPlaceholder;

            // For get the element
            var item = vm.boardLists[posElem.x].items[posElem.y];

            // For remove old position
            var rem = vm.boardLists[posElem.x].items.splice(posElem.y, 1);

            vm.boardLists[posPholder.x].items.splice(posPholder.y, 0, item);
            var items = vm.boardLists[posPholder.x].items;

            // TODO hack angular
            vm.boardLists[posPholder.x].items = []
            $scope.$apply();
            vm.boardLists[posPholder.x].items = items;
            $scope.$apply();
        }

        function addCard() {
            
        }
    };
})(window.angular);