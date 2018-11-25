/*
 * Main controller:
 * Controla os aspectos gerais do template
 */

app.controller("mainController", function ($sessionStorage, $scope, $route, $rootScope, Tools, $routeParams, $location, $window, Utils) {

	$scope.displayUserName = 'Primeiro / Último';


	if (!$rootScope.app) {

		$rootScope.app = {}

	}

	$rootScope.app.actions = {};

	$rootScope.app.modals = {
		erro: 'app/views/_modals/_erro.html',
		sucesso: 'app/views/_modals/_sucesso.html'
	};

	$("body").css("visibility", "visible");
});