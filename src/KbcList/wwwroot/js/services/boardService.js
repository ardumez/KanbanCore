(function (angular) {
  'use strict';

  angular
    .module('KbcList')
    .factory('boardService', boardService);

  boardService.$inject = ['$http'];

  function boardService($http) {
    var service = {
      getBoard: getBoard
    };

    return service;

    function getBoard() {
      return $http.get("/board/getall");
    };
  };
})(window.angular);