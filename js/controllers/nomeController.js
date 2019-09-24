(function(){
    'use strict';

    angular.module('myApp',[])
		.controller('nomeController', ['$scope', '$http', function($scope, $http) {
			$scope.listaNomes = [];
      $scope.message = "";
			$scope.buscarNome = function(nome){
				$http({
					url: 'https://servicodados.ibge.gov.br/api/v2/censos/nomes/' +nome
				}).then(function(response){
					var dadosGrafico = response.data[0].res;
                        var periodoArray = [];
                        var frequenciaArray = [];

					for (var i=0; i<=dadosGrafico.length - 1; i++){
                        periodoArray.push(dadosGrafico[i].periodo);
                        frequenciaArray.push(dadosGrafico[i].frequencia);
					}
                        $scope.mostrarGrafico = function(){
                          new Chartist.Bar('.ct-chart', {
                            labels: periodoArray,
                            series: frequenciaArray
                          }, {
                            distributeSeries: true
                          });
                          return true;
                        };
            
                        $scope.nomePessoa = "";
                        $scope.message = "";
				}).catch(function(data, status) {
          $scope.message = "Não foi possível localizar este nome.";
        })
			};

		}]);
})();