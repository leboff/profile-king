'use strict';

angular.module('profileKingApp')
  .factory('profileColumns', function ($rootScope, uiGridEditConstants) {
    $rootScope.$on('uiGridEditConstants.events.END_CELL_EDIT', function(data, two){
      console.log(data, two);
    });

    var tables = {
      applicationVisibilities: {
        columns: [
          {name: 'application', enableCellEdit: false},
          {name: 'default', enableCellEdit: true,  type: 'boolean'},
          {name: 'visible', enableCellEdit: true,  type: 'boolean'}
        ]
      },
      classAccesses: {
        columns: [
          {name: 'apexClass', enableCellEdit: false},
          {name: 'enabled', enableCellEdit: true,  type: 'boolean'}
        ]
      }
    };
    return {
      getColumnDef: function (table) {
        return tables[table].columns;
      }
    };
  });
