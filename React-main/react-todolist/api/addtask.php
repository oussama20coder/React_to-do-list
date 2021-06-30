<?php
$dbh = new PDO("mysql:host=localhost;dbname=todo_list_app","root","");
$sql = " INSERT INTO tasks(tache) VALUES (:tache)";
$addTaskQuery = $dbh->prepare($sql);
$addTaskQuery->bindParam(":tache",$_POST["tache"],PDO::PARAM_STR);
// $addTaskQuery->bindParam(":taskdate",$_POST["taskdate"],PDO::PARAM_STR);
// $addTaskQuery->bindParam(":done",$_POST["done"],PDO::PARAM_STR);
$addTaskQuery->execute();
?>