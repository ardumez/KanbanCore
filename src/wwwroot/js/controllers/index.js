
(function(angular) {
  'use strict';
    angular.module('KBCList')
      .controller('IndexCtrl', function ($scope) {
        var vm = this;
          vm.message = "coucou";
          vm.coucou = "coucouc";
          vm.init = function(value)
          {
            vm.coucou = value;
          };
        return vm;
    });
})(window.angular);