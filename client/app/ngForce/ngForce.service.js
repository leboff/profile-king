'use strict';

angular.module('profileKingApp')
  .factory('ngForce', [function () {

      return function(prefix){
          var client =  new jsforce.browser.Client(prefix);
          client.init({
            clientId: '3MVG9xOCXq4ID1uFfHAXTCko8e9g26OglamEM2GjnNcJk9L8mqg8UYPY9dOdhpuuqztD_7rguudLQiz3IScPb',
            redirectUri: 'http://localhost:9000/callback',
            loginUrl : 'https://login.salesforce.com',
            proxyUrl: '/proxy'
          });

        return client;

      };
  }]);
     
    //   existing: function(){

    //     var existing = [];

    //     var cookies = $cookies.getAll();
    //     angular.forEach(cookies, function(cookie, key){
    //        var regexp = new RegExp('^'+'(jsforce\\d+)'+'_loggedin$');
    //        var match = key.match(regexp);
    //        if(match && match[0] && match[1] && cookie === 'true'){
    //           var force = new jsForceClient(match[1]);
    //           existing.push(force);
    //        }
    //     });

        
    //      return $q.all(existing);
       
