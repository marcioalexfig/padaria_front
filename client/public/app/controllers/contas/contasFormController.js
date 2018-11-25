app.controller('contasFormController', function ($scope, $routeParams, $rootScope, $sessionStorage, $route, $http, $filter, $window, Tools, Utils, FileUploader) {
	
	inicializar();

	function inicializar() {
		$rootScope.app.module = {title: "Conta"};

		$('#tabForm a').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		});


		carregaDados($routeParams.modo, $routeParams.idAcao);


	}

	function carregaDados(modo, idAcao) {
		$scope.modo = modo;
		switch (modo) {
			case "exibir":
				$rootScope.app.module.title = "Exibindo Conta";
				exibirConta(idAcao);
				break;
			case "cadastrar":
				$rootScope.app.module.title = "Cadastrando Conta";
				break;
			case "editar":
				$rootScope.app.module.title = "Editando Conta";
				editarConta(idAcao);
				break;
			default:
				break;
		}
	}

	function exibirConta(item) {
		$http.get(`http://localhost:8080/api/contas/${item}`).then(
			function (response) {
				$scope.modoLeitura = true;
				$scope.conta = response.data.dados;
			},
			function (error) {
				console.log(error);
				Tools.hideWait();
				if (error.status === 404) {
					$rootScope.app.erro = { message: "URI not available." }
				} else {
					$rootScope.app.erro = error.data;
				}
				$rootScope.app.erro = error.data;
				$("#mdlError").modal('show');
			}
		);
	}


	function editarConta(item) {
		$http.get(`http://localhost:8080/api/contas/${item}`).then(
			function (response) {
				
				$scope.modoLeitura = false;
				$scope.conta = response.data.dados;
				$scope.conta.padaria = response.data.dados.padaria.id
				$scope.conta.dataPagamento = $filter('date')($scope.conta.dataPagamento, "dd/MM/yyyy", 'UTC');
			},
			function (error) {
				console.log(error);
				Tools.hideWait();
				if (error.status === 404) {
					$rootScope.app.erro = { message: "URI not available." }
				} else {
					$rootScope.app.erro = error.data;
				}
				$rootScope.app.erro = error.data;
				$("#mdlError").modal('show');
			}
		);
	}

	$scope.salvarConta = function () {
		Tools.showWait();
		if ($scope.conta.id) {
			var item = {
				"dataPagamento": moment.utc($scope.conta.dataPagamento, "yyyy-MM-dd'T'HH:mm:ss.SSSZ"),
				"padaria": {
					"id":$scope.conta.padaria,
				},
				"status": $scope.conta.status,
				"titulo": $scope.conta.titulo,
				"valor": $scope.conta.valor,
			}
			$http.put(`http://localhost:8080/api/contas/${$scope.conta.id}`, item).then(
				function (response) {
					$scope.conta = response.data;
					$scope.conta.dataPagamento = $filter('date')($scope.conta.dataPagamento, "dd/MM/yyyy", 'UTC');
					Tools.hideWait();
					Utils.showToastMessage('Salvo');
					$window.location.href = `/#/conta/editar/${$scope.conta.id}`;
				},
				function (error) {
					Tools.hideWait();
					if (error.status === 404) { $rootScope.app.erro = { message: "URI not available." }; }
					else { $rootScope.app.erro = error.data; }
					Tools.hideWait();
					$("#mdlError").modal('show');
				});
		} else {
			var item = {
				"dataPagamento": moment.utc($scope.conta.dataPagamento, "yyyy-MM-dd'T'HH:mm:ss.SSSZ"),
				"padaria": {
					"id":$scope.conta.padaria,
				},
				"status": $scope.conta.status,
				"titulo": $scope.conta.titulo,
				"valor": $scope.conta.valor,
			}
			$http.post('http://localhost:8080/api/contas/', item).then(
				function (response) {
					$scope.conta = response.data;
					$scope.conta.dataPagamento = $filter('date')($scope.conta.dataPagamento, "dd/MM/yyyy", 'UTC');
					Tools.hideWait();
					Utils.showToastMessage('Salvo');
					$window.location.href = `/#/conta/editar/${$scope.conta.id}`;
				},
				function (error) {
					Tools.hideWait();
					if (error.status === 404) { $rootScope.app.erro = { message: "URI not available." }; }
					else { $rootScope.app.erro = error.data; }
					Tools.hideWait();
					$("#mdlError").modal('show');
				});
		}
	}



});