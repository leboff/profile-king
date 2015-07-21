'use strict';

angular.module('profileKingApp')
  .factory('lokidb', function (Loki, lodash) {
  	var lokidb = new Loki('profileking');

  	lokidb.addCollection('profiles');
  	lokidb.addCollection('settings');
  	lokidb.addCollection('orgs');



  	return {
  		find: function(collection, query){
  			var c = lokidb.getCollection(collection);
  			return c.find(query);
  		},
  		insert: function(collection, object){
  			var c = lokidb.getCollection(collection);
  			c.insert(object);
  		},
      join: function(data, key, collection, collectionKey){
        var c= lokidb.getCollection(collection);
        return c.eqJoin(data, collectionKey, key).data();
      },
  		debug: function(){
  			var collections = lokidb.listCollections();
  			lodash.forEach(collections, function(collection){
  				var c = lokidb.getCollection(collection.name);
  				console.log(c.find({}));
  			});
  		}
  	};
  });
