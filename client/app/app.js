'use strict';

angular.module('profileKingApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngLodash',
  'ngAnimate',
  'ngMaterial',
  'md.data.table'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  })
  .config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
  ])
  .value('api', {
    'profiles': '/api/profiles'
  })
  .value('profileSettings', {
        classAccesses: {
            title: 'Apex Classes',
            setting: {
                label: 'Apex Class',
                field: 'apexClass'
            },
            read:{
                label: 'Enabled',
                field: 'enabled'
            }
        },
        pageAccesses: {
            title: 'Visualforce Pages',
            setting: {
                label: 'Page',
                field: 'apexPage'
            },
            read:{
                label: 'Enabled',
                field: 'enabled'
            }
        },
        fieldPermissions:{
            title: 'Field Permissions',
            setting: {
                label: 'Field',
                field: 'field'
            },
            edit:{
              label: 'Edit',
              field: 'editable'
            },
            read:{
              label: 'Read',
              field: 'readable'
            }
        },
        userPermissions:{
            title: 'User Permissions',
            setting: {
                label: 'Permission',
                field: 'name'
            },
            read:{
                label: 'Enabled',
                field: 'enabled'
            }
        },
        applicationVisibilities:{
            title: 'Application Visibilities',
            setting:{
                label: 'Application',
                field: 'application'
            }, 
            defaultField: {
                label: 'Default',
                field: 'default'
            },
            read:{
                label: 'Visible',
                field: 'visible'
            }
        },
        recordTypeVisibilities:{
            title: 'Record Types',
            setting:{
                label: 'Record Type',
                field: 'recordType'
            }, 
            defaultField: {
                label: 'Default',
                field: 'default'
            },
            read:{
                label: 'Visible',
                field: 'visible'
            }
        },
        layoutAssignments:{
            title: 'Layouts',
            setting:{
                label: 'Layout',
                field: 'layout'
            }
        },
        objectPermissions:{
            title: 'Objects',
            setting:{
                label: 'Object',
                field: 'object'
            },
            create:{
                label: 'Create',
                field: 'allowCreate'
            },
            del:{
                label: 'Delete',
                field: 'allowDelete'
            },
            edit:{
                label: 'Edit',
                field: 'allowEdit'
            },
            read:{
                label: 'Read',
                field: 'allowRead'
            }
        },
        tabVisibilities:{
            title: 'Tabs',
            setting:{
                label: 'Tab',
                field: 'tab'
            },
            select:{
                label: 'Visibility',
                field: 'visibility',
                values:['DefaultOn', 'DefaultOff', 'Hidden']
            }
        }
    });
