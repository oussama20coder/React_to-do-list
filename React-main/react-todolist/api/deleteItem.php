<?php

$id = $_POST['sid'];
$con = new PDO("mysql:host=localhost;dbname=todo_list_app","root","");
$querySQL = "DELETE FROM tasks WHERE id = '$id' ";
$applySQL = $con -> prepare($querySQL);
$applySQL -> execute();

?>