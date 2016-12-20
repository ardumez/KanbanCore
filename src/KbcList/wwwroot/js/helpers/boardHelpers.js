(function (angular) {
    'use strict';

    angular.module('KbcList')
        .factory('boardHelpers', boardHelpers);

    function boardHelpers() {
        var helper = {
            getTargetElement: getTargetElement
        };
        return helper;

        function getTargetElement(height, classValue) {
            return "<div id='kbcCurrent' class=' panel panel-default kbc-board-list " + classValue + "' style='height:" + height + "px;background-color: silver;'>&nbsp;</div>";
        };
    }
})(window.angular);