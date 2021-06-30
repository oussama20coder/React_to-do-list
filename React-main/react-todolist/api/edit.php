<?php

$id = $_POST['id'];
$status = $_POST['status'];

$con = new PDO ("mysql:host=localhost;dbname=todo_list_app","root","");
$querySql = "UPDATE tasks SET done = '$status' WHERE id = '$id' ";

$aplySQL = $con -> prepare($querySql);
$aplySQL -> execute();

?>