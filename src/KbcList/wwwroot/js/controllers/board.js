(function (angular) {
  'use strict';

  angular
    .module('KbcList')
    .controller('BoardCtrl', BoardCtrl);

  BoardCtrl.$inject = ['$scope', 'kbcMenuService'];

  function BoardCtrl($scope, kbcMenuService) {
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