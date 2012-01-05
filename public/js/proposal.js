// define our app namespace
// define what is your namespace in tpl:
// <html ng:app="XFA">
// ng:app will bootstrap the app (it's replacement for current ng:autobind, ng:modules)
// it creates new injector, with angular stuff (the angular module) plus stuff from given namespace
// ivoke init fn - to configure, load more stuff (3rd party libs ?)
// compile the element... link... (bootstrap)
var XFA = {};


XFA.init = function($locationProvider) {
  // optional init function, where you configure all the stuff
};

// ng:controller search this namespace for controllers
XFA.controller = {};
XFA.controller.UserList = function($http) {
  // this is UserList controller
  // <div ng:controller="UserList">
};


XFA.service = {};
XFA.service.bestService = function() {
  // this is provider constructor
  this.$get = ['$http', function($http) {
    return {};
  }];
};


XFA.factory = {};
XFA.factory.greatService = function($depA, $depB) {
  // this is my service...
};


XFA.value = {};
XFA.value.something = {};


XFA.directive = {};
XFA.directive.ngOmniList = function($depA, $depB) {
  return {
    priority: 1,
    compile: function(template) {
      return function(scope, element, attrs) {};
    }
  };
};

XFA.filter.currency = function($deps) {
  return function(input) {
    // this is a filter
  };
};




// UNIT TESTING

beforeEach(inject(function($provide) {
  // global beforeEach, explicitly say which mocks you wanna use...
  $provide.factory('$log', angular.mock.createLog);
  $provide.value('$httpBackend', new angular.mock.HttpBackend());
  $provide.service('$exceptionHandler', angular.mock.ExceptionHandlerProvider);
}));




// DEFAULT NAMESPACE angular
// will load stuff from angular namespace
// <html ng:app>
angular.controller.MyController = function() {}; // controller
angular.service.MyService = function() {}; // provider
angular.filter.currency = function() {}; // filter
angular.directive.superMegaDirective = function() {}; // directive
angular.init = function() {}; // configuration function
