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
            if (scope.$last) { // all are rendered
                element.bind("dragover", function(){
                    console.log("click");
                });
            }
        }
    }

    function BoardItemDirective() {
        return function (scope, element, attrs) {
            if (scope.$last) { // all are rendered
                element.bind("dragover", function(ev){
                    console.log("click");
                });
            }
        }
    }

    function BoardCtrl($scope, kbcMenuService) {
        var vm = this;
        vm.boardLists = [ {title : "A Faire", items : [
                {title: "acheter baguette"},
                {title: "acheter journal"}
            ]
        }, {title : "autre"}];
        vm.init = init;
        return vm;

        function init() {
        }
    };

})(window.angular);