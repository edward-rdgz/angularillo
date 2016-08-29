    var listApp = angular.module('listpp', ['ui.bootstrap']);    

    listApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
    });
    /*  listApp es una variable que toma el control del array de valor para mostrar la información en la vista usando el modulo 'listApp' con un arrar de los argumentos */

   
    listApp.controller('PhoneListCtrl', function ($scope,$http) {
    $scope.filteredItems =  [];
    $scope.groupedItems  =  [];
    $scope.itemsPerPage  =  3;
    $scope.pagedItems    =  [];
    $scope.currentPage   =  0;

    $scope.phones = [ ];

    /** Scope argument specify the function by name remove and passed index of list item as a parameter , which splice the list by 1 , as click on remove button **/
            
    $scope.remove = function (index) {
        $scope.phones.splice(index,1);
    }

    $scope.funding = { startingEstimate: 0 };

    $scope.computeNeeded = function() {           
        $scope.needed = $scope.funding.startingEstimate * 10;                
    };


    
    

    /** Funcion para optener la información de los productos **/

    $scope.get_producto = function(){
    $http.get("db.php?action=get_producto").success(function(data)
    {
        //$scope.producto_detail = data;   
        $scope.pagedItems = data;    
        $scope.currentPage = 1; //pagina actual
        $scope.entryLimit = 5; //numero máximo de registros que se muestras en la pantalla
        $scope.filteredItems = $scope.pagedItems.length; //filtro inicial 
        $scope.totalItems = $scope.pagedItems.length;

    });
    }
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };

    /** funcion que agrega un nuevo producto a la bd  **/

    $scope.producto_submit = function() {
        $http.post('db.php?action=add_producto', 
            {
                'prod_nombre'     : $scope.prod_nombre, 
                'prod_desc'     : $scope.prod_desc, 
                'prod_precio'    : $scope.prod_precio,
                'prod_cantidad' : $scope.prod_cantidad
            }
        )
        .success(function (data, status, headers, config) {
          alert("producto ha sido registrado satisfactoriamente");
          $scope.get_producto();

        })

        .error(function(data, status, headers, config){
           
        });
    }

    /** Funcion que elimina el producto seleccionado **/

    $scope.prod_delete = function(index) {  
     var x = confirm("¿Deseas eliminar el producto seleccionado?");
     if(x){
      $http.post('db.php?action=delete_producto', 
            {
                'prod_index'     : index
            }
        )      
        .success(function (data, status, headers, config) {               
             $scope.get_producto();
             alert("producto ha sido eliminado satisfactoriamente");
        })

        .error(function(data, status, headers, config){
           
        });
      }else{

      }
    }

    /** Función para editar el detalle de los productos desde una lista de productos referenciando un archivo php **/

    $scope.prod_edit = function(index) {  
      $scope.update_prod = true;
      $scope.add_prod = false;
      $http.post('db.php?action=edit_producto', 
            {
                'prod_index'     : index
            }
        )      
        .success(function (data, status, headers, config) {    
            //alert(data[0]["prod_nombre"]);
           
            $scope.prod_id          =   data[0]["id"];
            $scope.prod_nombre        =   data[0]["prod_nombre"];
            $scope.prod_desc        =   data[0]["prod_desc"];
            $scope.prod_precio       =   data[0]["prod_precio"];
            $scope.prod_cantidad    =   data[0]["prod_cantidad"];


        })

        .error(function(data, status, headers, config){
           
        });
    }

    /** función para actualizar los detalles del productoo despues de editar un elemento de la lista referenciando a un archivo php	 **/

    $scope.update_producto = function() {

        $http.post('db.php?action=update_producto', 
                    {
                        'id'            : $scope.prod_id,
                        'prod_nombre'     : $scope.prod_nombre, 
                        'prod_desc'     : $scope.prod_desc, 
                        'prod_precio'    : $scope.prod_precio,
                        'prod_cantidad' : $scope.prod_cantidad
                    }
                  )
                .success(function (data, status, headers, config) {                 
                  $scope.get_producto();
                   alert("producto has been Updated Successfully");
                })
                .error(function(data, status, headers, config){
                   
                });
    }

   
});