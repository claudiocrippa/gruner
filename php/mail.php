<?php

include 'functions.php';

if (!empty($_POST)){

  $data['success'] = true;
  $_POST  = multiDimensionalArrayMap('cleanEvilTags', $_POST);
  $_POST  = multiDimensionalArrayMap('cleanData', $_POST);

  //your email adress 
  $emailTo ="ricardo.gomes.lippelt@gmail.com"; //"yourmail@yoursite.com";

  //from email adress
  $emailFrom ="contato@grunerenergia.com.br" . "\r\n" .
"CC: comercial@grunerenergia.com.br";
//"contact@yoursite.com";

  //email subject
  $emailSubject = "Contato para Orçamento";

  $name = $_POST["name"];
  $email = $_POST["email"];
  $conta = $_POST["conta"];
  $unidadeConsumidora = $_POST["unidadeConsumidora"];
  $city = $_POST["city"];
  if($name == "")
   $data['success'] = false;
 
 if (!preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i", $email)) 
   $data['success'] = false;

  $message = "NOME: $name<br>
  EMAIL: $email<br>
  VALOR DA CONTA: $conta<br>
  UNIDADE CONSUMIDORA: $unidadeConsumidora<br>
  CIDADE: $city";


  $headers = "MIME-Version: 1.0" . "\r\n"; 
  $headers .= "Content-type:text/html; charset=utf-8" . "\r\n"; 
  $headers .= "From: <$emailFrom>" . "\r\n";
  mail($emailTo, $emailSubject, $message, $headers);

  $data['success'] = true;
  echo json_encode($data);
}
