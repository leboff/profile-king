'use strict';

angular.module('profileKingApp')
  .directive('profileSetting', function (lodash, profileSettings) {
    return {
    	scope:{
    		settingType: '@',
    		settings: '=',
    		profs: '='
    	},
		templateUrl: 'app/profileSetting/profileSetting.html',
		restrict: 'EA',
		link: function (scope, element, attrs) {
			if(scope.$last){
				scope.$parent.ready = true;
			}
			scope.show = false;
			var _ = lodash;
			var profs = [], first, settingType;
			var createRows = function(){
				var opts = scope.opts,
					settings = scope.settings;
				scope.names = _.uniq(_.pluck(settings, opts.setting.field));
				scope.profiles = _.groupBy(settings, '$profile');
				_.forEach(scope.profiles, function(values, idx){
					if(!first) first = idx;
					console.log(_.includes(profs, idx));
					var fields =  _.indexBy(values, opts.setting.field);
					scope.profiles[idx] = fields;
					_.forEach(scope.profiles[first], function(value, field){
						scope.profiles[idx][field] = diffPerm(value, scope.profiles[idx][field]);
					});
					profs.push(idx);
				});

			}

			var diffPerm = function(lhs, rhs){
				var opts = scope.opts;
				if(!rhs){
					rhs = {
						$diff: {
							missing: true
						}
					}
					return rhs;
				}
				else{
					rhs.$diff = {};
					var perms = ['read', 'edit', 'create', 'del', 'select', 'defaultField'];
					_.forEach(perms, function(perm){
						if(opts[perm]){
							var path = opts[perm].field;
							if(lhs[path] != rhs[path]){
								_.set(rhs, '$diff['+perm+'].modified', true);
							}
						}
					});
					return rhs;
				}
				
			}

			attrs.$observe('settingType', function(value) {
				settingType = value;
				scope.opts = profileSettings[value];
			})
			scope.$watch(function(){
				return scope.opts && scope.settings
			}, function(){
				createRows();
			});

			scope.logMe = function(value, secondValue){
				console.log(value);
				console.log(secondValue);
			}
		
			//console.log('type', scope.settingType);
     		//var options = profileSettings[type];
			// scope.logMe = function(row){
			// 	console.log(row);
			// }
			// if(scope.options && scope.options.defaultField){
			// 	scope.$watch('ngModel', function(values, old){
		 //          if(values && !old){
		 //            angular.forEach(values, function(value){
		 //              scope.defaultValue = value[scope.options.defaultField.field] == 'true' ? value[scope.options.setting.field] : scope.defaultValue;
		 //            });
		 //          }
	       
	  // 			});
			// }
		}
    };
  });