(function (angular) {
  'use strict';

  angular
    .module('KBCList')
    .controller('IndexCtrl', IndexCtrl);

  IndexCtrl.$inject = ['$scope', 'kbcMenuService'];

  function IndexCtrl($scope, kbcMenuService) {
    var vm = this;
    vm.message = "coucou";
    vm.coucou = "coucouc";
    vm.init = init;
    return vm;

    function init() {
      kbcMenuService.getKBCMenu().success(function (data) {
        vm.KbcList = data;
      });
    }
  };

})(window.angular);