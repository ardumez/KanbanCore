(function (angular) {
    'use strict';

    angular
        .module('KbcList')
        .controller('BoardCtrl', BoardCtrl)
        .directive('boardList',BoardListDirective)
        .directive('boardItem', BoardItemDirective);

    BoardCtrl.$inject = ['$scope'];

    function BoardListDirective() {
        return function (scope, element, attrs) {
            scope.moveItem = function(){
                alert("coucou");
            }
            if (scope.$last) { // all are rendered
                element.bind("dragover", function(){
                    console.log("click");
                });
            }
        }
    }

    function BoardItemDirective() {
        return {
            restrict: "EAC",
            scope: {
                boardItemMove: '=boardItemMove'
            },
            link: function (scope, elem, attrs) {
                elem.on('click', function(){
                    scope.boardItemMove();
                });
            }
        }
    }

    function BoardCtrl($scope, kbcMenuService) {
        var vm = this;
        vm.boardLists = [ { id : 1, title : "A Faire", items : [
                { id: 2, title: "acheter baguette"},
                { id: 3, title: "acheter journal"}
            ]
        }, { id = 2, title : "autre"}];
        vm.init = init;
        return vm;

        function init() {
        }
    };

})(window.angular);