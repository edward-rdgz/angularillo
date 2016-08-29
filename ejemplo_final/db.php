<?php

include('config.php'); 

/**  Switch Case to Get Action from controller  **/

switch($_GET['action'])  {
    case 'add_producto' :
            add_producto();
            break;

    case 'get_producto' :
            get_producto();
            break;

    case 'edit_producto' :
            edit_producto();
            break;

    case 'delete_producto' :              
            delete_producto();
            break;

    case 'update_producto' :
            update_producto();
            break;
}


/**  Function to Add producto  **/

function add_producto() {
    $data = json_decode(file_get_contents("php://input")); 
    $prod_nombre      = $data->prod_nombre;    
    $prod_desc      = $data->prod_desc;
    $prod_precio     = $data->prod_precio;
    $prod_cantidad  = $data->prod_cantidad;
 
    print_r($data);
    $qry = 'INSERT INTO producto (prod_nombre,prod_desc,prod_precio,prod_cantidad) values ("' . $prod_nombre . '","' . $prod_desc . '",' .$prod_precio . ','.$prod_cantidad.')';
   
    $qry_res = mysql_query($qry);
    if ($qry_res) {
        $arr = array('msg' => "Producto agregado satisfactoriamente!!!", 'error' => '');
        $jsn = json_encode($arr);
        // print_r($jsn);
    } 
    else {
        $arr = array('msg' => "", 'error' => 'Error insertando el registro');
        $jsn = json_encode($arr);
        // print_r($jsn);
    }
}


/**  Function to Get producto  **/

function get_producto() {    
    $qry = mysql_query('SELECT * from producto');
    $data = array();
    while($rows = mysql_fetch_array($qry))
    {
        $data[] = array(
                    "id"            => $rows['id'],
                    "prod_nombre"     => $rows['prod_nombre'],
                    "prod_desc"     => $rows['prod_desc'],
                    "prod_precio"    => $rows['prod_precio'],
                    "prod_cantidad" => $rows['prod_cantidad']
                    );
    }
    print_r(json_encode($data));
    return json_encode($data);  
}


/**  Function to Delete producto  **/

function delete_producto() {
    $data = json_decode(file_get_contents("php://input"));     
    $index = $data->prod_index;     
    //print_r($data)   ;
    $del = mysql_query("DELETE FROM producto WHERE id = ".$index);
    if($del)
    return true;
    return false;     
}


/**  Function to Edit producto  **/

function edit_producto() {
    $data = json_decode(file_get_contents("php://input"));     
    $index = $data->prod_index; 
    $qry = mysql_query('SELECT * from producto WHERE id='.$index);
    $data = array();
    while($rows = mysql_fetch_array($qry))
    {
        $data[] = array(
                    "id"            =>  $rows['id'],
                    "prod_nombre"     =>  $rows['prod_nombre'],
                    "prod_desc"     =>  $rows['prod_desc'],
                    "prod_precio"    =>  $rows['prod_precio'],
                    "prod_cantidad" =>  $rows['prod_cantidad']
                    );
    }
    print_r(json_encode($data));
    return json_encode($data);  
}


/** Function to Update producto **/

function update_producto() {
    $data = json_decode(file_get_contents("php://input")); 
    $id             =   $data->id;
    $prod_nombre      =   $data->prod_nombre;    
    $prod_desc      =   $data->prod_desc;
    $prod_precio     =   $data->prod_precio;
    $prod_cantidad  =   $data->prod_cantidad;
   // print_r($data);
    
    $qry = "UPDATE producto set prod_nombre='".$prod_nombre."' , prod_desc='".$prod_desc."',prod_precio='.$prod_precio.',prod_cantidad='.$prod_cantidad.' WHERE id=".$id;
  
    $qry_res = mysql_query($qry);
    if ($qry_res) {
        $arr = array('msg' => "Producto actualizado satisfactoriamente!!!", 'error' => '');
        $jsn = json_encode($arr);
        // print_r($jsn);
    } else {
        $arr = array('msg' => "", 'error' => 'Error actualizando el registro');
        $jsn = json_encode($arr);
        // print_r($jsn);
    }
}

?>