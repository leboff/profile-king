'use strict';

angular.module('profileKingApp')
  .factory('ngForce', [function () {

      return function(prefix){
          var client =  new jsforce.browser.Client(prefix);
          client.init({
            clientId: '3MVG9xOCXq4ID1uFfHAXTCko8e9g26OglamEM2GjnNcJk9L8mqg8UYPY9dOdhpuuqztD_7rguudLQiz3IScPb',
            redirectUri: 'http://localhost:9000/callback',
            loginUrl : 'https://test.salesforce.com',
            proxyUrl: '/proxy'
          });

        return client;

      };
  }]);
