(function (angular) {
  'use strict';

  angular
    .module('KbcList')
    .controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject = ['$scope', 'kbcMenuService'];

  function HeaderCtrl($scope, kbcMenuService) {
    var vm = this;

    vm.showKbcList = true;
    vm.KbcListButtonClick = KbcListButtonClick;
    vm.initMenu = initMenu;

    return vm;

    function KbcListButtonClick() {
      if (vm.showKbcList) {
        vm.showKbcList = false;
      } else {
        vm.showKbcList = true;
      }
    }
    function initMenu(){
      kbcMenuService.getKBCMenu().success(function (data) {
        vm.KbcList = data;
      });
    }
  };

})(window.angular);