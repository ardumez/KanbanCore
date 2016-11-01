(function (angular) {
  'use strict';
  /**
   * @ngdoc function
   * @name kanbanListApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the kanbanListApp
   */
  angular.module('KBCList')
    .controller('HeaderCtrl', function ($scope) {
      var vm = this;
      vm.showKBCList = false;
      vm.KBCListButtonClick = function () {
        if (vm.showKBCList) {
          vm.showKBCList = false;
        } else {
          vm.showKBCList = true;
        }
      };
      vm.KBCList = [
        { titre: "tableau 1" },
        { titre: "tableau 2" }
      ];
      return vm;
    });
})(window.angular);