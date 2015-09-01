(function() {
  'use strict';

  angular.module('cordova.network', ['ionic', 'ngCordova']);

})();

(function () {
  'use strict';

  function NetworkService($cordovaNetwork) {
    var state = this;

    return {
      isOnline: isOnline,
      getStatus: getStatus,
      getNetwork: getNetwork
    };

    function isOnline() {
      return (!navigator.network) ? navigator.onLine : $cordovaNetwork.isOnline()
    }

    function getStatus() {
      return (state.isOnline()) ? 'online' : 'offline';
    }

    function getNetwork() {
      return (!navigator.network) ? {type: 'UNKNOWN'} : $cordovaNetwork.getNetwork();
    }
  }

  NetworkService.$inject = ['$cordovaNetwork'];

  angular.module('cordova.network').factory('NetworkService', NetworkService);

})();

(function () {
  'use strict';

  function NetworkEvents($rootScope, $ionicPlatform, NetworkService) {
    $ionicPlatform.ready(function () {
      $rootScope.isOnline = NetworkService.isOnline();
      $rootScope.$apply();

      // send network state when network is online
      window.addEventListener('online', function (event) {
        var networkState = NetworkService.getNetwork();
        $rootScope.isOnline = true;
        $rootScope.$broadcast('cordova.network.online', networkState, event);
        $rootScope.$apply();
      }, true);

      // send network state when network is offline
      window.addEventListener('offline', function (event) {
        var networkState = NetworkService.getNetwork();
        $rootScope.isOnline = false;
        $rootScope.$broadcast('cordova.network.offline', networkState, event);
        $rootScope.$apply();
      }, true);
    });
  }

  NetworkEvents.$inject = ['$rootScope', '$ionicPlatform', 'NetworkService'];

  angular.module('cordova.network').run(NetworkEvents);

})();