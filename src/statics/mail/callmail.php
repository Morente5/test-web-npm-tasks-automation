<?php

require_once './swiftmailer/swift_required.php';

$nombre = '';
$email = '';
$telefono = '';
$categoria = '';
$servicio = '';

if (isset($_POST["nombre"])) {
	$nombre = $_POST["nombre"];
}
if (isset($_POST["email"])) {
	$email = $_POST["email"];
}
if (isset($_POST["telefono"])) {
	$telefono = $_POST["telefono"];
}
if (isset($_POST["categoria"])) {
	$categoria = $_POST["categoria"];
}
if (isset($_POST["servicio"])) {
	$servicio = $_POST["servicio"];
}

$completo = $nombre && $email && $telefono && $categoria && $servicio;

if ($completo) {
  $passwordFile = "/password";
  $fh = fopen($_SERVER['DOCUMENT_ROOT']."/../".$passwordFile, 'r');
  $password = fgets($fh);
  fclose($fh);

  $transport = Swift_SmtpTransport::newInstance('smtp.braunmarketingandconsulting.es', 465, 'ssl')
    ->setUsername('contacto@braunmarketingandconsulting.es')
    ->setPassword($password)
  ;

  $mailer = Swift_Mailer::newInstance($transport);

  $message = Swift_Message::newInstance();

  $headers  = "From: " .($email) . "\r\n";
  $headers .= "Reply-To: ".($email) . "\r\n";
  $headers .= "Return-Path: ".($email) . "\r\n";;
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
  $headers .= "X-Priority: 3\r\n";
  $headers .= "Message-ID: <".time()." TheSystem@".$_SERVER['SERVER_NAME'].">\r\n";
  $headers .= "X-Mailer: PHP". phpversion() ."\r\n";

  $message
    ->setSubject('Cliente interesado en: '.$categoria.' - '.$servicio)
    ->setFrom(array($email => $nombre))
    ->setTo(array('auditoria@braunmarketingandconsulting.es' => 'Braun Marketing & Consulting'))
    ->setBcc(array(
      'carlos@braunmarketingandconsulting.es' => 'Carlos - Braun Marketing & Consulting',
      'joaquin@braunmarketingandconsulting.es' => 'Joaquín - Braun Marketing & Consulting'
      ))
    ->setBody('<p>Interesado en: '.$categoria.' - '.$servicio.'</p><p>'.'<p>'.$nombre.'</p><p>'.'<p>'.$email.'</p><p>'.$telefono.'</p>')
    ->addPart('<p>Interesado en: '.$categoria.' - '.$servicio.'</p><p>'.'<p>'.$nombre.'</p><p>'.'<p>'.$email.'</p><p>'.$telefono.'</p>', 'text/html');

  $result = $mailer->send($message);
}

if ($result) {
  header("HTTP/1.1 202 Accepted");
} else {
  header("HTTP/1.1 406 Not Acceptable");
}

?>