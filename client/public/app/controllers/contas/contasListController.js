app.controller('contasListController', function ($scope, $routeParams, $rootScope, $sessionStorage, $route, $http, $filter, $window, Tools, Utils, FileUploader) {
	if (!$rootScope.app) {
		$rootScope.app = {};
	}

	$rootScope.app.module = {
		title: "Contas a Pagar",
		subtitle: ""
	};

	function loadContas() {
		Tools.showWait();
		$http.get('http://localhost:8080/api/contas').then(
			function (response) {
				loadTable(response.data.dados);
				Tools.hideWait();
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
	function loadHistorico() {
		Tools.showWait();
		$http.get('http://localhost:8080/api/historicos').then(
			function (response) {
				let array = []
				if(response.data.dados) {
					response.data.dados.forEach((dado)=>{
						let item = {
							id: dado.id,
							conta: dado.conta.titulo,
							status: dado.conta.status,
							pagamento: dado.conta.dataPagamento,
							saldoAntes: dado.saldoTotalAntes,
							saldoDepois: dado.saldoTotalDepois,
						}
						array.push(item)
					})
					
				}
				loadTableHistorico(array);
				Tools.hideWait();
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

	function loadTable(dados) {
		var datatable = $("#dtContas").DataTable({
			select: true,
			destroy: true,
			searching: true,
			data: dados,
			autoWidth: false,
			pageLength: 20,
			oLanguage: { sUrl: "/plugins/datatables/language/Portuguese-Brasil.json" },
			columnDefs: [
				{ width: 30, targets: [0, 2, 3, 5] },
				{ width: 100, targets: [1, 4] },
			],
			columns: [
				{ 	
					data: 'id', render: (vData) => {
						return (vData)?vData:'';
					} 
				},
				{ data: 'titulo', render: (vData) => {
					return (vData)?vData:'';
					}
				},
				{
					data: 'status', render: (vData) => {
						return (vData)?vData:'';
						}
				},
				{ data: 'valor', render: (vData) => {
					return (vData)?"R$ "+vData:'';
					} 
				},
				{ data: 'padaria', render: (vData) => {
					return (vData && vData.nome)?vData.nome:'';
					} 
				 },
				{ data: 'pagamento', render: (vData) => {
					return (vData)?vData:'';
					} 
				},
				{
					data: 'id', render: function (data, type, row, meta) {
						let separador = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
						let editar = `<a href="javascript:void(0)" onclick="angular.element(this).scope().editarConta('${data}')" title="Editar"><i class="fa fa-edit"></i></a>${separador}`;
						
						return editar;
					}
				}

			],
			rowCallback: function (row, data, index) {
				$(row).attr("id", data.id);
				$(row).attr("important", false);
				$(row).attr("selected", false);
			},
			order: [[0, 'asc']],
			processing: false,
			lengthChange: false,
			language: { "emptyTable": "No records found." }
		});
	}

	function loadTableHistorico(dados) {
		var datatable = $("#dtHistoricos").DataTable({
			select: true,
			destroy: true,
			searching: true,
			data: dados,
			autoWidth: false,
			pageLength: 20,
			oLanguage: { sUrl: "/plugins/datatables/language/Portuguese-Brasil.json" },
			columnDefs: [
				{ width: 30, targets: [0, 2, 3, 5] },
				{ width: 100, targets: [1, 4] },
			],
			columns: [
				{ 	
					data: 'id', render: (vData) => {
						return (vData)?vData:'';
					} 
				},
				{ data: 'conta', render: (vData) => {
					return (vData)?vData:'';
					}
				},
				{
					data: 'status', render: (vData) => {
						return (vData)?vData:'';
						}
				},
				{ data: 'pagamento', render: (vData) => {
					return (vData)?$filter('date')(vData, "dd/MM/yyyy", 'UTC'):'';
					} 
				},
				{ data: 'saldoAntes', render: (vData) => {
					return (vData)?"R$ "+vData:'';
					} 
				 },
				{ data: 'saldoDepois', render: (vData) => {
					return (vData)?"R$ "+vData:'';
					} 
				}

			],
			rowCallback: function (row, data, index) {
				$(row).attr("id", data.id);
				$(row).attr("important", false);
				$(row).attr("selected", false);
			},
			order: [[0, 'asc']],
			processing: false,
			lengthChange: false,
			language: { "emptyTable": "No records found." }
		});
	}

	$scope.exibirConta = function (id) {
		$window.location.href = `/#/conta/exibir/${id}`;
	}

	function cadastrarConta() {
		$window.location.href = `/#/conta/cadastrar/novo`;
	}

	$scope.editarConta = function(id) {
		$window.location.href = `/#/conta/editar/${id}`;
	}



	$(document).ready(() => {
		var table = $('#dtContas').DataTable();

		$('#dtContas tbody').on('click', 'tr', function (currentRow) {
			if (currentRow.target.localName == "td") {
				$scope.exibirConta(currentRow.currentTarget.id);
			}
		});

		loadContas();
		loadHistorico();
	});
});