(function (angular) {
  'use strict';

  angular
    .module('KBCList')
    .controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject = ['$scope', 'kbcMenuService'];

  function HeaderCtrl($scope, kbcMenuService) {
    var vm = this;

    vm.showKBCList = true;
    vm.KBCListButtonClick = KBCListButtonClick;
    vm.initMenu = initMenu;

    return vm;

    function KBCListButtonClick() {
      if (vm.showKBCList) {
        vm.showKBCList = false;
      } else {
        vm.showKBCList = true;
      }
    }
    function initMenu(){
      kbcMenuService.getKBCMenu().success(function (data) {
        vm.KBCList = data;
      });
    }
  };

})(window.angular);