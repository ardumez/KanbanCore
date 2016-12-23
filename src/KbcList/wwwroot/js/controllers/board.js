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
        
        $scope.$on('mousemoveBodyEvent', mousemoveBodyEvent);
        $rootScope.changePosition = changePosition;

        return vm;

        function mousemoveBodyEvent(event, data) {
            if (!$rootScope.dragInfo)
                return;

            var boardItemElem = document.getElementById($rootScope.dragInfo.idElem);

            $(boardItemElem).css({
                top: (data.mouseY + 30) - $(window).scrollTop(),
                left: (data.mouseX + 30)
            });
        }
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