var app = angular.module('configuracao', ["ngRoute", "ui.select", "ngSanitize", "ngStorage", "angularFileUpload"]);

app.config(function ($routeProvider, $httpProvider) {
		
	$routeProvider
		.when('/contas', {
			templateUrl: 'app/views/contas/contas.html',
			controller: 'contasListController',
		})
		.when('/conta/:modo/:idAcao', {
			templateUrl: 'app/views/contas/contasForm.html',
			controller: 'contasFormController',
		})
		.when('/contas/novo', {
			templateUrl: 'app/views/contas/contasForm.html',
			controller: 'contasFormController',
		})
		.otherwise({
			redirectTo: '/dashboard/principal',
		});
});

app.run(function ($rootScope, $location, Utils) {
	$rootScope.$on('$routeChangeStart', function (event, next, current) {
		if (next.authorize) {
			if (!$rootScope.app){
				$rootScope.app = {};
			}
					$rootScope.app.user = "Márcio Alex";
		}
	});
});